# MiniURL

O MiniURL é uma API RESTful para encurtar as URLs para ser acessadas atravéz de um alias.

## Requerimentos

Este projeto requer a instalação do `Node.js`.

## Instalação

- Clone o respositório: `git clone https://github.com/gustavofournier/miniurl`
- Instale as dependências: `npm install`
- Inicie o servidor: `npm start`
- No arquivo "config/config.js", é possível alterar o endereço do banco MongoDB.

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

Acessando as 10 urls mais visitadas:
```
http GET http://localhost:3000/top-urls
```

## Testes

Testando as funcionalidades da API:
```
npm test
```

## Ferramentas utilizadas
Ferramentas que foram utilizadas para criar e testar o projeto:

- Express
- Mongoose
- Nodemon
- Mocha
- Chai
- Base64url
- Postman

## Autor

Esse projeto foi criado por [Gustavo Fournier](https://github.com/gustavofournier).
