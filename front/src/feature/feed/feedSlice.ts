import { GetFeedDTO } from '../../types/feed'
import { apiSlice } from '../api/apiSlice'

const endpoint = 'http://localhost:3002/api/feed'

export const feedApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getFeed: build.query<GetFeedDTO, void>({
            query: () => ({
                url: endpoint,
                method: 'GET',
            }),
            providesTags: ['Feed'],
        }),
    }),
})

export const { useGetFeedQuery } = feedApiSlice
