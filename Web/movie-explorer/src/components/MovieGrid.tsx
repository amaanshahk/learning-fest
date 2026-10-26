import type { Movie } from "../types";
import MovieCard from "./MovieCard";

interface MovieGridProps {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
}

export default function MovieGrid({
    movies,
    onSelect,
}: MovieGridProps) {
    if (movies.length === 0) {
        return (
            <p className="empty-state">
                No movies found. Try another search.
            </p>
        );
    }

    return (
        <section className="movie-grid" aria-label="Movie collection">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelect={onSelect}
                />
            ))}
        </section>
    );
}
