#!/bin/bash
set -e

DEPLOY_DIR="/var/www/vasnumero/NewGameWebsite"

echo "🚀 Deploying InfinityPlay..."

cd "$DEPLOY_DIR"

echo "📥 Pulling latest from GitHub..."
git pull origin main

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "⚙️  Generating Prisma client..."
pnpm exec prisma generate

echo "🔨 Building client + server..."
pnpm run build:client
pnpm run build:server

echo "🗄️  Running Prisma migrations..."
pnpm exec prisma migrate deploy

echo "♻️  Restarting PM2..."
pm2 describe infinityplay > /dev/null 2>&1 \
  && pm2 restart infinityplay \
  || pm2 start ecosystem.config.cjs

pm2 save

echo "✅ Deployment complete!"
pm2 status
