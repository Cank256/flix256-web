# Use a base image with Python 3.11 (e.g., Debian or Alpine)
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project files
COPY . .

# Expose the server port
EXPOSE 5000

# Command to start the server
CMD ["uwsgi", "-http", "0.0.0.0:5000", "--module", "root:app"]
