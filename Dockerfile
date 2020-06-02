FROM node:12.14.1

RUN npm install -g nodemon
#create new directory
WORKDIR /app
COPY ./package.json ./
#install dependancies from package.json
RUN npm install
#copy local directory to working directory
COPY . .
EXPOSE 3001
CMD ["npm", "run","start"]