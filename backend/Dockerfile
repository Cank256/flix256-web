# Use a specific, well-supported version of the Python image to ensure compatibility.
FROM python:3.11-slim

# Set the working directory in the Docker image. This directory should match the Kaniko context path.
WORKDIR /app

# Copying requirements first to leverage Docker cache
COPY requirements.txt /app/
# Ensure permissions are set correctly for Kaniko to access the files.
RUN chmod 755 /app/requirements.txt && pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application's source code into the Docker image.
COPY . /app
# Adjust permissions to ensure Kaniko can access all necessary files.
RUN chmod -R 755 /app

# Inform Docker that the container listens on the specified network ports at runtime.
EXPOSE 5000

# Command to run the application. This is standard and should not be related to the Kaniko issue.
CMD ["python", "run.py"]
