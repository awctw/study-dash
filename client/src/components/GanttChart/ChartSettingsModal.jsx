import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { putChartSettingsAsync } from "../../store/chartSettings/thunks";

const ChartSettingsModal = (props) => {
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
                size="xs"
                className="min-w-max"
            >
                <DialogBody divider className="h-[40rem] overflow-y-auto">
                    <Typography variant="h3" color="blue-gray" className="mb-2">
                        Chart Settings
                    </Typography>
                    <Input
                        variant="outlined"
                        label="Visible Hour Range (1 to 84 Hours Before and After)"
                        color="blue-gray"
                        type="number"
                        value={modalChartSettings.axisScale}
                        onChange={(e) => {
                            // Max and min checking
                            if (e.target.value > 84) {
                                e.target.value = "84";
                                setModalChartSettings((prevProps) => ({
                                    ...prevProps,
                                    axisScale: 84
                                }))
                            } else if (e.target.value < 1) {
                                e.target.value = "1";
                                setModalChartSettings((prevProps) => ({
                                    ...prevProps,
                                    axisScale: 1
                                }))
                            }

                            // Set axisScale
                            setModalChartSettings((prevProps) => ({
                                ...prevProps,
                                axisScale: e.target.value
                            }))
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="mt-3 mb-5">
                        Category Colors
                    </Typography>
                    <div className="grid gap-x-3 gap-y-5 sm:grid-cols-3">
                        {modalChartSettings.categoryColors.map((item, index) =>
                            <div key={index} className="sm:col-span-1">
                                <Input
                                    type="color"
                                    className="mb-5"
                                    variant="outlined"
                                    label={item.category + " TODO Color"}
                                    color="blue-gray"
                                    value={item.color}
                                    onChange={(e) => setModalChartSettings((prevState) => ({
                                        axisScale: prevState.axisScale,
                                        categoryColors: prevState.categoryColors.map(c => {
                                            if (c.category === item.category) {
                                                c.color = e.target.value;
                                            }
                                            return c;
                                        })
                                    }))}
                                />
                            </div>
                        )}
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            props.setVisible(false);
                        }}
                        className="border-indigo-300 bg-white text-indigo-300 border-solid border m-2"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        className="bg-indigo-300 text-white m-2"
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
                        Edit
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default ChartSettingsModal;
