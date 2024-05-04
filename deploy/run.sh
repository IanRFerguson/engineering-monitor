set -e

# Build React app
echo "Building React app..."
cd frontend && npm run build
cd ..

echo "Building Docker container..."
docker compose up