"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface AppSlots {
    pageTitle: string;
    contentClass?: string;
}

const defaultSlots: AppSlots = {
    pageTitle: "Dashboard",
};

interface PlatformContextType {
    isNavOpen: boolean;
    setIsNavOpen: (open: boolean) => void;
    isRailExpanded: boolean;
    setIsRailExpanded: (expanded: boolean) => void;
    isSidebarVisible: boolean;
    setIsSidebarVisible: (visible: boolean) => void;
    isSettingsOpen: boolean;
    setIsSettingsOpen: (open: boolean) => void;
    isSearchOpen: boolean;
    setIsSearchOpen: (open: boolean) => void;
    sidebarWidth: number;
    setSidebarWidth: (width: number) => void;
    isResizing: boolean;
    startResizing: (e: React.MouseEvent) => void;
    appSlots: AppSlots;
    registerApp: (slots: Partial<AppSlots>) => void;
    unregisterApp: () => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isRailExpanded, setIsRailExpanded] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(256);
    const [isResizing, setIsResizing] = useState(false);
    const [appSlots, setAppSlots] = useState<AppSlots>(defaultSlots);

    const registerApp = useCallback((slots: Partial<AppSlots>) => {
        setAppSlots(prev => ({ ...prev, ...slots }));
    }, []);

    const unregisterApp = useCallback(() => {
        setAppSlots(defaultSlots);
    }, []);

    const resizeOffsetRef = React.useRef(0);

    const startResizing = useCallback((e: React.MouseEvent) => {
        setIsResizing(true);
        const nav = (e.currentTarget as HTMLElement).closest('nav');
        resizeOffsetRef.current = nav ? e.clientX - nav.getBoundingClientRect().width : 0;
        e.preventDefault();
    }, []);

    useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (typeof window !== 'undefined' && window.innerWidth < 768) return;

            let newWidth = e.clientX - resizeOffsetRef.current;
            if (newWidth < 100) {
                setIsSidebarVisible(false);
                setIsResizing(false);
                return;
            }
            if (newWidth < 200) newWidth = 200;
            if (newWidth > 480) newWidth = 480;
            setSidebarWidth(newWidth);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isResizing]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <PlatformContext.Provider value={{
            isNavOpen, setIsNavOpen,
            isRailExpanded, setIsRailExpanded,
            isSidebarVisible, setIsSidebarVisible,
            isSettingsOpen, setIsSettingsOpen,
            isSearchOpen, setIsSearchOpen,
            sidebarWidth, setSidebarWidth,
            isResizing, startResizing,
            appSlots, registerApp, unregisterApp,
        }}>
            {children}
        </PlatformContext.Provider>
    );
}

export function usePlatform() {
    const context = useContext(PlatformContext);
    if (context === undefined) {
        throw new Error("usePlatform must be used within a PlatformProvider");
    }
    return context;
}
