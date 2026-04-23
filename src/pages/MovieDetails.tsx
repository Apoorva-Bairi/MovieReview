import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchMovieDetails,
  addFavorite,
  removeFavorite,
} from "../features/movies/moviesSlice";
import StarRating from "../components/StarRating";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const movie = useAppSelector((s) => s.movies.selected);
  const favorites = useAppSelector((s) => s.movies.favorites);

  useEffect(() => {
    if (id) dispatch(fetchMovieDetails(id));
  }, [id]);

  if (!movie) return <p className="p-6">Loading...</p>;

  const isFav = favorites.some((f) => f.imdbID === movie.imdbID);

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* 🔙 Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-300 rounded"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">

        {/* Poster */}
        <img
          src={movie.Poster}
          className="w-64 rounded shadow"
        />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold">{movie.Title}</h1>

          <p className="text-gray-500 mt-1">{movie.Year}</p>

          <p className="mt-3"><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>

          <p className="mt-4">{movie.Plot}</p>

          {/* ⭐ Rating */}
          <div className="mt-4">
            <h2 className="font-semibold">Your Rating:</h2>
            <StarRating movieId={movie.imdbID} />
          </div>

          {/* ❤️ Favorites */}
          <button
            onClick={() =>
              isFav
                ? dispatch(removeFavorite(movie.imdbID))
                : dispatch(addFavorite(movie))
            }
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            {isFav ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
          </button>

        </div>
      </div>
    </div>
  );
}