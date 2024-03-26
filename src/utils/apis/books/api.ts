import { IBook, BookingSchema } from "./types";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { Request, Response, ResponsePagination } from "@/utils/types/api";
import { buildQueryString } from "@/utils/formatter";

export const getBooking = async (params?: Request) => {
  try {
    const query = buildQueryString(params);
    const url = query ? `/v1/booking/list${query}&rp=10` : "/v1/booking/list";

    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination<IBook[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const postBooking = async (body: BookingSchema) => {
  try {
    const response = await axiosWithConfig.post(`/v1/booking`, body);

    return response.data as Response<null>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const updateBooking = async (
  body: BookingSchema,
  booking_id: string
) => {
  try {
    const response = await axiosWithConfig.put(
      `/v1/booking/${booking_id}`,
      body
    );

    return response.data as Response<null>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const deleteBooking = async (booking_id: string) => {
  try {
    const response = await axiosWithConfig.delete(
      `/v1/booking/delete/${booking_id}`
    );

    return response.data as Response;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const cancelBooking = async (booking_id: string) => {
  try {
    const response = await axiosWithConfig.post(
      `/v1/booking/${booking_id}/cancel`
    );

    return response.data as Response<null>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};
