export interface Photo {
    id: string;
    file: File;
    name: string;
    size: number;
    type: string;
    width?: number;
    height?: number;
    objectUrl?: string;
}
