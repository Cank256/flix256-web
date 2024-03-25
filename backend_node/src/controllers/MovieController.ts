const MovieService = require('../services/MovieService')

class MovieControllerClass {
    // Get all trending movies
    static async getAllTrendingMovies(req: any, res: any) {
        try {
            const movies = await MovieService.getAllTrendingMovies()
            res.status(200).json(movies)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get all now playing movies
    static async getAllNowPlayingMovies(req: any, res: any) {
        try {
            const movies = await MovieService.getAllNowPlayingMovies()
            res.status(200).json(movies)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get all upcoming movies
    static async getAllUpcomingMovies(req: any, res: any) {
        try {
            const movies = await MovieService.getAllUpcomingMovies()
            res.status(200).json(movies)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get all popular movies
    static async getAllPopularMovies(req: any, res: any) {
        try {
            const movies = await MovieService.getAllPopularMovies()
            res.status(200).json(movies)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get all top rated movies
    static async getAllTopRatedMovies(req: any, res: any) {
        try {
            const movies = await MovieService.getAllTopRatedMovies()
            res.status(200).json(movies)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get a single movie by ID
    static async getMovie(req: any, res: any) {
        try {
            const movie = await MovieService.getMovie(req.params.id)
            if (movie) {
                res.status(200).json(movie)
            } else {
                res.status(404).json({ message: 'Movie not found' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = MovieControllerClass
