# $BUILDPLATFORM es una variable de entorno que ya proporciona Docker para la construcción en mútiples plataformas
# basado en el builder seleccionado
# FROM --platform=$BUILDPLATFORM node:19.2-alpine3.16
# FROM --platform=linux/amd64 node:19.2-alpine3.16
FROM node:19.2-alpine3.16

# Working Directory
# establece que a partir de este punto, estamos en el directorio especificado, es como cambiarse de 
# directorio via comando
WORKDIR /app

# copiar desde mi directorio al working directory del contenedor
# ./ hace referencia al directorio activo (/app)
# COPY app.js package.json ./

# copiar todo el directorio local al WD (se exluyen los del .dockerignore)
COPY . .

# RUN ejecuta comandos dentro de nuestra imágen y los cambios se mantienen en el siguiente paso (comandos shell)
# reconstruyendo las dependencias dentro del contenedor
RUN npm install && npm run test

# realizar los test
# RUN npm run test

# eliminar archivos y directorios no necesarios para producción
# eliminación recursiva y forzada
RUN rm -rf test && rm -rf node_modules

# módulos necesarios solo para producción
RUN npm install --prod

# especificar la instrucción que se ejecutará cuando se inicie el contenedor (iniciar app)
# solo puede existir un CMD
CMD ["node", "app.js"]