ssh safemystuff 'bash' << 'EOF'
set -e

echo "🖥️ SSH into the EC2 terminal..."

echo "📂 Moving inside the backend project directory..."
cd /home/ubuntu/StorageApp-Backend

echo "📥 Pulling latest code..."
git pull

echo "📦 Installing exact backend dependencies..."
npm i --frozen-lockfile --prefer-offline --no-audit --no-fund

echo "🧪 Running tests..."
npm run test
echo "✅ Backend Deployment completed successfully!"
EOF