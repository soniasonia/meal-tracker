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
