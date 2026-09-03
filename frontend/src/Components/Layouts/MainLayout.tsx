import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip bg-black font-sans text-white">
      <SiteHeader />
      <main key={location.pathname} className="site-entry min-w-0 flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
