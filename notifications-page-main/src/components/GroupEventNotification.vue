<script lang="ts" setup>
import { computed } from "vue";
import { GroupEvent, type User } from "../../types";
import Notification from "./Notification.vue";

const props = defineProps<{
  user: User;
  read: boolean;
  date: string;
  content: GroupEvent;
}>();

const eventDescriptionText = computed(() =>
  props.content.event === "join" ? "has joined your group" : "left the group"
);
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
        {{ " " }}
        {{ eventDescriptionText }} <a href="#">{{ content.group.name }}</a>
        {{ " " }}
      </span>
    </template>
  </Notification>
</template>
