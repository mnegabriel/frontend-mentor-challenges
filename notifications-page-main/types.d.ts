type Id = number

type User = {
    name: string;
    username: string;
    thumb: string;
}

type Post = {
    title: string;
}

type PrivateMessage = {
    text: string;
}

type Picture = {
    src: string;
}

type Group = {
    id: Id;
    name: string;
}

type GroupEvent = {
    group: Group;
    event: "join" | "leave"
}

type NotificationKind = "follow" | "comment" | "groupEvent" | "reaction" | "message"
type NotificationBase = {
    read: boolean;
    id: Id;
    user: User;
    kind: NotificationKind;
    date: string; // For mocking purposes, this is not actually a date
}

type FollowNotification = NotificationBase
    & { kind: "follow", content: null }
type CommentNotification = NotificationBase
    & { kind: "comment", content: Picture }
type GroupEventNotification = NotificationBase
    & { kind: "groupEvent", content: GroupEvent }
type ReactionNotification = NotificationBase
    & { kind: "reaction", content: Post }
type MessageNotification = NotificationBase
    & { kind: "message", content: PrivateMessage }

export type NotificationItem = FollowNotification
    | CommentNotification
    | GroupEventNotification
    | ReactionNotification
    | MessageNotification