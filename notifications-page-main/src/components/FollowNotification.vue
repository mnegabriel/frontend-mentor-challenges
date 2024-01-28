<script lang="ts" setup>
import { type User } from "../../types";
import Notification from "./Notification.vue";

defineProps<{
  user: User;
  read: boolean;
  date: string;
}>();
</script>

<template>
  <Notification
    :username="user.name"
    :thumb="user.thumb"
    :was-read="read"
    :time-elapsed="date"
  ></Notification>
</template>
