const { apiUrl, apiKey } = require('../config/config');
import fetchRequest from '../utils/fetchUtil';

class SearchServiceClass {
    // Search for movies, tv shows, and people
    static async search(query: string, page: number = 1) {
        try {
            const response = await fetchRequest(
                `${apiUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`,
            )
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }
}

module.exports = SearchServiceClass
