#!/bin/bash

# Stop development database
docker compose -f ../docker/docker-compose.dev.yml down

echo "✅ Development database stopped"
