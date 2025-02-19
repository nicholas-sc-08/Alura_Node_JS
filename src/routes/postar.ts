import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const postar: FastifyPluginAsyncZod = async app => {
app.post(`/inscricoes`, {

    schema: {

        body: z.object({

            nome: z.string(),
            email: z.string().email()
        }),
        resposta: {

            201: z.object({

                nome: z.string(),
                email: z.string().email()
            }), 
        },
    },
} , async (req, res) => {

    const { nome, email } = req.body;

    return res.status(201).send({nome, email});
});
};