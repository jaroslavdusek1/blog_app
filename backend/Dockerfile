# node.js image 18-alpine
FROM node:18-alpine

# workdir
WORKDIR /usr/src/app

# install deps for Alpine Linux
RUN apk add --no-cache \
  build-base \
  python3 \
  iputils \
  netcat-openbsd

# copy package.json && package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest
COPY . .

# generate Prisma Client
RUN npx prisma generate

# Run the app
# start - prod
# CMD ["npm", "run", "start"]
# start:dev - development
CMD ["npm", "run", "start:dev"]

# expose port 3000
EXPOSE 3000
