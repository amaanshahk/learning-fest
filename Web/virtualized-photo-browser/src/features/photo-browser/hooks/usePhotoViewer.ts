import { useEffect, useState } from "react";
import type { Photo } from "../types/Photo";
import { getImageDimensions } from "../../../shared/utils/imageUtils";

interface ImageDimensions {
    width: number;
    height: number;
}

interface UsePhotoViewerProps {
    photos: Photo[];
    selectedIndex: number;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export function usePhotoViewer({
    photos,
    selectedIndex,
    onClose,
    onNavigate,
}: UsePhotoViewerProps) {
    const photo = photos[selectedIndex];

    const [dimensions, setDimensions] = useState<ImageDimensions | null>(null);

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
                onNavigate(Math.min(photos.length - 1, selectedIndex + 1));
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedIndex, photos.length, onClose, onNavigate]);

    return {
        photo,
        dimensions,
        imageUrl,
    };
}
