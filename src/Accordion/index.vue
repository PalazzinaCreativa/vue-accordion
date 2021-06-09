<template>
  <div class="accordion" :class="{ open }">
    <div class="accordion__head" @click="toggle">
      <slot name="head" />
      <div v-if="!disable">
        <div v-if="!$slots.icon" class="accordion__head--icon">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 12"><path d="M2 2l8 8 8-8" :stroke="iconColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <slot name="icon" v-else />
      </div>
    </div>
    <transition name="accordion" @enter="enter" @before-enter="beforeEnter" @leave="enter" @before-leave="beforeLeave">
      <div class="accordion__body" v-if="disable || open">
        <slot name="body" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    iconColor: {
      type: String,
      default: () => '#fff'
    },
    disable: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    open: false
  }),
  methods: {
    toggle () {
      this.open = !this.open
    },
    beforeEnter (el) {
      el.style.height = '0';
    },
    enter (el) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave (el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave (el) {
      el.style.height = '0';
    }
  }
}
</script>

<style lang="scss" scoped>
.accordion {
  display: block;
  width: 100%;
  &__head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &--icon {
      svg {
        width: 0.75rem;
      }
    }
  }
  &__body {
    display: block;
    width: 100%;
    transition: height 1s cubic-bezier(0.218, 0.58, 0.36, 1);
  }
}
</style>