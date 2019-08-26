
var scorm = pipwerks.SCORM;
var lmsConnected = false;
window.onload = function (){
    console.log("*******14******");
   initCourse();
   initForm();
 };
function handleError(msg){
  alert(msg);
  console.log("*******1******");
}
function initCourse(){
   console.log("*******2******");

  //scorm.init returns a boolean
  lmsConnected = scorm.init();

  //If the scorm.init function succeeded...
  if(lmsConnected){
   console.log("*******3******");

     //Let's get the completion status to see if the course has already been completed
     var completionstatus = scorm.get("cmi.core.lesson_status");

     //If the course has already been completed...
     if(completionstatus == "completed" || completionstatus == "passed"){
      console.log("*******4******");
        //...let's display a message and close the browser window
        handleError("You have already completed this course. You do not need to continue.");

     }
     console.log("*******5******");

     //Now let's get the username from the LMS
     var learnername = scorm.get("cmi.core.student_name");

     //If the name was successfully retrieved...
     if(learnername){  
      console.log("*******6******");
        //...let's display the username in a page element named "learnername"
        document.getElementById("learnername").innerHTML = learnername; //use the name in the form

     }

  //If the course couldn't connect to the LMS for some reason...
  } else {
   console.log("*******7******");

     //... let's alert the user then close the window.
     handleError("Error: Course could not connect with the LMS");

  }

}
function setComplete(){
   console.log("*******8******");

  //If the lmsConnection is active...
  if(lmsConnected){
   console.log("*******9*****");

     //... try setting the course status to "completed"
     var success = scorm.set("cmi.core.lesson_status", "completed");

     //If the course was successfully set to "completed"...
     if(success){
      console.log("*******10******");

        //... disconnect from the LMS, we don't need to do anything else.
        scorm.quit();

     //If the course couldn't be set to completed for some reason...
     } else {
      console.log("*******11******");

        //alert the user and close the course window
        handleError("Error: Course could not be set to complete!");

     }

  //If the course isn't connected to the LMS for some reason...
  } else {
   console.log("*******12******");

     //alert the user and close the course window
     handleError("Error: Course is not connected to the LMS");

  }

}


function initForm(){
   console.log("*******13******");
    document.getElementById("myform").innerHTML = "Thank you, your selection has been recorded. You may close this window.";
    setComplete();

    return false; 
}

