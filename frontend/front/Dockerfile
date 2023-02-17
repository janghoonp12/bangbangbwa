FROM node:18.12.1 as builder
# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . .
RUN npm install
RUN npm run build
CMD npm run start
