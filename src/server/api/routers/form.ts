import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { db } from "@/server/db";
const handleError = (error: Error, message: string) => {
  console.error(error);

  throw new Error(`${message}: ${error.message}`);
};

export const formRouter = createTRPCRouter({
   
    formSelect: publicProcedure
    .query(async () => {
        try {
            const forms = await db.form.findMany();
            return forms;
        } catch (err) {
            handleError(err as Error, "Failed to find Form objects");
            throw err; // Rethrow the error after handling it
        }
    }),
    formSelectByID: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (opts) => {
      try {
        const { input } = opts;
        const form = await db.form.findUniqueOrThrow({
          where: {
            id: input.id
          },
        });
        return form;
      } catch (err) {
        handleError(err as Error, "Failed to find Form object");
      }
    }),
    createForm: protectedProcedure
    .input(
        z.object({
            title: z.string(),
            project_name: z.string(),
            description: z.string(),
            completion_date: z.date(),
            type: z.string(),
            frameworks: z.array(z.string()),
            updates: z.string(),
            rating: z.number(),
            image: z.string(),
        }),
    )
    .mutation(async ({ ctx, input }) => {
        try {
            // const { input } = opts;
            const result = await db.form.create({
                data: {
                    title: input.title,
                    project_name: input.project_name,
                    description: input.description,
                    completion_date: input.completion_date,
                    type: input.type,
                    frameworks: input.frameworks,
                    updates: input.updates,
                    rating: input.rating,
                    image: input.image,
                    createdById: ctx.session.user.id
                },
            });
            return result;
        } catch (err) {
            handleError(err as Error, "Failed to create new Form object");
        }
    }),
    updateForm: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        project_name: z.string(),
        description: z.string(),
        completion_date: z.date(),
        type: z.string(),
        frameworks: z.array(z.string()),
        updates: z.string(),
        rating: z.number(),
        image: z.string()
      }),
    )
    .mutation(async ({input}) => {
      try {
        // const { input } = opts;
        const result = await db.form.update({
          where: { id: input.id },
          data: {
            id: input.id,
            title: input.title,
            project_name: input.project_name,
            description: input.description,
            completion_date: input.completion_date,
            type: input.type,
            frameworks: input.frameworks,
            updates: input.updates,
            rating: input.rating,
            image: input.image
          },
        });
        return result;
      } catch (err) {
        handleError(err as Error, "Failed to update Form object");
      }
    }),
    deleteForm: publicProcedure
    .input(
      z.object({
        id: z.string()
      }),
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const result = await db.form.deleteMany({
          where: { id: input.id },
        });
        return result;
      } catch (err) {
        handleError(err as Error, "Failed to delete Form object");
      }
    }),
});
