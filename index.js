const stopwatch = document.getElementById(`time`);
const img = document.getElementById("play-stop")
const playButton = document.getElementById(`start`);
const recorderButton = document.getElementById(`laps-recorder`);

let hours = 0;
let minutes = 0;
let seconds = 0
let counting;
let errorStatus = false;

const errorDisplayOn = () => {
    const error= document.getElementById(`error-menssage`);
    error.style.display = 'inline-block';
};

const errorDisplayOff = () => {
    const error= document.getElementById(`error-menssage`);
    error.style.display = 'none';
};

playButton.addEventListener('click', () => {   
    errorDisplayOff();

    if (playButton.value === 'play'){
        startStopwatch();
    }else{
       pauseStopwatch();
    };
    errorStatus = false;
});
 
const startStopwatch = () => {
   const tags = document.querySelectorAll('li');

   counting = setInterval(counter,1000);
   const value = playButton.setAttribute('value', 'pause');
   img.setAttribute('src','img/pause.png');
   stopwatch.setAttribute('value', `${tags.length+1}` );
};
 
const counter = () => {
   seconds++;
   conditionals();
   stopwatch.innerHTML = `${formatedNumber(hours)}:${formatedNumber(minutes)}:${formatedNumber(seconds)}`;
};
 
const conditionals = () => {
   if(seconds == 60){
       minutes++ ;
       seconds = 0;
   }if(minutes == 60){
       hours++;
       minutes = 0;
       seconds = 0;
   };
};
 
const formatedNumber = (num) => {
   while(num < 10){
       return ('0'+num)
   };
   return num;
};
  
const pauseStopwatch = () => {
   errorDisplayOff();
   clearInterval(counting);
 
   img.setAttribute('src','img/play.png');
   const value = playButton.setAttribute('value', 'play'); 
};
 
const restartButton = document.getElementById(`restart`);
restartButton.addEventListener('click', () => {
   clearInterval(counting);
   stopwatch.innerHTML =`00:00:00`;
  
   hours = 0;
   minutes = 0;
   seconds = 0;
  
   img.setAttribute('src','img/play.png');
   playButton.setAttribute('value', 'play');
   errorDisplayOff();
});

let totalTags = [];
let stopValue = stopwatch.getAttribute('value');

recorderButton.addEventListener('click', () => {  
    lapError(stopwatch.innerHTML);
    LapRecordError();
    
    let tags = document.querySelectorAll('li');
    let ul = document.getElementById(`laps-list`); 
    let li = document.createElement('li');
    let id = 0;
    
    //if there is no error, a new li with a new value will be created.
    if(errorStatus == false){
        li.innerHTML = stopwatch.innerHTML;
        ul.appendChild(li);
        li.setAttribute('value', id);
        totalTags.push(li);  
    };

    for(let id = 1; id <= tags.length; id++){
        li.setAttribute('value', id);
    };

   stopwatch.setAttribute('value', totalTags.length+1); 
});

const lapError = (stopwatch) => {
    if (stopwatch == '00:00:00'){
        recorderButton.removeEventListener('click', () => {})
        errorStatus = true;
        errorDisplayOn();
    };
};

const LapRecordError = () => {
    var stopwatchValue = stopwatch.getAttribute('value');
    var ul = document.getElementById(`laps-list`); 

    if((ul.lastChild.innerHTML == stopwatch.innerHTML) && (stopwatchValue == ul.lastChild.value +1) ){
     recorderButton.removeEventListener('click', () => {})
        errorStatus = true;
        errorDisplayOn();
    };
};