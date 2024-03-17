/* eslint-disable @next/next/no-img-element */
import { selectReservation } from "@/app/actions";
import Calander from "@/app/component/Calander";
import CategoryShowCase from "@/app/component/CategoryShowCase";
import HomeMap from "@/app/component/HomeMap";
import { CreateReservation } from "@/app/component/SubmitButtons";
import prisma from "@/app/lib/db";
import { userCountires } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function getData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      price: true,
      guests: true,
      bathrooms: true,
      bedrooms: true,
      title: true,
      categoryName: true,
      country: true,
      Reservation: {
        where: {
          homeId: homeId,
        },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}

const HomeRoute = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(params.id);
  const { getAllCountryByValue } = userCountires();
  const country = getAllCountryByValue(data?.country as string);
  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          src={`https://njrphcljikywpjkyplcd.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          alt="image of home"
          className="rounded-lg w-full object-cover h-full"
        />
      </div>
      <div className="flex justify-between gap-x-8 mt-8">
        <div className="w-2/3">
          <h1 className="text-xl font-medium ">
            {country?.flag} {country?.label} / {country?.region}
          </h1>
          <div className="flex gap-x-2 text-foreground">
            <p>{data?.guests}</p> Guests * <p>{data?.bedrooms}</p> Bedrooms *{" "}
            <p>{data?.bathrooms}</p> Bathrooms
          </div>
          <div className="flex items-center mt-6 ">
            <img
              src={data?.User?.profileImage as string}
              alt="profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h1 className="font-medium">
                Hosted by {data?.User?.firstName}{" "}
              </h1>
              <p className="text-sm text-foreground">Host since 2018</p>
            </div>
          </div>
          <Separator className="my-7" />
          <CategoryShowCase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-7" />
          <HomeMap locationValue={country?.value as string} />
        </div>
        <form action={selectReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <Calander reservation={data?.Reservation} />
          {user?.id ? (
            <CreateReservation />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default HomeRoute;
