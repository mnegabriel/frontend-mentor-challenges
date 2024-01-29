<script setup lang="ts">
defineProps<{
  notificationId: number;
  thumb: string;
  username: string;
  timeElapsed: string;
  wasRead?: boolean;
}>();

defineEmits<{ (e: "click", id: number): void }>();
</script>

<template>
  <div
    class="notification"
    :class="{ unread: !wasRead }"
    @click="$emit('click', notificationId)"
  >
    <a href="#">
      <img :src="thumb" :alt="`thumb image from ${username}`" />
    </a>

    <div class="content">
      <div class="top">
        <div class="center">
          <p>
            <a href="#">
              <strong class="username"> {{ username }} </strong>
            </a>

            <slot name="description"> followed you </slot>

            <span v-if="!wasRead" class="caret" />
          </p>

          <time> {{ timeElapsed }} </time>
        </div>

        <div v-if="$slots.right" class="right">
          <slot name="right" />
        </div>
      </div>

      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  border-radius: 0.8rem;
  padding: 0.8rem 1rem;
  color: var(--col-gray-700);
  //
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  img {
    width: 50px;
  }

  .username {
    color: var(--col-gray-900);
    font-weight: var(--fw-800);

    &:hover {
      color: var(--col-blue);
    }
  }

  &.unread {
    background-color: var(--col-gray-100);
  }

  .caret {
    display: inline-block;
    background-color: var(--col-red);
    width: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    transform: translateY(-0.17em);
    font-size: inherit;
  }

  time {
    color: var(--col-gray-600);
    display: block;
  }

  .content {
    flex: 1;
  }

  .top {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }
}
</style>
