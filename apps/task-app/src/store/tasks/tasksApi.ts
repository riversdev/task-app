import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getEnvVariables } from '@/helpers'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { Task, ApiResponse, ErrorResponse } from '@/interfaces'

const { API_URL } = getEnvVariables()

export const tasksApi = createApi({
  reducerPath: 'tasks-api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    headers: {
      'Cache-Control': 'no-cache',
    },
  }),
  keepUnusedDataFor: 60,
  tagTypes: ['Tasks'],
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: builder => ({
    getTasks: builder.query<Task[], null>({
      query: () => '/tasks',
      providesTags: ['Tasks'],
      transformResponse: ({ ok, data }: ApiResponse<Task[]>) => (ok === true && data ? data : []),
    }),
    getTask: builder.query<Task | null, string>({
      query: id => `/tasks/${id}`,
      providesTags: ['Tasks'],
      transformResponse: ({ ok, data }: ApiResponse<Task>) => (ok === true && data ? data : null),
      transformErrorResponse: (error: FetchBaseQueryError): ErrorResponse => ({
        status: error.status ?? 500,
        data: (error.data ?? {
          ok: false,
          data: null,
          error: 'Error desconocido',
        }) as ApiResponse<null>,
      }),
    }),
    addTask: builder.mutation<Task | null, Task>({
      query: body => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tasks'],
      transformResponse: ({ ok, data }: ApiResponse<Task>) => (ok === true && data ? data : null),
    }),
    updateTask: builder.mutation<Task | null, Task>({
      query: body => ({
        url: `/tasks/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Tasks'],
      transformResponse: ({ ok, data }: ApiResponse<Task>) => (ok === true && data ? data : null),
    }),
    deleteTask: builder.mutation<boolean, string>({
      query: id => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
      transformResponse: ({ ok }: ApiResponse<undefined>) => ok === true,
    }),
  }),
})

export const {
  useGetTasksQuery,
  useLazyGetTaskQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi
