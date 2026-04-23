import { useAppDispatch, useAppSelector } from "../app/hooks";
import { rateMovie } from "../features/movies/moviesSlice";

export default function StarRating({ movieId }: any) {
  const dispatch = useAppDispatch();
  const rating = useAppSelector((s) => s.movies.ratings[movieId] || 0);

  return (
    <div className="flex gap-1 text-xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() =>
            dispatch(rateMovie({ id: movieId, rating: star }))
          }
          className={`cursor-pointer ${
            star <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}