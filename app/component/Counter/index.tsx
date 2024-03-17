"use client"
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

const Counter = ({name}:{name:string})=>{
    const [getCount,setCount]=useState(0);

    const increaseCount = ()=>{
        setCount(getCount+1)
    }

    const decreaseCount = ()=>{
        if(getCount > 0){
            setCount(getCount-1);
        }
    }

    return(
        <div className="flex items-center gap-x-4">
            <input type="hidden" name={name} value={getCount} />
            <Button onClick={decreaseCount} variant="outline" size="icon" type="button"><MinusIcon className="h-4 w-4 text-primary"/></Button>
            <p className="text-lg font-medium">{getCount}</p>
            <Button onClick={increaseCount} variant="outline" size="icon" type="button"><PlusIcon className="h-4 w-4 text-primary"/></Button>
        </div>
    )
}

export default Counter;