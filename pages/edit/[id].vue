<template>
  <div class="mt-4 sm:w-[60%] w-[80%]">
    <h1 class="text-2xl font-bold mb-4 text-white">Редактирование заметки</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="title" class="block font-semibold text-white">Заголовок заметки</label>
        <input v-model="note.title" type="text" id="title" class="border rounded p-2 w-full mt-2" required />
      </div>

      <div class="flex flex-col justify-center items-start w-full">
        <label for="todo" class="block font-semibold text-white">Задачи</label>
        <div v-for="(todo, index) in note.todos" :key="index" class="flex gap-2 justify-start items-center w-full">
          <input v-model="todo.text" type="text" class="rounded p-2 w-full my-2" />
          <div class="flex-center gap-3 border h-10 rounded px-2">
            <RatioBox
              type="checkbox"
              :modelValue="todo.completed"
              :handleChange="(event) => { todo.completed = (event.target as HTMLInputElement).checked; }"
              variant="active"
              icon="check"
              class="text-white"
            />
            <Button @click="removeTodo(index)" type="button" variant="danger" icon="close" size="6x" class="h-6 w-6">
            </Button>
          </div>
        </div>
        <div class="flex-between mt-4 w-full gap-2 flex-wrap">
          <Button
            @click="addTodo"
            type="button"
            class="text-white text-sm sm:text-base md:text-lg xl:text-xl"
            icon="plus"
            size="2x"
            variant="primary"
            :noSafari="isSafari"
          >
            <p class="ml-1 whitespace-nowrap">Добавить задачу</p>
          </Button>
          <Button
            type="submit"
            class="text-white text-sm sm:text-base md:text-lg xl:text-xl"
            icon="floppy-disk"
            size="2x"
            variant="active"
            :noSafari="isSafari"
          >
            <p class="ml-1 whitespace-nowrap">Сохранить</p>
          </Button>
          <Button
            @click="showModal('delete')"
            type="button"
            icon="trash"
            size="2x"
            variant="danger"
            class="text-white text-sm sm:text-base md:text-lg xl:text-xl"
            :noSafari="isSafari"
          >
            <p class="ml-1 whitespace-nowrap">Удалить</p>
          </Button>

          <Button
            @click="showModal('cancel')"
            type="button"
            icon="ban"
            size="2x"
            class="text-white text-sm sm:text-base md:text-lg xl:text-xl"
            :noSafari="isSafari"
          >
            <p class="ml-1">Отмена</p>
          </Button>
        </div>
      </div>
    </form>

    <QuestModal v-if="showModalFlag" :is-visible="showModalFlag" :title="modalTitle" @close="showModalFlag = false">
      <template #body>
        <p>{{ modalMessage }}</p>
      </template>
      <template #footer>
        <Button @click="modalAction" variant="danger">Да</Button>
        <Button @click="showModalFlag = false" variant="primary">Нет</Button>
      </template>
    </QuestModal>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import RatioBox from "@/components/ui/RatioBox.vue";
import QuestModal from "@/components/ui/QuestModal.vue";
import { Note, useNotesStore } from "@/stores/notes";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToastsStore } from "@/stores/toasts";
import { validateNote } from "@/utils/vlidate-note";

const notesStore = useNotesStore();
const toastsStore = useToastsStore();
const isSafari = ref(false);

const router = useRouter();
const route = useRoute();

const note = ref<Note>({
  id: 0,
  title: "",
  todos: [],
});

const showModalFlag = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");
const modalAction = ref<() => void>(() => {});

onMounted(() => {
  isSafari.value = /^((?!chrome|android).)*safari/i.test(navigator?.userAgent);
  const noteId: number = Number(route.params.id);
  const existingNote = notesStore.notes.find((n) => n.id === noteId);
  if (existingNote) {
    note.value = { ...existingNote };
  }
});

const addTodo = () => {
  note.value.todos.push({ text: "", completed: false });
};

const removeTodo = (index: number) => {
  note.value.todos.splice(index, 1);
};

const submitForm = () => {
  const validate = validateNote(note.value)
  if (validate.validate) {
    notesStore.editNote(note.value);
    toastsStore.addToast("Блокнот успешно изменен", "success");
    router.push("/");
  }
  else toastsStore.addToast(validate.message, "error");
};

const showModal = (type: string) => {
  if (type === "cancel") {
    modalTitle.value = "Подтверждение отмены";
    modalMessage.value = "Вы уверены, что хотите отменить редактирование?";
    modalAction.value = cancelEdit;
  } else if (type === "delete") {
    modalTitle.value = "Подтверждение удаления";
    modalMessage.value = "Вы уверены, что хотите удалить эту заметку?";
    modalAction.value = deleteNote;
  }
  showModalFlag.value = true;
};

const cancelEdit = () => {
  router.push("/");
  showModalFlag.value = false;
};

const deleteNote = () => {
  notesStore.deleteNote(note.value.id);
  toastsStore.addToast("Блокнот успешно удален", "success");
  router.push("/");
  showModalFlag.value = false;
};
</script>
