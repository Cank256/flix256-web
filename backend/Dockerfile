# Use a base image with Python 3.11 (e.g., Debian or Alpine)
FROM python:3.11

# Set the working directory inside the container
WORKDIR /backend

# Copy the application code into the container
COPY . /backend

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5000
EXPOSE 5000

# Define the startup command
CMD ["python", "run.py"]
