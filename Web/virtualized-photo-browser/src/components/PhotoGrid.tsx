import { useEffect, useRef, useState } from "react";
import type { Photo } from "../types";
import PhotoThumbnail from "./PhotoThumbnail";

interface PhotoGridProps {
    photos: Photo[];
    onSelect: (photo: Photo) => void;
}

const CARD_WIDTH = 180;
const CARD_HEIGHT = 190;
const GAP = 16;
const OVERSCAN = 3;

export default function PhotoGrid({
    photos,
    onSelect,
}: PhotoGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const [containerWidth, setContainerWidth] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(600);

    // Observe viewport dimensions.
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver(([entry]) => {
            setContainerWidth(entry.contentRect.width);
            setViewportHeight(entry.contentRect.height);
        });

        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    // Calculate grid dimensions.
    const columns = Math.max(
        1,
        Math.floor((containerWidth + GAP) / (CARD_WIDTH + GAP))
    );

    const rowHeight = CARD_HEIGHT + GAP;
    const totalRows = Math.ceil(photos.length / columns);

    // Calculate visible rows.
    const firstVisibleRow = Math.floor(scrollTop / rowHeight);
    const visibleRows = Math.ceil(viewportHeight / rowHeight);

    const startRow = Math.max(0, firstVisibleRow - OVERSCAN);

    const endRow = Math.min(
        totalRows,
        firstVisibleRow + visibleRows + OVERSCAN
    );

    const startIndex = startRow * columns;
    const endIndex = Math.min(endRow * columns, photos.length);

    const visiblePhotos = photos.slice(startIndex, endIndex);

    // Maintain the original scrollable height.
    const topPadding = startRow * rowHeight;
    const totalHeight = totalRows * rowHeight;

    return (
        <>
            <div className="render-count">
                Rendering {visiblePhotos.length} of{" "}
                {photos.length.toLocaleString()} photos
            </div>

            <div
                className="photo-grid-viewport"
                ref={containerRef}
                onScroll={(event) =>
                    setScrollTop(event.currentTarget.scrollTop)
                }
            >
                <div
                    style={{
                        height: totalHeight,
                        position: "relative",
                    }}
                >
                    <div
                        className="photo-grid"
                        style={{
                            position: "absolute",
                            top: topPadding,
                            left: 0,
                            right: 0,
                            display: "grid",
                            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                            gap: GAP,
                        }}
                    >
                        {visiblePhotos.map((photo) => (
                            <PhotoThumbnail
                                key={photo.id}
                                photo={photo}
                                onSelect={onSelect}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
