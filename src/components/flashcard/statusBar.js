import { ArrowPathIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Chip, IconButton, MobileNav, Navbar, Progress, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const StatusBar = (props) => {
    const [openNav, setOpenNav] = useState(false);

    const navList = (
        <div className="w-full">
            <div className="flex items-center justify-between gap-10">
                <Typography variant="small" color="gray">progress</Typography>
                <Typography variant="small" color="gray">{props.progress}%</Typography>
            </div>
            <Progress value={props.progress} size="sm" color="blue-gray"/>
        </div>
    );
    return (
        <Navbar className="mx-2 mb-1 py-2 px-4 border border-gray-400/70">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <div className="w-2/4 hidden lg:block">{navList}</div>
                <div className="flex flex-row">
                    <Chip
                        className="mx-1"
                        variant="ghost"
                        color="green"
                        size="sm"
                        value={0}
                        icon={<CheckIcon color="green" />}
                    />
                    <Chip
                        variant="ghost"
                        color="red"
                        size="sm"
                        value={0}
                        icon={<XMarkIcon color="red" />}
                    />
                </div>
                <Button
                    size="sm"
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-2"
                    onClick={() => { props.setFlip(true); }}
                >
                    <ArrowPathIcon className="h-5 w-5" />
                    Check Anwser
                </Button>
            </div>
        </Navbar>
    );
}

export default StatusBar;