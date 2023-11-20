FROM node:18

WORKDIR /usr/app/

COPY package*.json .


RUN rm -rf node_modules
RUN npm install

# RUN npm run build
COPY . .
# CMD node dist/src/main.js
CMD npm run dev
