"use client"

import { createLocation } from "@/app/actions";
import CreationBottomBar from "@/app/component/CreationBottomBar";
import { userCountires } from "@/app/lib/getCountries";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useState } from "react";
import { unstable_noStore as noStore} from "next/cache";


const Adress = ({params}:{params:{id:string}})=>{
    noStore();
    const {getAllCountries}=userCountires()
    const [getLocation,setLocation]=useState("")


    const LazyMap = dynamic(()=>import('@/app/component/Map'),{
        ssr:false,
        loading:()=><Skeleton className="h-[50vh] w-full" />

    })

    return(
        <>
        <div className="w-3/5 mx-auto">
            <h1 className="text-3xl font-semibold tracking-tight mb-10">Where is your home located ?</h1>
        </div>
        <form action={createLocation}>
            <input type="hidden" name="homeId" value={params.id}/>
            <input type="hidden" name="countryValue" value={getLocation}/>
            <div className="w-3/5 mx-auto mb-36">
                <div className="mb-5">
                <Select required onValueChange={(value)=>setLocation(value)}>
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
                </div>
                <LazyMap getLocation={getLocation}/>
            </div>
            <CreationBottomBar/>
        </form>
        </>
    )
}

export default Adress;