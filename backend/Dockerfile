FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package.json

RUN yarn

# Bundle app source
COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY src/ src/

ARG ENV
ARG RELEASE
ENV RELEASE=${RELEASE}
RUN if [ "$ENV" != "DEV" ] ; then yarn build ; else echo Skipping build command ; fi

EXPOSE 3000

# At the end, set the user to use when running this image
USER node

CMD ["node", "./dist/main.js"]
