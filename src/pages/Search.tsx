import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchSearchMovies } from "../features/movies/moviesSlice";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

export default function Search() {
    const dispatch = useAppDispatch();
    const { searchResults, loading } = useAppSelector((s) => s.movies);
    const [year, setYear] = useState("");
    const [query, setQuery] = useState("");

    const cleanMovies = searchResults.filter(
        (m) => m.Title && m.Poster && m.Poster !== "N/A"
    );

    {
        cleanMovies.map((m) => (
            <MovieCard key={m.imdbID} movie={m} />
        ))
    }
    //   <SearchBar onSearch={setQuery} onYear={setYear} />
    // 🔥 debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length > 2) {
                dispatch(fetchSearchMovies({ query, year }));
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [query, year]);
    return (
        <div className="p-6 max-w-6xl mx-auto">

            {/* 🔍 Search */}
            <SearchBar onSearch={setQuery} onYear={setYear} />

            {/* ⏳ Loading */}
            {loading && <p className="mt-4 text-gray-500">Loading...</p>}

            {!loading && searchResults.length === 0 && query.length > 2 && (
                <p className="text-center mt-6 text-gray-400">
                    No movies found
                </p>
            )}


            {/* 🎬 Movies Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {searchResults.map((m) => (
                    <MovieCard key={m.imdbID} movie={m} />
                ))}
            </div>
        </div>
    );
}