import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { validatorCompiler } from "fastify-type-provider-zod";
import { serializerCompiler } from "fastify-type-provider-zod/dist/src/core";
import { ZodTypeProvider } from "fastify-type-provider-zod/dist/src/core";
import { jsonSchemaTransform } from "fastify-type-provider-zod/dist/src/core";
import { z } from "zod";
import { fastifySwagger } from "@fastify/swagger"; 
import { fastifySwaggerUi } from "@fastify/swagger-ui";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors);
app.register(fastifySwagger, {

    openapi: {

        info: {

            title: "NLW COnnect",
            version: "0.0.1",
        },
    },

    transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {

    //quando alguém acessar a rota /docs no back end, ela irá acessar a documentação do swagger
    routePrefix: '/docs',

});

app.post(`/inscricoes`, {

    schema: {

        body: z.object({

            nome: z.string(),
            email: z.string().email()
        }),

        response: {

            201: z.object({
                nome: z.string(),
                email: z.string().email(),
            })
        },
    },

}, async (req, res) => {

    const { nome, email} = req.body;

    // criação da inscrição no banco de dados

    return res.status(201).send({

        nome,
        email
    });
})

app.listen({port: 3333}).then(() => {

    console.log(`Servidor HTTP rodando..`);    
});