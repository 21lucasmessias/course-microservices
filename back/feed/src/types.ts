type Comment = { id: string; comment: string; status: "pending" | "declined" | "allowed" }
export type Feed = {
    [key: string]: {
        id: string
        title: string
        comments: Comment[]
    }
}

type PostEvent = { id: string; title: string }
type CommentEvent = { id: string; comment: string; postId: string; status: "pending" | "declined" | "allowed" }
export type Event = { type: "CreatePost"; data: PostEvent } | { type: "CreateComment" | "UpdateComment"; data: CommentEvent }

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}
