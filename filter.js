/***************FILTERING DATA***********************/	
$(document).ready(function(){
	$("#noMatchMessage").hide();
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
						if (filter.toString() == optionList.toString()) {
							$(this).show();
							$("#noMatchMessage").hide();
						}
						
					};
						
			}); //end of .mainContent_col.each 
		};
					
	}); //and of .searchButton.click function
}); //end of document.ready