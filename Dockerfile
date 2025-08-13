FROM node:20.11-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY backend/ ./

EXPOSE 3000

CMD ["npm", "run", "dev"] 