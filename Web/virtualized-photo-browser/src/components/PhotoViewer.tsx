
import { useEffect, useState } from "react";
import type { Photo } from "../types";
import {
    formatFileSize,
    getImageDimensions,
} from "../utils/imageUtils";

interface PhotoViewerProps {
    photos: Photo[];
    selectedIndex: number;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export default function PhotoViewer({
    photos,
    selectedIndex,
    onClose,
    onNavigate,
}: PhotoViewerProps) {
    const photo = photos[selectedIndex];

    const [dimensions, setDimensions] = useState<{
        width: number;
        height: number;
    } | null>(null);

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    // Create and clean up the image URL.
    useEffect(() => {
        if (!photo) return;

        const url = URL.createObjectURL(photo.file);
        setImageUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [photo]);

    // Read image dimensions on demand.
    useEffect(() => {
        if (!photo) return;

        let cancelled = false;

        setDimensions(null);

        getImageDimensions(photo.file)
            .then((result) => {
                if (!cancelled) {
                    setDimensions(result);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setDimensions(null);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [photo]);

    // Keyboard navigation.
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }

            if (event.key === "ArrowLeft") {
                onNavigate(Math.max(0, selectedIndex - 1));
            }

            if (event.key === "ArrowRight") {
                onNavigate(
                    Math.min(photos.length - 1, selectedIndex + 1)
                );
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedIndex, photos.length, onClose, onNavigate]);

    if (!photo) return null;

    return (
        <div className="viewer-backdrop" onClick={onClose}>
            <section
                className="photo-viewer"
                role="dialog"
                aria-modal="true"
                aria-label="Photo viewer"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="viewer-close"
                    onClick={onClose}
                    aria-label="Close viewer"
                >
                    ×
                </button>

                <button
                    className="viewer-nav previous"
                    onClick={() =>
                        onNavigate(Math.max(0, selectedIndex - 1))
                    }
                    disabled={selectedIndex === 0}
                    aria-label="Previous photo"
                >
                    ‹
                </button>

                {imageUrl && (
                    <img
                        className="viewer-image"
                        src={imageUrl}
                        alt={photo.name}
                    />
                )}

                <button
                    className="viewer-nav next"
                    onClick={() =>
                        onNavigate(
                            Math.min(photos.length - 1, selectedIndex + 1)
                        )
                    }
                    disabled={selectedIndex === photos.length - 1}
                    aria-label="Next photo"
                >
                    ›
                </button>

                <aside className="viewer-metadata">
                    <strong>{photo.name}</strong>

                    <span>{formatFileSize(photo.size)}</span>

                    <span>
                        {dimensions
                            ? `${dimensions.width} × ${dimensions.height}`
                            : "Reading dimensions..."}
                    </span>

                    <span>
                        {selectedIndex + 1} / {photos.length}
                    </span>
                </aside>
            </section>
        </div>
    );
}

