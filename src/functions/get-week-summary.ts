import { and, count, eq, gte, lte, sql } from "drizzle-orm"
import { db } from "../db"
import { goalCompletions, goals } from "../db/schema"
import dayjs from "dayjs"

export async function getWeekSummary(){
    const firstDayOfWeek = dayjs().startOf('week').toDate()
    const lastDayOfWeek = dayjs().endOf('week').toDate()


    const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
        db
        .select({
            id: goals.id,
            title: goals.title,
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            createdAd: goals.createdAt,
         })
        .from(goals)
        .where(lte(goals.createdAt, lastDayOfWeek))
    )

    const goalsCompletedInWeek = db.$with('goals_completed_week').as(
        db.select({
            id: goals.id,
            title: goals.title,
            completedAtDate: sql/*sql* */`
            DATE(${goalCompletions.createdAt})
            `

        })
        .from(goalCompletions)
        .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
        .where(
            and(
            gte(goalCompletions.createdAt, firstDayOfWeek),
            lte(goalCompletions.createdAt, lastDayOfWeek)
        )
    )
    )


    return {
        summary: 'teste'
    }    
}