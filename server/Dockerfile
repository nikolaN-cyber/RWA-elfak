FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
