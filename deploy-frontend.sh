set -e

trap 'echo "❌ Deployment failed at line $LINENO"; exit 1' ERR

echo "📂 Moving to project directory..."
 cd "$FRONTEND_DIR"

echo "📥 Pulling latest code..."
git pull

echo "📦 Installing the exact client dependencies..."
npm i --frozen-lockfile --prefer-offline --no-audit --no-fund

echo "🧪 Running tests..."
npm run test

echo "🏗  Building production files..."
npm run build

echo "📤 Uploading build to S3..."
aws s3 sync "$FRONTEND_DIR/dist" s3://safemystuff-client/ --delete

echo "🧼 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id E2Q5VN62A3YAHJ --paths "//index.html"

echo "✅ Frontend Deployment completed successfully!"