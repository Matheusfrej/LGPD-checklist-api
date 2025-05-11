# LGPD-checklist-api

Esse projeto é responsável pelo backend (servidor) da LGPDChecklist, uma checklist para avaliar a conformidade de sistemas computacionais com leis de proteção de dados, incluindo LGPD, GDPR e outras.

## Artigo

O artigo inicial que fala sobre o desenvolvimento desse sistema está disponível **[aqui](https://sol.sbc.org.br/index.php/sbes/article/view/30416)**

## Executar

### Rodando localmente

**Pré-requisitos**

- [Node](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [postgres](https://www.postgresql.org/)

O npm já vem por padrão na instalação do Node.

1. Crie um arquivo **.env** na raiz do projeto e coloque a config abaixo:
    ```sh
    JWT_SECRET="secret"

    DATABASE_URL="postgresql://${login}$:${senha}@localhost:5432/lgpd_checklist_local?schema=public"
    ```

    Troque ${login} e ${senha} pelo seu login e senha do postgres local.

2. No terminal, na raiz do projeto, execute:
    ```sh
    npm install
    ```
    para baixar as dependências

3. Execute:
    ```sh
    npm run prisma:migrate
    ```

    Para rodar as migrações e deixar o seu banco de dados local com o esquema atualizado.


4. Por fim, execute:
   
   ```sh
    npm run dev
    ```
    Por padrão, a aplicação está disponível na url **localhost:8045**

    O [Prisma](https://www.prisma.io/), ORM do banco de dados, possui uma interface para acessar o seu banco da aplicação diretamente do navegador. Para isso, apenas rode o comando abaixo:

      ```sh
      npm run prisma:studio
      ```

### Rodando com docker

**Pré-requisitos**

- [Docker](https://www.docker.com/)

1. Crie um arquivo **.env** na raiz do projeto e coloque a config abaixo:
    ```sh
    JWT_SECRET="secret"

    DATABASE_URL="postgresql://myuser:mypassword@db:5432/mydatabase?schema=public"

    POSTGRES_USER="myuser"
    POSTGRES_PASSWORD="mypassword"
    POSTGRES_DB="mydatabase"

    PGADMIN_DEFAULT_EMAIL="postgres@postgres.com"
    PGADMIN_DEFAULT_PASSWORD="postgres"
    ```

2. Rode o comando **docker-compose up --build** para fazer o build da sua aplicação.


**Algumas observações:**

**Problema de Conexão Inicial:** Da primeira vez que você rodar, pode ser que dê um erro que a aplicação não conseguiu se conectar com o banco. Para corrigir, é só parar e rodar de novo.

**Acessando o PGAdmin:** Com o Docker em execução, você pode acessar o PGAdmin localmente. No seu navegador, vá até http://localhost:7070. A página pedirá um e-mail e senha, que estão configurados no arquivo .env do seu projeto.

**Configurando o Banco no PGAdmin:** Após fazer login, será necessário adicionar um novo servidor no PGAdmin. No campo "Connection" da nova configuração de servidor, no campo Host name/address, insira o nome do serviço do PostgreSQL definido no docker-compose.yml, que neste caso é db. Use as demais informações de conexão (usuário, senha, etc.) conforme descritas no arquivo .env.

## Estrutura do Projeto

O projeto segue uma arquitetura limpa (Clean Architecture), dividindo responsabilidades em camadas bem definidas:

- **Domain**: Contém as regras de negócio, entidades principais e casos de uso.
- **Delivery**: Responsável pela interface com o mundo externo (ex.: APIs REST).
- **Infrastructure**: Contém implementações específicas de banco de dados, serviços externos, etc.

## Testes automatizados

A aplicação possui testes automatizados de unidade, integração e arquitetura para garantir maior segurança no código e adequação aos requisitos.

### Testes de unidade

Para executar os testes de unidade, rode:
```sh
npm run test
```

Se quiser deixar rodando para mostrar o resultado dos testes após mexer no código, rode assim:

```sh
npm run test:watch
```

Assim, sempre que houver uma atualização no código, os testes de unidade vão ser rodados novamente de forma automática.

### Testes de integração (e2e)

Se quiser rodar os testes integrados (e2e), pode rodar:

```sh
npm run test:e2e
```

Da mesma forma, para rodar eles de forma automática sempre que houver alteração, adicione o watch:

```sh
npm run test:e2e:watch
```

### Testes de arquitetura

Os testes de arquitetura verificam se o código segue os padrões e boas práticas definidos para o projeto. Para rodar esses testes, execute:

```sh
npm run test:arch
```

Se quiser rodar os testes de arquitetura de forma contínua enquanto desenvolve, use:

```sh
npm run test:arch:watch
```

### Rodando todos os testes

Para rodar todos os testes (unitários, de integração e de arquitetura), execute:

```sh
npm run test:all
```

## Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Crie uma issue ou escolha uma issue existente do projeto.
1. Crie uma branch para sua feature ou correção de bug, baseado na issue.
2. Faça commit das suas alterações.
3. Envie para o repositório remoto.
4. Abra um Pull Request.
