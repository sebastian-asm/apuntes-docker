# Apuntes de Docker

Guía de atajos: [https://github.com/Klerith/mas-talento/blob/main/docker/docker-cheat-sheet.pdf](https://github.com/Klerith/mas-talento/blob/main/docker/docker-cheat-sheet.pdf)

Máquinas Virtuales:

- **Pesadas**: emulamos la capa de apps y el kernel del SO
- **Lentas**: cambiarlas, iniciarlas, ejecutarlas, transferirlas

A diferencia de esto, Docker nos ofrece beneficios tales como:

- Los contenedores se levantan en segundos
- Cada contenedor está aislado de los demás
- Permite ejecutar varias instancias de la misma versión sin configuraciones adicionales
- Con un comando, se puede descargar, levantar y correr todo lo que se necesita
- Cada contenedor contiene todo lo que se necesita para ejecutarse
- Es indiferente al SO host

Los volúmenes son usados para hacer persistente la data entre reinicios y levantamiento de imágenes. Existen 3 tipos:

1. **Named**: le asignamos un nombre personalizado
2. **Bind**: permite usar path absolutos
3. **Anonymous**: Docker le asignará un nombre

## Diccionario

- **Docker**: es una herramienta diseñada para facilitar la creación, implementación y ejecución de aplicaciones mediante el uso de contenedores.
- **Container (Contenedor)**: Es una instancia de una imagen ejecutándose en un ambiente aislado.
- **Image (Imagen de contenedor)**: Es un archivo construido por capas, que contiene todas las dependencias para ejecutarse, tal como: las dependencias, configuraciones, scripts, archivos binarios, etc.
- **Dockerizar una aplicación**: Proceso de tomar un código fuente y generar una imagen lista para montar y correrla en un contenedor.
- **Dockerfile**: Un archivo de texto con instrucciones necesarias para crear una imagen. Se puede ver como un blueprint o plano para su construcción.
- **.dockerignore**: Similar al .gitignore, el .dockerignore especifica todo lo que hay que ignorar en un proceso de construcción (build).
- **docker-compose.yml**: Archivo para definir los servicios y con un solo comando en lugar de definir todo directamente en la consola.
- **Volumes (Volúmenes)**: Proporcionan la capacidad de conectar rutas específicas del sistema de archivos del contenedor a la máquina host. Si se monta un directorio en el contenedor, los cambios en ese directorio también se ven en la máquina host.
- **Alpine (Linux)**: Alpine Linux es una distribución de Linux ligera y orientada a la seguridad basada en musl libc y busybox.
- **Container Orchestration**: La orquestación de contenedores es la automatización de gran parte del esfuerzo operativo requerido para ejecutar cargas de trabajo y servicios en contenedores. Ejemplos de herramientas de orquestación son Kubernetes, Swarm, Nomad, and ECS.
- **Docker Layers (Capas)**: Las capas son el resultado de la forma en que se construyen las imágenes de Docker. Cada paso en un Dockerfile crea una nueva "capa" que es esencialmente una diferencia de los cambios en el sistema de archivos desde el último paso.
- **Docker Deamon**: Es el servicio en segundo plano que se ejecuta en el host que administra la creación, ejecución y distribución de contenedores Docker.

## Comandos

- `docker {comando} --help`: mostrar la ayuda de un comando

- `docker pull {imagen}:{tag}`: descargar una imagen, si no se especifica una versión descargará la tag _latest_

- `docker container`: mostrar comandos de los contenedores

  - ls: listar
    - -a: listar todos los activos e inactivos (también se podría usar `docker ps -a`)
  - run {imagen}:{tag}: correrá un contenedor (con nombre aleatorio) basado en una imagen
  - stop {ids | nombres}: detener contenedores
  - start {ids | nombres}: ejecutar contenedores
  - rm {ids | nombres}: eliminar uno o varios contenedores
    - -f: para eliminar de manera forzada (aunque este corriendo)
  - prune: eliminar todos los contenedores detenidos
  - --name: asignar un nombre personalizado
  - -d: modo detached (el contenedor corre en segundo plano)
  - -p {puerto_host:puerto_contenedor}: exponer o publicar un puerto
  - -e {VARIABLE}={valor}: especificar una variable de entorno
  - logs {id | nombre}: mostrar los logs
    - -f | --follow: queda pendiente de los nuevos logs que se emitan
  - -v {volumen_host}:{volumen_contenedor} | --volume {volumen_host}:{volumen_contenedor}: especificar un volumen
    - ${pwd}: hace referencia al directorio actual en donde nos encontramos (Windows)
  - --network {nombre}: agregar el contenedor a una red
  - -w {nombre} | --workdir {nombre}: establecer el directorio de trabajo dentro del contenedor

- `docker image`: mostrar comandos de las imágenes

  - ls: listar las imágenes descargadas (también se podría usar `docker images`)
  - rm {ids | nombres}: eliminar imagen o imágenes
    - -f: eliminar de manera forzada (aunque este referenciada por un contenedor)

- `docker volume`: mostrar comandos de los volúmenes

  - ls: listar
  - create {nombre}: crear un espacio en nuestro host para hacer la data persistente
  - inspect {nombre}: mostrar detalles de un volumen
  - prune: eliminar todos los que no están siendo utilizados

- `docker network`: mostrar comandos de las redes

  - ls: listar
  - create {nombre}: crear
  - connect {id | nombre} {contenedor}: unir contenedores en una red
  - inspect {id | nombre}: inspeccionar
  - prune: eliminar todas las que no están siendo utilizadas

- `docker exec -it {id | nombre} {ejecutable}`: permite ejecutar un comando shell dentro del contenedor

- `docker stats`: mostrar el consumo de recursos de Docker en la Terminal

### Ejemplos de como correr contenedores

_POSTGRES_

```
docker container run --name postgres-local -dp 5432:5432 -e POSTGRES_PASSWORD=password postgres
```

_MARIADB_ y _PHPMYADMIN_ dentro de la misma red llama world-app

```
docker container run --name mariadb-local -dp 3306:3306 -e MARIADB_USER=example-user -e MARIADB_PASSWORD=user-password -e MARIADB_ROOT_PASSWORD=root-secret-password -e MARIADB_DATABASE=world-db -v world-db:/var/lib/mysql --network world-app mariadb:jammy
```

```
docker container run --name phpmyadmin -dp 8080:80 -e PMA_ARBITRARY=1 --network world-app phpmyadmin:5.2.0-apache
```

_APP NODE_

```
docker container run --name nest-app -w /app -p 80:3000 -v ${pwd}:/app node:18.17.0-alpine3.18 sh -c "yarn install && yarn start:dev"
```

_MSSQL_

```
docker container run --name mssql-demo -e ACCEPT_EULA=Y -e MSSQL_SA_PASSWORD=Password1 -dp 1433:1433 mcr.microsoft.com/mssql/server:2022-latest
```

## Docker Compose

Es una herramienta que nos ayuda a definir y compartir aplicaciones de varios contenedores.

Los contenedores creados mediante el compose tendrán esta nomenclatura: `{nombre_directorio}_{nombre_servicio}_{número_replica}`

- `docker compose`: muestra la ayuda

  - up: ejecutar un docker-compose estando en el mismo directorio
    - -d: modo detached
  - down: remover la instancia del compose ejecutado
  - logs: mostrar los logs del compose
    - -f: queda pendiente de los nuevos logs
