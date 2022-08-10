FROM node:16.16-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY ./ ./
RUN npm run build:ts
CMD ["npm", "run", "start"]