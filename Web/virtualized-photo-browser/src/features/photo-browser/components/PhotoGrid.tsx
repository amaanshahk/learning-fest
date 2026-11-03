import type { Photo } from "../types/Photo";
import { useVirtualizedPhotos } from "../hooks/useVirtualizedPhotos";
import PhotoThumbnail from "./PhotoThumbnail";

interface PhotoGridProps {
    photos: Photo[];
    onSelect: (photo: Photo) => void;
}

export default function PhotoGrid({ photos, onSelect }: PhotoGridProps) {
    const {
        containerRef,
        visiblePhotos,
        columns,
        totalHeight,
        topPadding,
        gap,
        handleScroll,
    } = useVirtualizedPhotos(photos);

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
                    handleScroll(event.currentTarget.scrollTop)
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
                            gap,
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
