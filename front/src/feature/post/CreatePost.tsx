import { Box, Button, CircularProgress, Input, Typography } from '@mui/material'
import { useState } from 'react'

import { useCreatePostMutation } from './postSlice'

export function CreatePost() {
    const [createPost, createStatus] = useCreatePostMutation()
    const [title, setTitle] = useState('')

    function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        e.preventDefault()
        setTitle(e.target.value)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await createPost({
                body: {
                    title: title,
                },
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2} width="100%" alignItems={'center'}>
            <Typography textAlign={'center'} width={'100%'}>
                Create a New Post
            </Typography>

            <form onSubmit={onSubmit}>
                <Box display={'flex'} flexDirection={'column'} gap={1} maxWidth="400px">
                    <Input value={title} title="Titulo" onChange={(e) => handleOnChange(e)} />
                    {createStatus.isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button type="submit" variant="contained">
                            Post It
                        </Button>
                    )}
                </Box>
            </form>
        </Box>
    )
}
