import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Button } from "../../ui/button";
import Navmenu from "./Nav-menu";

const NavSheets = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <Navmenu />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavSheets;
