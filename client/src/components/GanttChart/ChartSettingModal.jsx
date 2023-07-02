import {
    Button,
    Card,
    CardBody,
    Dialog,
    Input,
    Typography,
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { putChartSettingsAsync } from "../../store/chartSettings/thunks";

const ChartSettingModal = (props) => {
    const user = useSelector((state) => state.loginReducer);
    const [modalChartSettings, setModalChartSettings] = useState(structuredClone(props.chartSettings));
    const dispatch = useDispatch();

    useEffect(() => {
        setModalChartSettings(structuredClone(props.chartSettings))
    }, [props]);

    const handlePut = () => {
        dispatch(putChartSettingsAsync([user.user.userID, modalChartSettings]));
    };

    return (
        <>
            {props.children}
            <Dialog
                open={props.visible}
                handler={props.setVisible}
                size="md"
                className="flex flex-row bg-transparent shadow-none items-center justify-center"
            >
                <Card className="relative flex w-2/4 rounded-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-blue-gray-100">
                    <CardBody className="mb-2">
                        <Typography variant="h3" color="blue-gray" className="mb-2">
                            Chart Settings
                        </Typography>
                        <Input
                            variant="outlined"
                            label="Visible Hour Range (Before and After)"
                            color="blue-gray"
                            type="number"
                            value={modalChartSettings.axisScale}
                            onChange={(e) => setModalChartSettings((prevProps) => ({
                                ...prevProps,
                                axisScale: e.target.value
                            }))}
                        />
                        <Typography variant="h6" color="blue-gray" className="mt-3 mb-5">
                            Category Colors
                        </Typography>
                        {modalChartSettings.categoryColors.map((item, index) =>
                            <div key={index} className="mb-5">
                                <Input
                                    className="mb-5"
                                    variant="outlined"
                                    label={item.category + " TODO Color"}
                                    color="blue-gray"
                                    value={item.color}
                                    onChange={(e) => setModalChartSettings((prevState) => ({
                                        axisScale: prevState.axisScale,
                                        categoryColors: prevState.categoryColors.map(c => c.category === item.category ? c.color = item.color : c)
                                    }))}
                                />
                            </div>
                        )}
                        <Button
                            size="sm"
                            variant="text"
                            color="blue-gray"
                            className="flex items-center mt-3 border border-gray-400/70"
                            onClick={() => {
                                if (modalChartSettings.axisScale.length <= 0) return;
                                for (let i = 0; i < modalChartSettings.categoryColors.length; i++) {
                                    if (modalChartSettings.categoryColors[i].length <= 0) {
                                        return;
                                    }
                                }
                                handlePut();
                                props.setVisible(false);
                            }}
                        >
                            Edit Chart Settings
                        </Button>
                    </CardBody>
                </Card>
            </Dialog>
        </>
    );
};

export default ChartSettingModal;
