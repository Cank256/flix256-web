import axios from 'axios';

/**
 * API url
 */
const backendUrl = process.env.BACKEND_URL;

/**
 * Image url
 */
export const apiImgUrl = process.env.TMDB_IMAGE_URL;

/**
 * Get movies (listing)
 */
export function getMovies (query) {
  return new Promise((resolve, reject) => {
    axios.get(`${backendUrl}/movies/${query}`)
    .then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get movie (single)
 */
export function getMovie (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${backendUrl}/movies/${id}`)
    .then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get movies recommended (for user)
 */
export function getMoviesRecommended (userId) {
  return new Promise((resolve, reject) => {
    axios.get(`${backendUrl}/movies/recommended/${userId}`)
    .then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get TV shows (listing)
 */
export function getTvShows (query) {
  return new Promise((resolve, reject) => {
    axios.get(`${backendUrl}/tv/${query}`)
    .then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get TV show (single)
 */
export function getTvShow (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${backendUrl}/tv/${id}`)
    .then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get TV shows recommended (for user)
 */
export function getTvsShowRecommended (userId, page = 1) {
  return new Promise((resolve, reject) => {
    axios.get(`${backendUrl}/tv/recommended${userId}`)
    .then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Search (searches movies, tv and people)
 */
export function search (query, page = 1) {
  return new Promise((resolve, reject) => {
    axios.get(`${backendUrl}/search/multi`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
        query,
        page,
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};
