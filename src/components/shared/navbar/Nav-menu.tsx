"use client";
import { navlinks } from "@/constant/navlinks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navmenu = ({...props}) => {
  const path = usePathname();
  return (
    <nav {...props}>
      <ul className="flex gap-6 font-medium flex-col md:flex-row md:items-center">
        {navlinks.map((link) => (
          <li key={link.url} className={cn({
            "border-b border-black": path === link.url
          })}>
            <Link href={link.url}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navmenu;

// * 2 no video er 4.40