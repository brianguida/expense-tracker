import { title } from "process";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const expenseRouter = createTRPCRouter({
    //get all expense
    getAll: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.expense.findMany();
    }),

    //post new expense
    create: publicProcedure
        .input(
            z.object({
                title: z.string(),
                amount: z.number(),
                date: z.string().transform((str) => new Date(str)),
                category: z.string(),
                paymentMethod: z.string(),
            })
        ).mutation(async ({ ctx, input }) => {
            return ctx.prisma.expense.create({
                data: input,
            });
        }),

    //update expense by id
    update: publicProcedure
        .input(
            z.object({
                id: z.number(),
                title: z.string(),
                amount: z.number(),
                date: z.string().transform((str) => new Date(str)),
                category: z.string(),
                paymentMethod: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...data } = input;
            return ctx.prisma.expense.update({
                where: { id },
                data,
            });
        }),

    //delete expense by id
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
                title: z.string(),
                amount: z.number(),
                date: z.string().transform((str) => new Date(str)),
                category: z.string(),
                paymentMethod: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.expense.delete({
                where: { id: input.id },
            });
        }),

    //get expense by id
    getById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }) => {
            return ctx.prisma.expense.findUnique({
                where: { id: input.id },
            });
        }),
});