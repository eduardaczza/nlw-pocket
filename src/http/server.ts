import  fastifay from "fastify";

const app = fastifay()

app.listen({
    port: 3333
}).then(() => 
{
    console.log('HTTP server running!')
})