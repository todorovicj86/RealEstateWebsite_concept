	
/***************RESPONSIVE TOP MENU***********************/	

//making the responsive top menu - adding class .responsive
document.getElementById("toggle").onclick = function (){
	  var x = document.getElementById("TopNavbar");
	 
	  if (x.className === "menu") {
			x.className += " responsive";
	  } else {
			x.className = "menu";
	  }
	  $("#header_container").toggleClass("open");
}

//adding and removing active class, for active links
$(".menuItem").click(function (){

	//remove class active from all items
	$(".menuItem").removeClass("active");
	
	//add class active to the one that is clicked 
	$(this).addClass("active");
});
		

/***************FILTERING DATA***********************/	
$(document).ready(function(){
	
	//adding function when button search is clicked
	$(".searchButton").click(function(){
		
		$(".mainContent_col").hide(); //hide all the cards, once search button is clicked 
		
		var optionList =[]; //an empty array to store all selected options, when selected
		
		//creating function to detect which options are selected, based on the value
		$("select").children("option:selected").each(function(){
		
			//taking the value of selected options
			var category =$(this).val();
			
			//creating the array of selected values, plus it reserves the space for all other options, even if they are not selected
			optionList.push(category);
			
			//removing empty elements from an array
			optionList = optionList.filter(v=>v!=''); 
		}); //end of $("select").children("option:selected").each
		
		//console.log(optionList);
		//console.log (optionList.length);
	
		//if nothing is selected, all the cards/offers, will be shown
		if (optionList.length == 0){
			$(".mainContent_col").show(); 
		}else{
			//if something is selected, making function to find and match the filters
				$(".mainContent_col").each(function(){ //going trough all possible offers, with class name .mainContent_col
					
					//taking the data-tag of all offers/card
					var item = $(this).attr("data-tag");
					
					//splitting the data-tag into words and creating the array
					var splitWords = item.split(" ");
					
					console.log(splitWords);
					console.log(splitWords[6]);
					
					
					var minSize = $("#size_min").val();
					var maxSize = $("#size_max").val();
					var minPrice = $("#price_min").val();
					var maxPrice = $("#price_max").val();
					
					if( ((splitWords[6] >= minSize &&  splitWords[6] <= maxSize) && (splitWords[7] >= minPrice &&  splitWords[7] <= maxPrice)) || ((splitWords[6] >= minSize &&  splitWords[6] <= maxSize) && (minPrice == "" && maxPrice == ""))
						|| ((minSize == "" && maxSize == "") && (splitWords[7] >= minPrice &&  splitWords[7] <= maxPrice)) ){
							//$(this).show();
							//console.log(splitWords[6]);
							//alert("Match! " + $(this).attr("id"));
						
						//removing the empty places
						var splitWordsFil = splitWords.filter(v=>v!='');
						//console.log(splitWords);
						
						//making an array of elements that match from data-tag (splitWords) and from selected options (optionList)
						filter = splitWordsFil.filter(f => optionList.includes(f));
						//console.log(filter);
						
						//if filtered array is the same as selected options, then show only those cards/offers
						if ( filter.toString() == optionList.toString()) {
							$(this).show();
						}//else {
							//alert("No match to your criteria! Try again with new filters!");
							//$("#noMatchMessage").html("No match to your criteria! Try again with new filters!");
						// 	//
						//};
					} else if((minSize == "" && maxSize == "") && (minPrice == "" && maxPrice == "")){
						//alert("No input");
						
						//removing the empty places
						var splitWordsFil = splitWords.filter(v=>v!='');
						//console.log(splitWords);
						
						//making an array of elements that match from data-tag (splitWords) and from selected options (optionList)
						filter = splitWordsFil.filter(f => optionList.includes(f));
						//console.log(filter);
						
						//if filtered array is the same as selected options, then show only those cards/offers
						if ( filter.toString() == optionList.toString()) {
							$(this).show();
						}else {
							//alert("No match to your criteria! Try again with new filters!");
							$("#noMatchMessage").html("We are sorry! There is no property with current criteria! Please try again with new selections!");
							
						};
					};
						
			}); //end of .mainContent_col.each 
		};
					
	}); //and of .searchButton.click function
}); //end of document.ready
	

/**************Making Modal Forms***********************/	

//get the button to open the modal form
$("#signin").click(function (){
	$("#SignIn_modal").css("display","block");
	
	if ($('#LogIn_modal').css("display","block")){
		$("#LogIn_modal").css("display","none");
	}
	// when modal Sign In form is opened, the dropdown menu will collapse
	$("#TopNavbar").toggleClass("responsive");

	// when modal Sign In form is opened, class open is toggled in #header_container 
	//(size and padding restored to original values)
	$("#header_container").toggleClass("open");	

});

$("#login").click(function (){
	$("#LogIn_modal").css("display","block");

	if ($('#SignIn_modal').css("display","block")){
		$("#SignIn_modal").css("display","none");
	}

	//when modal Logn In form is opened, the dropdown menu will collapse
	$("#TopNavbar").toggleClass("responsive");

	//when modal Logn In form is opened, class open is toggled in #header_container 
	//(size and padding restored to original values)
	$("#header_container").toggleClass("open");


});


// Get the <span> element that closes the modal
$(".close").click(function(){
	$("#SignIn_modal").css("display","none");
	$("#LogIn_modal").css("display","none");
});

// When the user clicks anywhere outside of the modal, close it
$("#header_container, #main_container, #service_container, #footer_container").click(function(){
	if ($('#SignIn_modal').css("display","block") || $('#LogIn_modal').css("display","block")) {
		$("#SignIn_modal").css("display","none");
		$("#LogIn_modal").css("display","none");
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
    slideIndex = parseInt(z[j].getAttribute("data-currentslide")); //parses (rasclanjuje) the string and returns an intiger
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


						
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		