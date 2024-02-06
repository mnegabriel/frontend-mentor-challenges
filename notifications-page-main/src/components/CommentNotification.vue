<script lang="ts" setup>
import { type Picture, type User } from "../../types";
import Notification from "./Notification.vue";

defineProps<{
  id: number;
  user: User;
  read: boolean;
  date: string;
  content: Picture;
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
      <span> {{ " " }} comented on your picture </span>
    </template>

    <template #right>
      <a href="#">
        <img :src="content.src" alt="" />
      </a>
    </template>
  </Notification>
</template>

<style lang="scss" scoped>
a {
  border-radius: 0.5rem;
  display: inline-block;

  &:hover {
    outline: 2px solid var(--col-blue);
    outline-offset: 2px;
  }
}

img {
  width: 70px;
  /* border-radius: 0.5rem; */
}
</style>
