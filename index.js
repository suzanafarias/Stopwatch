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
}

const errorDisplayOff = () => {
    const error= document.getElementById(`error-menssage`);
    error.style.display = 'none';
}

playButton.addEventListener('click', () => {   
    errorDisplayOff();

    if (playButton.value === 'play'){
        startStopwatch();
    }else{
       pauseStopwatch();
    }
    errorStatus = false;
})
 
const startStopwatch = () => {
   const tags = document.querySelectorAll('li');

   counting = setInterval(counter,1000);
   const value = playButton.setAttribute('value', 'pause');
   img.setAttribute('src','img/pause.png');
   stopwatch.setAttribute('value', `${tags.length}` );
}
 
const counter = () => {
   seconds++;
   conditionals();
   stopwatch.innerHTML = `${formatedNumber(hours)}:${formatedNumber(minutes)}:${formatedNumber(seconds)}`;
} 
 
const conditionals = () => {
   if(seconds == 60){
       minutes++ ;
       seconds = 0;
   }if(minutes == 60){
       hours++;
       minutes = 0;
       seconds = 0;
   }
}
 
const formatedNumber = (num) => {
   while(num < 10){
       return ('0'+num)
   }
   return num
}
  
const pauseStopwatch = () => {
   errorDisplayOff();
   clearInterval(counting);
 
   img.setAttribute('src','img/play.png');
   const value = playButton.setAttribute('value', 'play'); 
}
 
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
})

let totalTags = [];

recorderButton.addEventListener('click', () => {
    pauseStopwatch();
    findError(stopwatch.innerHTML);
    LapRecordError();

    var tags = document.querySelectorAll('li');
    var ul = document.getElementById(`laps-list`); 
    //var ulValue =ul.getAttribute('value');
    var li = document.createElement('li');
    var id = 0;
    var errorElement;


    if(errorStatus == false){
        li.innerHTML = stopwatch.innerHTML;
        ul.appendChild(li);
        li.setAttribute('value', id);
        totalTags.push(li);  

    }

    for(let id = 1; id <= tags.length; id++){
        li.setAttribute('value', id);
    }

    stopwatch.setAttribute('value', totalTags.length);   
})

const findError = (stopwatch) => {
    if (stopwatch == '00:00:00'){
        recorderButton.removeEventListener('click', () => {})
        errorStatus = true;
        errorDisplayOn();
    }
}

const LapRecordError = () => {
    const stopwatchValue = stopwatch.getAttribute('value');

    if(stopwatchValue == totalTags.length){
        recorderButton.removeEventListener('click', () => {})
        errorStatus = true;
        errorDisplayOn();
    }
}
