import React from 'react';
import { useState , useEffect } from 'react';
import AddIcon from '../images/add-button.png';
import MinusIcon from '../images/minus-sign.png';
import StartIcon from '../images/round-play-button.png';
import StopIcon from '../images/stop-button.png';
import ResetIcon from '../images/reset.png';
import CoffeeIcon from '../images/coffee-cup.png';
import WorkIcon from '../images/work.png';


function Pomodoro() {
    const [minutes, setMinutes] = useState(20);

    const[seconds, setSeconds] = useState(0);

    const[timerRunning, setTimerRunning] = useState(false);

    useEffect(()=>{
        const interval = setInterval(() => {
            if(timerRunning === true){
                if(seconds === 0){
                    if(minutes !== 0){
                        setSeconds(59);
                        setMinutes(minutes - 1);
                    } else{
                        setSeconds(0);
                        setMinutes(0);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
        }}, 1000);
        return() =>{
            clearInterval(interval);
        }
    }, [timerRunning, seconds]);

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;


    //增加一分鐘
    const addMinutes = () => {
        setMinutes((prevMinutes) => prevMinutes + 1);
    };

    //減少一分鐘
    const minusMinutes = () => {
        if(minutes >= 1) {
        setMinutes((prevMinutes) => prevMinutes-1);
        }
    };

    //增加十秒鐘
    const addSeconds = () => {
        setSeconds((prevSeconds) => prevSeconds + 10);
        if(seconds >= 50) {
            setSeconds(seconds - 50);
            setMinutes(minutes + 1);
        }
        
    };

    //減少十秒鐘
    const minusSeconds = () => {  
    if (minutes > 0) {
        if (seconds > 9) {
            setSeconds(seconds - 10);
        } else {
            setSeconds(seconds + 50);
            setMinutes(minutes - 1);
        }
    } else if (minutes === 0) {
        if (seconds > 9) {
            setSeconds(seconds - 10);
        } else {
            setMinutes(0);
            setSeconds(0);
        }
    }
};


    //開始計時
    const startTimer = () =>{
        setTimerRunning(true);
    };

    //停止計時
    const stopTimer = () =>{
        setTimerRunning(false);
    };

    //重製計時時間
    const resetTimer = () =>{
        setTimerRunning(false);
        setMinutes(20);
        setSeconds(0);
    };


    //設定工作時間
    const workTimer = () =>{
        setMinutes(25);
        setSeconds(0);
    };

    //設定休息時間
    const breakTimer = () =>{
        setMinutes(5);
        setSeconds(0);
    };


    return(
        <div className="pomodoro">
            <div className="header" >
                <div className="timer">
                {timerMinutes}：{timerSeconds} 
                </div>
                <div>
                    <img src={AddIcon} className="Icon" onClick={addMinutes} />
                    <img src={MinusIcon} className="Icon" onClick={minusMinutes}/>
                    <img src={AddIcon} className="Icon" onClick={addSeconds}/>
                    <img src={MinusIcon} className="Icon" onClick={minusSeconds}/>
                </div>
            </div>
            <div className="content">
                <img src={StartIcon} className="startIcon" onClick={startTimer}/>
                <img src={StopIcon} className="stopIcon" onClick={stopTimer}/>
                <img src={ResetIcon} className="resetIcon" onClick={resetTimer}/>
            </div>
            <div className="worker">
            <img src={WorkIcon} className="workIcon" onClick={workTimer}/>Let's work！ 
            </div>
            <div className="break">
            <img src={CoffeeIcon} className="coffeeIcon" onClick={breakTimer}/> Take a break ！
            </div>
        </div>
    );
};

export default Pomodoro;