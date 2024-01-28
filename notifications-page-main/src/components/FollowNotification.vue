<script lang="ts" setup>
import { type User } from "../../types";
import Notification from "./Notification.vue";

defineProps<{
  id: number;
  user: User;
  read: boolean;
  date: string;
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
  ></Notification>
</template>
