const favoriteService = require('../services/FavoriteService')

class FavoriteControllerClass {
    static async addFavorite(req: any, res: any) {
        try {
            const favorite = await favoriteService.addFavorite(req.body)
            res.status(201).json(favorite)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    static async getFavorites(req: any, res: any) {
        try {
            const favorites = await favoriteService.getFavorites(
                req.params.user_id,
            )
            res.status(200).json(favorites)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    static async removeFavorite(req: any, res: any) {
        const { favorite_id, user_id } = req.body
        try {
            await favoriteService.removeFavorite(favorite_id, user_id)
            res.status(204).end()
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

module.exports = FavoriteControllerClass
