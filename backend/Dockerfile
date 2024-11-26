# node.js image 18
FROM node:18

# workdir
WORKDIR /usr/src/app

# copy package.json && package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# for debugging install icmp ping and netcat, remove cached files
RUN apt-get update && apt-get install -y \
  iputils-ping \
  netcat-openbsd \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

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