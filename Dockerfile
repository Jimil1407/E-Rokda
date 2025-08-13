FROM node:20.11-alpine

WORKDIR /app

COPY backend/package.json .
COPY backend/package-lock.json .

RUN npm install

COPY backend/ ./

EXPOSE 3000

CMD ["npm", "run", "dev"] 