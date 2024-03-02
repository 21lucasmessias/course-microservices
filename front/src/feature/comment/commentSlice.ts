import { CreateCommentDTO, GetCommentDTO } from '../../types/comment'
import { apiSlice } from '../api/apiSlice'

const endpoint = 'http://localhost:3001/api/posts/:id/comment'

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createComment: build.mutation<GetCommentDTO[], { body: CreateCommentDTO; postId: string }>({
            query: (data) => ({
                url: endpoint.replace(':id', data.postId),
                method: 'POST',
                body: data.body,
            }),
            invalidatesTags: ['Feed'],
        }),
    }),
})

export const { useCreateCommentMutation } = commentApiSlice
