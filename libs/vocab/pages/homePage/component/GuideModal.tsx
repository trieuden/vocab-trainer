"use client";
import React from "react";
import { useMediaQuery, useTheme, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const GuideModal = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold" color="#6666ff">
                    {t("guide")}
                </Typography>
            </Stack>
            <Stack spacing={2} mb={2} sx={{ color: theme.palette.text.primary }}>
                <Typography variant="body1">1. Chọn thư viện {isMobile ? "bằng icon ở đầu trang": "từ danh sách bên trái"}.</Typography>
                <Typography variant="body1">2. {isMobile ? "Chọn cài đặt bằng icon ở đầu trang": "Sử dụng thanh trượt"} để điều chỉnh độ khó của từ vựng / đảo chiều.</Typography>
                {!isMobile && (
                    <>
                        <Typography variant="body1">4. Nhấn phím Ctrl để nghe từ vựng hoặc câu</Typography>
                        <Typography variant="body1">5. Nhấn phím Enter để kiểm tra</Typography>
                        <Typography variant="body1">6. Nhấn phím Shift để hiện kết quả</Typography>
                    </>
                )}
                <i className="text-gray-400">Đối với trả lời đúng sẽ được + 1 đúng, hiện kết quả sẽ +1 sai</i>
            </Stack>
        </>
    );
};
