"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Cookies from "js-cookie";

const ThemeContext = createContext({
    isDarkMode: true,
    toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const savedTheme = Cookies.get("darkMode");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "true");
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        Cookies.set("darkMode", String(newMode), { expires: 7 });
    };

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? "dark" : "light",
            primary: {
                main: "#0066ff",
            },
            background: {
                default: isDarkMode ? "#000" : "#f5f5f5",
                paper: isDarkMode ? "#333" : "#e6e6e6",
            },
            text: {
                primary: isDarkMode ? "#fff" : "#000",
                secondary: isDarkMode ? "#ccc" : "#666",
            },
            divider: isDarkMode ? "#444" : "#b3b3b3",
            
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiInput-input": {
                            color: isDarkMode ? "#fff" : "#000",
                        },
                    },
                },
            },
        },
    });

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
