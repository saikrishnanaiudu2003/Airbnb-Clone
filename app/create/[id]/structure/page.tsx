"use client"

import { createCategoryPage } from "@/app/actions";
import CreationBottomBar from "@/app/component/CreationBottomBar";
import SelectedItem from "@/app/component/SelectedItem";
import { Button } from "@/components/ui/button";
import { unstable_noStore as noStore} from "next/cache";


const Structure = ({params}:{params:{id:string}})=>{
    noStore();
    
    return(
        <>
        <div className="w-3/5 mx-auto">
            <h1 className="text-3xl font-semibold tracking-tight transition-colors">Which of these best describe your Home!</h1>
        </div>
        <form action={createCategoryPage}>
            <input type="hidden" name="homeId" value={params.id}/>
            <SelectedItem/>
            <CreationBottomBar/>
        </form>
        </>
    )
}

export default Structure;