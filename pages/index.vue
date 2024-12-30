<template>
  <div class="flex-center flex-col w-full mt-2 mb-16 p-2">
    <h1 class="text-2xl font-bold mb-2 text-white flex text-center items-center">
      Список заметок
      <Button
        @click="createNote"
        class="text-sm text-[#000] h-7 w-7 ml-2"
        icon="plus"
        size="2xs"
        variant="active"
      ></Button>
      <Button
        @click="clearAll"
        class="text-sm text-[#000] h-7 w-7 ml-2"
        icon="eraser"
        size="2xs"
        variant="danger"
      ></Button>
    </h1>

    <SearchForm :handleSearch="handleSearch" :search="search" />
    <NotesList :search="search" :notes="notes" />

    <div class="mt-2">
      <button @click="createNote" class="bg-green-500 text-white px-4 py-2 rounded">Создать новую заметку</button>
    </div>

    <QuestModal v-if="showModalFlag" :is-visible="showModalFlag" :title="modalTitle" @close="showModalFlag = false">
      <template #body>
        <p>{{ modalMessage }}</p>
      </template>
      <template #footer>
        <Button @click="() => modalAction()" variant="danger">Да</Button>
        <Button @click="showModalFlag = false" variant="primary">Нет</Button>
      </template>
    </QuestModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "@/components/ui/Button.vue";
import { useRouter } from "vue-router";
import { useNotesStore } from "@/stores/notes";
import QuestModal from "@/components/ui/QuestModal.vue";
import SearchForm from "@/components/SearchForm.vue";
import NotesList from "@/components/NotesList.vue";

const notesStore = useNotesStore();
const router = useRouter();

notesStore.loadNotes();

const showModalFlag = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");
const modalAction = ref<() => void>(() => {});

const handleSearch = (strSearch: string) => {
  search.value = strSearch;
};

const createNote = () => {
  router.push({ name: "new" });
};

const clearAll = () => {
  modalTitle.value = "Подтверждение удаления";
  modalMessage.value = "Вы уверены, что хотите удалить ВСЕ записи?";
  modalAction.value = () => {
    notesStore.clearAll();
    showModalFlag.value = false;
  };
  showModalFlag.value = true;
};

const search = ref<string>("");
const notes = computed(() => notesStore.search(search.value));
</script>
