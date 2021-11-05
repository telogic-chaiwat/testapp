FROM node:14-alpine
RUN mkdir -p /home/node/app/node_modules && mkdir -p /home/node/app/log && chown -R node:node /home/node/app
USER node
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "node", "server.js" ]
