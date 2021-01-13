# meal-tracker
#### App that helps you to track your meals and their calories

## Architecture
This app is built as a Docker application so it can be easily run and deployed on different environments.
It is managed with docker-compose and it consists of 3 containers (services):
- **backend** - developed in Django, a Python framework for web applications
- **db** - Postgres database used by Django ORM
- **frontend** - developed in React, a Javascript library for user interfaces

## Continuous Integration
This project uses Travis CI to automatically test code changes with every git push:
- runs unit tests for **backend**
- runs flake8 for checking code syntax of **backend** against PEP 8 (Style Guide for Python Code)

## Run for development
1. Create Python virtual env and install the requirements
    - example for Linux
    ```
    python3 -m venv venv
    source venv/bin/activate
    pip install -r backend/requirements-dev.txt
    ```
2. Run Docker service for PostgreSQL
    ```
    sudo docker-compose up db
    ```
3. Define environment variables
   ```
   DB_HOST=localhost
   DB_NAME=backend
   DB_USER=docker
   DB_PASS=supersecretpassword
   SECRET_KEY=12345
   ```
4. Run application
   ```
   python manage.py migrate
   python manage.py runserver
   ```