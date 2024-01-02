type PostEvent = { id: string; title: string }
type CommentEvent = { id: string; comment: string; postId: string; status: "pending" | "declined" | "allowed" }
type ModerateComment = {
    id: string
    postId: string
    status: "allowed" | "declined"
}

export type Event = { type: "CreatePost"; data: PostEvent } | { type: "CreateComment" | "UpdateComment"; data: CommentEvent } | { type: "ModerateComment"; data: ModerateComment }

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}
