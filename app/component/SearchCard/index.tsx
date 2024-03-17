"use client"

import { userCountires } from "@/app/lib/getCountries";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import {  useState } from "react";
import HomeMap from "../HomeMap";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "../SubmitButtons";
import { Card, CardHeader } from "@/components/ui/card";
import Counter from "../Counter";

const SearchCard = ()=>{
    const [step,setStep]=useState(1)

    const [location,setLocation]=useState("")

    const {getAllCountries}=userCountires()

    function SubmitButtonToNext (){
        if(step === 1){
            return(
                <Button type="button" onClick={()=>setStep(step+1)}>Next</Button>
            )
        }else if(step ===2){
            return <SubmitButton/>
        }
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <div className="rounded-full py-2 px-5 flex items-center cursor-pointer">
                    <div className="flex h-full divide-x font-medium">
                        <p className="px-4">Any Where</p>
                        <p className="px-4">Any Week</p>
                        <p className="px-4">Any Guests</p>
                    </div>
                    <Search className="bg-primary text-white rounded-full p-1 h-8 w-8"/>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form className="gap-4 flex flex-col">
                    <input type="hidden" name="country" value={location}/>
                    {step === 1 ? (
                        <>
                        <DialogHeader>
                            <DialogTitle>
                                Select a Country
                            </DialogTitle>
                            <DialogDescription>
                                Please choose a Country...
                            </DialogDescription>
                        </DialogHeader>
                        <Select required onValueChange={(value)=>setLocation(value)} value={location}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="select a Country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>
                                Countries
                            </SelectLabel>
                            {getAllCountries().map((item)=>(
                                <SelectItem key={item.value} value={item.value}>
                                    {item.flag} {item.label} / {item.region}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <HomeMap locationValue={location}/>
                        </>
                    ):(
                        <>
                         <DialogHeader>
                            <DialogTitle>
                                Select all the info you need
                            </DialogTitle>
                            <DialogDescription>
                                Please choose a Country...
                            </DialogDescription>
                        </DialogHeader>
                        <Card>
            <CardHeader className="flex flex-col gap-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="underline font-medium">Guests</h1>
                        <p className="text-muted-foreground text-sm">How many guests do you want</p>
                    </div>
                    <Counter name="guest"/>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="underline font-medium">Rooms</h1>
                        <p className="text-muted-foreground text-sm">How many rooms do you have?</p>
                    </div>
                    <Counter name="room"/>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="underline font-medium">Bathrooms</h1>
                        <p className="text-muted-foreground text-sm">How many bathrooms do you have?</p>
                    </div>
                    <Counter name="bathroom"/>
                </div>
            </CardHeader>
          </Card>
                        </>
                    )}
                    <DialogFooter>
                    <SubmitButtonToNext/>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SearchCard;