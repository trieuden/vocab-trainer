"use client";
import React, { useEffect, useState } from "react";
import { HomePage } from "../libs/vocab/pages";
import { Login } from "@/vocab/component";
import { UserModel } from "@/core/models/UserModel";

const Pages = () => {
    const [isOpenLogin, setIsOpenLogin] = useState(false);

    const storedUser = localStorage.getItem("currentUser");

    const [currentUser, setCurrentUser] = useState<UserModel>(
        storedUser
            ? JSON.parse(storedUser)
            : {
                  id: "guest",
                  name: "guest",
                  avatar: "./images/default.png",
              }
    );

    useEffect(() => {
        if (!storedUser) {
            const userModel = {
                id: "guest",
                name: "guest",
                avatar: "./images/default.png",
            };
            localStorage.setItem("currentUser", JSON.stringify(userModel));
            setCurrentUser(userModel);
        }
    }, []);

    return (
        <>
            <HomePage setIsOpenLogin={setIsOpenLogin} currentUser={currentUser} />
            <Login isOpenLogin={isOpenLogin} setIsOpenLogin={setIsOpenLogin} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </>
    );
};

export default Pages;
