<script setup lang="ts">
import { computed, reactive } from "vue";
import { mock } from "./data";
import NotificationList from "./components/NotificationList.vue";

const data = reactive(mock);
const unreadAmount = computed(() => data.filter((notif) => !notif.read).length);

function markAsRead(notificationId: number) {
  const notification = data.find((notif) => notif.id === notificationId);
  if (!notification) return;
  notification.read = true;
}

function markAllAsRead() {
  data.forEach((notif) => (notif.read = true));
}
</script>

<template>
  <main class="wrapper">
    <div class="summary">
      <h1>
        Notifications
        <span v-if="unreadAmount > 0" class="badge">{{ unreadAmount }}</span>
      </h1>

      <button @click="markAllAsRead">Mark all as read</button>
    </div>

    <NotificationList :notifications="data" @notification-click="markAsRead" />
  </main>
</template>

<style lang="scss">
.wrapper {
  --_wrapper-max-width: 800px;

  width: min(var(--_wrapper-max-width), 100%);
  margin-inline: auto;
}

body {
  background-color: var(--col-gray-100);
}

main {
  padding: 2rem;
  background-color: var(--col-white);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

a:not([class]) {
  text-decoration: none;
  color: var(--col-blue);
  font-weight: var(--fw-800);
}

@media (min-width: 800px) {
  body {
    padding-block: 1rem;
  }

  main {
    border-radius: 0.5rem;
  }
}
</style>

<style lang="scss" scoped>
.summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.2rem;
  }

  button {
    background-color: transparent;
    border: none;
    border-radius: 0px;
    color: var(--col-gray-700);
    font-weight: var(--fw-500);
    padding: 0;
    cursor: pointer;

    &:hover {
      color: var(--col-blue);
    }
  }
}

.badge {
  background-color: var(--col-blue);
  color: var(--col-white);
  font-size: 0.85em;
  padding: 0.1em 0.5em;
  border-radius: 0.3em;
}
</style>
