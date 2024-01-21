from backend import mongo


# Access the favorites and user collections
favorites = mongo.db.favorites
users = mongo.db.users


def validate_required_fields(**fields):
    """
    Validates the presence of required fields.

    Args:
        **fields: Arbitrary number of keyword arguments representing fields to
        validate.

    Returns:
        - Error message string if any fields are missing.
        - None if all required fields are present.
    """
    missing_fields = [
        field_name for field_name, value in fields.items() if not value
    ]

    if missing_fields:
        # Constructing the error message based on missing fields
        error_message = f"{' and '.join(missing_fields)} {'is' if len(missing_fields) == 1 else 'are'} required"
        return error_message
    return None


def serialize_document(doc):
    """
    Converts MongoDB document fields to JSON serializable formats.

    Args:
        doc: The MongoDB document to serialize.

    Returns:
        - The serialized document with JSON serializable fields.
    """
    # Convert ObjectId to string
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    # Convert datetime to string
    if 'createdAt' in doc:
        doc['createdAt'] = doc['createdAt'].strftime('%Y-%m-%d %H:%M:%S')
    if 'updatedAt' in doc:
        doc['updatedAt'] = doc['createdAt'].strftime('%Y-%m-%d %H:%M:%S')
    return doc
