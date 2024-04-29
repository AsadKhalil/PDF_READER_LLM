# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory to /app
WORKDIR /app

# Install pipenv
RUN pip install pipenv

# Copy the Pipfile and Pipfile.lock into the container at /app
COPY Pipfile Pipfile.lock ./

# Install dependencies from Pipfile
RUN pipenv install --deploy --ignore-pipfile

# Copy the rest of your application code
COPY . .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Run the Django app using Pipenv's environment
CMD ["pipenv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
