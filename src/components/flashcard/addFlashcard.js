import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button, Card, IconButton, Tooltip } from "@material-tailwind/react";
import React from "react";

const AddFlashcard = (props) => {
    return (
        <>
            <Card className="w-full h-full object-cover bg-transparent items-center justify-center rounded-none">
                <div className={`card flex bg-transparent rounded-3xl shadow-lg border border-gray-400/70 items-center justify-center`}>
                    <Tooltip content="Add a Flashcard!" className="tool">
                        <Button color="blue-gray" variant="text" size="sm" className="bg-transparent rounded-full active:bg-transparent p-0">
                            <PlusCircleIcon strokeWidth={0.7} className="w-16 h-16 text-gray-400/70" />
                        </Button>
                    </Tooltip>
                </div>
            </Card>
        </>
    );
}

export default AddFlashcard;