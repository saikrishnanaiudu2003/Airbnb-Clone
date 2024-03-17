import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import ListingCard from "../component/ListingCard";
import EmptyFavourites from "../component/EmptyFavourites";
import { unstable_noStore as noStore} from "next/cache";


async function getData(userId: string) {
  noStore();
  const data = await prisma.favourite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          Favourite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });

  return data;
}

const Favourites = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user.id);
  return (
    <section className="mx-auto container px-5 lg:px-10 mt-10">
      <h1 className="text-3xl font-semibold tracking-light">Your Favourites</h1>

      {data.length === 0 ? (
        <EmptyFavourites/>
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              price={item.Home?.price as number}
              location={item.Home?.country as string}
              imagePath={item.Home?.photo as string}
              pathName="/favorites"
              homeId={item.Home?.id as string}
              userId={user.id}
              favouriteId={item.Home?.Favourite[0].id as string}
              isInFavouiteList={(item.Home?.Favourite.length as number)> 0 ? true:false}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favourites;
