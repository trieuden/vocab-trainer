"use client";
import React, { useEffect, useState } from "react";
import { HomePage } from "../libs/vocab/pages";
import { Login } from "@/vocab/component";
import { UserModel } from "@/core/models/UserModel";

const defaultUser: UserModel = {
    id: "guest",
    name: "guest",
    avatar: "./images/default.png",
};

const Pages = () => {
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserModel>(defaultUser);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setCurrentUser(parsedUser);
            } catch {
                localStorage.setItem("currentUser", JSON.stringify(defaultUser));
                setCurrentUser(defaultUser);
            }
        } else {
            localStorage.setItem("currentUser", JSON.stringify(defaultUser));
            setCurrentUser(defaultUser);
        }

        setIsReady(true);
    }, []);

    if (!isReady) return null;

    return (
        <>
            <HomePage setIsOpenLogin={setIsOpenLogin} currentUser={currentUser} />
            <Login isOpenLogin={isOpenLogin} setIsOpenLogin={setIsOpenLogin} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </>
    );
};

export default Pages;
