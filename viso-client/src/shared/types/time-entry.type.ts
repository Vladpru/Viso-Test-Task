import z from 'zod'

export const TimeEntrySchema = z.object({
  date: z
    .date(),
  hours: z
    .number(),
  title: z
    .string({ error: 'Title is required' }),
  description: z
    .string({error: "Description is required"})
});

export type TTimeEntry = z.infer<typeof TimeEntrySchema>

export type TTimeEntryInput = TTimeEntry & {
  projectId: string;
}

export type TTimeEntryUpdate = Partial<TTimeEntryInput> 