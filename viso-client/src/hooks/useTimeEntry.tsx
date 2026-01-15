import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { timeEntryService } from '@/services/time-entry.service';

import { TTimeEntryInput } from '@/shared/types/time-entry.type';

export const useCreateTimeEntry = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['createTimeEntry'],
    mutationFn: timeEntryService.create,
    onSuccess: async (data) => {
      toast.success('Time entry created!');
      await queryClient.invalidateQueries({ queryKey: ['timeEntries'] });
    },
    onError: () => {
      toast.error('Error creating time entry');
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useUpdateTimeEntry = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['updateTimeEntry'],
    mutationFn: timeEntryService.update,
    onSuccess: (data) => {
      toast.success('Time entry updated!');
      queryClient.invalidateQueries({ queryKey: ['timeEntries'] });
    },
    onError: () => {
      toast.error('Error update time entry');
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useGetTimeEntries = () => {
  const {
    data: timeEntries = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<TTimeEntryInput[]>({
    queryKey: ['timeEntries'],
    queryFn: async () => {
      const result = await timeEntryService.getAll();

      if (!result || (Array.isArray(result) && result.length === 0)) {
        return [];
      }

      const entries = Array.isArray(result) ? result : [result];

      const validEntries = entries.filter(
        (entry: any) => entry.hours !== undefined && entry.date !== undefined
      );

      return validEntries;
    },
  });

  return {
    timeEntries,
    isLoading,
    isError,
    refetch,
  };
};
