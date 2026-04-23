import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Movie, MovieDetail } from "./types";

const API = import.meta.env.VITE_OMDB_API_KEY;

interface MovieState {
  searchResults: Movie[];
  selected: MovieDetail | null;
  loading: boolean;
  error: string | null;

  // ⭐ User rating
  ratings: { [key: string]: number };

  // ❤️ Favorites
  favorites: MovieDetail[];
}

const initialState: MovieState = {
  searchResults: [],
  selected: null,
  loading: false,
  error: null,
  ratings: {},
  favorites: [],
};



// # 🔍 SEARCH (with year filter)

export const fetchSearchMovies = createAsyncThunk<
  Movie[],
  { query: string; year?: string }
>("movies/search", async ({ query, year }) => {
  try {
    const url = year
      ? `https://www.omdbapi.com/?apikey=${API}&s=${query}&y=${year}`
      : `https://www.omdbapi.com/?apikey=${API}&s=${query}`;

    const res = await fetch(url);
    const data = await res.json();

    return data.Response === "True" ? data.Search : [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
});



// # 🎬 MOVIE DETAILS

export const fetchMovieDetails = createAsyncThunk<MovieDetail, string>(
  "movies/details",
  async (id) => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API}&i=${id}`
    );
    return (await res.json()) as MovieDetail;
  }
);



// # 🎯 SLICE

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // ⭐ Rate movie
    rateMovie: (
      state,
      action: PayloadAction<{ id: string; rating: number }>
    ) => {
      state.ratings[action.payload.id] = action.payload.rating;
    },

    // ❤️ Add favorite
    addFavorite: (state, action: PayloadAction<MovieDetail>) => {
      const exists = state.favorites.find(
        (m) => m.imdbID === action.payload.imdbID
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },

    // ❌ Remove favorite
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (m) => m.imdbID !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔍 Search
      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Search failed";
      })

      // 🎬 Details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch details";
      });
  },
});



export const { rateMovie, addFavorite, removeFavorite } =
  movieSlice.actions;

export default movieSlice.reducer;