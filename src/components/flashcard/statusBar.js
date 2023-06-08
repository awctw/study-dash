import { Button, IconButton, MobileNav, Navbar, Progress, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const StatusBar = (props) => {
    const [openNav, setOpenNav] = useState(false);

    const navList = (
        <div className="w-full">
            <div className="flex items-center justify-between gap-10">
                <Typography variant="small" color="gray">progress</Typography>
                <Typography variant="small" color="gray">{50}%</Typography>
            </div>
            <Progress value={50} size="sm" color="blue-gray" />
        </div>
    );
    return (
        <Navbar className="mx-auto mb-1 py-2 px-4 mx-2 drop-shadow-2xl border border-purple-theme">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                as="a"
                href="#"
                className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    Material Tailwind
                </Typography>
                <div className="w-1/3 hidden lg:block">{navList}</div>
                <IconButton
                    size="md"
                    variant="text"
                    color="blue-gray"
                    onClick={() => { props.setFlip(!props.flip); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>
                </IconButton>
            </div>
        </Navbar>
    );
}

export default StatusBar;