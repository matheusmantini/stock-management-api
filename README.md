<h1 align="center"> Projeto Stock Management System - Back-end </h1>

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)
![REST](https://img.shields.io/badge/REST%20API-%231572B6.svg?style=for-the-badge)

<p align="center">> Status do Projeto: Concluído :heavy_check_mark:</p>
    
## Funcionalidades

- **Produtos**

- [x] Criar novo produto
- [x] Listar todos os produto criados
- [x] Listar um produto específico pelo id
- [x] Editar a quantidade de um produto específico pelo id
- [x] Deletar produto

- **Pedidos**

- [x] Criar novo pedido
- [x] Listar todos os pedido cadastrados
- [x] Listar um pedido específico pelo id
- [x] Editar as informações de um pedido específico pelo id

- **Itens do Pedidos**

- [x] Criar novo item de pedido
- [x] Listar todos os itens de pedidos cadastrados
- [x] Listar um item de pedido específico pelo id
- [x] Editar as informações de um item de pedido específico pelo id
- [x] Deletar item de pedido

## Documentação da API com Swagger: :page_facing_up:	
http://localhost:3001/api

## Como rodar a aplicação:

1. No terminal, clone o projeto:
> git clone https://github.com/matheusmantini/stock-management-api.git

2. Entre na pasta do projeto:
> cd stock-management-api

3. Instale as dependências:
> npm install

4. Altere o arquivo '.env. com as informações do seu banco de dados

5. Gere o prisma client:
> npx prisma generate

6. Faça a migração das tabelas para o seu banco de dados
> npx prisma migrate dev

7. Popule o banco de dados com os produtos já cadastrados como exemplo 
> npx prisma db seed

8. Execute a aplicação:
> npm run start

9. Pronto, agora é possível acessar a aplicação a partir da rota http://localhost:3001/api

## Desenvolvedor

| [<img src="https://avatars.githubusercontent.com/u/71985890?v=4" width=115 > <br> <sub> Matheus Mantini </sub>](https://github.com/matheusmantini) |
| :------------------------------------------------------------------------------------------------------------------------------------------------: |
