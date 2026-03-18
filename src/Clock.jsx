import { useState } from "react";
import { useEffect } from "react";

function Clock(){
    const[date, setDate] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(function(){
            setDate(new Date());
        }, 1000)
        return function(){
            clearInterval(timer);
        }
    })
    return( 
        <p>{date.toLocaleTimeString()}</p>
    );
}

export default Clock;