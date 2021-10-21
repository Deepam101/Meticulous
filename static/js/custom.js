/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {

	"use strict";

	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	setTimeout(function () {
		$('.loader_bg').fadeToggle();
	}, 1500);

	/* JQuery Menu
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('header nav').meanmenu();
	});

	/* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

	// /* sticky
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$(".sticky-wrapper-header").sticky({ topSpacing: 0 });
	});

	/* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$(".main-menu ul li.megamenu").mouseover(function () {
			if (!$(this).parent().hasClass("#wrapper")) {
				$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function () {
			$("#wrapper").removeClass('overlay');
		});
	});

	/* NiceScroll
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(".brand-box").niceScroll({
		cursorcolor: "#9b9b9c",
	});

	/* NiceSelect
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('select').niceSelect();
	});

	/* OwlCarousel - Blog Post slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		var owl = $('.carousel-slider-post');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 10,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true
		});
	});

	/* OwlCarousel - Banner Rotator Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		var owl = $('.banner-rotator-slider');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 10,
			nav: true,
			dots: false,
			navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true
		});
	});

	/* OwlCarousel - Product Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		var owl = $('#product-in-slider');
		owl.owlCarousel({
			loop: true,
			nav: true,
			margin: 10,
			navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				960: {
					items: 3
				},
				1200: {
					items: 4
				}
			}
		});
		owl.on('mousewheel', '.owl-stage', function (e) {
			if (e.deltaY > 0) {
				owl.trigger('next.owl');
			} else {
				owl.trigger('prev.owl');
			}
			e.preventDefault();
		});
	});


	
	/* Scroll to Top
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(window).on('scroll', function () {
		scroll = $(window).scrollTop();
		if (scroll >= 100) {
			$("#back-to-top").addClass('b-show_scrollBut')
		} else {
			$("#back-to-top").removeClass('b-show_scrollBut')
		}
	});
	$("#back-to-top").on("click", function () {
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
	});

	/* Contact-form
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	$.validator.setDefaults({
		submitHandler: function () {
			alert("submitted!");
		}
	});

	$(document).ready(function () {
		$("#contact-form").validate({
			rules: {
				firstname: "required",
				email: {
					required: true,
					email: true
				},
				lastname: "required",
				message: "required",
				agree: "required"
			},
			messages: {
				firstname: "Please enter your firstname",
				email: "Please enter a valid email address",
				lastname: "Please enter your lastname",
				username: {
					required: "Please enter a username",
					minlength: "Your username must consist of at least 2 characters"
				},
				message: "Please enter your Message",
				agree: "Please accept our policy"
			},
			errorElement: "div",
			errorPlacement: function (error, element) {
				// Add the `help-block` class to the error element
				error.addClass("help-block");

				if (element.prop("type") === "checkbox") {
					error.insertAfter(element.parent("input"));
				} else {
					error.insertAfter(element);
				}
			},
			highlight: function (element, errorClass, validClass) {
				$(element).parents(".col-md-4, .col-md-12").addClass("has-error").removeClass("has-success");
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).parents(".col-md-4, .col-md-12").addClass("has-success").removeClass("has-error");
			}
		});
	});

	/* heroslider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	var swiper = new Swiper('.heroslider', {
		spaceBetween: 30,
		centeredSlides: true,
		slidesPerView: 'auto',
		paginationClickable: true,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true
		},
	});


	/* Product Filters
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	var swiper = new Swiper('.swiper-product-filters', {
		slidesPerView: 3,
		slidesPerColumn: 2,
		spaceBetween: 30,
		breakpoints: {
			1024: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 30,
				slidesPerColumn: 1,
			},
			640: {
				slidesPerView: 2,
				spaceBetween: 20,
				slidesPerColumn: 1,
			},
			480: {
				slidesPerView: 1,
				spaceBetween: 10,
				slidesPerColumn: 1,
			}
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true
		}
	});

	/* Countdown
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$('[data-countdown]').each(function () {
		var $this = $(this),
			finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			var $this = $(this).html(event.strftime(''
				+ '<div class="time-bar"><span class="time-box">%w</span> <span class="line-b">weeks</span></div> '
				+ '<div class="time-bar"><span class="time-box">%d</span> <span class="line-b">days</span></div> '
				+ '<div class="time-bar"><span class="time-box">%H</span> <span class="line-b">hr</span></div> '
				+ '<div class="time-bar"><span class="time-box">%M</span> <span class="line-b">min</span></div> '
				+ '<div class="time-bar"><span class="time-box">%S</span> <span class="line-b">sec</span></div>'));
		});
	});

	/* Deal Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$('.deal-slider').slick({
		dots: false,
		infinite: false,
		prevArrow: '.previous-deal',
		nextArrow: '.next-deal',
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		infinite: false,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 2,
				infinite: true,
				dots: false
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	});

	/* News Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$('#news-slider').slick({
		dots: false,
		infinite: false,
		prevArrow: '.previous',
		nextArrow: '.next',
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: false
			}
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	});

	/* Fancybox
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(".fancybox").fancybox({
		maxWidth: 1200,
		maxHeight: 600,
		width: '70%',
		height: '70%',
	});

	/* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('#sidebarCollapse').on('click', function () {
			$('#sidebar').toggleClass('active');
			$(this).toggleClass('active');
		});
	});

	/* Product slider 
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	// optional
	$('#blogCarousel').carousel({
		interval: 5000
	});


});
// File Upload
// 

function ekUpload(){
	function Init() {
  
	  console.log("Upload Initialised");
  
	  var fileSelect    = document.getElementById('file-upload'),
		  fileDrag      = document.getElementById('file-drag'),
		  submitButton  = document.getElementById('submit-button');
  
	//   fileSelect.addEventListener('change', fileSelectHandler, false);
  
	  // Is XHR2 available?
	  var xhr = new XMLHttpRequest();
	  if (xhr.upload) {
		// File Drop
		// // fileDrag.addEventListener('dragover', fileDragHover, false);
		// fileDrag.addEventListener('dragleave', fileDragHover, false);
		// fileDrag.addEventListener('drop', fileSelectHandler, false);
	  }
	}
  
	function fileDragHover(e) {
	  var fileDrag = document.getElementById('file-drag');
  
	  e.stopPropagation();
	  e.preventDefault();
  
	  fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
	}
  
	function fileSelectHandler(e) {
	  // Fetch FileList object
	  var files = e.target.files || e.dataTransfer.files;
  
	  // Cancel event and hover styling
	  fileDragHover(e);
  
	  // Process all File objects
	  for (var i = 0, f; f = files[i]; i++) {
		parseFile(f);
		uploadFile(f);
	  }
	}
  
	// Output
	function output(msg) {
	  // Response
	  var m = document.getElementById('messages');
	  m.innerHTML = msg;
	}
  
	function parseFile(file) {
  
	  console.log(file.name);
	  output(
		'<strong>' + encodeURI(file.name) + '</strong>'
	  );
	  
	  // var fileType = file.type;
	  // console.log(fileType);
	  var imageName = file.name;
  
	  var isGood = true
	  if (isGood) {
		document.getElementById('start').classList.add("hidden");
		document.getElementById('response').classList.remove("hidden");
		document.getElementById('notimage').classList.add("hidden");
		// Thumbnail Preview
		document.getElementById('file-image').classList.remove("hidden");
		document.getElementById('file-image').src = URL.createObjectURL(file);
	  }
	  else {
		document.getElementById('file-image').classList.add("hidden");
		document.getElementById('notimage').classList.remove("hidden");
		document.getElementById('start').classList.remove("hidden");
		document.getElementById('response').classList.add("hidden");
		document.getElementById("file-upload-form").reset();
	  }
	}
  
	function setProgressMaxValue(e) {
	  var pBar = document.getElementById('file-progress');
  
	  if (e.lengthComputable) {
		pBar.max = e.total;
	  }
	}
  
	function updateFileProgress(e) {
	  var pBar = document.getElementById('file-progress');
  
	  if (e.lengthComputable) {
		pBar.value = e.loaded;
	  }
	}
  
	function uploadFile(file) {
  
	  var xhr = new XMLHttpRequest(),
		fileInput = document.getElementById('class-roster-file'),
		pBar = document.getElementById('file-progress'),
		fileSizeLimit = 1024; // In MB
	  if (xhr.upload) {
		// Check if file is less than x MB
		if (file.size <= fileSizeLimit * 1024 * 1024) {
		  // Progress bar
		  pBar.style.display = 'inline';
		  xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
		  xhr.upload.addEventListener('progress', updateFileProgress, false);
  
		  // File received / failed
		  xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4) {
			  // Everything is good!
  
			  progress.className = (xhr.status == 200 ? "success" : "failure");
			  document.location.reload(true);
			}
		  };
  
		  // Start upload
		  xhr.open('POST', document.getElementById('file-upload-form').action, true);
		  xhr.setRequestHeader('X-File-Name', file.name);
		  xhr.setRequestHeader('X-File-Size', file.size);
		  xhr.setRequestHeader('Content-Type', 'multipart/form-data');
		  xhr.send(file);
		} else {
		  output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
		}
	  }
	}
  
	// Check for the various File API support.
	if (window.File && window.FileList && window.FileReader) {
	  Init();
	} else {
	  document.getElementById('file-drag').style.display = 'none';
	}
  }
  ekUpload();
  
var body = document.body;

var resizables = $(".resizable-container").map(createResizable);
var requestId = null;

TweenLite.set("main", { autoAlpha: 1 });
$(window).resize(requestResize);

function createResizable(index, element) {
  
  var container = $(element);
  var panels = container.children(".resizable");
  var panelA = panels[0];
  var panelB = panels[1];
  var bar = container.children(".resize-bar")[0];
  
  var isColumn = (container.data("resize-type") === "column");
  var basis = container.data("resize-basis");
  var rect = element.getBoundingClientRect();
    
  var resizable = {
    resized: false
  };
    
  var cursor;
  
  if (isColumn) {    
    cursor = "col-resize";
    TweenLite.set(bar, { xPercent: -50 });
    
  } else {    
    cursor = "row-resize";
    TweenLite.set(bar, { yPercent: -50 });
  }
    
  var draggable = new Draggable(bar, {
    cursor: cursor,
    bounds: container,    
    onDrag: resizePanels,
    onPress: setAbsolute,
    onRelease: setRelative
  });
  
  setAbsolute.call(draggable);
  resizePanels.call(draggable);
  setRelative.call(draggable);
  
  function resizePanels() {
        
    basis = (isColumn ? this.x / rect.width : this.y / rect.height) * 100;
    
    panelA.style.flexBasis = basis + "%";
    panelB.style.flexBasis = (100 - basis) + "%";    
  }
  
  function setAbsolute() {
        
    body.style.cursor = cursor;
    
    if (resizable.resized) {
      rect = element.getBoundingClientRect();
      resizable.resized = false;
    }
    
    if (isColumn) {
      TweenLite.set(bar, { left: 0, x: basis * rect.width / 100 });
    } else {
      TweenLite.set(bar, { top: 0, y: basis * rect.height / 100 });
    }
    
    this.update();
  }
  
  function setRelative() {
    
    body.style.cursor = "inherit";
    
    if (isColumn) {      
      TweenLite.set(bar, { x: 0, left: basis + "%" });      
    } else {
      TweenLite.set(bar, { y: 0, top: basis + "%" });
    }
  }
    
  return resizable;
}

function requestResize() {
  cancelAnimationFrame(requestId);
  requestId = requestAnimationFrame(resize);
}

function resize() {
  
  var total = resizables.length;
  
  for (var i = 0; i < total; i++) {
    resizables[i].resized = true;
  }
}
