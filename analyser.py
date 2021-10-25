from json import dump
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.layout import LAParams
from pdfminer.converter import TextConverter
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfinterp import resolve1
from io import StringIO
from pdfminer.pdfpage import PDFPage
from urllib.request import urlretrieve
import sumy
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lex_rank import LexRankSummarizer
from sumy.summarizers.luhn import LuhnSummarizer
import nltk
import yake
import fitz
import time
import json
import os
from textblob import TextBlob
from spellchecker import SpellChecker
import string
import pytesseract
import re
nltk.download('punkt')

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe'
page_json = []


def get_pdf_file_content(path_to_pdf):

    resource_manager = PDFResourceManager(caching=True)
    out_text = StringIO()
    codec = 'base64'
    laParams = LAParams()
    text_converter = TextConverter(
        resource_manager, out_text, laparams=laParams)
    interpreter = PDFPageInterpreter(resource_manager, text_converter)

    for page in PDFPage.get_pages(path_to_pdf, pagenos=set(), maxpages=0, password="", caching=True, check_extractable=True):
        interpreter.process_page(page)

    text = out_text.getvalue()
    text_converter.close()
    out_text.close()
    return text


list_keywords = []


def keywords(text):
    keywords_per_page = []
    kw_extractor = yake.KeywordExtractor()
    language = "en"
    max_ngram_size = 3
    deduplication_threshold = 0.1
#   numOfKeywords = 3
    custom_kw_extractor = yake.KeywordExtractor(
        lan=language, n=max_ngram_size, dedupLim=deduplication_threshold, features=None)
    keywordss = custom_kw_extractor.extract_keywords(text)
    for x in keywordss:
        keywords_per_page.append(x[0])
    list_keywords.append(keywords_per_page)


spelling = []


def spell_grammar(text):
    page_spell_list = []
#   tool = language_check.LanguageTool('en-US')
    sentence_list = nltk.tokenize.sent_tokenize(text)
#   print(sentence_list)
    spell = SpellChecker()
    for sentence in sentence_list:
        #     matches = tool.check(sentence)
        #     print("matches: "+ matches)
        words = [word.strip(string.punctuation) for word in text.split()]
        misspelled = spell.unknown(words)
        for word in misspelled:
            if word != '•':
                # Get the one `most likely` answer
                if(spell.correction(word) != word and word.isalpha()):
                    page_spell_list.append(word)
    spelling.append(page_spell_list)


def images_store(path_to_pdf):
    pdf_file = fitz.open(path_to_pdf)
    if os.path.isdir("images") == False:
        os.makedirs("images")

    # finding number of pages in the pdf
    number_of_pages = len(pdf_file)

    # iterating through each page in the pdf
    for current_page_index in range(number_of_pages):
        # iterating through each image in every page of PDF
        for img_index, img in enumerate(pdf_file.getPageImageList(current_page_index)):
            xref = img[0]
            image = fitz.Pixmap(pdf_file, xref)
            # if it is a is GRAY or RGB image
            if image.n < 5:
                image.writePNG(
                    "{}/image{}-{}.png".format("./images", current_page_index, img_index))
            # if it is CMYK: convert to RGB first
            else:
                new_image = fitz.Pixmap(fitz.csRGB, image)
                new_image.writePNG(
                    "{}/image{}-{}.png".foramt("./images", current_page_index, img_index))


def unionArea(rlist):
    arr = [0.0] * 3
    area = 0
    arr[0] = sum([abs(r) for r in rlist])
    for i, r in enumerate(rlist, start=1):
        arr[1] += sum([abs(r & s) for s in rlist[i:]])
    for i, r in enumerate(rlist, start=1):
        for j, s in enumerate(rlist[i:], start=1):
            t = r & s
            if abs(t) > 0:  # <== this is the major performance gain!
                arr[2] += sum([abs(t & u) for u in rlist[i+j:]])

    f = 1.
    for a in arr:
        area += a * f
        f *= -1
    return area


more_images = []
more_text = []


def percentage_text_to_image(path_to_pdf):
    percentage = []
    doc = fitz.open(path_to_pdf)
    parser = PDFParser(path_to_pdf)
    document = PDFDocument(parser)
    no_pages = resolve1(document.catalog['Pages'])['Count']
    for x in range(no_pages):
        page = doc[x]
        parea = abs(page.rect)
        tlist = []
        ilist = []
        for b in page.getTextBlocks():
            r = fitz.Rect(b[:4]) & page.rect
            if abs(r) > 0:
                if b[-1] == 0:
                    tlist.append(r)  # a text block
                else:
                    ilist.append(r)  # an image block
        t0 = time.perf_counter()
        tarea = unionArea(tlist)
        t1 = time.perf_counter()
        area = unionArea(tlist + ilist)
        t2 = time.perf_counter()
        iarea = area - tarea
        text = (round(tarea*100/parea, 2))
        image = (round(iarea*100/parea, 2))
        if image > 0 and text/image > .5:
            more_images.append(x)
        if text < 10 and image > 0:
            more_text.append(x)

less_text_img = []
more_text_img = []
def image_labellings():
    path ="./images"
    # iterating the images inside the folder
    for imageName in os.listdir(path):
        inputPath = os.path.join(path, imageName)
        text = (pytesseract.image_to_string(inputPath))
        text =  re.sub('[^A-Za-z0-9]+', '', text)
        img_no = imageName.split('-')[1].split('.')[0]
        page_no = imageName.split('-')[0].replace("image",'')
        s = ""
        if(len(text)>110):
            if(img_no == '0'):
                s+="1st image " 
            if(img_no == '1'):
                s+="2nd image " 
            if(img_no == '2'):
                s+="3rd image "
            if(len(s)==0): 
                s+=str((int(img_no)+1))+"th image "
            s+= "of page number "+ str(int(page_no)+1)
            more_text_img.append(s)
        if(len(text) == 0):
            if(img_no == '0'):
                s+="1st image " 
            if(img_no == '1'):
                s+="2nd image " 
            if(img_no == '2'):
                s+="3rd image "
            if(len(s)==0):  
                s+=str(int(img_no)+1)+"th image "
            s+= "of page number "+ str(int(page_no)+1)
            less_text_img.append(s)
    


def process_page(str):
    keywrds = keywords(str)
    mispelled = spell_grammar(str)
    summarizer = LuhnSummarizer()
    if len(str.split()) > 30:
        parser = PlaintextParser.from_string(str, Tokenizer("english"))
        page_summary = summarizer(parser.document, 1)
        page_json.append({
            'keywords': keywrds,
            'mispelled': mispelled,
            'summary': page_summary
        })


summary = ''


def analyser(path_to_pdf):
    more_text = []
    more_images = []
    spelling = []
    resource_manager = PDFResourceManager(caching=True)
    out_text = StringIO()
    codec = 'utf-8'
    laParams = LAParams()
    full_text = get_pdf_file_content(path_to_pdf)
    parser = PlaintextParser.from_string(full_text, Tokenizer("english"))
    summarizer = LuhnSummarizer()
    summary = summarizer(parser.document, 3)
    text_converter = TextConverter(
        resource_manager, out_text, laparams=laParams)
    interpreter = PDFPageInterpreter(resource_manager, text_converter)
    i = 0
    for page in PDFPage.get_pages(path_to_pdf, pagenos=set(), maxpages=0, password="", caching=True, check_extractable=True):
        i += 1
        page_int = interpreter.process_page(page)
        process_page(out_text.getvalue())
        out_text.truncate(0)

    percentage_text_to_image(path_to_pdf)
    images_store(path_to_pdf)
    image_labellings()
    text_converter.close()
    out_text.close()
    return page_json


def data():
    print("More text")
    print(more_text)
    print("More images")
    print(more_images)
    print("spellings")
    print(spelling)
    print("keywords")
    print(list_keywords)
    data = {
            'more_text': more_text,
            'more_images': more_images,
            'spelling': spelling,
            'list_keywords': list_keywords,
            'summary': summary,
            'more_text_img': more_text_img,
            'less_text_img':less_text_img
            }
    return data
