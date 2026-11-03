import { useEffect, useRef } from "react";
import { isImageFile } from "../../../shared/utils/imageUtils";

interface FolderPickerProps {
    onFilesSelected: (files: File[]) => void;
}

export default function FolderPicker({ onFilesSelected }: FolderPickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.setAttribute("webkitdirectory", "");
        inputRef.current?.setAttribute("directory", "");
    }, []);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.time("Folder processing");
        const selectedFiles = Array.from(event.target.files ?? []);
        const imageFiles = selectedFiles.filter(isImageFile);

        onFilesSelected(imageFiles);
        // Allow selecting the same folder again.
        event.target.value = "";
    }

    return (
        <div className="folder-picker">
            <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleChange}
                hidden
                id="folder-input"
            />

            <label htmlFor="folder-input" className="folder-button">
                Select photo folder
            </label>

            <p className="folder-hint">
                Your photos stay on this device. Nothing is uploaded.
            </p>
        </div>
    );
}
