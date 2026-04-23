// const API = import.meta.env.VITE_OMDB_API_KEY;

export const searchMovies = async (query: string, year?: string) => {
  const API = import.meta.env.VITE_OMDB_API_KEY;

  const url = year
    ? `https://www.omdbapi.com/?apikey=${API}&s=${query}&y=${year}`
    : `https://www.omdbapi.com/?apikey=${API}&s=${query}`;

  const res = await fetch(url);
  return res.json();
};

export const getMovieDetails = async (id: string) => {
  const API = import.meta.env.VITE_OMDB_API_KEY;
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API}&i=${id}`
  );
  return res.json();
};



console.log("API KEY:", import.meta.env.VITE_OMDB_API_KEY);