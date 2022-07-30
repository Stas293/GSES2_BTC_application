FROM node:latest
WORKDIR /GSES2_BTC_application
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "app.js" ]