import { Button } from "../../ui/button";
import NavSheets from "./NavSheets";
import Navmenu from "./Nav-menu";
import Link from "next/link";
import { getCookie } from "@/services/auth/tokenHandler";
import LogoutButton from "../Logout";

const Navbar = async () => {
  const accessToken = await getCookie();
  return (
    <header className="shadow-2xl fixed w-full top-0 z-50 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h2>PH Health</h2>

        <div className="hidden md:block">
          <Navmenu />
        </div>

        <div className="flex items-center gap-2">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          )}
          <div className="md:hidden">
            <NavSheets />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
