/**
 * This function references the "TENTATIVE-Version2" sheet of the "NAHS 24-25 Student Transition Notes" spreadsheet and creates a map of student IDs to student data.
 *
 * @see loadTentativeData.js
 * @returns {allStudentsMap1} A map where the key is the Student ID the values are an object containing student data from the rows in TENTATIVE.
 */
function getStudentsFromTENTATIVESheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TENTATIVE-Version2");
  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  var allStudentsMap1 = new Map();

  for (var i = 1; i < data.length; i++) {
    var studentId = data[i][headers.indexOf("STUDENT ID")];

    // Create an object to hold the student's data
    var studentData = {};
    for (var j = 0; j < headers.length; j++) {
      studentData[headers[j]] = data[i][j];
    }

    // If the student ID already exists, push the new studentData into the array
    if (allStudentsMap1.has(studentId)) {
      allStudentsMap1.get(studentId).push(studentData);
    } else {
      // Otherwise, create a new array with the studentData
      allStudentsMap1.set(studentId, [studentData]);
    }
  }

  // Logger.log("TENTATIVE Data: " + JSON.stringify([...allStudentsMap1]));
  return allStudentsMap1;
}

