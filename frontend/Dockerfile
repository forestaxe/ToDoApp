FROM node:16-alpine
WORKDIR /appfront
COPY package.json .
RUN npm install axios
COPY . .
EXPOSE 4000
CMD ["npm", "start"]