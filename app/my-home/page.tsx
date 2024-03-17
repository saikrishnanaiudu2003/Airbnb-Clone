import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import NoHomesCard from "../component/NoHomesCard";
import ListingCard from "../component/ListingCard";
import { it } from "node:test";

async function getData(userId:string) {
    const data = await prisma.home.findMany({
        where:{
            userId:userId,
            addCategory:true,
            addDescription:true,
            addLocation:true
        },
        select:{
            id:true,
            country:true,
            photo:true,
            description:true,
            price:true,
            Favourite:{
                where:{
                    userId:userId
                }
            }
        },
        orderBy:{
            createdAT:"desc"
        }
    })

    return data
}




const MyHome = async ()=>{
    const {getUser}=getKindeServerSession()
    const user = await getUser()
    if(!user){
        return redirect("/")
    }
    const data = await getData(user?.id)
    return(
        <section className="container mx-auto mt-10 px-5 lg:px-10">
            <h1 className="text-3xl font-semibold tracking-tight">Your Homes</h1>
            {data.length ===0 ? (
                <NoHomesCard/>
            ):(
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
                    {data.map((item)=>(
                        <ListingCard key={item.id} imagePath={item.photo as string} price={item.price as number} description={item.description as string} location={item.country as string} userId={user.id}
                        pathName="/my-home" isInFavouiteList={(item.Favourite.length)>0 ? true : false} favouriteId={item.Favourite[0]?.id} homeId={item.id}/>
                    ))}
                </div>
            )}
        </section>
    )
}

export default MyHome;