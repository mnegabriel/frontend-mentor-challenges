<script lang="ts" setup>
import { computed } from "vue";
import { GroupEvent, type User } from "../../types";
import Notification from "./Notification.vue";

const props = defineProps<{
  id: number;
  user: User;
  read: boolean;
  date: string;
  content: GroupEvent;
}>();

defineEmits<{ (e: "click", id: number): void }>();

const eventDescriptionText = computed(() =>
  props.content.event === "join" ? "has joined your group" : "left the group"
);
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
        {{ " " }}
        {{ eventDescriptionText }} <a href="#">{{ content.group.name }}</a>
        {{ " " }}
      </span>
    </template>
  </Notification>
</template>
