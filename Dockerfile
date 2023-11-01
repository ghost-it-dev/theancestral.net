FROM node:18-alpine

WORKDIR /app

# Copy all files
COPY . .
# Install dependencies
RUN npm install

# Build the app
RUN ["npm", "run", "build"]

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

CMD ["npm", "run", "start"]