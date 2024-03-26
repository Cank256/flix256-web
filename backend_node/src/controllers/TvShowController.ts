const TvShowService = require('../services/TvShowService')
import Favorite from '../models/Favorites'

class TvShowControllerClass {
    // Get all trending tv shows
    static async getAllTrendingTvShows(req: any, res: any) {
        try {
            const { period, lang, page } = req.query
            const data = await TvShowService.getAllTrendingTvShows(
                period,
                lang,
                page,
            )
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get all airing today tv shows
    static async getAllAiringTodayTvShows(req: any, res: any) {
        try {
            const { lang, page } = req.query
            const data = await TvShowService.getAllAiringTodayTvShows(
                lang,
                page,
            )
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get all on air tv shows
    static async getAllOnAirTvShows(req: any, res: any) {
        try {
            const { lang, page } = req.query
            const data = await TvShowService.getAllOnAirTvShows(lang, page)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get all popular tv shows
    static async getAllPopularTvShows(req: any, res: any) {
        try {
            const { lang, page } = req.query
            const data = await TvShowService.getAllPopularTvShows(lang, page)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get all top rated tv shows
    static async getAllTopRatedTvShows(req: any, res: any) {
        try {
            const { lang, page } = req.query
            const data = await TvShowService.getAllTopRatedTvShows(lang, page)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get tv show details
    static async getTvShow(req: any, res: any) {
        try {
            const { id } = req.params
            const data = await TvShowService.getTvShow(id)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get tv show episodes
    static async getTvShowEpisodes(req: any, res: any) {
        try {
            let { tv_show_id, season, lang } = req.query
            const data = await TvShowService.getTvShowEpisodes(
                tv_show_id,
                season,
                lang,
            )
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get recommended tv shows
    static async getRecommendations(req: any, res: any) {
        const { user_id, tv_show_id, lang, page } = req.query // Notice the switch to query parameters
        let recommendations = []
        let seenTvShowIds = new Set() // Used to filter out duplicate recommendations

        try {
            if (user_id) {
                const getFavorites = await Favorite.find({
                    user_id,
                    fav_type: 'tv',
                })

                if (getFavorites.length === 0) {
                    return res
                        .status(404)
                        .json({
                            message:
                                'First add favorite tv shows to get recommendations',
                        })
                }

                for (const favorite of getFavorites) {
                    const recommendedTVvShows =
                        await TvShowService.getRecommendations(
                            favorite.id,
                            lang,
                            page,
                        )
                    if (
                        recommendedTVvShows &&
                        recommendedTVvShows.results.length > 0
                    ) {
                        recommendedTVvShows.results.forEach((tv_show) => {
                            if (!seenTvShowIds.has(tv_show.id)) {
                                recommendations.push(tv_show)
                                seenTvShowIds.add(tv_show.id)
                            }
                        })
                    }
                }
            } else if (tv_show_id) {
                const recommendedTVvShows =
                    await TvShowService.getRecommendations(
                        tv_show_id,
                        lang,
                        page,
                    )
                if (recommendedTVvShows && recommendedTVvShows.results) {
                    recommendations = recommendedTVvShows.results.filter(
                        (tv_show) => !seenTvShowIds.has(tv_show.id),
                    )
                }
            } else {
                return res
                    .status(400)
                    .json({
                        message:
                            'Invalid request. Provide either user_id or tv_show_id',
                    })
            }

            if (recommendations.length > 0) {
                res.status(200).json(recommendations)
            } else {
                res.status(404).json({ message: 'No recommendations found' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = TvShowControllerClass
