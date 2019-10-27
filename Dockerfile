# Test
FROM alpine:3.10 AS test 
RUN adduser chrysus -s /etc/nologin -D && \
    mkdir -p /src && \
    chown chrysus:chrysus -R /src && \
    apk --no-cache add --update nodejs-current npm
WORKDIR /src
USER chrysus
COPY . /src
RUN npm install
#RUN npm run test

# Build
FROM alpine:3.10 AS build 
RUN adduser chrysus -s /etc/nologin -D && \
    mkdir -p /build && \
    chown chrysus:chrysus -R /build && \
    apk --no-cache add --update nodejs-current npm
WORKDIR /build
USER chrysus
COPY --from=test /src/app.js app.js
COPY --from=test /src/lib lib
COPY --from=test /src/package.json package.json
RUN npm install --only=production

# Prod
FROM alpine:3.10 AS production
RUN adduser chrysus -s /etc/nologin -D && \
    mkdir -p /prod && \
    chown chrysus:chrysus -R /prod && \
    apk --no-cache add --update nodejs-current
WORKDIR /prod
USER chrysus
COPY --from=build /build/app.js app.js
COPY --from=build /build/lib lib
COPY --from=build /build/node_modules node_modules

#CMD [ "node", "app.js" ]
