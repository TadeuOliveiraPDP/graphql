import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';

// Define uma interface para o objeto de retorno da função hello
interface HelloResponse {
  message: string;
  status: number;
  timestamp: string;
}

// Define as resolvers das operações
const resolvers = {
  Query: {
    hello: (): HelloResponse => ({
        message: 'Hello, world!',
        status: 200,
        timestamp: new Date().toISOString(),
    })
  },
  HelloResponse: {
    test: () => 'testing'
  }
};

const typeDefs = importSchema('./schemas.graphql');

// Cria a schema executável
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

console.log({schema})

// Cria a aplicação express
const app = express();

// Adiciona o endpoint GraphQL ao servidor
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true // habilita a interface gráfica do GraphiQL
}));

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
