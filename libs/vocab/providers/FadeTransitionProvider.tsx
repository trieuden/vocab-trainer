"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type FadeTransitionContextType = {
    opacity: number;
    triggerFade: (callback: () => void, customDuration?: number) => void;
};

const FadeTransitionContext = createContext<
    FadeTransitionContextType | undefined
>(undefined);

export const FadeTransitionProvider = ({
    children,
    duration: initialDuration = 200,
}: {
    children: ReactNode;
    duration?: number;
}) => {
    const [opacity, setOpacity] = useState(1);

    const triggerFade = (callback: () => void, customDuration?: number) => {
        setOpacity(0.5);
        const fadeDuration = customDuration ?? initialDuration;

        setTimeout(() => {
            callback();
            setOpacity(1);
        }, fadeDuration);
    };

    return (
        <FadeTransitionContext.Provider
            value={{ opacity, triggerFade }}
        >
            {children}
        </FadeTransitionContext.Provider>
    );
};

export const useFadeTransition = () => {
    const context = useContext(FadeTransitionContext);
    if (!context) {
        throw new Error(
            "useFadeTransition must be used within a FadeTransitionProvider"
        );
    }
    return context;
};
