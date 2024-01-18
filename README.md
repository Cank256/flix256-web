# Flix256

## Introduction
Flix256 is a web application designed to provide personalized movie and TV recommendations. It aggregates data from TMDB, offering users current, upcoming, and popular titles alongside a platform to share reviews.

## Tech Used
- Backend: Python 3.7 or higher with Flask
- Frontend: Vue.js
- Database: MongoDB
- Caching: REDIS
- External API: TMDB API
- Deployment: Docker, Docker Hub, Heroku
- Testing: Jest for Vue.js, Unit Testing for Flask
- Version Control: Git

## Local Development Setup
To set up Flix256 on your local machine, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Install backend dependencies:
   ```
   python install -r requirements.txt
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```
4. Start the MongoDB service on your machine.
5. Run the Redis server.
6. Configure environment variables for connecting to the database and external services.
7. Run the backend development server:
   ```
   python app.py
   ```
8. Run the frontend development server (in a seperate terminal):
   ```
   npm run serve
   ```

## Testing
We use Jest for frontend testing and a combination of unittest and pytest for backend testing. To run tests, use:

#### For frontend:
```
npm run test
```
#### For backend:
```
python -m unittest discover
```

## Deployment
Flix256 is containerized using Docker. For deployment instructions, please refer to the deployment directory.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- TMDB for providing the movie and TV data.
- ALX and Holberton School for the inspiration.
