import { 
    Dialog, 
    DialogBody, 
    DialogHeader, 
    DialogFooter, 
    Button, 
    Card,
    List,
    ListItem,
    Typography,
    ListItemPrefix,
} from "@material-tailwind/react";
import { CubeIcon } from '@heroicons/react/24/solid';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Cards from "./flashcards";

const FlashCardModal = (props) => {
    const modules = useSelector(state => state.flashcards.modules);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState(modules[0].id);

    return (
        <>
            <Button variant="gradient" style={{ marginLeft: "1em" }} size="sm" onClick={() => setVisible(true)}>Open FlashCards</Button>
            <Dialog open={visible} handler={setVisible} size="xl" className="flex flex-row bg-transparent shadow-none">
                <Card className="w-1/4 w-min-1/4 h-[70vh] rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-blue-gray-100 shadow-none">
                    <div className="flex items-center gap-4 p-4">
                        <img src={require("../../assets/modules-icon.png")} alt="brand" className="h-8 w-8" />
                        <Typography variant="h5" color="blue-gray">
                            Modules
                        </Typography>
                    </div>
                    <List>
                        {
                            modules.map((module, i) => (
                                <ListItem 
                                    key={module.id} 
                                    onClick={() => setId(module.id)}
                                >
                                    {module.name}
                                </ListItem>
                            ))
                        }
                    </List>
                </Card>
                <Card className="w-3/4 rounded-lg ml-2 items-center shadow-none">
                        <Cards moduleId={id} />
                </Card>
            </Dialog>
        </>
    );
}

export default FlashCardModal;