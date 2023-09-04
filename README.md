# Rappi Campus

## Resumen

El proyecto Rappi se centra en el desarrollo de una plataforma de entrega y pedidos que sirve a tres roles principales: vendedores (tenderos), clientes y repartidores. La aplicación proporciona una serie de puntos de acceso (endpoints) para la gestión de información relacionada con estos roles, como usuarios, restaurantes, pedidos y productos. El proyecto incorpora prácticas avanzadas de desarrollo web y control de versiones.

**Características Destacadas:**

1. **Roles de Usuario:** Los usuarios de la plataforma se dividen en tres categorías: vendedores (tenderos), clientes y repartidores. Cada uno de ellos tiene sus propias funcionalidades y privilegios.
2. **Control de Versiones:** Se implementa un sistema de control de versiones en la API utilizando `express-routes-versioning`. Esto permite gestionar múltiples versiones de rutas y controladores, garantizando la compatibilidad con versiones anteriores y facilitando las actualizaciones.
3. **JWT y Passport:** La autenticación y autorización se gestionan a través de JSON Web Tokens (JWT) y Passport.js. Esto asegura la seguridad y la gestión eficiente de sesiones de usuario en la plataforma.
4. **Endpoints RESTful:** Se proporcionan endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en las colecciones de usuarios, restaurantes, pedidos y productos. Estos endpoints permiten a los usuarios gestionar sus datos y realizar pedidos de manera eficaz.

**Tecnologías Utilizadas:**

- **Node.js:** El backend se desarrolla utilizando Node.js, que es eficiente y escalable.
- **Express.js:** La plataforma se crea sobre el marco de Express.js, que simplifica el manejo de rutas y solicitudes HTTP.
- **MongoDB:** La base de datos NoSQL MongoDB se utiliza para almacenar los datos de la aplicación.
- **Control de Versiones:** La aplicación sigue buenas prácticas de control de versiones, lo que facilita las actualizaciones y el mantenimiento.
- **Autenticación:** La autenticación se gestiona mediante JWT y Passport.js para garantizar la seguridad de los usuarios.

**Roles:**

- **Vendedor (Tendero):** Los vendedores pueden agregar y administrar productos y restaurantes asociados a ellos.
- **Cliente:** Los clientes pueden realizar pedidos en restaurantes y hacer un seguimiento del estado de sus pedidos.
- **Repartidor:** Los repartidores reciben pedidos y entregan productos a los clientes.

![Untitled-2023-09-04-1516](https://github.com/Edwarcorredor/Rappi_Campus/assets/104398132/43ab51e5-ff32-46f7-a929-9de3e642eff6)


## *Instalación*

Para instalar y utilizar este proyecto, siga los siguientes pasos:

1. Asegúrese de tener [Node.js](https://nodejs.org/) instalado en su sistema.

2. Clone este repositorio en su máquina local utilizando el siguiente comando.

   ```
   git clone https://github.com/Edwarcorredor/Rappi_Campus.git
   ```

3. Abra el terminal en la carpeta raiz del repositorio e instale las siguientes dependencias.

   ```
   npm i -E bcrypt dotenv express express-rate-limit express-routes-versioning jose mongodb morgan passport passport-http-bearer passport-jwt passport-local zod
   ```

4. En el archivo .env del proyecto configurar las variables de entorno de acuerdo a su usuario y acceso a base de datos.

   ```
   MY_SERVER = { "hostname": "127.10.10.10", "port":5020}
   
   ATLAS_PASSWORD ="password"
   
   ATLAS_USER="user"
   
   ATLAS_DB="Db"
   
   JWT_SECRET= 1234567
   ```

## *Funcionamiento*

### Creación base de datos

Asegúrate de tener una cuenta en atlas para la creación de base de datos en mongoDb. Actualiza la configuración en ./src/config/atlas.js , cambiando la constante uri con la configuración de tu atlas.

Los comandos a ejecutar se encuentran en ./src/db/query.mongodb. Se puede ejecutar todo el documento de una vez. Se crean las colecciones con sus respectivos esquemas y la colección para el autoincrementable.

### Acceso a las colecciones

Si deseas interactuar con las tablas, es necesario generar un token de acceso  y enviarlo como encabezados (headers) en tus peticiones. Para lograr esto, hemos establecido una conexión utilizando ThunderClient, una extensión de Visual Studio Code.

A continuación, te mostramos cómo configurar los headers para acceder a cualquier tabla:

```
Content-Type: application/json
Authorization: bearer [Token de Acceso Generado]
```

<img width="350" alt="conexionthunder" src="https://github.com/Edwarcorredor/Rappi_Campus/assets/104398132/f1c068ce-018f-430d-aea7-f273a1551388">

### Obtener información de un usuario autenticado

```
GET /users
```

### Crear un nuevo usuario

Para crear usuario no necesita tener un token de autorización, debido a que esta realizando el registro para luego logearse con su cuenta

```
POST /users
Content-Type: application/json

{
  "nombre_user": "Nombre",
  "email_user": "correo@example.com",
  "password_user": "contraseña",
  "role_user": "vendedor",
  "coordinates_user": [latitud, longitud],
  "permisos_user": ["permiso1", "permiso2"],
  "telefono_user": "1234567890"
}
```

### Actualizar información de un usuario autenticado

```
PUT /users
Content-Type: application/json

{
  "nombre_user": "Nuevo Nombre",
  "email_user": "nuevo_correo@example.com",
  "password_user": "nueva_contraseña",
  "role_user": "cliente",
  "coordinates_user": [nueva_latitud, nueva_longitud],
  "permisos_user": ["nuevo_permiso"],
  "telefono_user": "9876543210"
}
```

### Eliminar un usuario autenticado

```
DELETE /users
```

### Obtener todos los productos de un restaurante

Se debe enviar en los parámetros el id del restaurante el cual desea conocer sus productos.

```
GET /productos/todos/:id
```

### Crear un nuevo producto

```
POST /productos
Content-Type: application/json

{
  "nombre_producto": "Nombre del Producto",
  "descripcion_producto": "Descripción del Producto",
  "precio_producto": 10.99,
  "restaurante_producto": 1,
  "stock_producto": 10
}
```

### Actualizar un producto existente

Se debe enviar en los parámetros el id del producto el cual desea actualizar

```
PUT /productos/actualizar/:id
Content-Type: application/json

{
  "nombre_producto": "Nuevo Nombre",
  "descripcion_producto": "Nueva Descripción",
  "precio_producto": 15.99,
  "restaurante_producto": 2,
  "stock_producto": 10
}
```

### Eliminar un producto

Se debe enviar en los parámetros el id del producto que desea eliminar

```
DELETE /productos/borrar/:id
```

## Autor: Edwar Danilo Corredor Amaya





## Investigacion

Rappi es una plataforma de entrega a domicilio y servicios en línea que ofrece una amplia gama de funcionalidades para facilitar la vida de sus usuarios. algunas de las funcionalidades principales de Rappi:

- Pedidos
- Restaurantes cercanos
- Choferes

1. Entrega a Domicilio de Alimentos:
   - Rappi permite a los usuarios solicitar comida de restaurantes locales y cadenas populares para entrega a domicilio.
   - Los usuarios pueden navegar por menús, realizar pedidos personalizados y programar entregas según sus preferencias.
2. Supermercado y Farmacia:
   - Además de alimentos, Rappi ofrece entregas de productos de supermercado y artículos de farmacia.
   - Los usuarios pueden comprar víveres, productos de limpieza, medicamentos y más a través de la plataforma.
3. Compras en Tiendas Locales:
   - Rappi permite a los usuarios comprar productos de tiendas locales, incluyendo electrónicos, ropa, artículos para el hogar y más.
   - La plataforma actúa como intermediario entre los comerciantes y los consumidores.
4. Envío de Documentos y Mensajes:
   - Los usuarios pueden utilizar Rappi para enviar y recibir documentos, paquetes pequeños y mensajes a otras personas o empresas locales.
5. Recogida y Entrega de Artículos:
   - Rappi ofrece el servicio de recogida y entrega de artículos para los usuarios, lo que incluye recoger algo de una ubicación y llevarlo a otra.
6. Pago de Servicios y Facturas:
   - Los usuarios pueden pagar servicios públicos, facturas y recargar teléfonos móviles a través de la plataforma.
7. Entrega de Bebidas Alcohólicas:
   - En algunas regiones, Rappi ofrece la entrega de bebidas alcohólicas y licores siguiendo las regulaciones locales.
8. Asistencia en el Hogar:
   - Rappi puede ayudar a los usuarios a encontrar profesionales para realizar tareas en el hogar, como limpieza, plomería y reparaciones.
9. RappiPrime y Suscripciones:
   - RappiPrime es un programa de suscripción que ofrece beneficios como envío gratuito, descuentos y promociones exclusivas

## documentacion de los endpoints de pedidos, restaurantes y algunos de productos:

- https://documenter.getpostman.com/view/21399364/2s9Y5Zu1pk



## bibliografia de la investigacion:

- https://www.rappi.com/
- https://www.rappi.com.co/restaurantes
- https://merchants.rappi.com/es-co

Autor: Jhon Jairo Morales Garcia
