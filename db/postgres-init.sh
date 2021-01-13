#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker PASSWORD 'supersecretpassword';
    CREATE DATABASE backend;
    GRANT ALL PRIVILEGES ON DATABASE backend TO docker;
EOSQL