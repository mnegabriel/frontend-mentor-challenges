<script lang="ts" setup>
import { PrivateMessage, type User } from "../../types";
import Notification from "./Notification.vue";

defineProps<{
  id: number;
  user: User;
  read: boolean;
  date: string;
  content: PrivateMessage;
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
    @click="(notifId) => $emit('click', notifId)"
  >
    <template #description>
      <span>{{ " " }} sent you a private message.</span>
    </template>

    <template #footer>
      <a href="#">
        <p class="message">
          {{ content.text }}
        </p>
      </a>
    </template>
  </Notification>
</template>

<style lang="scss" scoped>
.message {
  font-weight: var(--fw-500);
  color: var(--col-gray-700);
  margin-block-start: 4px;
  border: 1px solid var(--col-gray-400);
  border-radius: 0.5rem;
  padding: 1rem;
  line-height: 1.2;

  &:hover {
    background-color: var(--col-gray-400);
  }
}
</style>
