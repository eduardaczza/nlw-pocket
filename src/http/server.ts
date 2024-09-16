import  fastifay from "fastify";
import { serializerCompiler, validatorCompiler,type ZodTypeProvider } from "fastify-type-provider-zod";
import { createGoal } from "../functions/create-goal";
import z from 'zod'
import { getWeekPendingGoals } from "../functions/get-week-pending-goals";
import { createGoalCompletion } from "../functions/create-goal-completion";

const app = fastifay().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/pending-goals', async () => {
    const {pendingGoals} = await getWeekPendingGoals()

    return {pendingGoals}
})

app.post('/completions', {
    schema: {
        body: z.object({
            goalId: z.string(),
        }),
    },
}, async request =>{  
    const { goalId} = request.body

    await createGoalCompletion({
        goalId,
    })
})

app.listen({
    port: 3333
}).then(() => 
{
    console.log('HTTP server running!')
})