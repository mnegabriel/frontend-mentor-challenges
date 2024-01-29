<script lang="ts" setup>
import { type Post, type User } from "../../types";
import Notification from "./Notification.vue";

defineProps<{
  id: number;
  user: User;
  read: boolean;
  date: string;
  content: Post;
}>();

defineEmits<{ (e: "click", id: number): void }>();
</script>

<template>
  <Notification
    :notification-id="id"
    :username="user.name"
    :thumb="user.thumb"
    :was-read="read"
    :time-elapsed="date"
    @click="notifId => $emit('click', notifId)"
  >
    <template #description>
      <span>
        reacted to your recent post <strong><a href="#">{{ content.title + " " }}</a></strong>
      </span>
    </template>
  </Notification>
</template>

<style lang="scss" scoped>
strong a:not(:hover) {
  color: var(--col-gray-800);
}
</style>
