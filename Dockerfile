FROM node:20

WORKDIR /LGPD-checklist-api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8045

CMD ["npm", "run", "start"]