import z from 'zod'

export const ProjectSchema = z.object({
  title: z
    .string({ error: 'Titile is required' })
});

export type TProject = z.infer<typeof ProjectSchema>;
