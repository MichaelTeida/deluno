"use client";

export function LiquidGlassFilter() {
    return (
        <svg style={{ display: 'none' }}>
            <defs>
                <filter id="glass-clean-v5" colorInterpolationFilters="linearRGB" primitiveUnits="userSpaceOnUse">
                    <feDisplacementMap in="SourceGraphic" in2="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="B" result="disp" />
                    <feGaussianBlur in="disp" stdDeviation="3 3" />
                </filter>
            </defs>
        </svg>
    );
}
