import z from 'zod';

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string({ error: 'Titile is required' }),
});

export type TProject = z.infer<typeof ProjectSchema>;
