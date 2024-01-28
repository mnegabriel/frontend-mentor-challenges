<script lang="ts" setup>
import { type Post, type User } from "../../types";
import Notification from "./Notification.vue";

defineProps<{
  user: User;
  read: boolean;
  date: string;
  content: Post;
}>();
</script>

<template>
  <Notification
    :username="user.name"
    :thumb="user.thumb"
    :was-read="read"
    :time-elapsed="date"
  >
    <template #description>
      <span>
        reacted to your recent post <strong>{{ content.title + " " }}</strong>
      </span>
    </template>
  </Notification>
</template>
