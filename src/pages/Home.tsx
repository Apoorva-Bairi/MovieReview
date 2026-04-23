import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchSearchMovies } from "../features/movies/moviesSlice";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const dispatch = useAppDispatch();
  const { searchResults, loading } = useAppSelector((s) => s.movies);

  useEffect(() => {
    dispatch(fetchSearchMovies({ query: "avengers", year: "2019" })); // default movies
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        🎬 Popular Movies
      </h1>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {searchResults.map((m) => (
          <MovieCard key={m.imdbID} movie={m} />
        ))}
      </div>
      {/* {!loading && searchResults.length === 0 && (
        <p className="text-gray-400 mt-6 text-center">
          No movies available
        </p>
      )} */}

    </div>
  );
}