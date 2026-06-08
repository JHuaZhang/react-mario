import type { ComponentConfig } from 'react-mario-core';
import request from './request';

import { TemplateStatus } from '@/types/enum';

export { TemplateStatus };

export interface TemplateItem {
  _id: string;
  name: string;
  schema: ComponentConfig[] | null;
  status: TemplateStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateInput {
  name: string;
  schema?: ComponentConfig[] | null;
  status?: TemplateStatus;
}

export const templateApi = {
  list(): Promise<TemplateItem[]> {
    return request.get('/template');
  },

  detail(id: string): Promise<TemplateItem> {
    return request.get(`/template/${id}`);
  },

  create(input: TemplateInput): Promise<TemplateItem> {
    return request.post('/template', input);
  },

  update(id: string, input: Partial<TemplateInput>): Promise<TemplateItem> {
    return request.put(`/template/${id}`, input);
  },

  remove(id: string): Promise<void> {
    return request.delete(`/template/${id}`);
  },
};
