# Use a specific version of python slim image to avoid any unexpected updates
FROM python:3.11-slim

# Set the working directory inside the container to avoid any conflicts with Kaniko context
WORKDIR /app

# Copy only the requirements first to leverage Docker cache
COPY requirements.txt /app/

# Install dependencies in a way to clean up cache to reduce image size
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your project code
COPY . /app

# Expose the correct port for the Flask app. This remains unchanged but is necessary.
EXPOSE 5000

# Specify the exact command to run the app. Changed to ensure array format is maintained.
CMD ["python", "run.py"]
