import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
        query: () => "/posts",
        transformResponse: res => res.sort((a,b)=> b.id - a.id),
        providesTags: ['Posts']
    }),
    postPosts: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
        }),
        invalidatesTags: ['Posts']
    }),
    updatePosts: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
        }),
        invalidatesTags: ['Posts']
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: id,
        }),
        invalidatesTags: ['Posts']
    }),
  }),
});

export const {
  useGetPostsQuery,
  usePostPostsMutation,
  useUpdatePostsMutation,
  useDeletePostMutation,
} = apiSlice;
