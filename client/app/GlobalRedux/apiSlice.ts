import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    searchAssistance:builder.mutation<searchResponseBody, searchRequestBody>({
      query:({message, cookieId})=>{
        console.log("callllllllllllllllllllllllllllllllllled")
        return({
        url:"https://bazar-chatbot.onrender.com/chat",
        method:"POST",
        body:{
          message,
          cookieId
        }
      })}
    }),
  })

});

export const { useSearchAssistanceMutation } = chatApi;
