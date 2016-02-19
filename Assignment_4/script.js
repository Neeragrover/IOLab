
// Function to add items to the to-do list
$(document).ready(
	$("#new-to-do-item").on('click', function(){
		var userInput = $("#to-do-item-input").val();	

		$("#to-do-list").prepend("<ul><button>Done</button>"+userInput+"</ul>")

		$("#to-do-item-input").val('');
		$("#to-do-item-input").focus();
		
	})
	);

//Function to move done items to completed list
$("#to-do-list").on('click',"button",function(){
	var completedItem = $(this).parent();

	completedItem.removeClass("to-do-list-item");
	completedItem.addClass("completed-item");
//	completedItem.children().html("Add To-do");
	$(this).html("Add To-do")


	
	$("#completed-items-list").prepend(completedItem);
	
})
//function to move items from completed list back to to-do list 
$("#completed-items-list").on('click',"button",function(){
	var incompleteItem = $(this).parent();

	incompleteItem.removeClass("completed-item");
	incompleteItem.addClass("to-do-list-item");
//	completedItem.children().html("Add To-do");
	$(this).html("Done")
		
	$("#to-do-list").prepend(incompleteItem);
	
})

	
	