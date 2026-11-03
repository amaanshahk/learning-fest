export function isImageFile(file: File): boolean {
    return file.type.startsWith("image/");
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function getImageDimensions(
    file: File,
): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const image = new Image();

        image.onload = () => {
            resolve({
                width: image.naturalWidth,
                height: image.naturalHeight,
            });
            URL.revokeObjectURL(url);
        };

        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error(`Unable to read image: ${file.name}`));
        };

        image.src = url;
    });
}
