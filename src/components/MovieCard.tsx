// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { rateMovie, addFavorite, removeFavorite } from "../features/movies/moviesSlice";

// export default function MovieCard({ movie }: any) {
  
// const dispatch = useAppDispatch();

//   const rating = useAppSelector((s) => s.movies.ratings[movie.imdbID] || 0);
//   const favorites = useAppSelector((s) => s.movies.favorites);

//   const isFav = favorites.some((f) => f.imdbID === movie.imdbID);
//   const nav = useNavigate();

//   return (
//     <div
//       onClick={() => nav(`/movie/${movie.imdbID}`)}
//       className="
//         bg-white dark:bg-gray-800 
//         rounded-xl overflow-hidden 
//         shadow-md hover:shadow-xl 
//         hover:scale-105 transition duration-300 
//         cursor-pointer 
//         py relative
//       "
//     >
//       <img
//         src={
//             movie.Poster &&movie.Poster !== "N/A"
//             ? movie.Poster 
//             : "https://via.placeholder.com/300"}
//             alt={movie.Title || "Unknown Title"}
//         className="w-full h-60 object-cover"
//       />

//       {/* <div className="p-2">
//         <h2 className="text-sm font-semibold line-clamp-2">
//           {movie.Title}
//         </h2>
//         <p className="text-xs text-gray-500">{movie.Year}</p>
//       </div> */}
//       <h2 className="text-white text-sm font-semibold px-5 py-1">
//               {movie.Title || "Unknown Title"}
//           </h2>

//           <p className="text-gray-400 text-xs px-5 ">
//               {movie.Year}
//           </p>

//            {/* ⭐ Rating */}
//         <div className="flex gap-1">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span
//               key={star}
//               onClick={() =>
//                 dispatch(rateMovie({ id: movie.imdbID, rating: star }))
//               }
//               className={`cursor-pointer text-lg ${
//                 star <= rating ? "text-yellow-400" : "text-gray-500"
//               }`}
//             >
//               ★
//             </span>
//           ))}
//         </div>
       
//        <button
//           onClick={() =>
//             isFav
//               ? dispatch(removeFavorite(movie.imdbID))
//               : dispatch(addFavorite(movie))
//           }
//           className={`w-full py-1 rounded text-sm ${
//             isFav ? "bg-red-500" : "bg-gray-700"
//           }`}
//         >
//           {isFav ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
//         </button>

//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { rateMovie, addFavorite, removeFavorite } from "../features/movies/moviesSlice";

export default function MovieCard({ movie }: any) {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const rating = useAppSelector((s) => s.movies.ratings[movie.imdbID] || 0);
  const favorites = useAppSelector((s) => s.movies.favorites);

  const isFav = favorites.some((f) => f.imdbID === movie.imdbID);

  return (
    <div
      className="bg-gray-900 text-white rounded-xl overflow-hidden shadow hover:scale-105 transition"
    >
      {/* IMAGE */}
      <div onClick={() => nav(`/movie/${movie.imdbID}`)}>
        {/* <img
          src={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title || "No Title"}
          className="w-full h-60 object-cover" */}
        {/* /> */}

        <img
  src={
    movie?.Poster &&
    movie.Poster !== "N/A" &&
    movie.Poster !== "undefined"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Image"
  }
  alt={movie?.Title || "No Title"}
  className="w-full h-60 object-cover"
  onError={(e) => {
    (e.currentTarget as HTMLImageElement).src =
      "https://via.placeholder.com/300x450?text=No+Image";
  }}
/>

      </div>

      {/* CONTENT */}
      <div className="p-3 space-y-2">

        {/* Title */}
        <h2 className="text-sm font-semibold line-clamp-2 h-[40px] leading-tight">
  {movie.Title || "No Title"}
</h2>

        {/* Year */}
        <p className="text-xs text-gray-400">{movie.Year}</p>

        {/* ⭐ Rating */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() =>
                dispatch(rateMovie({ id: movie.imdbID, rating: star }))
              }
              className={`cursor-pointer text-lg ${
                star <= rating ? "text-yellow-400" : "text-gray-500"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* ❤️ Favorite */}
        <button
          onClick={() =>
            isFav
              ? dispatch(removeFavorite(movie.imdbID))
              : dispatch(addFavorite(movie))
          }
          className={`w-full py-1 rounded text-sm ${
            isFav ? "bg-red-500" : "bg-gray-700"
          }`}
        >
          {isFav ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
        </button>

      </div>
    </div>
  );
}


