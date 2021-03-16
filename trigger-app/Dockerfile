FROM node:8.11.1-alpine

WORKDIR /usr/src/app
VOLUME [ "/usr/src/app" ]

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "trigger-app.js" ]