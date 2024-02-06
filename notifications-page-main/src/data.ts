import { type NotificationItem } from "../types"

export const mock: NotificationItem[] = [
    {
        read: false,
        id: 1,
        user: {
            name: "Mark Webber",
            username: "",
            thumb: "/images/avatar-mark-webber.webp"
        },
        kind: "reaction",
        content: {
            title: "My first tournament today!"
        },
        date: "1m ago"
    },
    {
        read: false,
        id: 2,
        user: {
            name: "Angela Gray",
            username: "",
            thumb: "/images/avatar-angela-gray.webp"
        },
        kind: "follow",
        content: null,
        date: "5m ago"
    },
    {
        read: false,
        id: 3,
        user: {
            name: "Jacob Thompson",
            username: "",
            thumb: "/images/avatar-jacob-thompson.webp"
        },
        kind: "groupEvent",
        content: {
            event: "join",
            group: {
                id: 1,
                name: "Chess Club"
            }
        },
        date: "1 day ago"
    },
    {
        read: false,
        id: 4,
        user: {
            name: "Rizky Hasanuddin",
            username: "",
            thumb: "/images/avatar-rizky-hasanuddin.webp"
        },
        kind: "message",
        content: {
            text: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game."
        },
        date: "5 days ago"
    },
    {
        read: true,
        id: 5,
        user: {
            name: "Kimberly Smith",
            username: "",
            thumb: "/images/avatar-kimberly-smith.webp"
        },
        kind: "comment",
        content: {
            src: "/images/image-chess.webp"
        },
        date: "1 week ago"
    },
    {
        read: true,
        id: 6,
        user: {
            name: "Nathan Peterson",
            username: "",
            thumb: "/images/avatar-nathan-peterson.webp"
        },
        kind: "reaction",
        content: {
            title: "5 end-game strategies to increase your win rate"
        },
        date: "2 weeks ago"
    },
    {
        read: true,
        id: 7,
        user: {
            name: "Anna Kim",
            username: "",
            thumb: "/images/avatar-anna-kim.webp"
        },
        kind: "groupEvent",
        content: {
            event: "leave",
            group: {
                id: 2,
                name: "Chess Club"
            }
        },
        date: "2 weeks ago"
    },
]