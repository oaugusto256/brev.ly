#!/bin/bash

# Start development database
docker compose -f ../docker/docker-compose.dev.yml up -d

echo "✅ Development database started on port 5432"
echo "📝 Connection string: postgresql://postgres:postgres@localhost:5432/brevly"
