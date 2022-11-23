import { useEffect, useState } from 'react';

export type WindowSizeType = {
    width: number;
    height: number;
};

export const useWindowSize = (): WindowSizeType => {
    const [windowSize, setWindowSize] = useState<WindowSizeType>({ width: 0, height: 0 });

    useEffect(() => {
        const handler = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handler);
        handler();
        return () => window.removeEventListener('resize', handler);
    }, []);

    return windowSize;
};
