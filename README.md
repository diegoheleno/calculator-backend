# Focvs v2 calculator API

Manage calculator

### Requisitos
* node v19.03.6
* npm v6.13.7+

### Configuração

Depois de clonar o repos, entre na pasta raiz e instale as dependências:
```console
$ npm install
```

Crie o arquivo *.env* na pasta raiz com as variáveis de ambiente necessárias.

Construa e execute o projeto:
```console
$ npm run build
```
```console
$ npm start
```
Navegue até a rota https://localhost:5000, você deve ver a documentação da API pelo Swagger UI.

### Depuração

Execute o depurador:
```console
$ npm run debug
```
Execute a configuração *'Attach - Depurador NestJS'* (abaixo) para acoplar o depurador ao visual studio code:
```json
{
    "type": "node",
    "request": "attach",
    "name": "Attach - Depurador NestJS",
    "port": 9229,
    "restart": true,
    "stopOnEntry": false,
    "protocol": "inspector"
}
```

##### Referências: https://docs.nestjs.com/cli/monorepo, https://www.typescriptlang.org/docs/handbook/module-resolution.html, https://stackoverflow.com/a/58357642/10155144

## Alguns conceitos importantes (DDD)

### Valueble object

Valueble objects são modelos que só podem ser identificados pelas diferenças em 
sua propriedades (ou seja não possuem 'id' ou qualquer identificador único)
portanto caso dois valueble objects sejam idênticos seram tratados como o mesmo
objeto (por isso que a API Storage usa o valueble object para tratar um arquivo)
    
### Models e Entitys

Models são classes que, assim como valueble objects, expõem propriedades de um modelo
nesse caso Entitys.

Entitys são diferentes de de valuble objects por possuirem identificador único, por tanto
mesmo que duas Entitys sejam identicas nunca serão tratadas como o mesmo objeto
(pois o identificador será diferente)

### Aggregates

Aggregate é um conjunto de objetos de um determinado domínio; Imagine um nota fiscal como
um aggregate de varios produtos por exemplo.