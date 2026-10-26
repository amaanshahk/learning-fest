
import { useMemo, useState } from "react";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import { movies } from "./data/movies";
import type { Movie } from "./types";

const PALINDROME_SEED = "NEVERODDEVEN";

function seededIndex(value: string, length: number): number {
    let hash = 0;

    for (const character of value) {
        hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
    }

    return hash % length;
}

function App() {
    const [query, setQuery] = useState("");
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const filteredMovies = useMemo(() => {
        const search = query.trim().toLowerCase();

        if (!search) return movies;

        return movies.filter((movie) =>
            [
                movie.title,
                movie.year.toString(),
                movie.director,
                ...movie.genre,
            ].some((field) => field.toLowerCase().includes(search))
        );
    }, [query]);

    const accent = useMemo(() => {
        const accents = ["#d8ff64", "#ffb4a2", "#b9adff", "#9ee7e5"];
        return accents[seededIndex(PALINDROME_SEED, accents.length)];
    }, []);

    return (
        <main className="app-shell" style={{ "--accent": accent } as React.CSSProperties}>
            <header className="site-header">
                <a className="brand" href="#" aria-label="Palindrome Films home">
                    <span className="brand-mark">P</span>
                    <span className="brand-light">FILMS</span>
                </a>

                <span className="header-note">
                    A COLLECTION IN BALANCE <span>↔</span>
                </span>
            </header>

            <section className="hero">
                <div className="hero-copy">
                    <p className="eyebrow">
                        <span className="status-dot" />
                        THE CINEMA INDEX · 00{movies.length}
                    </p>

                    <h1>
                        Stories worth
                        <br />
                        <span>seeing twice.</span>
                    </h1>

                    <p className="hero-description">
                        A considered collection of films, from impossible
                        dreams to distant worlds. Pick a title and look closer.
                    </p>
                </div>

                <div className="hero-symbol" aria-hidden="true">
                    <div className="symbol-ring ring-outer" />
                    <div className="symbol-ring ring-inner" />
                    <span>NEVER</span>
                    <span>ODD</span>
                    <span>EVEN</span>
                    <div className="symbol-axis" />
                </div>
            </section>

            <section className="collection-section">
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">01 / THE COLLECTION</p>
                        <h2>Find your next favourite.</h2>
                    </div>

                    <span className="movie-total">
                        {filteredMovies.length.toString().padStart(2, "0")} FILMS
                    </span>
                </div>

                <label className="search-box">
                    <span aria-hidden="true">⌕</span>
                    <input
                        type="search"
                        placeholder="Search films, genres, directors..."
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        aria-label="Search movies"
                    />
                    <kbd>/</kbd>
                </label>

                <MovieGrid
                    movies={filteredMovies}
                    onSelect={setSelectedMovie}
                />
            </section>

            <footer className="site-footer">
                <span>FILMS</span>
                <span>LF 2026 · WEB DEV 7</span>
            </footer>

            {selectedMovie && (
                <MovieDetails
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </main>
    );
}

export default App;
	
