'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useCreateProject } from '@/hooks/useProject';

export default function AddProjectDialog() {
  const queryClient = useQueryClient();
  const { mutate: createProject, isPending } = useCreateProject();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectTitle.trim()) {
      createProject({ title: projectTitle.trim() } as any, {
        onSuccess: () => {
          setProjectTitle('');
          setIsDialogOpen(false);
          queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size='sm' className='gap-2 max-w-44'>
          <Plus className='h-4 w-4' />
          Add Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Add a new project to track your time</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateProject} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='projectTitle'>Project Title</Label>
            <Input
              id='projectTitle'
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder='e.g., Client Website Redesign'
              required
            />
          </div>
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
