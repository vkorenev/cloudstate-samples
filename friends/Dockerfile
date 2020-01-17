FROM node:8.15

WORKDIR /opt/friends
COPY package*.json ./
RUN npm install
COPY . .
# This next line is only until we update the live npm package
ADD ./cloudstate/ /opt/gateway/node_modules/cloudstate
RUN npm run prestart
EXPOSE 8080
ENV DEBUG=cloudstate*
ENTRYPOINT [ "npm", "run", "start-no-prestart" ]
