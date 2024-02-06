import { type AxiosResponse } from "axios";
import axios from '~/store/axios'
import { defineStore } from "pinia";

// Define types for different lists
interface List {
    title: string;
    query: string;
}

interface Params {
    [key: string]: any;
}

// Define lists for movies and TV shows
const lists: Record<string, List[]> = {
    movie: [
        { title: 'Trending Movies', query: 'trending' },
        { title: 'Popular Movies', query: 'popular' },
        { title: 'Top Rated Movies', query: 'top_rated' },
        { title: 'Upcoming Movies', query: 'upcoming' },
        { title: 'Now Playing Movies', query: 'now_playing' },
    ],
    tv: [
        { title: 'Trending TV Shows', query: 'trending' },
        { title: 'Popular TV Shows', query: 'popular' },
        { title: 'Top Rated TV Shows', query: 'top_rated' },
        { title: 'Currently Airing TV Shows', query: 'on_the_air' },
        { title: 'TV Shows Airing Today', query: 'airing_today' },
    ],
};

export const apiImgUrl: string | undefined = process.env.tmdbImageUrl || 'https://image.tmdb.org/t/p';

export const useBackendStore = defineStore("backendStore", {
    state: () => ({}),

	actions: {
        getListItem(type: string, query: string): List | undefined {
            const list = lists[type];
            return list ? list.find((item) => item.query === query) : undefined;
        },

		getMovies(query: string, params: Params): Promise<AxiosResponse> {
            return axios.get(`/movies/${query}`, { params });
        },

		getMovie(id: string): Promise<AxiosResponse> {
            return axios.get(`/movies/${id}`);
        },

        // Function to get recommended movies for a user
        getMoviesRecommended(userId: string, params: Params): Promise<AxiosResponse> {
            return axios.get(`/movies/recommended/${userId}`, {params});
        },
        
        // Function to get TV shows listing
        getTvShows(query: string, params: Params): Promise<AxiosResponse> {
            return axios.get(`/tv/${query}`, {params});
        },
        
        // Function to get a single TV show
        getTvShow(id: string): Promise<AxiosResponse> {
            return axios.get(`/tv/${id}`);
        },
        
        // Function to get recommended TV shows for a user
        getTvsShowRecommended(userId: string, params: Params): Promise<AxiosResponse> {
            return axios.get(`/tv/recommended${userId}`, {params});
        },
        
        // Function to search for movies, TV shows, and people
        search(query: string, page = 1): Promise<AxiosResponse> {
            return axios.get(`/search/multi`, {
                params: {
                    query,
                },
            });
        },
    }
});
