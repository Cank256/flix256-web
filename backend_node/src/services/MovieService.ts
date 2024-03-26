const { apiUrl, apiKey } = require('../config/config');
import fetchRequest from '../utils/fetchUtil';

class MoviesServiceClass {
    // Get all trending movies
    static async getAllTrendingMovies(
        period: string = 'week',
        lang: string = 'en-US',
        page: number = 1,
    ) {
        try {
            const response = await fetchRequest(
                `${apiUrl}/trending/movie/${period}?api_key=${apiKey}&lang=${lang}&page=${page}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    // Get all now playing movies
    static async getAllNowPlayingMovies(
        lang: string = 'en-US',
        page: number = 1,
    ) {
        try {
            const response = await fetchRequest(
                `${apiUrl}/movie/now_playing?api_key=${apiKey}&lang=${lang}&page=${page}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    // Get all upcoming movies
    static async getAllUpcomingMovies(
        lang: string = 'en-US',
        page: number = 1,
    ) {
        try {
            const response = await fetchRequest(
                `${apiUrl}/movie/upcoming?api_key=${apiKey}&lang=${lang}&page=${page}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    // Get all popular movies
    static async getAllPopularMovies(lang: string = 'en-US', page: number = 1) {
        try {
            const response = await fetchRequest(
                `${apiUrl}/movie/popular?api_key=${apiKey}&lang=${lang}&page=${page}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    // Get all top rated movies
    static async getAllTopRatedMovies(
        lang: string = 'en-US',
        page: number = 1,
    ) {
        try {
            const response = await fetchRequest(
                `${apiUrl}/movie/top_rated?api_key=${apiKey}&lang=${lang}&page=${page}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    // Get a single movie by ID
    static async getMovie(id: number, lang: string = 'en-US') {
        try {
            const response = await fetchRequest(
                `${apiUrl}/movie/${id}?api_key=${apiKey}&append_to_response=videos,credits,images,external_ids,release_dates&lang=${lang}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    // Get recommended movies for a user
    static async getRecommendations(
        id: number,
        lang: string = 'en-US',
        page: number = 1,
    ) {
        try {
            const response = await fetchRequest(
                `${apiUrl}/movie/${id}/recommendations?api_key=${apiKey}&lang=${lang}&page=${page}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }
}

module.exports = MoviesServiceClass
