import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from '../../app/store'

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Post', 'Comment', 'Feed'],
    endpoints: () => ({}),
    baseQuery: fetchBaseQuery({
        mode: 'cors',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
})

export const selectApi = (state: RootState) => state.api
