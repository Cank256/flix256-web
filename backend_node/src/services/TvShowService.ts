const { apiUrl, apiKey } = require('../config/config');
import fetchRequest from '../utils/fetchUtil';

class TvShowServiceClass {
    // Get all trending tv shows
    static async getAllTrendingTvShows(
        period: string = 'week',
        lang: string = 'en-US',
        page: number = 1,
    ) {
        try {
            const response = await fetchRequest(
                `${apiUrl}/trending/tv/${period}?api_key=${apiKey}&lang=${lang}&page=${page}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    // Get all airing today tv shows
    static async getAllAiringTodayTvShows(lang: string = 'en-US', page: number = 1) {
        try {
            const response = await fetchRequest(
                `${apiUrl}/tv/airing_today?api_key=${apiKey}&lang=${lang}&page=${page}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    // Get all on air tv shows
    static async getAllOnAirTvShows(lang: string = 'en-US', page: number = 1) {
        try {
            const response = await fetchRequest(
                `${apiUrl}/tv/on_the_air?api_key=${apiKey}&lang=${lang}&page=${page}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    // Get all popular tv shows
    static async getAllPopularTvShows(lang: string = 'en-US', page: number = 1) {
        try {
            const response = await fetchRequest(
                `${apiUrl}/tv/popular?api_key=${apiKey}&lang=${lang}&page=${page}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    // Get all top rated tv shows
    static async getAllTopRatedTvShows(lang: string = 'en-US', page: number = 1) {
        try {
            const response = await fetchRequest(
                `${apiUrl}/tv/top_rated?api_key=${apiKey}&lang=${lang}&page=${page}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    // Get tv show details
    static async getTvShow(id: string, lang: string = 'en-US') {
        try {
            const response = await fetchRequest(
                `${apiUrl}/tv/${id}?api_key=${apiKey}&lang=${lang}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    // Get tv show episodes
    static async getTvShowEpisodes(tvShowId: number, season: number = 1, lang: string = 'en-US') {
        try {
            const url = `${apiUrl}/tv/${tvShowId}/season/${season}?api_key=${apiKey}&language=${lang}&append_to_response=videos,credits,images,external_ids,release_dates`;
            const response = await fetchRequest(url)
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }
}

module.exports = TvShowServiceClass;