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

- `docker container ls -a`: listar todos los contenedores (también se puede usar docker ps -a)

  - run {imagen}:{tag}: correrá un contenedor (con nombre aleatorio) basado en una imagen
  - stop {id | nombre}: detener contenedor
  - start {id | nombre}: ejecutar contenedor
  - rm {ids | nombres}: eliminar uno o varios contenedores
    - -f: para eliminar de manera forzada (aunque este corriendo)
  - prune: eliminar todos los contenedores detenidos
  - --name: asignar un nombre personalizado
  - -d: modo detached (el contenedor corre en segundo plano)
  - -p {puerto_host:puerto_contenedor}: exponer o publicar un puerto
  - -e {VARIABLE}={valor}: especificar una variable de entorno
  - logs {id | nombre}: mostrar los logs
    - -f | --follow: queda pendiente de los nuevos logs que se emitan

  **Levantar contenedores de ejemplo**

  - postgres: `docker container run --name postgres-local -dp 5432:5432 -e POSTGRES_PASSWORD=password postgres`

- `docker image ls`: listar las imágenes descargadas (también se puede usar docker images)

  - rm {ids | nombres}: eliminar imagen o imágenes
    - -f: eliminar de manera forzada (aunque este referenciada por un contenedor)
