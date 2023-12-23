import { GetCommentDTO } from './comment'

export type GetFeedDTO = {
    [key: string]: {
        id: string
        title: string
        comments: GetCommentDTO[]
    }
}
