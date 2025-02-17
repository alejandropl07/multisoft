"use client";
import SwitchDark from "@/src/components/switch/SwitchDark";
import { Tab, TabList, Tabs } from "react-tabs";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "@/src/redux/features/auth/authSlice";

function TabsComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleMenuClick = (menuName: string) => {
    router.push(`/${menuName}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push(`/`);
  };

  const menuItem = [
    {
      icon: "fa-home",
      menuName: "Home",
      onClick: () => handleMenuClick(""),
    },
    // {
    //   icon: "fa-map",
    //   menuName: "Pricing",
    //   onClick: () => handleMenuClick("pricing"),
    // },
    {
      icon: "fa-users",
      menuName: "About",
      onClick: () => handleMenuClick("about"),
    },
    {
      icon: "fa-briefcase",
      menuName: "Reviews",
      onClick: () => handleMenuClick("review"),
    },
    {
      icon: "fa-envelope-open",
      menuName: "Contacto",
      onClick: () => handleMenuClick("contact"),
    },
    {
      icon: "fa-user",
      menuName: "Login",
      onClick: () => handleMenuClick("login"),
    },
  ];

  const menuItemDashboard = [
    {
      icon: "fa-home",
      menuName: "Home",
      onClick: () => handleMenuClick(""),
    },
    {
      icon: "fa-users",
      menuName: "Leads",
      onClick: () => handleMenuClick("leads"),
    },
    {
      icon: "fa-sign-out ",
      menuName: "Logout",
      onClick: () => handleLogout(),
    },
  ];

  const { isAuth } = useAppSelector((state) => state.auth);

  const menu = isAuth ? menuItemDashboard : menuItem;

  return (
    <div className="yellow">
      <SwitchDark />
      {/* End Switcher */}
      <Tabs>
        <div className="header">
          <TabList className=" icon-menu  revealator-slideup revealator-once revealator-delay1">
            {menu.map((item, i) => (
              <Tab className="icon-box" key={i} onClick={item.onClick}>
                <i className={`fa ${item.icon}`}></i>
                <h2>{item.menuName}</h2>
              </Tab>
            ))}
          </TabList>
        </div>
        {/* End Menu Content */}
      </Tabs>
    </div>
  );
}

export default TabsComponent;
