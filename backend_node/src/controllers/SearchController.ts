const searchService = require('../services/SearchService')

class SearchControllerClass {
    static async search(req: any, res: any) {
        const { query, page } = req.query
        try {
            const data = await searchService.search(query, page)
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

module.exports = SearchControllerClass
