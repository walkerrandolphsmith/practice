FROM node:10
WORKDIR /usr/src/function
RUN npm i -g serverless
COPY ./package.json .
RUN npm install --silent --ignore-optional --no-progress
COPY index.js .
COPY serverless.yml .

ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
CMD ["serverless", "deploy"]