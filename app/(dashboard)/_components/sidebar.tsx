import { Logo } from "./logo";
import { SideBarRoutes } from "./sidebarroutes";

export const Sidebar = () => {
  return (
    <div
      className="
        h-full
       
        border-r-2
        
        overflow-y-auto
        
        
        "
    >
      <div className="p-6">
        <Logo />
      </div>
      <div className="w-full flex flex-cols">
        <SideBarRoutes />
      </div>
      {/* i want to make the logo in the top and routes in the bottom  of the sidebar how?*/}
    </div>
  );
};
