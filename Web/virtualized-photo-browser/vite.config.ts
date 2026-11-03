import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/learning-fest/virtualized-photo-browser/",
    build: {
        cssMinify: false,
    },
});
