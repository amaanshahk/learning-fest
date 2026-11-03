import { useEffect, useState } from "react";
import type { Photo } from "../types/Photo";

interface PhotoThumbnailProps {
    photo: Photo;
    onSelect: (photo: Photo) => void;
}

export default function PhotoThumbnail({
    photo,
    onSelect,
}: PhotoThumbnailProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const url = URL.createObjectURL(photo.file);

        setImageUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [photo.file]);

    return (
        <button
            className="photo-thumbnail"
            onClick={() => onSelect(photo)}
            aria-label={`Open ${photo.name}`}
        >
            {imageUrl && !failed ? (
                <img
                    src={imageUrl}
                    alt={photo.name}
                    onError={() => setFailed(true)}
                />
            ) : (
                <span className="thumbnail-placeholder">
                    {failed ? "Preview unavailable" : "Loading..."}
                </span>
            )}

            <span className="thumbnail-name">{photo.name}</span>
        </button>
    );
}
