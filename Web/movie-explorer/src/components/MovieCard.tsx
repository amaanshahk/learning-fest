import type { Movie } from "../types";

interface MovieCardProps {
    movie: Movie;
    onSelect: (movie: Movie) => void;
}

export default function MovieCard({
    movie,
    onSelect,
}: MovieCardProps) {
    return (
        <article
            className="movie-card"
            onClick={() => onSelect(movie)}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(movie);
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${movie.title}`}
        >
            <div className="poster-wrapper">
                <img
                    className="movie-poster"
                    src={movie.poster}
                    alt={`${movie.title} poster`}
                    loading="lazy"
                />
                <span className="rating">★ {movie.rating.toFixed(1)}</span>
            </div>

            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p className="movie-meta">
                    {movie.year} · {movie.genre.join(" / ")}
                </p>
            </div>
        </article>
    );
}
