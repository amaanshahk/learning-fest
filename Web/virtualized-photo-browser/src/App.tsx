
import { useCallback, useState } from "react";
import FolderPicker from "./components/FolderPicker";
import PhotoGrid from "./components/PhotoGrid";
import PhotoViewer from "./components/PhotoViewer";
import type { Photo } from "./types";

function App() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [folderSelected, setFolderSelected] = useState(false);

    const handleFilesSelected = useCallback((files: File[]) => {
        const newPhotos: Photo[] = files.map((file) => ({
            id: `${file.webkitRelativePath || file.name}-${file.lastModified}-${file.size}`,
            file,
            name: file.name,
            size: file.size,
            type: file.type,
        }));

        setPhotos(newPhotos);
        setSelectedIndex(null);
        setFolderSelected(true);
    }, []);

    const handleSelectPhoto = useCallback((photo: Photo) => {
        const index = photos.findIndex((item) => item.id === photo.id);
        if (index !== -1) setSelectedIndex(index);
    }, [photos]);

    const handleCloseViewer = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    const handleNavigate = useCallback((index: number) => {
        setSelectedIndex(index);
    }, []);

    return (
        <main className="app">
            <header className="app-header">
                <div>
                    <p className="eyebrow">LOCAL PHOTO LIBRARY</p>
                    <h1>Photo Browser<span>.</span></h1>
                    <p className="subtitle">
                        Your photos. Your device. No uploads.
                    </p>
                </div>

                <FolderPicker onFilesSelected={handleFilesSelected} />
            </header>

            {folderSelected && (
                <section className="library-info">
                    <div>
                        <strong>{photos.length.toLocaleString()}</strong>
                        <span> photos found</span>
                    </div>
                    <p>Images are processed locally in your browser.</p>
                </section>
            )}

            {!folderSelected ? (
                <section className="empty-state">
                    <div className="empty-icon">▧</div>
                    <h2>Select a photo folder</h2>
                    <p>
                        Choose a folder containing your images to start
                        browsing your collection.
                    </p>
                </section>
            ) : photos.length === 0 ? (
                <section className="empty-state">
                    <div className="empty-icon">∅</div>
                    <h2>No supported images found</h2>
                    <p>
                        This folder contains no files with supported image
                        MIME types. Try another folder.
                    </p>
                </section>
            ) : (
                <PhotoGrid
                    photos={photos}
                    onSelect={handleSelectPhoto}
                />
            )}

            <footer className="app-footer">
                <span>VIRTUALIZED PHOTO BROWSER</span>
                <span>LF 2026 · WEB DEV 9</span>
            </footer>

            {selectedIndex !== null && (
                <PhotoViewer
                    photos={photos}
                    selectedIndex={selectedIndex}
                    onClose={handleCloseViewer}
                    onNavigate={handleNavigate}
                />
            )}
        </main>
    );
}

export default App;

