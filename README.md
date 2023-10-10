<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Auth-Roles API Microservices

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

