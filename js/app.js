// Problem: User interaction doesn't provide desired results.
//Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); //incomplete tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed tasks

//New task list item
var createNewTaskElement = function(taskString){
  //Create list Item
  var listItem = document.createElement("li");
  // Input (checkbox)
  var checkBox = document.createElement("input"); //checkbox
    // label
  var label = document.createElement("label");
    // input (text)
  var editInput = document.createElement("input"); //text
    // button.edit
  var editButton = document.createElement("button");
    // button.delete
  var deleteButton = document.createElement("button");
    // Each element needs modifiying
    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;
  //Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem
}
// Add a new task
var addTask = function(){
  console.log("Add task..");
  // Create a new list item with the text from #new-task:
 var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTasksHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

// Edit an existing task
var editTask = function (){
    console.log("Edit task..");
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");

    var containsClass = listItem.classList.contains("editMode");
    // if the class of the parent is .editMode
    if (containsClass){
      //Switch from .editMode
      // Label text become the input's value
      label.innerText = editInput.value;
    }else{
        // Switch to .editMode
        // input value become s the label's text
      editInput.value = label.innerText;
    }
    // toggle .editMode on the list item
    listItem.classList.toggle("editMode");
}
// Delete an existing task
var deleteTask = function(){
    console.log("Delete task..");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  // Remove the parent list item from the unordered list
  ul.removeChild(listItem);

}
// Mark a task as complete
var taskCompleted = function(){
    console.log("Completed task..");
    // Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}
// Mark a task as incomplete
var taskIncomplete = function(){
    console.log("Incomplete task..");
  // When the checkbox is unchecked
   //Append the task list item to the #incomplete-tasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("Bind list item events");
  // select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    //Bind editTask to editButton
    editButton.onclick = editTask;
    //bind deleteTask to the deleteButton
    deleteButton.onclick = deleteTask;
    //Bind checkBoxEventHandler to the checkbox
    checkBox.onchange = checkBoxEventHandler;
}

  var ajaxRequest = function(){
    console.log("AJAX request");
  }
//Set the click handler to the addTask function

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


// Cycle over incompleteTaskHolder ul list items
for(var i = 0; i < incompleteTaskHolder.children.length; i ++){
    // bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
// Cycle over completeTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i ++){
   // bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
