set -e

if [ ! -f .env ]; then
    echo "ERROR! .env file not found"
    exit 1
fi

# Build React app
echo "Building React app..."
cd frontend 

# Check for node modules
if [ ! -d node_modules/ ]; then
    echo "Running installs..."
    npm install
fi

npm run build
cd ..

echo "Building Docker container..."
docker compose up