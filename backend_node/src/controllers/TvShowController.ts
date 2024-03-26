const TvShowService = require('../services/TvShowService');

class TvShowControllerClass {
    // Get all trending tv shows
    static async getAllTrendingTvShows(req: any, res: any) {
        try {
            const { period, lang, page } = req.query;
            const data = await TvShowService.getAllTrendingTvShows(period, lang, page);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get all airing today tv shows
    static async getAllAiringTodayTvShows(req: any, res: any) {
        try {
            const { lang, page } = req.query;
            const data = await TvShowService.getAllAiringTodayTvShows(lang, page);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get all on air tv shows
    static async getAllOnAirTvShows(req: any, res: any) {
        try {
            const { lang, page } = req.query;
            const data = await TvShowService.getAllOnAirTvShows(lang, page);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get all popular tv shows
    static async getAllPopularTvShows(req: any, res: any) {
        try {
            const { lang, page } = req.query;
            const data = await TvShowService.getAllPopularTvShows(lang, page);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get all top rated tv shows
    static async getAllTopRatedTvShows(req: any, res: any) {
        try {
            const { lang, page } = req.query;
            const data = await TvShowService.getAllTopRatedTvShows(lang, page);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get tv show details
    static async getTvShow(req: any, res: any) {
        try {
            const { id } = req.params;
            const data = await TvShowService.getTvShow(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get tv show episodes
    static async getTvShowEpisodes(req: any, res: any) {
        try {
            let { tv_show_id, season, lang } = req.query;
            const data = await TvShowService.getTvShowEpisodes(tv_show_id, season, lang);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = TvShowControllerClass;
