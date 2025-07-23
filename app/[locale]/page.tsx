"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
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
        const cookieUser = Cookies.get("currentUser");

        if (cookieUser) {
            try {
                const parsedUser = JSON.parse(cookieUser);
                setCurrentUser(parsedUser);
            } catch {
                Cookies.set("currentUser", JSON.stringify(defaultUser));
                setCurrentUser(defaultUser);
            }
        } else {
            Cookies.set("currentUser", JSON.stringify(defaultUser));
            setCurrentUser(defaultUser);
        }

        setIsReady(true);
    }, []);

    if (!isReady) return null;

    return (
        <>
            <HomePage setIsOpenAccMenu={setIsOpenAccMenu} currentUser={currentUser} />
            <AccountMenu
                isOpenAccMenu={isOpenAccMenu}
                setIsOpenAccMenu={setIsOpenAccMenu}
                currentUser={currentUser}
                setCurrentUser={(user) => {
                    setCurrentUser(user);
                    Cookies.set("currentUser", JSON.stringify(user));
                }}
            />
        </>
    );
};

export default Pages;
