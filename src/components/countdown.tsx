"use client"
import { useState, useRef, useEffect, ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Countdown(){
    const [duration, Setduration] =useState<number | string>("");
    const [timeLeft, SettimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false); 
    const timerRef = useRef <NodeJS.Timeout | null >(null);
   
    const handleSetDuration =(): void =>{
        if(typeof duration === "number" && duration >0 ){
            SettimeLeft(duration);
            setIsActive(false)
            setIsPaused(false)
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    };
   

    const handleStart=():void =>{
        if(timeLeft >0){
            setIsActive(true);
            setIsPaused(false);

        }
    };

    const handlePaused=():void =>{
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    };

  
    const handleReset=():void =>{
        setIsActive(false)
        setIsPaused(false)
        SettimeLeft(typeof duration === "number"? duration : 0 );
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    };
   
    useEffect(()=>{
        if(isActive && !isPaused){
            timerRef.current = setInterval(()=>{
                SettimeLeft((prevTime)=>{
                    if(prevTime <= 1){
                        clearInterval(timerRef.current!);
                    return 0;
                }
                    return prevTime -1; 
                });
            },1000);
        }
        return()=>{
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        };
    },[isActive,isPaused]);

    const formatTime =(time: number): string => {
        const minutes = Math.floor(time/60);
        const seconds = time % 60 
        return `${String(minutes).padStart(2,"0")}: ${String(seconds).padStart(2,"0")}`
    } 
    
    const handleDurationChange =(e: ChangeEvent<HTMLInputElement>):void => Setduration(Number(e.target.value) || "");

    // frontend
    return(
        <div className="flex flex-col justify-center items-center h-screen bg-slate-100 dark:bg-slate-900 ">
            
            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">Counter Timer</h1>

            <div className="flex items-center mb-6">
                <input type="number" id="duration" placeholder="Enter Duration in seconds" value={duration} onChange={handleDurationChange} 
                className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200" />
                
                <button onClick={handleSetDuration}
                className="text-gray-800 dark:bg-gray-200 border-2 px-2">Set
                </button>
            </div>

            <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
                {formatTime(timeLeft)}
            </div>

            <div className="flex justify-center gap-4">
                <button onClick={handleStart} className="text-gray-800 dark:text-gray-200 border-2 px-2">
                    {isPaused ? "Resume" : "Start" }
                </button>

                <button onClick={handlePaused} 
                className="text-gray-800 dark:text-gray-200 border-2 px-2">Pause</button>

                <button onClick={handleReset} className="text-gray-800 dark:text-gray-200 border-2 px-2">Reset</button>
            </div>
            </div>
        </div>
    )
}

