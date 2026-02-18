"use client";

import { useEffect, useRef, useCallback } from "react";

export function useScrollReveal() {
    const observerRef = useRef<IntersectionObserver | null>(null);

    const observe = useCallback((node: HTMLElement | null) => {
        if (!node) return;
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observerRef.current?.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
            );
        }
        observerRef.current.observe(node);
    }, []);

    useEffect(() => {
        return () => observerRef.current?.disconnect();
    }, []);

    return observe;
}
