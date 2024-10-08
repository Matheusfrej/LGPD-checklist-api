FROM node:20

WORKDIR /lgpdchecklistapi

COPY package*.json ./
COPY prisma ./prisma/ 

RUN npm install --silent

COPY . .

RUN npm run build

RUN echo "{\"type\": \"module\"}" > dist/src/package.json

RUN npm prune --production

EXPOSE 8045

CMD ["npm", "run", "start"]