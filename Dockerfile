FROM node:16.14.2-alpine3.15
ENV NODE_ENV production
WORKDIR /app
COPY package.json package-lock.json tsconfig.json tsconfig.release.json .eslintignore .eslintrc.json /app
RUN apk update && apk add bash
RUN npm i -g typescript rimraf eslint cpy-cli
RUN npm ci --only=production
COPY src /app/src
RUN npm run build:release
RUN npm run build:release
RUN mv build/main.js build/src/
CMD npm run start
EXPOSE 80