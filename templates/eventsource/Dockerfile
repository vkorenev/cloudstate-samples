FROM node:8.15
# Copy and install deps. This is done as a separate step as an optimization, so changes to the programs files
# don't require the npm install to be redone
RUN mkdir -p /opt/PROJECT_NAME
#COPY node-support /opt/node-support
COPY package.json /opt/PROJECT_NAME
RUN cd /opt/PROJECT_NAME && npm install
# Now copy the entire app
COPY . /opt/PROJECT_NAME
WORKDIR /opt/PROJECT_NAME
#RUN npm run prestart  
# CA - ^ TODO: this is giving a proto problem (will circle back to deal)
EXPOSE 8080
CMD ["npm", "run", "start-no-prestart"]
