import { apiService } from '@/core/services/api';

export interface Ticket {
  ticketId: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}

export interface SolveRate {
  solveRatePercentage: number;
  solvedCount: number;
  unsolvedCount: number;
  totalCount: number;
}

export const ticketService = {
  async getMyTickets() {
    return apiService.get<Ticket[]>('/tickets/my-tickets');
  },

  async getAllTickets() {
    return apiService.get<Ticket[]>('/tickets');
  },

  async uploadCsv(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return apiService.postFormData<string>('/tickets/upload-csv', formData);
  },

  async getSolveRate() {
    return apiService.get<SolveRate>('/analytics/solve-rate');
  },
};
