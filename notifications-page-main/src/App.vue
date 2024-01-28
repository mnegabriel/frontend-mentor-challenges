<script setup lang="ts">
import { reactive } from "vue";
import { mock } from "./data";
import NotificationList from "./components/NotificationList.vue";

const data = reactive(mock);
</script>

<template>
  <main class="wrapper">
    <p>Notifications 3</p>

    <p>Mark all as read</p>

    <NotificationList :notifications="data" />
  </main>
</template>

<style lang="scss">
.wrapper {
  --_wrapper-max-width: 800px;
  --_wrapper-padding-inline: 2rem;

  width: min(
    var(--_wrapper-max-width),
    calc(100% - 2 * var(--_wrapper-padding-inline))
  );
  margin-inline: auto;
}

main {
  padding-block: 2rem;
}

a:not([class]) {
  text-decoration: none;
  color: var(--col-blue);
  font-weight: var(--fw-800);

  &:hover {
    filter: brightness(1.5);
  }
}
</style>
