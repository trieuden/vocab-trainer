"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { Typography } from "@mui/material";

type FractionInputProps = {
    title?: string;
    value: string;
    setValue: (value: string) => void;
    isValid?: boolean;
    setIsValid?: (value: boolean) => void;
    disabled?: boolean;
    width?: string | number;
    size?: "medium";
    handleBlur?: () => void;
    errorMessage?: string;
    restrictNumerator?: boolean;
};

export const FractionInput = ({ title, value, setValue, isValid = true, setIsValid, disabled, width, size, handleBlur, errorMessage, restrictNumerator = false }: FractionInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [validNotification, setValidNotification] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidNotification("");
        let input = e.target.value.replace(/[^0-9/]/g, "");
        const parts = input.split("/");
        const numerator = parts[0] || "";
        const denominator = parts[1] || "";

        // Ensure only one slash and proper format
        if (parts.length > 2) {
            input = `${numerator}/${denominator}`;
        } else if (!input.includes("/")) {
            input = `${numerator}/0`;
        }

        // Limit length of numbers (e.g., max 4 digits each side)
        const maxLength = 4;
        if (numerator.length > maxLength || denominator.length > maxLength) {
            return;
        }

        let isValidFormat = /^[0-9]+\/[0-9]*$/.test(input);

        setValue(input);
        setIsValid?.(isValidFormat);
    };

    return (
        <Box display="flex" width="100%" flexDirection="column" sx={{ backgroundColor: "white", width: width || "100%" }}>
            <Box position="relative" display="flex" alignItems="center">
                <TextField
                    label={title}
                    variant="outlined"
                    size={size ? size : "small"}
                    value={value}
                    error={!isValid}
                    disabled={disabled}
                    onChange={handleChange}
                    fullWidth
                    type="text"
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false);
                        handleBlur && handleBlur();
                        const parts = e.target.value.split("/");
                        let numerator = parts[0] || "0";
                        let denominator = parts[1] || "0";

                        if (e.target.value === "/") {
                            setValue("0/0");
                        } else if (!e.target.value.includes("/")) {
                            setValue(`${e.target.value || "0"}/0`);
                        } else {
                            setValue(`${numerator}/${denominator}`);
                        }

                        if ( Number(numerator) > Number(denominator) && restrictNumerator) {                            
                            setIsValid?.(false);
                            setValidNotification("Tử số không được lớn hơn mẫu số");
                        }
                        else {
                            setValidNotification("");
                        }
                    }}
                    InputProps={{
                        endAdornment: <Typography sx={{ color: "#8c8c8c", marginRight: "8px" }}>{isFocused || value ? "" : ""}</Typography>,
                    }}
                />
                {!isValid && (
                    <FormHelperText
                        sx={{
                            position: "absolute",
                            bottom: -19,
                            left: 14,
                            color: "error.main",
                            fontSize: "0.75rem",
                        }}
                    >
                        {!!validNotification ? validNotification : errorMessage}
                    </FormHelperText>
                )}
            </Box>
        </Box>
    );
};
