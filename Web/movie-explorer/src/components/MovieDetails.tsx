import type { Movie } from "../types";

interface MovieDetailsProps {
    movie: Movie;
    onClose: () => void;
}

export default function MovieDetails({
    movie,
    onClose,
}: MovieDetailsProps) {
    return (
        <div
            className="modal-backdrop"
            onClick={onClose}
            role="presentation"
        >
            <section
                className="movie-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="movie-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="close-button"
                    onClick={onClose}
                    aria-label="Close movie details"
                >
                    ×
                </button>

                <div className="modal-layout">
                    <img
                        className="modal-poster"
                        src={movie.poster}
                        alt={`${movie.title} poster`}
                    />

                    <div className="modal-content">
                        <h2 id="movie-title">{movie.title}</h2>

                        <p className="modal-meta">
                            {movie.year} · {movie.runtime} min · ★{" "}
                            {movie.rating.toFixed(1)}
                        </p>

                        <div className="genre-list">
                            {movie.genre.map((genre) => (
                                <span key={genre} className="genre-pill">
                                    {genre}
                                </span>
                            ))}
                        </div>

                        <p className="movie-overview">{movie.overview}</p>

                        <p className="director">
                            <strong>Director</strong>
                            <span>{movie.director}</span>
                        </p>

                        <button
                            className="primary-button"
                            onClick={onClose}
                        >
                            Back to collection <span>↗</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
