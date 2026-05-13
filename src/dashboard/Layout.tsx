import HamburgerIcon from "@/svg/HamburgerIcon";
import { useState } from "react";
import { Outlet } from "react-router";
import "./layout.css";
import SideBar from "./sidebar/SideBar";

export default function Layout() {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <>
            <div className="flex">
                <SideBar toggleMenu={toggleMenu} handleClose={setToggleMenu} />
                <div className={`lg:w-[calc(100%-240px)] w-full layout-content-area ${toggleMenu ? "open" : "close"} bg-white`}>
                    <div className="flex justify-between items-center p-4 mobile__header">
                        <img src="/logo.png" alt="logo" />
                        <button onClick={() => setToggleMenu(a => !a)}>
                            <HamburgerIcon />
                        </button>
                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
