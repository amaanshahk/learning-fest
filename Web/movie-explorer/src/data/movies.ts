import type { Movie } from "../types";

export const movies: Movie[] = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genre: ["Sci-Fi", "Action"],
        rating: 8.8,
        poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        overview: "A skilled thief enters people's dreams to steal secrets and attempts an almost impossible mission: planting an idea.",
        runtime: 148,
        director: "Christopher Nolan"
    },
    {
        id: 2,
        title: "Interstellar",
        year: 2014,
        genre: ["Sci-Fi", "Drama"],
        rating: 8.7,
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        overview: "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",
        runtime: 169,
        director: "Christopher Nolan"
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        genre: ["Action", "Crime"],
        rating: 9.0,
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        overview: "Batman faces the Joker, a criminal mastermind determined to plunge Gotham into chaos.",
        runtime: 152,
        director: "Christopher Nolan"
    },
    {
        id: 4,
        title: "Parasite",
        year: 2019,
        genre: ["Thriller", "Drama"],
        rating: 8.5,
        poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        overview: "A struggling family becomes entangled with a wealthy household, leading to unexpected consequences.",
        runtime: 132,
        director: "Bong Joon-ho"
    },
    {
        id: 5,
        title: "Spider-Man: Into the Spider-Verse",
        year: 2018,
        genre: ["Animation", "Action"],
        rating: 8.4,
        poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        overview: "Miles Morales discovers a multiverse of Spider-heroes and learns what it means to be a hero.",
        runtime: 117,
        director: "Bob Persichetti, Peter Ramsey and Rodney Rothman"
    },
    {
        id: 6,
        title: "Dune: Part Two",
        year: 2024,
        genre: ["Sci-Fi", "Adventure"],
        rating: 8.5,
        poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.",
        runtime: 166,
        director: "Denis Villeneuve"
    }
];
