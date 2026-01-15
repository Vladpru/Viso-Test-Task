'use client';

import { Calendar, Clock, FolderKanban, Plus } from 'lucide-react';

import NewTimeEntry from '@/components/dashboard/NewTimeEntry';
import TimeEntriesHistory from '@/components/dashboard/TimeEntriesHistory';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useGetTimeEntries } from '@/hooks/useTimeEntry';

import { TTimeEntry } from '@/shared/types/time-entry.type';

export default function Dashboard() {
  const { timeEntries } = useGetTimeEntries();

  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const today = new Date('2026-01-15').toISOString().split('T')[0];
  const todayEntries = timeEntries.filter((e) => {
    const entryDate = e.date instanceof Date ? e.date : new Date(e.date);
    return entryDate.toISOString().split('T')[0] === today;
  });
  const todayHours = todayEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const totalEntries = timeEntries.length;

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-4xl text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
            Time Tracker Dashboard
          </h1>
          <p className='text-gray-600 text-center dark:text-gray-400'>
            Track your time efficiently across projects
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardDescription>Total Hours</CardDescription>
                <Clock className='h-4 w-4 text-blue-600' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-blue-600'>{totalHours}h</div>
              <p className='text-xs text-muted-foreground mt-1'>Across all projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardDescription>Today&apos;s Hours</CardDescription>
                <Calendar className='h-4 w-4 text-purple-600' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-purple-600'>{todayHours}h</div>
              <p className='text-xs text-muted-foreground mt-1'>
                {todayEntries.length} {todayEntries.length === 1 ? 'entry' : 'entries'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardDescription>Total Entries</CardDescription>
                <FolderKanban className='h-4 w-4 text-green-600' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-green-600'>{totalEntries}</div>
              <p className='text-xs text-muted-foreground mt-1'>Time records</p>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <NewTimeEntry />
          <div className='lg:col-span-2'>
            <TimeEntriesHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
