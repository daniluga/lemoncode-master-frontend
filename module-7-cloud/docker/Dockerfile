# Fase base
FROM node:22-alpine AS base
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Fase de compilación, partimos de la fase base
FROM base as build-front
COPY ./ ./
RUN npm ci
RUN npm run build

# Fase de release, donde preparamos el entorno de producción
FROM base AS release
# -r means recursive copy
#RUN cp -r ./dist ./server/public
#copy permite copiar archivos y directorios de fases anteriores, RUN no
COPY --from=build-front /usr/app/dist /public
COPY ./server/package.json ./
COPY ./server/package-lock.json ./
COPY ./server/index.js ./
RUN  npm ci

ENV PORT=8083
# comandos a ejecutar al iniciar el contenedor
CMD ["node", "index.js"]