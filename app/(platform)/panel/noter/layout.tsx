"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NoterProvider, useNoter } from "@/lib/contexts/NoterContext";
import { usePlatform } from "@/lib/contexts/PlatformContext";
import NoterSidebarContent from "@/components/noter/NoterSidebarContent";
import NoterBreadcrumbs from "@/components/noter/NoterBreadcrumbs";

function NoterPortals({ children }: { children: React.ReactNode }) {
    const { registerApp, unregisterApp, setIsNavOpen } = usePlatform();
    const { activeNote } = useNoter();
    const [sidebarTarget, setSidebarTarget] = useState<HTMLElement | null>(null);
    const [breadcrumbsTarget, setBreadcrumbsTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setSidebarTarget(document.getElementById("sidebar-slot"));
        setBreadcrumbsTarget(document.getElementById("breadcrumbs-slot"));
    }, []);

    useEffect(() => {
        registerApp({
            pageTitle: "Noter",
            contentClass: activeNote?.isFullWidth ? "max-w-full" : "max-w-4xl",
        });
        return () => unregisterApp();
    }, []);

    useEffect(() => {
        registerApp({
            contentClass: activeNote?.isFullWidth ? "max-w-full" : "max-w-4xl",
        });
    }, [activeNote?.isFullWidth]);

    useEffect(() => {
        setIsNavOpen(false);
    }, [activeNote?.id]);

    return (
        <>
            {sidebarTarget && createPortal(<NoterSidebarContent />, sidebarTarget)}
            {breadcrumbsTarget && createPortal(<NoterBreadcrumbs />, breadcrumbsTarget)}
            {children}
        </>
    );
}

export default function NoterLayout({ children }: { children: React.ReactNode }) {
    return (
        <NoterProvider>
            <NoterPortals>
                {children}
            </NoterPortals>
        </NoterProvider>
    );
}
