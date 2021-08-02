FROM node:14-alpine3.14

WORKDIR /app
COPY . /app
RUN npm install
RUN npm install typescript -g
RUN npm install ts-node -g


CMD ["ts-node", "./src/index.ts"]