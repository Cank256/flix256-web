import Favorite from '../models/Favorites'

class FavoriteServiceClass {
    // Add a movie or tv show to favorites
    static async addFavorite(data: any) {
        try {
            const favorite = new Favorite(data)
            await favorite.save()
            return favorite
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // Get all favorite movies and tv shows
    static async getFavorites(user_id: string) {
        try {
            const favorites = await Favorite.find({ user_id: user_id })
            return favorites
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // Remove a movie or tv show from favorites
    static async removeFavorite(favorite_id: string, user_id: string) {
        try {
            await Favorite.deleteOne({ _id: favorite_id, user_id: user_id })
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = FavoriteServiceClass
