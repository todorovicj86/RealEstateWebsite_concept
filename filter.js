/***************FILTERING DATA***********************/	
// object of properties
var data = {
    "apartment": [
        {
            id:        "code_1",
            rent_buy:   "rent",
            property:   "apart",
            structure:  "2_br",
            LocAtions:  "loc1",
            equip:      "equip_yes",
            size:       "52",
            price:      "350"
        },

        {
            id:        "code_3",
            rent_buy:   "buy",
            property:   "apart",
            structure:  "3_br",
            LocAtions:  "loc3",
            equip:      "equip_yes",
            size:       "70",
            price:      "80000"
        },
        {
            id:        "code_5",
            rent_buy:   "rent",
            property:   "apart",
            structure:  "2_br",
            LocAtions:  "loc4",
            equip:      "equip_yes",
            size:       "72",
            price:      "450"
        },
        {
            id:        "code_6",
            rent_buy:   "rent",
            property:   "apart",
            structure:  "stud",
            LocAtions:  "loc4",
            equip:      "equip_yes",
            size:       "30",
            price:      "100"
        },
        {
            id:        "code_7",
            rent_buy:   "rent",
            property:   "apart",
            structure:  "4_br",
            LocAtions:  "loc5",
            equip:      "equip_no",
            size:       "100",
            price:      "650"
		},
		{
            id:        "code_10",
            rent_buy:   "buy",
            property:   "apart",
            structure:  "1_br",
            LocAtions:  "loc2",
            equip:      "equip_no",
            size:       "26",
            price:      "30000"
        }
    ],
    "house": [
		{
            id:        "code_2",
            rent_buy:   "buy",
            property:   "house",
            structure:  "stud",
            LocAtions:  "loc3",
            equip:      "equip_no",
            size:       "30",
            price:      "35000"
        },
        {
            id:        "code_4",
            rent_buy:   "rent",
            property:   "house",
            structure:  "4_br",
            LocAtions:  "loc5",
            equip:      "equip_yes",
            size:       "100",
            price:      "650"
		},
		{
            id:        "code_8",
            rent_buy:   "rent",
            property:   "house",
            structure:  "1_br",
            LocAtions:  "loc2",
            equip:      "equip_yes",
            size:       "36",
            price:      "120"
		},
		{
            id:        "code_9",
            rent_buy:   "buy",
            property:   "house",
            structure:  "2_br",
            LocAtions:  "loc1",
            equip:      "equip_no",
            size:       "120",
            price:      "50000"
		},
		{
            id:        "code_11",
            rent_buy:   "buy",
            property:   "house",
            structure:  "4_br",
            LocAtions:  "loc4",
            equip:      "equip_no",
            size:       "200",
            price:      "75000"
        }
	]
}


$(document).ready(function(){

    var house = data.house,
        app   = data.apartment,
        loc   = ["loc1", "loc2", "loc3", "loc4", "loc5"],
        room  = ["stud", "1_br", "2_br", "3_br", "4_br"];
    
    // add click event to .searchButton
    $(".searchButton").on("click", function(){

        // when click on button, show all properties
        $(".mainContent_col").show();
         
        var minPrice = Number($("#price_min").val()),
            maxPrice = Number($("#price_max").val()),
            minSize  = Number($("#size_min").val()),
            maxSize  = Number($("#size_max").val());

        // filter data by criteria from drop-down options
        filterAllData(house, app); 
        
        // filter data by price - from input 
        filterRange(house, "price", minPrice, maxPrice);
        filterRange(app,   "price", minPrice, maxPrice);

        // filter data by size - from input
        filterRange(house, "size", minSize, maxSize); 
        filterRange(app,   "size", minSize, maxSize);

        var displayArray=[];
        // check the display value for each property/card
        $(".mainContent_col").each(function(){
            // takes the value of display
            var disp = $(this).css("display");
            // make an array of display's values for each property
            displayArray.push(disp);
        });
        
        // check if every element in an array is the same value "none" 
        if(displayArray.every(allEqual)){
            // if true, show the message -  no property with desired criteria
            $("#noMatchMessage").removeClass("hide");
        }else {
            // else, hide the message
            $("#noMatchMessage").addClass("hide");
        }
      
    });

// resetting the search option to an initial state
$(".resetButton").click(function(){

    // when click on button, show all properties
    $(".mainContent_col").show();

    // sets all the selected values to the first option  - value = ""
    $("#quickSideNavbar select").each(function(){
       $(this).val("");
    });
     
     // reset input fields
     $(".limit_input").each(function(){
        $(this).val("");
     });

})

    // function to return true if str is equal to "none"
    function allEqual(str){
        return str === "none";
    }

    // function to filter data by size and by price - from input options
    function filterRange(array, range, min, max){
        array.forEach(function(el){
            if(min === 0 || max === 0){
                return false;
            };
            if(range === "size"){
                if(!(el.size >= min && el.size <= max)){
                    $("#"+el.id).hide();
                }  
            }else if(range === "price"){
                if(!(el.price >= min && el.price <= max)){
                    $("#"+el.id).hide();
                }
            }
        });
    }
    
    //filter by all categories from drop-down options
    function filterAllData(array1, array2){

        $("#quickSearch select, #quickSideNavbar select").each(function(){

             // filter for rent or for sale
             if($(this).val() === "rent"){
                filterData(array1, "rent_buy", "rent");
                filterData(array2, "rent_buy", "rent");
            }else if($(this).val() === "buy"){
                filterData(array1, "rent_buy", "buy");
                filterData(array2,  "rent_buy", "buy");
            }
            
            //filter by property
            if ($(this).val() === "apart"){
                array1.forEach(function(item){
                    $('#'+item.id).hide();
                });
                
            }else if ($(this).val() === "house"){
                array2.forEach(function(item){
                    $('#'+item.id).hide();
                });
            }

                            
            // Filter by structure
            for(var i = 0; i < room.length; i++){
                if($(this).val() === room[i]){
                    filterData(array1, "structure", room[i]);
                    filterData(array2, "structure", room[i]);

                }
            }

            // //filter by location
            for(var i = 0; i < loc.length; i++){
                if($(this).val() === loc[i]){
                    filterData(array1, "LocAtions", loc[i]);
                    filterData(array2, "LocAtions", loc[i]);
                }
            }
        
            // filter by equip
            if($(this).val() === "equip_yes"){
                filterData(array1, "equip", "equip_yes");
                filterData(array2, "equip", "equip_yes");
            }else if($(this).val() === "equip_no"){
                filterData(array1, "equip", "equip_no");
                filterData(array2,  "equip", "equip_no");
            }
            
        }).change();

    } 

    // function to filter data by different categories
    function filterData(array, key, str){
        // search each object from an array
        for(var i = 0; i < array.length; i++){

            // for each property from an object (array[i]) of an array
            for(var j =0; j < Object.keys(array[i]).length; j++){

                //the key of an object
                var property = Object.keys(array[i])[j];
                // the value of a key, from an object
                var values = Object.values(array[i])[j];

                // if the key word from an argument is equal to an object property/key
                if (property === key){
                    // check if its value is (not) equal to the str from an argument of a function
                    if(values !== str){
                        $("#" + array[i].id).hide();
                    }
                }
            }
             
        }
    };
});





