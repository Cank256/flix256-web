const MovieService = require('../services/MovieService')
import Favorite from '../models/Favorites'

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

    // Get recommended movies
    static async getRecommendations(req: any, res: any) {
        const { user_id, movie_id, lang, page } = req.query; // Notice the switch to query parameters
        let recommendations = [];
        let seenMovieIds = new Set(); // Used to filter out duplicate recommendations
    
        try {
            if (user_id) {
                const getFavorites = await Favorite.find({ user_id, fav_type: 'movie' });
    
                if (getFavorites.length === 0) {
                    return res.status(404).json({ message: 'First add favorite movies to get recommendations' });
                }
    
                for (const favorite of getFavorites) {
                    const recommendedMovies = await MovieService.getRecommendations(favorite.id, lang, page);
                    if (recommendedMovies && recommendedMovies.results.length > 0) {
                        recommendedMovies.results.forEach(movie => {
                            if (!seenMovieIds.has(movie.id)) {
                                recommendations.push(movie);
                                seenMovieIds.add(movie.id);
                            }
                        });
                    }
                }
            } else if (movie_id) {
                const recommendedMovies = await MovieService.getRecommendations(movie_id, lang, page);
                if (recommendedMovies && recommendedMovies.results) {
                    recommendations = recommendedMovies.results.filter(movie => !seenMovieIds.has(movie.id));
                }
            } else {
                return res.status(400).json({ message: 'Invalid request. Provide either user_id or movie_id' });
            }
    
            if (recommendations.length > 0) {
                res.status(200).json(recommendations);
            } else {
                res.status(404).json({ message: 'No recommendations found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = MovieControllerClass
