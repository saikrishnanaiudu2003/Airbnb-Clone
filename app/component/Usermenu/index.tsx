/* eslint-disable @next/next/no-img-element */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { AirbnbHome } from "@/app/actions";

const Usermenu = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const airbnbHome = AirbnbHome.bind(null,{userId:user?.id as string})

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="h-6 w-6 lg:h-5 lg:w-5 outline-none" />
          <img
            src={
              user?.picture ??
              "https://res.cloudinary.com/tadipatri/image/upload/v1710184627/download_jj9qp2.jpg"
            }
            alt="default"
            className="rounded-full h-7 w-8 hidden lg:block"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
          <DropdownMenuItem>
          <form action={airbnbHome} className="w-full">
                <button type="submit" className="w-full text-start">
                  Airbnb Your Home
                </button>
              </form>
          </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/my-home" className="w-full">
                My listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/favourites" className="w-full">
                My Favourites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/reservations" className="w-full">
                My Reservations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink className="w-full">Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink className="w-full">Register</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink className="w-full">Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Usermenu;
