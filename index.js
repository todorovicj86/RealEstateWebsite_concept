	
/***************RESPONSIVE TOP MENU***********************/	

//making the responsive top menu - adding class .responsive
$("#toggle").on("click", function(){
	$("#TopNavbar").toggleClass("responsive");
	$("#header_container").toggleClass("open");
})

//adding and removing active class, for active links
$(".menuItem").click(function (){

	//remove class active from all items
	$(".menuItem").removeClass("active");
	
	//add class active to the one that is clicked 
	$(this).addClass("active");
});
		

/**************Making Modal Forms***********************/	

$(".btn").on("click", function(){
	
	if ($(this).is("#signin")){
		$("#SignIn_modal").css("display","block");
	
	} else {
		$('#LogIn_modal').css("display","block");
	}

		// when modal form is opened, the drop-down menu will collapse
		$("#TopNavbar").toggleClass("responsive");

		// when modal Sign In form is opened, class open is toggled in #header_container 
		//(size and padding restored to original values)
		$("#header_container").toggleClass("open");
})

// Get the <span> element that closes the modal
$(".close").click(function(){
	$(".modalForm_container").hide();
});

//close modal form clicking outside the form
$(".modalForm_container").click(function(event){
	if(!$(event.target).closest(".modalForm").length && !$(event.target).is(".modalForm")){
		$(".modalForm_container").hide();
	}
});

/******SLIDESHOW OF THE PICTURES**********/

var slideIndex = 1;
var z = $(".image_container");

//var z = document.getElementsByClassName("image_container");
for (i = 0; i < z.length; i++) {
    //set custom data attribute to first current image index
    z[i].setAttribute("data-currentslide", 1);
    showDivs(z[i].getAttribute("data-currentslide"), i);
}
function plusDivs(n, j) {
    //get custom data attribute value of current image index to slideshow class index j
    slideIndex = parseInt(z[j].getAttribute("data-currentslide")); //parses the string and returns an integer
    showDivs(slideIndex += n, j);
}

function showDivs(n, j) {
    var i;
    var z = document.getElementsByClassName("image_container")[j]; //represents the slideshow - collection of images, with index j. for j=0, it will give the first slideshow
	var id=z.getAttribute("id");
	//alert(id);
    var x = z.getElementsByClassName("slides");
	//alert(x.length);
    
    if (n > x.length) { //if number is larger than number of children/images
        slideIndex = 1 //returns to the first image
	
    }
    if (n < 1) { 				//in number is smaller than 1 /if we go back
        slideIndex = x.length; //returns to the last image
    }
    //set custom data attribute to current image index
    z.setAttribute("data-currentslide", slideIndex);
   
   //until number of images is smaller that the total number of images per slideshow, set them to invisible
   for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
   
    x[slideIndex - 1].style.display = "block"; //and image with one index smaller, set to visible
    
}


						
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		