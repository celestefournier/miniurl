# RESTful API - ShortenURL

Esta é uma API RESTful para encurtar as URLs de acordo com os links salvos pelo usuário.

## Requerimentos

Este projeto requer os seguintes programas instalados:

- Node.js
- MongoDB (opcional, pondendo utilizar o MongoDB Atlas)

## Instalação

- Clone o respositório: `git clone https://github.com/gustavofournier/hire.me.git`
- Instale as dependências: `npm install`
- Inicie o servidor: `npm start`
- No arquivo "server.js", você pode alterar o endereço do banco MongoDB.

## Utilização

Criando encurtador de URL:
```
http PUT http://localhost:3000/create?url=http://www.google.com.br
```

Criando encurtador de URL com um ALIAS personalizado:
```
http PUT http://localhost:3000/create?url=http://www.google.com.br&alias=google
```

Acessando o encurtador:
```
http GET http://localhost:3000/google
```

## Ferramentas utilizadas
Ferramentas que foram utilizadas para criar e testar o projeto:

- Express
- Mongoose
- Nodemon
- Base64url
- Postman

## Autor

Esse projeto foi criado por [Gustavo Fournier](https://github.com/gustavofournier).
