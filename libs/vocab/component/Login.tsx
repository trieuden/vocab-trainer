import { OutlineButton } from "@/core/component";
import { Stack, Box, Radio, RadioGroup, Dialog } from "@mui/material";
import React, { useState } from "react";
import { UserModel } from "@/core/models/UserModel";

type LoginModalProps = {
    isOpenLogin: boolean;
    setIsOpenLogin: (isOpen: boolean) => void;
    currentUser: UserModel;
    setCurrentUser: (user: UserModel) => void;
};
export const Login = ({ isOpenLogin, setIsOpenLogin, setCurrentUser, currentUser }: LoginModalProps) => {
    const [user, setUser] = useState(currentUser?.id);

    const handleChooseUser = (user: string) => {
        setUser(user);
        const userModel = {
            id: user,
            name: user,
            avatar: user === "milo" ? "./images/milo.jpg" : user === "trieuden" ? "./images/trieuden.jpg" : "./images/default.png",
        }
        localStorage.removeItem("currentUser");
        localStorage.setItem("currentUser", JSON.stringify(userModel));
        setCurrentUser(userModel);
    }

    return (
        <Dialog
            open={isOpenLogin}
            onClose={() => setIsOpenLogin(false)}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        bgcolor: "#333",
                        color: "white",
                        borderRadius: "16px",
                        padding: "16px",
                        boxShadow: "0px 4px 2px rgba(0, 0, 0, 0.2)",
                    },
                },
            }}
        >
            <Stack direction="column" alignItems="center" spacing={2}>
                <span className="text-2xl font-semibold text-[#b3b3ff]">Who Are You</span>
                <RadioGroup value={user}>
                    <Stack className="w-[350px]" spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={2} boxShadow={2} className="bg-[#444] cursor-pointer p-2 hover:bg-gray-700 rounded-lg">
                            <Radio value={"milo"} onChange={() => handleChooseUser("milo")} />
                            <Box component={"img"} src={"./images/milo.jpg"} className="rounded-full h-[35px] w-[35px] object-cover" />
                            <span className="text-center text-[20px] font-semibold">Super MiLo</span>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2} boxShadow={2} className="bg-[#444] cursor-pointer p-2 hover:bg-gray-700 rounded-lg">
                            <Radio value={"trieuden"} onChange={() => handleChooseUser("trieuden")} />
                            <Box component={"img"} src={"./images/trieuden.jpg"} className="rounded-full h-[35px] w-[35px] object-cover" />
                            <span className="text-center text-[20px] font-semibold">Road to B1</span>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2} boxShadow={2} className="bg-[#444] cursor-pointer p-2 hover:bg-gray-700 rounded-lg">
                            <Radio value={"guest"} onChange={() => handleChooseUser("guest")} />
                            <Box component={"img"} src={"./images/default.png"} className="rounded-full h-[35px] w-[35px] object-cover" />
                            <span className="text-center text-[20px] font-semibold">Khách</span>
                        </Stack>
                    </Stack>
                    <Stack mt={2} className="flex items-end w-full">
                        <OutlineButton title="Thoát" handleClick={() => setIsOpenLogin(false)} width="100px" />
                    </Stack>
                </RadioGroup>
            </Stack>
        </Dialog>
    );
};
