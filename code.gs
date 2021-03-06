// DO NOT UPDATE FORM THROUGH GOOGLE FORMS, ONLY GOOGLE SHEET!
var Question1 = [{title:"INSERT TITLE", sheet:"INSERT SHEET NAME", range: "RANGE IN A1 NOTATION", formID: "INSERT FORM ID"}]
// You can add more questions here

// Triggers form to update on edit (Go to Edit -> Current project's triggers)
function SpreadsheetEditTrigger() {
  updateQuestion(Question1);
}


// Updates Google Form
function updateListChoices(item, sheetName, range){
  var data = (SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).getRange(range).getValues());
  var choices = [];
  
  // If you want the column to have a header, make i = 0 to i = 1
  for (var i = 1; i < data.length; i+=1){
    if(data[i][0] != "") 
      choices.push(item.createChoice(data[i][0]));
  }
  
  if(choices.length != 0)
     item.setChoices(choices);
}

// Recieves Data from Google Form 
function updateQuestion(Question) {
  var form = FormApp.openById(Question.formID);
  var items = form.getItems();
  
  for (var i = 0; i < items.length; i += 1){
    var item = items[i]
    if (item.getTitle() === Question.title){
      updateListChoices(item.asListItem(), Question.sheet, Question.range);
      break;
    }
  }
}

