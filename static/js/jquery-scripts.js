$('#file-upload').bind('change', function () {
   console.log('hello');
    var filename = $("#file-upload").val();
    if (/^\s*$/.test(filename)) {
       $(".file-upload").removeClass('active');
       $("#noFile").text("No file chosen...");
    }
    else {
       $(".file-upload").addClass('active');
       $("#submit").prop('disabled', false);;
       $("#noFile").text(filename.replace("C:\\fakepath\\", ""));
    }
 });
 $('#submit').bind('click', function () {
   // $("#submit").prop('disabled', true);
   $("#upload_div").removeClass("upload_div");
 });



 $('form').submit(function() {
   $(this).find("#submit").prop('disabled',true);
 });

 (function($) {

	var tabs =  $(".tabs li a");
  
	tabs.click(function() {
		var content = this.hash.replace('/','');
		tabs.removeClass("active");
		$(this).addClass("active");
    $("#content").find('div').hide();
    $(content).fadeIn(200);
	});

})(jQuery);

 