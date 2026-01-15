import { appApi } from '@/api/api.interceptors';

import { TTimeEntry, TTimeEntryInput, TTimeEntryUpdate } from '@/shared/types/time-entry.type';

import { API_URL } from '../config/api.config';

class TimeEntryService {
  async getById(id: string) {
    const { data } = await appApi.get<TTimeEntry>(API_URL.timeEntry(`${id}`));
    return data;
  }

  async getAll() {
    const { data } = await appApi.get<TTimeEntryInput[]>(API_URL.timeEntry());
    return data;
  }

  async create(data: TTimeEntryInput) {
    const { data: response } = await appApi<TTimeEntry>({
      url: API_URL.timeEntry(),
      method: 'POST',
      data,
    });
    return response;
  }

  async update(data: TTimeEntryUpdate) {
    const { data: response } = await appApi<TTimeEntry>({
      url: API_URL.timeEntry(),
      method: 'PATCH',
      data,
    });
    return response;
  }
}

export const timeEntryService = new TimeEntryService();
