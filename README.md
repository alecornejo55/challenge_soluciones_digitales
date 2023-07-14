# Listado de clientes - Challenge Soluciones digitales

## Descripción del Proyecto

Este proyecto es un abm de un listado de clientes. La misma permita listar, agregar, editar y eliminar registros.

El frontend de la aplicación se desarrolló utilizando React.js, utilizando Vite para la creación del mismo. El backend fue implementado utilizando Nest.js, un framework de Node.js. Como base de datos fue implementado MySql

## Características Principales

- **Crear Cliente**: Permite agregar un nuevo cliente al nuevo. Se solicitan los datos básicos del cliente, como nombre, apellido, dni, sexo y teléfono.

- **Listar Clientes**: Muestra una lista de todos los clientes registrados en el sistema. Se puede filtrar por dni.

- **Editar Cliente**: Permite modificar los datos de un cliente existente. Se pueden actualizar los campos relevantes del cliente.

- **Eliminar Cliente**: Permite eliminar un cliente del sistema. Se solicita una confirmación antes de proceder con la eliminación.

## Requisitos del Proyecto

Para ejecutar este proyecto de forma local, se requieren los siguientes elementos:

- Node.js: [https://nodejs.org](https://nodejs.org).

## Instrucciones de Instalación

1. Clona este repositorio en tu máquina local:

```
git clone https://github.com/alecornejo55/challenge_soluciones_digitales.git
```

2. Accede al directorio del proyecto:

```
cd challenge_soluciones_digitales
```

3. Instala las dependencias del frontend:

```
cd frontend
npm install
```

4. Instala las dependencias del backend:

```
cd ../backend
npm install
```

5. Importar la base de datos al servicio MySQL
```
ruta base de datos: backend/database/bd_soluciones_digitales.sql
```

6. Cambiar el nombre del archivo .env.example a .env

7. Modificar los valores de las variables de entorno dentro del archivo .env a las propias
```
PORT=5000                          # NO CAMBIAR!!
DB_HOST=localhost                  # Nombre del host de la base de datos
DB_PORT=3306                       # Puerto de la base de datos
DB_NAME=bd_soluciones_digitales    # Nombre base de datos
DB_USERNAME=root                   # Usuario base de datos
DB_PASSWORD=root                   # Contrasela base de datos
```

## Instrucciones de Uso

1. Inicia el servidor backend:

```
cd backend (desde la raíz del proyecto)
npm run start
```

2. Inicia la aplicación frontend:

```
cd frontend (desde la raíz del proyecto)
npm run dev
```

3. Abre tu navegador web y accede a http://localhost:3000 para interactuar con la aplicación.