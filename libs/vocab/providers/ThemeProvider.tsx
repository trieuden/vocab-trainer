"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Cookies from "js-cookie";

const ThemeContext = createContext({
    isDarkMode: 'dark',
    toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState("dark");

    useEffect(() => {
        const savedTheme = Cookies.get("darkMode");
        if (savedTheme) {
            setIsDarkMode(savedTheme);
        }        
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(isDarkMode === "dark" ? "light" : "dark");
        Cookies.set("darkMode", String(isDarkMode === "dark" ? "light" : "dark"));
    };

    const theme = createTheme({
        palette: {
            mode: isDarkMode === "dark" ? "dark" : "light",
            primary: {
                main: "#0066ff",
            },
            background: {
                default: isDarkMode === "dark" ? "#000" : "#f5f5f5",
                paper: isDarkMode === "dark" ? "#333" : "#e6e6e6",
            },
            text: {
                primary: isDarkMode === "dark" ? "#fff" : "#000",
                secondary: isDarkMode === "dark" ? "#ccc" : "#666",
            },
            divider: isDarkMode === "dark" ? "#444" : "#b3b3b3",
            
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiInput-input": {
                            color: isDarkMode === "dark" ? "#fff" : "#000",
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
