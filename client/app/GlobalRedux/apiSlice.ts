import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<{
      messsage:string
    }, {message:string}>({
      query: (message) => {
        return {
        url: 'message',
        method: 'POST',
        body:  message,
      }},
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
