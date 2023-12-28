import { Box, Card, Typography } from '@mui/material'

import { CreateComment } from '../comment/CreateComment'

import { useGetFeedQuery } from './feedSlice'

export function ListOfPostsWithComments() {
    const { data } = useGetFeedQuery()

    return (
        <Box display="flex" flexDirection={'column'} gap={2} p={2}>
            <Typography variant="h3" textAlign={'center'} width="100%">
                Feed
            </Typography>
            <Box display="flex" flex={1} flexDirection={'row'} flexWrap={'wrap'} sx={{ overflowY: 'auto' }} gap={2} p={2} height="100%">
                {data &&
                    Object.values(data).map((data) => (
                        <Card key={data.id} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
                            <Typography>{data.title}</Typography>
                            <Box display="flex" flexDirection={'column'} gap={1}>
                                {data.comments.map((comment) => (
                                    <Box key={comment.id}>
                                        <Typography>{comment.comment}</Typography>
                                        <Typography color={comment.status === 'allowed' ? 'green' : comment.status === 'declined' ? 'red' : 'orange'}>
                                            {comment.status}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            <CreateComment postId={data.id} />
                        </Card>
                    ))}
            </Box>
        </Box>
    )
}
