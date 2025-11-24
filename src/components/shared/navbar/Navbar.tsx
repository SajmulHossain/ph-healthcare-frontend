import { Button } from "../../ui/button";
import NavSheets from "./NavSheets";
import Navmenu from "./Navmenu";

const Navbar = () => {
  return (
    <header className="shadow-2xl fixed w-full top-0 z-50 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h2>PH Health</h2>

        <div className="hidden md:block">
          <Navmenu />
        </div>

        <div className="flex items-center gap-2">
          <Button>Login</Button>
          <div className="md:hidden">
            <NavSheets />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
