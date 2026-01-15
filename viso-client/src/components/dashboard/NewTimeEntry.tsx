import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useGetProjects } from '@/hooks/useProject';
import { useCreateTimeEntry } from '@/hooks/useTimeEntry';

import { TimeEntrySchema } from '@/shared/types/time-entry.type';

export default function NewTimeEntry() {
  const { projects, isLoading, isError } = useGetProjects();
  const { mutate, isPending } = useCreateTimeEntry();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    projectId: '',
    hours: '',
    title: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = TimeEntrySchema.parse({
        date: new Date(formData.date),
        hours: parseFloat(formData.hours),
        title: formData.title,
        description: formData.description,
      });

      if (!formData.projectId) {
        setErrors({ projectId: 'Please select a project' });
        toast.error('Please select a project');
        return;
      }

      mutate(
        {
          ...validatedData,
          projectId: formData.projectId,
        },
        {
          onSuccess: () => {
            setFormData({
              date: new Date().toISOString().split('T')[0],
              projectId: '',
              hours: '',
              title: '',
              description: '',
            });
          },
        }
      );
    } catch (error: any) {
      if (error.errors) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          const field = err.path[0];
          formattedErrors[field] = err.message;
        });
        setErrors(formattedErrors);
        toast.error('Please fix the validation errors');
      }
    }
  };

  return (
    <div className='lg:col-span-1'>
      <Card className='sticky top-8'>
        <CardHeader>
          <CardTitle>New Time Entry</CardTitle>
          <CardDescription>Log your work hours</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <Label htmlFor='date'>Date</Label>
              <Input
                id='date'
                type='date'
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                disabled={isPending}
                className={errors.date ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {errors.date && <p className='text-sm text-red-500'>{errors.date}</p>}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='project'>Project</Label>
              <select
                id='project'
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                disabled={isPending || isLoading}
                className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.projectId
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : 'border-input focus-visible:ring-ring'
                }`}
              >
                <option value=''>Select a project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
              {errors.projectId && <p className='text-sm text-red-500'>{errors.projectId}</p>}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                type='text'
                placeholder='e.g., Bug fixing'
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={isPending}
                className={errors.title ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {errors.title && <p className='text-sm text-red-500'>{errors.title}</p>}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='hours'>Hours</Label>
              <Input
                id='hours'
                type='number'
                placeholder='e.g., 3.5'
                step='0.5'
                min='0'
                max='24'
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                disabled={isPending}
                className={errors.hours ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {errors.hours && <p className='text-sm text-red-500'>{errors.hours}</p>}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Work Description</Label>
              <textarea
                id='description'
                placeholder='Describe what you worked on...'
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={isPending}
                className={`flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.description
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : 'border-input focus-visible:ring-ring'
                }`}
                rows={4}
              />
              {errors.description && <p className='text-sm text-red-500'>{errors.description}</p>}
            </div>

            <Button className='w-full cursor-pointer' type='submit' disabled={isPending}>
              <Plus className='mr-2 h-4 w-4' />
              {isPending ? 'Saving...' : 'Save Entry'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
