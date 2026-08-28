#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE sole_health_notification;
  CREATE DATABASE sole_health_task;
EOSQL
