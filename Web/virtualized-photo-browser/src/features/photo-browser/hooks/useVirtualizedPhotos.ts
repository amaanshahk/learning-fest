import { useEffect, useRef, useState } from "react";
import type { Photo } from "../types/Photo";

const CARD_WIDTH = 180;
const CARD_HEIGHT = 190;
const GAP = 16;
const OVERSCAN = 3;

interface VirtualizedPhotosResult {
    containerRef: React.RefObject<HTMLDivElement | null>;
    visiblePhotos: Photo[];
    columns: number;
    totalHeight: number;
    topPadding: number;
    gap: number;
    handleScroll: (scrollTop: number) => void;
}

export function useVirtualizedPhotos(photos: Photo[]): VirtualizedPhotosResult {
    const containerRef = useRef<HTMLDivElement>(null);

    const [containerWidth, setContainerWidth] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(600);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver(([entry]) => {
            if (!entry) return;

            setContainerWidth(entry.contentRect.width);
            setViewportHeight(entry.contentRect.height);
        });

        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    const columns = Math.max(
        1,
        Math.floor((containerWidth + GAP) / (CARD_WIDTH + GAP)),
    );

    const rowHeight = CARD_HEIGHT + GAP;
    const totalRows = Math.ceil(photos.length / columns);

    const firstVisibleRow = Math.floor(scrollTop / rowHeight);
    const visibleRows = Math.ceil(viewportHeight / rowHeight);

    const startRow = Math.max(0, firstVisibleRow - OVERSCAN);

    const endRow = Math.min(
        totalRows,
        firstVisibleRow + visibleRows + OVERSCAN,
    );

    const startIndex = startRow * columns;
    const endIndex = Math.min(endRow * columns, photos.length);

    return {
        containerRef,
        visiblePhotos: photos.slice(startIndex, endIndex),
        columns,
        totalHeight: totalRows * rowHeight,
        topPadding: startRow * rowHeight,
        gap: GAP,
        handleScroll: setScrollTop,
    };
}
