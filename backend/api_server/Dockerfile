FROM node:18-slim

# Install docker-cli inside the container to talk to the host docker socket
RUN apt-get update && apt-get install -y docker.io

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]
