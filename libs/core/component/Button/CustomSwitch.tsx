import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

interface CustomSwitchProps extends SwitchProps {
    checkedIcon?: string;
    unCheckedIcon?: string;
    customColor?: string;
}

export const CustomSwitch = styled(Switch, {
    shouldForwardProp: (prop) => prop !== "checkedIcon" && prop !== "unCheckedIcon" && prop !== "customColor",
})<CustomSwitchProps>(({ theme, checkedIcon, unCheckedIcon, customColor }) => {
    return {
        width: 62,
        height: 34,
        padding: 7,
        "& .MuiSwitch-switchBase": {
            margin: 1,
            padding: 0,
            transform: "translateX(6px)",
            "&.Mui-checked": {
                color: "#fff",
                transform: "translateX(22px)",
                "& .MuiSwitch-thumb:before": {
                    backgroundImage: checkedIcon ? `url(${checkedIcon})` : "",
                },
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor: customColor ? customColor : "#aab4be",
                    ...theme.applyStyles("dark", {
                        backgroundColor: "#8796A5",
                    }),
                },
            },
        },
        "& .MuiSwitch-thumb": {
            backgroundColor: "#001e3c",
            width: 32,
            height: 32,
            "&::before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: unCheckedIcon ? `url(${unCheckedIcon})` : "",
            },
            ...theme.applyStyles("dark", {
                backgroundColor: "#003892",
            }),
        },
        "& .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: customColor ? customColor : "#aab4be",
            borderRadius: 20 / 2,
            ...theme.applyStyles("dark", {
                backgroundColor: "#8796A5",
            }),
        },
    };
});
