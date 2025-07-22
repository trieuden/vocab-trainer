"use client";
import React, { useEffect, useState } from "react";;
import { HomePage } from "@/vocab/pages";
import { AccountMenu } from "@/vocab/component";
import { UserModel } from "@/core/models/UserModel";

const defaultUser: UserModel = {
    id: "guest",
    name: "guest",
    avatar: "./images/default.png",
};

const Pages = () => {
    const [isOpenAccMenu, setIsOpenAccMenu] = useState(false);
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
            <HomePage setIsOpenAccMenu={setIsOpenAccMenu} currentUser={currentUser} />
            <AccountMenu isOpenAccMenu={isOpenAccMenu} setIsOpenAccMenu={setIsOpenAccMenu} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </>
    );
};

export default Pages;
