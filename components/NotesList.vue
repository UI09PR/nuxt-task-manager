<script setup lang="ts">
import { Note, Todo, useNotesStore } from "@/stores/notes";
import Button from "./ui/Button.vue";
import RatioBox from "./ui/RatioBox.vue";
import { useToastsStore } from "@/stores/toasts";
import { getShortText } from "@/utils/get-short-text";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { getFormattedDate } from "@/utils/get-formatted-day";
import QuestModal from "./ui/QuestModal.vue";
const props = defineProps<{ search: string; notes: Note[] }>();

const showModalFlag = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");
const modalAction = ref<() => void>(() => {});

const expandedNotes = reactive<Record<number, boolean>>({});

const toastsStore = useToastsStore();
const notesStore = useNotesStore();
const router = useRouter();

const getComplitedTodoCount = (note: Note) => {
  return note.todos.filter((todo) => todo.completed).length;
};

const editNote = (note: Note) => {
  router.push({ name: "edit-id", params: { id: note.id } });
};

const handleShowTitle = (title: string) => toastsStore.addToast(title, "info", 2000);

const showModal = (type: string, action: () => void = () => {}) => {
  if (type === "delete") {
    modalTitle.value = "Подтверждение удаления";
    modalMessage.value = "Вы уверены, что хотите удалить эту заметку?";
    modalAction.value = action;
  }
  showModalFlag.value = true;
};

const deleteNote = (id: number) => {
  notesStore.deleteNote(id);
  toastsStore.addToast("Блокнот успешно удален", "success");
};

const toggleNoteVisibility = (noteId: number) => {
  expandedNotes[noteId] = !expandedNotes[noteId];
};

const isNoteExpanded = (noteId: number) => !!expandedNotes[noteId];

const getTodosToShow = (noteId: number, todos: Todo[]) => {
  return isNoteExpanded(noteId) ? todos : todos.slice(0, 2);
};

const editNoteSubmit = (note: Note, todo: Todo) => {
  todo.completed = !todo.completed;
  notesStore.editNote(note);
};
</script>

<template>
  <div class="text-white flex-center flex-col sm:w-[60%] w-[80%]">
    <NoteSuspense :isVisible="notes.length <= 0 && !search" />
    <div
      v-for="note in notes"
      :key="note.id"
      class="p-4 w-[100%] my-3 border rounded-md shadow-md flex-between flex-row"
    >
      <div class="flex flex-col w-full flex-wrap">
        <h2
          class="text-xl font-semibold whitespace-break-spaces flex w-full items-start flex-row"
          :class="{ 'line-through text-green-400': getComplitedTodoCount(note) == note.todos.length }"
        >
          <p @click="handleShowTitle(note.title)" class="cursor-pointer">
            {{ getShortText(note.title, 10).primaryText }}
          </p>
          <div class="w-full flex justify-start items-start gap-2 ml-2">
            <Button
              @click="editNote(note)"
              icon="pen-to-square"
              size="xl"
              variant="primary"
              class="text-sm text-[#000] h-7 w-7"
            ></Button>
            <Button
              @click="
                showModal('delete', () => {
                  deleteNote(note.id);
                  showModalFlag = false;
                })
              "
              icon="trash"
              size="xl"
              variant="danger"
              class="text-sm text-[#000] h-7 w-7"
            ></Button>
            <Button
              v-if="note.todos.length > 2"
              @click="toggleNoteVisibility(note.id)"
              class="text-sm text-[#000] h-7 w-7"
              :icon="isNoteExpanded(note.id) ? 'eye-slash' : 'eye'"
              size="sm"
              variant="secondary"
            >
            </Button>
          </div>
        </h2>
        <p class="text-lg text-gray-400">Завершено {{ getComplitedTodoCount(note) }}/{{ note.todos.length }}</p>
        <p class="text-xs text-gray-500">
          Создано: {{ note.createdAt ? getFormattedDate(new Date(note.createdAt)) : "no date" }}
        </p>
        <ol class="mt-2">
          <li
            v-for="(todo, index) in getTodosToShow(note.id, note.todos)"
            :key="index"
            class="flex flex-row gap-2 mt-1"
          >
            <RatioBox
              type="checkbox"
              :modelValue="todo.completed"
              :handleChange="
                () => {
                  editNoteSubmit(note, todo);
                }
              "
              variant="active"
              icon="check"
            />
            <span
              @click="handleShowTitle(index + 1 + ') ' + todo.text)"
              :class="{ 'line-through text-green-400': todo.completed }"
              class="cursor-pointer"
            >
              {{ index + 1 + ")" }} {{ getShortText(todo.text, 10).primaryText }}
            </span>
          </li>
        </ol>
      </div>
    </div>
  </div>
  <QuestModal
    v-if="showModalFlag"
    :is-visible="showModalFlag"
    :title="modalTitle"
    @close="showModalFlag = false"
    class="text-[#000]"
  >
    <template #body>
      <p>{{ modalMessage }}</p>
    </template>
    <template #footer>
      <Button @click="() => modalAction()" variant="danger">Да</Button>
      <Button @click="showModalFlag = false" variant="primary">Нет</Button>
    </template>
  </QuestModal>
</template>
