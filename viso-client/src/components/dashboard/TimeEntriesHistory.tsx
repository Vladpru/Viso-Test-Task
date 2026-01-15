'use client';

import { Clock, FolderKanban } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetProjects } from '@/hooks/useProject';
import { useGetTimeEntries } from '@/hooks/useTimeEntry';

import { formatDate } from '@/shared/formatDate';

import AddProjectDialog from './AddProjectDialog';

export default function TimeEntriesHistory() {
  const { timeEntries, isLoading, isError } = useGetTimeEntries();
  const { projects } = useGetProjects();

  const getProjectName = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    return project?.title || 'Unknown Project';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Time Entries History</CardTitle>
          <CardDescription>Loading your time entries...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Time Entries History</CardTitle>
          <CardDescription>Error loading time entries</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Entries History</CardTitle>
        <CardDescription>Your recent time tracking entries</CardDescription>
        <AddProjectDialog />
      </CardHeader>
      <CardContent>
        {!timeEntries || timeEntries.length === 0 ? (
          <p className='text-sm text-muted-foreground'>
            No time entries yet. Start tracking your time!
          </p>
        ) : (
          <div className='space-y-4'>
            {timeEntries.map((entry: any) => (
              <div
                key={entry.id}
                className='flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors gap-3'
              >
                <div className='space-y-1 flex-1'>
                  <div className='flex items-center gap-2'>
                    <FolderKanban className='h-5 w-5 text-muted-foreground flex-shrink-0' />
                    <span className='font-medium text-base sm:text-[18px] break-words'>
                      {entry.title}
                    </span>
                  </div>
                  {entry.description && (
                    <div className='flex flex-col justify-start'>
                      <span className='font-normal text-sm break-words'>
                        <span className='font-medium text-base'>Project:</span>{' '}
                        {getProjectName(entry.projectId)}
                      </span>
                      <p className='text-sm text-muted-foreground break-words'>
                        <span className='font-medium'>Description:</span> {entry.description}
                      </p>
                    </div>
                  )}
                </div>
                <div className='flex items-center justify-between sm:justify-end gap-4 flex-shrink-0'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-muted-foreground' />
                    <span className='font-medium'>{entry.hours || 0}h</span>
                  </div>
                  {entry.date && (
                    <span className='text-sm text-muted-foreground whitespace-nowrap'>
                      {String(formatDate(entry.date))}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
