<template>
  <div :class="['checkbox-wrapper', wrapperClass, computedClass]">
    <label :class="['checkbox-label', computedClass, labelClass]">
      <input
        type="checkbox"
        :class="['checkbox-input', inputClass]"
        :disabled="disabled"
        :checked="modelValue"
        @change="(event) => handleChange(event)"
      />
      <span :class="['checkbox-custom', computedClass, customClass, modelValue ? getStyleByVariant(variant ?? 'secondary') : '']">
        <FontAwesomeIcon v-if="icon" :icon="icon" class="m-0 p-0" />
      </span>
      <slot></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getStyleByVariant } from "@/utils/get-class-by-variant";
import { VariantType } from "@/types";

const props = defineProps<{
  icon?: string;
  class?: string;
  wrapperClass?: string;
  labelClass?: string;
  inputClass?: string;
  customClass?: string;
  disabled?: boolean;
  modelValue: boolean;
  variant?: VariantType;
  handleChange: (event: Event) => void;
}>();

const computedClass = computed(() => {
  return `${props.class}`;
});
</script>

<style scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid currentColor;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.checkbox-label > slot {
  margin-left: 0.5rem;
}
</style>
