# Base Image
FROM python:3.11-slim

# Set Work Directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt requirements.txt

# Install build dependencies, install packages from requirements.txt, and remove build dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libc6-dev \
    && pip install -r requirements.txt \
    && apt-get purge -y --auto-remove gcc libc6-dev \
    && rm -rf /var/lib/apt/lists/*

# Add a non-root user and switch to it
RUN adduser --disabled-password --gecos "" myuser
USER myuser

# Copy other project files
COPY . .

# Expose a port to Containers
EXPOSE 8080

# Command to run the server
ENTRYPOINT ["gunicorn", "-b", "0.0.0.0:8080", "run:app"]
