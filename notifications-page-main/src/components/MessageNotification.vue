<script lang="ts" setup>
import { PrivateMessage, type User } from "../../types";
import Notification from "./Notification.vue";

defineProps<{
  user: User;
  read: boolean;
  date: string;
  content: PrivateMessage;
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
      <span>{{ " " }} sent you a private message.</span>
    </template>

    <template #footer>
      <div class="message">
        {{ content.text }}
      </div>
    </template>
  </Notification>
</template>

<style lang="scss" scoped>
.message {
  margin-block-start: 4px;
  border: 1px solid var(--col-gray-400);
  border-radius: 0.5rem;
  padding: 1rem;
  line-height: 1.2;
}
</style>