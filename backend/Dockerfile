FROM node:12

ENV PORT 8080

WORKDIR /app

COPY package*.json ./

COPY /lib ./lib

EXPOSE 8080

CMD ["node", "lib/index.js"]