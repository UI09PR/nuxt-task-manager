<template>
  <div
    v-if="!isLoading"
    class="flex flex-col jusify-center items-center w-[100vw] bg-[#020501] min-h-[100vh] overflow-x-hidden"
  >
    <NuxtPage />
    <Toast />
    <Controls />

    <QuestModal
      v-if="showModalFlag"
      :is-visible="showModalFlag"
      :title="'Добро пожаловать!'"
      @close="showModalFlag = false"
    >
      <template #body>
        <p>{{ "Хотите загрузить моковые данные?" }}</p>
      </template>
      <template #footer>
        <Button @click="modalAction" variant="danger">Да</Button>
        <Button @click="showModalFlag = false" variant="primary">Нет</Button>
      </template>
    </QuestModal>
  </div>
  <Loader :isLoading="isLoading" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Controls from "./components/Controls.vue";
import QuestModal from "./components/ui/QuestModal.vue";
import Toast from "./components/ui/Toast.vue";
import { useNotesStore } from "./stores/notes";
import Button from "./components/ui/Button.vue";
import { useToastsStore } from "./stores/toasts";
import Loader from "./components/ui/Loader.vue";

const showModalFlag = ref<boolean>(true);
const notesStore = useNotesStore();
const toastsStore = useToastsStore();
const isLoading = ref<boolean>(true);

const modalAction = () => {
  notesStore.loadMockNotes();
  showModalFlag.value = false;
  toastsStore.addToast("Успешно", "success");
};

onMounted(() => {
  toastsStore.addToast('Попробуйте ctrl + z', 'info', 5000)
  toastsStore.addToast('Попробуйте сортировку', 'info', 5000)
    notesStore.loadNotes();
    showModalFlag.value = !(notesStore.notes.length > 0);
    isLoading.value = false;
});
</script>
