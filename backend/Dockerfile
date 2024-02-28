# Base Image: Select a suitable Python image
FROM python:3.11-slim

# Working Directory
WORKDIR /app

# Copy Dependency Requirements
COPY requirements.txt requirements.txt

# Install Dependencies
RUN pip install -r requirements.txt 

# Copy Your Project Code
COPY . .

# Expose the port your Flask app typically runs on
EXPOSE 5000 

# Command to start your application
CMD ["python", "run.py"] 
