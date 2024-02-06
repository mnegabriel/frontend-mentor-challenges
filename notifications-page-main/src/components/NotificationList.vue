<script lang="ts" setup>
import { type Component } from "vue";
import { type NotificationItem, type NotificationKind } from "../../types";
import FollowNotification from "./FollowNotification.vue";
import CommentNotification from "./CommentNotification.vue";
import GroupEventNotification from "./GroupEventNotification.vue";
import MessageNotification from "./MessageNotification.vue";
import ReactionNotification from "./ReactionNotification.vue";

defineProps<{ notifications: NotificationItem[] }>();
defineEmits<{ (e: "notification-click", id: number): void }>();

const componentMap: Record<NotificationKind, Component> = {
  follow: FollowNotification,
  comment: CommentNotification,
  groupEvent: GroupEventNotification,
  message: MessageNotification,
  reaction: ReactionNotification,
};
</script>

<template>
  <div class="notifications-list">
    <component
      v-for="notif of notifications"
      :is="componentMap[notif.kind]"
      :key="notif.id"
      v-bind="notif"
      @click="(id:number) => $emit('notification-click', id)"
    />
  </div>
</template>

<style lang="scss" scoped>
.notifications-list {
  display: grid;
  gap: 1rem;
}
</style>
