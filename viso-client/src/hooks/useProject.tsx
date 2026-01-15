import {  projectService } from "@/services/project.service"
import { TProject } from "@/shared/types/project.type"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateProject = () => {
  const {mutate, isPending} = useMutation({
    mutationKey: ['createProject'],
    mutationFn: projectService.create,
    onSuccess: data => {
      toast.success("Project created!")
    },
    onError: error => {
      console.error('Project creation error: ', error);
      toast.error("Error creting project")
    }
  })
  return {
    mutate,
    isPending
  }
}

export const useGetProjects = () => {
  const {
    data: timeEnties = [], 
    isLoading,
    isError,
  } = useQuery<TProject[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const result = await projectService.getAll();
      return Array.isArray(result) ? result : [result];
    },
  });
  
  return {
    timeEnties,
    isLoading,
    isError
  }
}