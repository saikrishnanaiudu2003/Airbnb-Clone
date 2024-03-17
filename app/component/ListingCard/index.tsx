import { userCountires } from "@/app/lib/getCountries";
import Image from "next/image";
import Link from "next/link";
import { DeleteFavoutiteButton, FavoutiteButton } from "../SubmitButtons";
import { addtoFavouriteItems, DeleteFromFavorite } from "@/app/actions";

interface ListingItem {
  imagePath: string;
  price: number;
  description: string;
  location: string;
  userId:string | undefined;
  isInFavouiteList : Boolean;
  favouriteId : string;
  homeId  : string
  pathName : string

}

const ListingCard = ({
  imagePath,
  price,
  description,
  location,
  userId,
  isInFavouiteList,
  favouriteId,
  homeId,
  pathName
}: ListingItem) => {
  const {getAllCountryByValue} = userCountires()
  const country = getAllCountryByValue(location);
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://njrphcljikywpjkyplcd.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="home"
          fill
          className="rounded-lg h-full object-cover"
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavouiteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favouriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
              <DeleteFavoutiteButton/>
              </form>
            ):(
              <form action={addtoFavouriteItems}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />


              <FavoutiteButton/>
              </form>
            )}
            </div>
        )}
      </div>
      <Link className="mt-2" href={`/home/${homeId}`}>
        <h1 className="font-medium text-base">{country?.flag} {country?.label} / {country?.region}</h1>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        <p className="pt-2 text-muted-foreground"><span className="font-medium text-black">${price}</span> Night</p>
      </Link>
    </div>
  );
};

export default ListingCard;


