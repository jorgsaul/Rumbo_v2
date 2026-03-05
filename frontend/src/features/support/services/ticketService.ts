import { api } from "@/lib";
import type { ApiResponse } from "@/types/api.types";
import { Ticket } from "../types/support.types";

export const ticketService = {
  create: async (data: {
    title: string;
    description: string;
    category: string;
  }): Promise<Ticket> => {
    const { data: res } = await api.post<ApiResponse<Ticket>>("/tickets", data);
    return res.response;
  },
  getMyTickets: async (): Promise<Ticket[]> => {
    const { data } = await api.get<ApiResponse<Ticket[]>>("/tickets/my");
    return data.response;
  },
};
