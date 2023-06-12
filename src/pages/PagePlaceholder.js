import NavBar from "../components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const PagePlaceholder = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default PagePlaceholder;