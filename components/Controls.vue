<template>
  <div class="fixed flex-center flex-col gap-2 mb-4 bottom-4 right-4 bg-gray-700 p-2 px-4 rounded-lg flex-wrap border">
    <div class="flex-between gap-4">
      <Button @click="undo" icon="rotate-left" size="xl" variant="primary" class="text-sm" :noSafari="isSafari">
      </Button>
      <Button @click="redo" icon="rotate-right" size="xl" variant="primary" class="text-sm" :noSafari="isSafari">
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { useNotesStore } from "@/stores/notes";
import { useToastsStore } from "@/stores/toasts";
import { onBeforeUnmount, onMounted, ref } from "vue";

const notesStore = useNotesStore();
const toastsStore = useToastsStore();

const isSafari = ref<boolean>(false)

const undo = () => {
  notesStore.undo();
  toastsStore.addToast("Назад", "success", 1000);
};

const redo = () => {
  toastsStore.addToast("Восстановление", "success", 1000);
  notesStore.redo();
};

const handleKeyDown = (event: KeyboardEvent) => {
  console.log(1);
  
  if ((event.ctrlKey || event.metaKey) && event.key === "z") {
    event.preventDefault()
    if (event.shiftKey) {
      redo();
    } else {
      undo();
    }
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  isSafari.value = /^((?!chrome|android).)*safari/i.test(navigator?.userAgent);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>
