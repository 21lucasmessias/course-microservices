import { CreatePostDTO, GetPostDTO } from '../../types/post'
import { apiSlice } from '../api/apiSlice'

const endpoint = 'http://localhost:3000/api/posts'

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createPost: build.mutation<GetPostDTO[], { body: CreatePostDTO }>({
            query: (data) => ({
                url: endpoint,
                method: 'POST',
                body: data.body,
            }),
            invalidatesTags: ['Feed'],
        }),
    }),
})

export const { useCreatePostMutation } = postApiSlice
