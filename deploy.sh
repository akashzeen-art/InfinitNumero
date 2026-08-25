#!/bin/bash
set -e

DEPLOY_DIR="/var/www/vasnumero/NewGameWebsite"

echo "🚀 Deploying InfinityPlay..."

cd "$DEPLOY_DIR"

echo "📥 Pulling latest from GitHub..."
git pull origin main

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🔨 Building client + server..."
node ./node_modules/vite/bin/vite.js build --config vite.client.config.ts
node ./node_modules/vite/bin/vite.js build --config vite.config.server.ts

echo "♻️  Restarting PM2..."
pm2 describe infinityplay > /dev/null 2>&1 \
  && pm2 restart infinityplay --update-env \
  || pm2 start ecosystem.config.cjs

pm2 save

echo "✅ Deployment complete!"
pm2 status
