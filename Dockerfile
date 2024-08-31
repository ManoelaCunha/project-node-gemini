FROM node:18

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "start"]