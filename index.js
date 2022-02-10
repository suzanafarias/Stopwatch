const stopwatch = document.getElementById(`time`);
const img = document.getElementById("play-stop")
const playButton = document.getElementById(`start`);
const recorderButton = document.getElementById(`laps-recorder`);


let hours = 0;
let minutes = 0;
let seconds = 0
let counting;
let lapTime;


playButton.addEventListener('click', () =>{
    if (playButton.value === 'play'){
        startStopwatch();
    }else{
        pauseStopwatch();
    }
});


const startStopwatch = () =>{
    counting = setInterval(counter,1000);

    const value = playButton.setAttribute('value', 'pause');
    img.setAttribute('src','img/pause.png');   
}

const counter = () => {
    seconds++;
    conditionals();
    stopwatch.innerHTML = `${formatedNumber(hours)}:${formatedNumber(minutes)}:${formatedNumber(seconds)}`
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

const formatedNumber = (num) =>{
    while(num < 10){
        return ('0'+num)
    }
    return num
}


const pauseStopwatch = () => {
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
    const value = playButton.setAttribute('value', 'play');
});

recorderButton.addEventListener('click', () =>{
    const ul = document.getElementById('laps-list');
    const li = document.createElement('li');
    li.innerHTML = stopwatch.innerHTML;
    ul.appendChild(li);
});





