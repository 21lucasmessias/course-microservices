import { Box, Button, CircularProgress, Input, Typography } from '@mui/material'
import { useState } from 'react'

import { useCreateCommentMutation } from './commentSlice'

interface CreateCommentProps {
    postId: string
}

export function CreateComment({ postId }: CreateCommentProps) {
    const [createComment, createStatus] = useCreateCommentMutation()
    const [comment, setComment] = useState('')

    function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setComment(e.target.value)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            await createComment({
                body: {
                    comment: comment,
                },
                postId: postId,
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2} width="100%" alignItems={'center'} height="100%" flex={1} justifyContent={'flex-end'}>
            <Typography textAlign={'center'} width={'100%'}>
                Create a New Comment
            </Typography>

            <form onSubmit={onSubmit}>
                <Box display={'flex'} flexDirection={'column'} gap={1} maxWidth="400px" height="100%" flex={1}>
                    <Input value={comment} title="Titulo" onChange={(e) => handleOnChange(e)} />
                    {createStatus.isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button type="submit" variant="contained">
                            Comment it
                        </Button>
                    )}
                </Box>
            </form>
        </Box>
    )
}
