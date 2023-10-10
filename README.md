<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Auth-CRUD-Roles-Guards API MVC



1.Instalación
2.Configuración
3.Uso
4.Endpoints
5.Autenticación y Autorización
6.Contribución



1.Instalación
1.1 Clona el repositorio:
```  git clone https://github.com/seb722x/MVC-API-CRUD-Docker-Nest-e-commerce-auth/tree/master   ```
1.2 haz el cd a la carpeta del repositorio
1.3 levanta el docker con la imagen del servicio y la base de datos:  
```` docker compose up    ```
1.4 utiliza la colección postman: https://interstellar-crescent-253112.postman.co/workspace/dfsdf~ab9a2158-73df-4e5c-ad1b-833cc6d3ba62/collection/24745741-b076a49a-de3d-44f5-8b9d-8fc102ae3f9b?action=share&creator=24745741 
También puedes usar la colección que está en los archivos.


32. Configuración
las variables de entorno ya estan configuradas.

```
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
JWT_SECRET=Est3EsMISE3Dsecreto32s
```
Ejecutar las migraciones:

4.Endpoints
Aquí proporciona una lista de los principales endpoints de tu API y una breve descripción de cada uno.

Usuarios
```
GET /users: Obtiene todos los usuarios.
GET /users/:id: Obtiene un usuario específico por ID.
POST /users: Crea un nuevo usuario.
PUT /users/:id: Actualiza un usuario existente.
DELETE /users/:id: Elimina un usuario por ID.
Productos
```

```

GET /products: Obtiene todos los productos.
GET /products/:id: Obtiene un producto específico por ID.
POST /products: Crea un nuevo producto.
PUT /products/:id: Actualiza un producto existente.
DELETE /products/:id: Elimina un producto por ID.
Compras

```

```
GET /purchases: Obtiene todas las compras.
GET /purchases/:id: Obtiene una compra específica por ID.
POST /purchases: Realiza una nueva compra.
PUT /purchases/:id: Actualiza una compra existente.
DELETE /purchases/:id: Elimina una compra por ID.
```


5. En una aplicación Nest.js que utiliza autenticación con guards y decoradores, la autenticación se realiza utilizando tokens JWT (JSON Web Tokens) y se almacena el token en una cookie o en el encabezado de las solicitudes HTTP.

  5.1 Generación del Token JWT: Cuando un usuario inicia sesión o se registra en la aplicación, se genera un token JWT que contiene información de autenticación relevante, como el ID de usuario o su rol. Este token se firma digitalmente utilizando una clave secreta (JWT Secret) que solo conoce el servidor.

  5.2Almacenamiento del Token en una Cookie: En el servidor, después de generar el token JWT, se coloca en una cookie HTTP segura y firmada. Esto se hace utilizando la biblioteca cookie o una biblioteca similar. La cookie se establece en la respuesta HTTP y se enviará automáticamente en todas las solicitudes futuras al servidor.

  5.3Guardias de Autenticación: En las rutas o endpoints que requieren autenticación, se utilizan guardias de autenticación para verificar la presencia y validez del token JWT en la solicitud. Los guardias pueden extraer el token de la cookie o del encabezado de autorización de la solicitud.

  5.4 Validación del Token: El guardia valida el token JWT descifrando su contenido y comprobando su firma utilizando la clave secreta del servidor. Si el token es válido, se permite que la solicitud continúe. Si el token no es válido o está ausente, el guardia rechaza la solicitud y devuelve un error de autenticación.

  5.5Decoradores de Usuario Autenticado: En los controladores de Nest.js, puedes utilizar decoradores personalizados para acceder a los datos del usuario autenticado. Estos decoradores extraen la información del token JWT válido y la hacen disponible en la función controladora. Por ejemplo, puedes tener un decorador personalizado @User() que te proporciona el objeto de usuario autenticado.

  5.6Uso del Usuario Autenticado: En tus funciones controladoras, puedes utilizar el objeto de usuario autenticado para realizar acciones específicas basadas en la identidad del usuario. Por ejemplo, puedes autorizar al usuario a realizar ciertas operaciones o personalizar la respuesta según su rol.

  5.7 Finalización de la Sesión: Cuando el usuario cierra sesión o el token expira, la cookie de autenticación se elimina o se invalida, lo que impide que el usuario realice acciones protegidas.

6. Contribución
Si deseas contribuir a este proyecto, sigue estas pautas.

Haz un fork del repositorio.
Crea una nueva rama: git checkout -b feature/nueva-funcionalidad.
Realiza tus cambios y realiza un commit: git commit -m 'Añade nueva funcionalidad'.
Haz push a la rama: git push origin feature/nueva-funcionalidad.
Abre un pull request.



































1. Clone project from github
2. ```npm install```
3. Clone file ```.env.template``` and rename it to ```.env```
4. use your environment variables ( for test reasons they will stay in this file)
5. up docker
```
docker-compose up -d
```

construye la imagen docker:
docker build -t softlabservice .

corre docker run -p 3000:3000 -d softlabservice



6. run : ```npm run start:dev``` (after run docker, if at first time it does not run because is trying to connect => ctrl + c and the try again, 
it is because sometimes docker is not ready inmediatly)

7. postman: https://interstellar-crescent-253112.postman.co/workspace/dfsdf~ab9a2158-73df-4e5c-ad1b-833cc6d3ba62/collection/24745741-b076a49a-de3d-44f5-8b9d-8fc102ae3f9b?action=share&creator=24745741




instrucciones:

base de datos cuentas:

email: paco@gmail.com - password: 123 - role: admin
email: pedro@gmail.com - password: 123 - role- client

