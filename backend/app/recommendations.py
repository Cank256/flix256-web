from app import api_only_limit, app, limiter, mongo, TMDB_API_KEY, TMDB_URL
from flask import jsonify, request
from flask_cors import cross_origin
import requests


# Access the favorites collections
favorites = mongo.db.favorites


@app.route('/api/movies/recommended', methods=['GET'], endpoint='api_recommended_movies')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@app.route('/movies/recommended', methods=['GET'])
def get_movie_recommendations():
    """
    Fetches movie recommendations for a specific user based on their favorite
    movies or a movie_id that is passed.

    Optional paramters can be passed as well
    - `user_id`: The ID of the user to fetch recommendations for.
    - `movie_id`: The ID of the movie to fetch recommendations for.
    - `page`: Which page of results should be returned? Default: 1.
    - `lang`: The language to return the recommendations in. Default: 'en'.

    Returns:
        list: A list of recommended movies from TMDB, filtered to avoid
        duplicates.
    """
    user_id = request.args.get('user_id', None)
    movie_id = request.args.get('movie_id', None)
    language = request.args.get('language', 'en')
    page = request.args.get('page', 1)

    if user_id:
        movie_favorites = favorites.find({'user_id': user_id, 'fav_type': 'movie'})
        movie_recommendations = []
        seen_movie_ids = set()

        if movie_favorites.count() < 1:
            return jsonify({
                'error': 'First add favorite movies to get recommendations'
            }), 422

        for favorite in movie_favorites:
            tmdb_id = favorite['fav_id']
            tmdb_url = f"{TMDB_URL}/movie/{tmdb_id}/recommendations?api_key={TMDB_API_KEY}&lang={language}&page={page}"
            response = requests.get(tmdb_url)

            if response.status_code == 200:
                data = response.json()
                if data['total_results'] > 0:
                    for rec in data['results']:
                        if rec['id'] not in seen_movie_ids:
                            movie_recommendations.append(rec)
                            seen_movie_ids.add(rec['id'])
            else:
                return jsonify({
                    'error': 'No recommendations or API error'
                }), 500

    else:
        tmdb_url = f"{TMDB_URL}/movie/{movie_id}/recommendations?api_key={TMDB_API_KEY}&lang={language}&page={page}"
        response = requests.get(tmdb_url)

        if response.status_code == 200:
            data = response.json()
            movie_recommendations = data['results']
        else:
            return jsonify({
                'error': 'No recommendations or API error'
            }), 500

    if len(movie_recommendations) > 0:
        return jsonify(movie_recommendations), 200
    else:
        return jsonify({
            'error': 'No Movie recommendations obtained, select more favorites'
        }), 500


@app.route('/api/tv/recommended/<user_id>', methods=['GET'], endpoint='api_recommended_tv_shows')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@app.route('/tv/recommended', methods=['GET'])
def get_tv_recommendations():
    """
    Fetches TV show recommendations for a specific user based on their
    favorite TV shows.

    Optional paramters can be passed as well
    - `user_id`: The ID of the user to fetch recommendations for.
    - `tv_show_id`: The ID of the tv show to fetch recommendations for.
    - `page`: Which page of results should be returned? Default: 1.
    - `lang`: The language to return the recommendations in. Default: 'en'.

    Returns:
        list: A list of recommended TV shows from TMDB, filtered to avoid
        duplicates.
    """
    user_id = request.args.get('user_id')
    tv_show_id = request.args.get('tv_show_id')
    language = request.args.get('language', 'en')
    page = request.args.get('page', 1)

    if user_id:
        tv_favorites = favorites.find({'user_id': user_id, 'fav_type': 'tv'})
        tv_recommendations = []
        seen_tv_ids = set()

        if tv_favorites.count() < 1:
            return jsonify({
                'error': 'First add favorite Tv shows to get recommendations'
                }), 422

        for favorite in tv_favorites:
            tmdb_id = favorite['fav_id']
            tmdb_url = f"{TMDB_URL}/tv/{tmdb_id}/recommendations?api_key={TMDB_API_KEY}&lang={language}&page={page}"
            response = requests.get(tmdb_url)

            if response.status_code == 200:
                data = response.json()
                print(data['total_results'])
                if data['total_results'] > 0:
                    for rec in data['results']:
                        if rec['id'] not in seen_tv_ids:
                            tv_recommendations.append(rec)
                            seen_tv_ids.add(rec['id'])
            else:
                return jsonify({'error': 'No recommendations or API error'}), 500
    else:
        tmdb_url = f"{TMDB_URL}/tv/{tv_show_id}/recommendations?api_key={TMDB_API_KEY}&lang={language}&page={page}"
        response = requests.get(tmdb_url)

        if response.status_code == 200:
            data = response.json()
            tv_recommendations = data['results']
        else:
            return jsonify({
                'error': 'No recommendations or API error'
            }), 500
    if len(tv_recommendations) > 0:
        return jsonify(tv_recommendations), 200
    else:
        return jsonify({
            'error': 'No TV show recommendations obtained. Choose more favorites'
        }), 500


@app.route('/api/recommended/<user_id>', methods=['GET'], endpoint='api_recommendations')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@app.route('/recommended/<user_id>', methods=['GET'])
def get_movie_tv_recommendations(user_id):
    """
    Fetches a combined list of movie and TV show recommendations for a specific
    user.

    Args:
        user_id (str): The user's unique identifier (required).

    Optional paramters can be passed as well
    1. page: page number
    2. lang: language

    Returns:
        list: A merged and alternating list of movie and TV show
        recommendations from TMDB.
    """
    language = request.args.get('language', 'en')
    page = request.args.get('page', 1)
    
    user_favorites = favorites.find({'user_id': user_id})
    favorites_list = list(user_favorites)

    movie_recommendations = []
    tv_recommendations = []
    seen_movie_recommendations = set()
    seen_tv_recommendations = set()

    if user_favorites.count() < 1:
        return jsonify({
            'error': 'First add favorite Movies and Tv shows to get recommendations'
        }), 422

    for favorite in favorites_list:
        tmdb_id = favorite['fav_id']
        fav_type = favorite['fav_type']  # 'movie' or 'tv'
        tmdb_url = f"{TMDB_URL}/{fav_type}/{tmdb_id}/recommendations?api_key={TMDB_API_KEY}&lang={language}&page={page}"

        response = requests.get(tmdb_url)
        if response.status_code == 200:
            tmdb_recommendations = response.json().get('results', [])
            for rec in tmdb_recommendations:
                rec_id = rec.get('id')
                if fav_type == 'movie' and rec_id not in seen_movie_recommendations:
                    movie_recommendations.append(rec)
                    seen_movie_recommendations.add(rec_id)
                elif fav_type == 'tv' and rec_id not in seen_tv_recommendations:
                    tv_recommendations.append(rec)
                    seen_tv_recommendations.add(rec_id)

    # Merge recommendations, alternating between movie and tv
    combined_recommendations = []
    for movie, tv in zip(movie_recommendations, tv_recommendations):
        combined_recommendations.extend([movie, tv])

    # Add remaining recommendations if one list is longer than the other
    longest_list = movie_recommendations if len(movie_recommendations) > len(tv_recommendations) else tv_recommendations
    combined_recommendations.extend(longest_list[len(combined_recommendations) // 2:])

    return jsonify(combined_recommendations), 200

