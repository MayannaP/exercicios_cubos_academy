Seu papel é construir uma RESTful API que permita:

-   Fazer Login
-   Editar produtos
-   Remover produtos
-   **EXTRA:** Filtrar produtos por categoria
```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
```
### **Excluir produto do usuário logado**

#### `DELETE` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir um dos seus produtos cadastrados.  
**Lembre-se:** Deverá ser possível excluir **apenas** produtos associados ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.  

-   **Requisição**  
    Deverá ser enviado o ID do produto no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.  

-   **Resposta**  
    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir ***status code*** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.  
    **Dica:** neste endpoint é possível utilizar os ***status codes*** 401 (Unauthorized) e 403 (Forbidden), além dos outros mais comuns que costumamos utilizar.  

-   **REQUISITOS OBRIGATÓRIOS**:
    -   Validar se existe produto para o id enviado como parâmetro na rota e se este produto pertence ao usuário logado. 
    -   Excluir o produto no banco de dados.  

#### **Exemplo de requisição**
```json
// DELETE /produtos/88
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```json
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Não existe produto para o ID 88."
}
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O usuário autenticado não tem permissão para excluir este produto."
}
```

---

## **EXTRA**
**ATENÇÃO!:** Esta parte extra não é obrigatória e recomendamos que seja feita apenas quando terminar toda a parte obrigatória acima.

### **Filtrar produtos por categoria**

Na funcionalidade de listagem de produtos do usuário logado (**GET /produtos**), deveremos incluir um parâmetro do tipo query **categoria** para que seja possível consultar apenas produtos de uma categoria específica.  
**Lembre-se:** Deverão ser retornados **apenas** produtos associados ao usuário logado, que deverá ser identificado através do ID presente no token de validação.  

-   **Requisição**  
    Parâmetro opcional do tipo query **categoria**.  
    Não deverá possuir conteúdo no corpo (body) da requisição.  

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um array dos objetos (produtos) encontrados.  
    Em caso de **falha na validação**, a resposta deverá possuir ***status code*** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.  
    **Dica:** neste endpoint podemos fazer uso do status code 401 (Unauthorized).  

-   **REQUISITOS OBRIGATÓRIOS**
    -   O usuário deverá ser identificado através do ID presente no token de validação
    -   O endpoint deverá responder com um array de todos os produtos associados ao usuário que sejam da categoria passada no parâmetro query. Caso não exista nenhum produto associado ao usuário deverá responder com array vazio.

#### **Exemplo de requisição**
```json
// GET /produtos?categoria=camisas
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```json
// HTTP Status 200 / 201 / 204
[
    {
        "id": 1,
        "usuario_id": 1,
        "nome": "Camisa preta",
        "quantidade": 12,
        "categoria": "Camisas",
        "preco": 4990,
        "descricao": "Camisa de malha com acabamento fino.",
        "imagem": "https://bit.ly/3ctikxq",
    },
    {
        "id": 2,
        "usuario_id": 1,
        "nome": "Calça jeans azul",
        "quantidade": 8,
        "categoria": "Calças",
        "preco": 4490,
        "descricao": "Calça jeans azul.",
        "imagem": "https://bit.ly/3ctikxq",
    },
]
```
```json
// HTTP Status 200 / 201 / 204
[]
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

---

## **Aulas úteis:**  

- [Modelagem de Dados](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/15/09/2021/aula/286817a4-f5bd-44c5-a799-584ffd9a3335/a11d1306-a610-4522-a83e-4fde0d3ebdfa)
- [A relação um para muitos](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/15/09/2021/aula/286817a4-f5bd-44c5-a799-584ffd9a3335/85adbb11-8081-4135-a13c-6dc5284ba5e5)
- [Criando tabelas com relacionamentos](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/15/09/2021/aula/286817a4-f5bd-44c5-a799-584ffd9a3335/1fbb8761-9fd9-441c-96fd-08bac9f1fdf4)
- [CRUD SQL](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/13/09/2021/aula/63e840be-432d-457b-99f5-cfa119008515/824d2698-ac2a-4d5f-840a-7b69384a7f94)
- [Programação Assíncrona](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/04/08/2021/aula/fbeffa02-bf0d-49f1-927b-fb7b269f31b3/8bdff314-8386-43f8-8317-3cae52480be2)
- [Funções async com await](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/04/08/2021/aula/fbeffa02-bf0d-49f1-927b-fb7b269f31b3/deb4c519-5b06-49d2-9245-6a4306b24b8a)
- [Revisão Programação Assíncrona](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/06/08/2021/aula/9b680362-ee3b-45b0-9573-dc72427d7e37/)
- [Conexão NodeJs com PostgreSQL](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/20/09/2021/aula/c5d2fbfa-d1cc-4b5d-a952-3f2d39f20013/25e45164-6f2e-4c83-a7f0-9a392c0f61e8)
- [Configurando conexão com o banco](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/20/09/2021/aula/c5d2fbfa-d1cc-4b5d-a952-3f2d39f20013/328f07c0-bd88-488f-864e-3e401d4fca78)
- [Executando comandos SQL a partir da API](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/20/09/2021/aula/c5d2fbfa-d1cc-4b5d-a952-3f2d39f20013/92f60ffe-15a4-4638-84f2-63ce25d02c08)
- [Autenticação e Criptografia](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/22/09/2021/aula/416b67c0-7b88-4ec1-b1b3-e405414d227c/353d51ad-6ecf-4e2a-878e-b43d2d662d81)
- [Revisão Módulo 3](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/27/09/2021/aula/653eb988-7f3d-490c-9649-d66cb76db7ae/4da79921-84a0-4dfc-b8ab-cc01cc723fbf)
- [Login retornando token](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/27/09/2021/aula/653eb988-7f3d-490c-9649-d66cb76db7ae/c4fffddd-bb08-437b-97f6-453e4b2f213d)
- [Filtro de autenticação lendo token do header](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/27/09/2021/aula/653eb988-7f3d-490c-9649-d66cb76db7ae/6480cf9b-d83a-4dc0-b0c3-6a9943b3b326)
- [Utilizando recursos com token no header](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/27/09/2021/aula/653eb988-7f3d-490c-9649-d66cb76db7ae/3b009560-48dd-4d43-ba67-96ad4a6bfd52)
- [Revisão ao vivo Módulo 3](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/29/09/2021/aula/3bc2d9c5-0f0e-4d8d-beee-17e2419c2212/)

---

**LEMBRE-SE**: Feito é melhor que perfeito!!!

###### tags: `back-end` `módulo 3` `nodeJS` `PostgreSQL` `API REST` `desafio`
