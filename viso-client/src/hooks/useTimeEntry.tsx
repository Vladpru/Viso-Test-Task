import { timeEntryService } from "@/services/time-entry.service"
import { TTimeEntry } from "@/shared/types/time-entry.type"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateTimeEntry = () => {
  const {mutate, isPending} = useMutation({
    mutationKey: ['createTimeEntry'],
    mutationFn: timeEntryService.create,
    onSuccess: data => {
      toast.success("Time entry created!")
    },
    onError: error => {
      console.error('Time entry creation error: ', error);
      toast.error("Error creating time entry")
    }
  })
  
  return {
    mutate,
    isPending
  }
} 

export const useUpdateTimeEntry = () => {
  const {mutate, isPending} = useMutation({
    mutationKey: ['updateTimeEntry'],
    mutationFn: timeEntryService.update,
    onSuccess: data => {
      toast.success("Time entry updated!")
    },
    onError: error => {
      console.error('Time entry update error: ', error);
      toast.error("Error update time entry")
    }
  })
  
  return {
    mutate,
    isPending
  }
} 

export const useGetTimeEntries = () => {
  const {
    data: timeEnties = [], 
    isLoading,
    isError,
  } = useQuery<TTimeEntry[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const result = await timeEntryService.getAll();
      return Array.isArray(result) ? result : [result];
    },
  });
  
  return {
    timeEnties,
    isLoading,
    isError
  }
}