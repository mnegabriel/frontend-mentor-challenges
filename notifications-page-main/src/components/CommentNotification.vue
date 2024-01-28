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
    @click="notifId => $emit('click', notifId)"
  >
    <template #description>
      <span> {{ " " }} comented on your picture </span>
    </template>

    <template #right>
      <img :src="content.src" alt="" />
    </template>
  </Notification>
</template>

<style lang="scss" scoped>
img {
  width: 70px;
}
</style>
