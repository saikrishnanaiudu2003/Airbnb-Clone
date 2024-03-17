import { Suspense } from "react";
import FilterItems from "./component/FilterItems";
import ListingCard from "./component/ListingCard";

import prisma from "./lib/db";
import SkeletonCard from "./component/SkeletonCard";
import NoitemsCard from "./component/NoitemsCard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const data = await prisma.home.findMany({
    where: {
      addCategory: true,
      addLocation: true,
      addDescription: true,
      categoryName: searchParams?.filter ?? undefined,
      country:searchParams?.country ?? undefined,
      guests:searchParams?.guest ?? undefined,
      bedrooms:searchParams?.room ?? undefined,
      bathrooms:searchParams?.bathroom ?? undefined
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favourite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });
  return data;
}

const Home = ({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) => {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <FilterItems />
      <Suspense key={searchParams?.filter} fallback={ShowSkeleton()}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Home;

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });

  return (
    <>
      {data.length === 0 ? (
        <NoitemsCard />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              location={item.country as string}
              description={item.description as string}
              imagePath={item.photo as string}
              price={item.price as number}
              userId={user?.id}
              favouriteId={item.Favourite[0]?.id}
              isInFavouiteList={item.Favourite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
      )}
    </>
  );
}

function ShowSkeleton() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
