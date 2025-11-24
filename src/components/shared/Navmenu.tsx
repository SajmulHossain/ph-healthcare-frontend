import { navlinks } from "@/constant/navlinks";

const Navmenu = ({...props}) => {
  return (
    <nav {...props}>
      <ul className="flex gap-6 font-medium flex-col md:flex-row md:items-center">
        {navlinks.map((link) => (
          <li key={link.url}>{link.label}</li>
        ))}
      </ul>
    </nav>
  );
};

export default Navmenu;