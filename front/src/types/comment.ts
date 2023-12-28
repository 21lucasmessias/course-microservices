export type GetCommentDTO = {
    id: string
    comment: string
    status: 'pending' | 'allowed' | 'declined'
}

export type CreateCommentDTO = {
    comment: string
}
