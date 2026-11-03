import type { Photo } from "../types/Photo";
import { formatFileSize } from "../../../shared/utils/imageUtils";
import { usePhotoViewer } from "../hooks/usePhotoViewer";

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
    const { photo, dimensions, imageUrl } = usePhotoViewer({
        photos,
        selectedIndex,
        onClose,
        onNavigate,
    });

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
                    onClick={() => onNavigate(Math.max(0, selectedIndex - 1))}
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
                            Math.min(photos.length - 1, selectedIndex + 1),
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
