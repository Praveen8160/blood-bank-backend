FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production

RUN npm ci

COPY . .

RUN chown -R node:node /app && chmod -R 755 /app

RUN npm install -g pm2 

COPY ecosystem.config.cjs .

USER node

EXPOSE 4000

CMD [ "pm2-runtime", "start", "ecosystem.config.cjs" ]