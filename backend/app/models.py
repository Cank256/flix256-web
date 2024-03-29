from datetime import datetime


class User:
    """
    Represents a User in the application.

    Attributes:
        username (str): The username of the user.
        email (str): The email address of the user.
        lang (str): The preferred language of the user.
        createdAt (datetime): The timestamp when the user was created.
        updatedAt (datetime): The timestamp of the last update to the user's
        information.

    Methods:
        to_dict(): Converts the User object to a dictionary suitable for
        database operations.
    """

    def __init__(self, username, email, lang):
        """
        Constructs all the necessary attributes for the User object.

        Args:
            username (str): The username of the user.
            email (str): The email address of the user.
            lang (str): The preferred language of the user.
        """
        self.username = username
        self.email = email
        self.lang = lang
        self.createdAt = datetime.now()
        self.updatedAt = datetime.now()

    def to_dict(self):
        """
        Converts the User object to a dictionary.

        Returns:
            dict: A dictionary representation of the User object.
        """
        return {
            "username": self.username,
            "email": self.email,
            "lang": self.lang,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
        }


class Favorite:
    """
    Represents a Favorite record linking a user to a movie.

    Attributes:
        user_id (ObjectId): The ID of the user who marked the movie as favorite
        media_type (str): The type of the favorite item (movie or tv_show).
        id (str): The ID of the movie or tv show marked as favorite.
        title (str): The title of the movie or tv show marked as favorite.
        poster_path (str): The poster_path link of the movie or tv show marked as
        favorite.
        createdAt (datetime): The timestamp when the movie was marked as
        favorite.

    Methods:
        to_dict(): Converts the Favorite object to a dictionary suitable for
        database operations.
    """

    def __init__(self, user_id, media_type, id, title, poster_path):
        """
        Constructs all the necessary attributes for the Favorite object.

        Args:
            user_id (ObjectId): The ID of the user who marks the movie as
            favorite.
            id: The ID of the movie being marked as favorite.
        """
        self.user_id = user_id
        self.media_type = media_type
        self.id = id
        self.title = title
        self.poster_path = poster_path
        self.createdAt = datetime.now()

    def to_dict(self):
        """
        Converts the Favorite object to a dictionary.

        Returns:
            dict: A dictionary representation of the Favorite object.
        """
        return {
            "user_id": self.user_id,
            "media_type": self.media_type,
            "id": self.id,
            "title": self.title,
            "poster_path": self.poster_path,
            "createdAt": self.createdAt
        }
