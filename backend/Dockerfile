# Base Image
FROM python:3.9-slim

# Work directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt requirements.txt

# Install build dependencies, install packages from requirements.txt, and remove build dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libc6-dev \
    && pip install -r requirements.txt \
    && apt-get purge -y --auto-remove gcc libc6-dev \
    && rm -rf /var/lib/apt/lists/*


# Copy other project files
COPY . .

# Expose a port to Containers 
EXPOSE 8080

# Command to run on server
ENTRYPOINT ["gunicorn", "-b", "0.0.0.0:8080", "run:app"]