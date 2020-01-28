FROM node:8.15

WORKDIR /opt/chat
COPY package*.json ./
RUN npm install
COPY . .
#ADD ./cloudstate/ /opt/chat/node_modules/cloudstate
#RUN npm run prestart
RUN npm rebuild
EXPOSE 3000
ENV DEBUG=cloudstate*
ENTRYPOINT [ "npm", "run", "start-no-prestart" ]
