import { Box, Divider } from '@mui/material'

import { CreatePost } from '../post/CreatePost'

import { ListOfPostsWithComments } from './ListOfPostsWithComments'

export function Feed() {
    return (
        <Box display="flex" width="100vw" height="100vh" flex={1} flexDirection="column" gap={2} p={2}>
            <CreatePost />
            <Divider />
            <ListOfPostsWithComments />
        </Box>
    )
}
