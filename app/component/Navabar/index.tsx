import Image from "next/image";
import Link from "next/link";
import DesktopLogo from '../../../public/airbnb-desktop.png'
import MobileLogo from '../../../public/airbnb-mobile.webp'
import Usermenu from "../Usermenu";
import SearchCard from "../SearchCard";

const Navbar = ()=>{
    return(
        <nav className="w-full border-b-2">
        <div className="flex justify-between container items-center mx-auto px-5 lg:px-10 py-5">
            <Link href="/">
                <Image src={DesktopLogo} alt="logo" className="w-32 hidden lg:block"/>
                <Image src={MobileLogo} alt="logo" className="w-12 lg:hidden block"/>
            </Link>
            <div className="hidden sm:block rounded-full border px-5 py-2">
                 <SearchCard/>
            </div>
            <Usermenu/>
        </div>
        </nav>
    )
}

export default Navbar;