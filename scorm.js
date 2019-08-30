//https://documentation.skillsoft.com/en_us/ccps/custom_content_authoring_guidelines/scorm_1.2_authoring_guide/pub_scorm_1.2_data_model_support.htm
//above is the link that lists


var clicks = 0;
function onClick() {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    scorm.set("cmi.core.lesson_location", "location :" + clicks);
    scorm.save();
    scorm.get("cmi.core.lesson_location");

};

var scorm = pipwerks.SCORM;  //Shortcut
var lmsConnected = false;


function handleError(msg){
alert(msg);


}

// pipwerks.SCORM.attachLMSAPIToWindow();



function initCourse(){

//scorm.init returns a boolean
lmsConnected = scorm.init();

//If the scorm.init function succeeded...
if(lmsConnected){

  //Let's get the completion status to see if the course has already been completed
  var completionstatus = scorm.get("cmi.core.lesson_status");
  
  //If the course has already been completed...
  if(completionstatus === "completed" || completionstatus === "passed"){
  
     //...let's display a message and close the browser window
     handleError("You have already completed this course. You do not need to continue.");
  
  }

  //Now let's get the username from the LMS
  var learnername = scorm.get("cmi.core.student_name");

  //If the name was successfully retrieved...
  if(learnername){  
  
     //...let's display the username in a page element named "learnername"
     document.getElementById("learnername").innerHTML = learnername; //use the name in the form
  
  }

//If the course couldn't connect to the LMS for some reason...
} else {

  //... let's alert the user then close the window.
  handleError("Error: Course could not connect with the LMS");

}

}


function setComplete(){

//If the lmsConnection is active...
if(lmsConnected){

  //... try setting the course status to "completed"
  var success = scorm.set("cmi.core.lesson_status", "completed");
  
  //If the course was successfully set to "completed"...
  if(success){
  
     //... disconnect from the LMS, we don't need to do anything else.
     scorm.quit();
  
  //If the course couldn't be set to completed for some reason...
  } else {

     //alert the user and close the course window
     handleError("Error: Course could not be set to complete!");

  }

//If the course isn't connected to the LMS for some reason...
} else {

  //alert the user and close the course window
  handleError("Error: Course is not connected to the LMS");

}

}


function initForm(){

document.getElementById("myform").onsubmit = function (){

this.innerHTML = "Thank you, your selection has been recorded. You may close this window.";

setComplete();

return false; // This prevents the browser from trying to post the form results

}

}

// function addValue(){
//   var ele = document.getElementsByName('name'); 
              
//   for(i = 0; i < ele.length; i++) { 
//       if(ele[i].checked) 
//       document.getElementById("result").innerHTML
//               = "Version: "+ele[i].value;
//               console.log("value", ele[i].value);
//               var val = ele[i].value;
//   };
//  if(val == "1.2"){
//    console.log("correct answer")
//  }else{
//    console.log("incorrect")
//  }
//   
  
// }
function displayRadioValue() { 
  var ele = document.getElementsByName('version'); 
    
  for(i = 0; i < ele.length; i++) { 
      if(ele[i].checked) {
      
              console.log("Version: "+ele[i].value); 
              

              var val = ele[i].value;
              console.log(val)
      }
      var point=  document.getElementById("points").innerHTML;
      if(val == "1.2"){
           console.log("correct answer");
           document.getElementById("result").innerHTML= "Passed";
           document.getElementById("points").innerHTML= "100";
           scorm.set("cmi.interactions.n.result", "correct");
        
         }else{
           console.log("incorrect");
           document.getElementById("result").innerHTML= "Failed";

           document.getElementById("points").innerHTML= "-100";        
           scorm.set("cmi.interactions.n.result", "wrong") ;
          }

  } 
  var assessmentScore = 0.0;
var emptyString = "";
scorm.set("cmi.core.score.raw",point);
var minScore= scorm.set("cmi.core.score.min","-100");
var maxScore= scorm.set("cmi.core.score.max","100");
console.log("points",point);
console.log("minScore",minScore);
console.log("maxScore",maxScore);

if(point == "-100"){
  console.log("failed")
}else if(point == "100"){
  console.log("passed");
}else {
  console.log("Error in getting score")
}

var scoScore = scorm.get("cmi.core.score.raw");
if (scoScore != emptyString) {
    // Not first time in SCO
    var stringScore = scorm.get("cmi.core.score.raw");
    assessmentScore = stringScore.valueOf();
} 
scorm.get("cmi.interactions.0.correct_responses._count");
  scorm.set("cmi.interactions.0.id", "quize1");
  scorm.set("cmi.interactions.0.type", "choice");
  scorm.save()
  scorm.get("cmi.student_data.mastery_score")
} 





window.onload = function (){

initCourse();
initForm();

}

