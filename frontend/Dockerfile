# node.js image 18 alpine
FROM node:18-alpine

# workdir
WORKDIR /app

# copy package.json && package-lock.json
COPY package.json package-lock.json ./
RUN npm install

# copy the rest
COPY . .

# run the app
CMD ["npm", "start"]
