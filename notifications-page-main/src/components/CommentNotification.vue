<script lang="ts" setup>
import { type Picture, type User } from "../../types";
import Notification from "./Notification.vue";

defineProps<{
  user: User;
  read: boolean;
  date: string;
  content: Picture
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
      {{ " " }} comented on your picture
    </span>
  </template>

  <template #right>
    <img :src="content.src" alt="">
  </template>
  </Notification>
</template>

<style lang="scss" scoped>
  img {
    width: 70px;
  }
</style>
