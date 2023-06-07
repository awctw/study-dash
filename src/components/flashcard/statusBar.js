import { Button, IconButton, MobileNav, Navbar, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const StatusBar = (props) => {
    const [openNav, setOpenNav] = useState(false);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
            >
            <a href="#" className="flex items-center">
                Pages
            </a>
            </Typography>
            <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
            >
            <a href="#" className="flex items-center">
                Account
            </a>
            </Typography>
            <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
            >
            <a href="#" className="flex items-center">
                Blocks
            </a>
            </Typography>
            <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
            >
            <a href="#" className="flex items-center">
                Docs
            </a>
            </Typography>
        </ul>
    );
    return (
        <Navbar className="mx-auto py-2 px-4 mx-2 shadow-xl">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                as="a"
                href="#"
                className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    Material Tailwind
                </Typography>
                <div className="hidden lg:block">{navList}</div>
                <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                    <span>Buy Now</span>
                </Button>
            </div>
        </Navbar>
    );
}

export default StatusBar;