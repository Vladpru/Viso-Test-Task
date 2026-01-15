import { appApi } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { TProject } from "@/shared/types/project.type";

export class ProjectService {
  async create (data: TProject) {
    const response = await appApi.post<TProject>(API_URL.project(), data);
    return response.data;
  };

  async getAll () {
    const response = await appApi.get<TProject[]>(API_URL.project());
    return response.data;
  };
}

export const projectService = new ProjectService()