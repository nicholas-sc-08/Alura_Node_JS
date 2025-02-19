//importar o mini framework fastify
import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import {validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform} from 'fastify-type-provider-zod';
import { z } from 'zod';
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {

    //origin true permite com que todas as urls frontend conseguem acessar as de back_end
    //o ideal é que especifique uma rota ex: http:localhost:3000
    origin: true
});

app.register(fastifySwagger, {

   openapi: {

    info: {

        tittle: "ALURA NODE JS",
        version: "0.0.1"
    }
   }, 
   transform:jsonSchemaTransform
});

app.register(fastifySwaggerUi, {

    routePrefix: '/docs'
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(postar);

app.listen({port: 3333}).then(() => {

    console.log(`HTTP servidor rodando!`);
});