<template>
  <div v-if="isLoading" class="flex-center flex-col fixed w-full h-full bg-[#000] opacity-[1]">
    <h1 class="rotate-animation text-[1000%] text-white text-center w-full flex-center">*</h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  isLoading?: boolean;
}>();

const width = window?.innerWidth;

const iconSize = computed(() => {
  if (width < 640) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "lg";
  return "xl";
});
</script>

<style scoped>
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-o-keyframes spin {
  from {
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate-animation {
  -webkit-animation: spin 2s linear infinite;
  -moz-animation: spin 2s linear infinite;
  -o-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
</style>
