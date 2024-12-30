<template>
  <div class="mt-4 sm:w-[60%] w-[80%]">
    <h1 class="text-2xl font-bold mb-4 text-white">Создание новой заметки</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="title" class="block font-semibold text-white">Заголовок заметки</label>
        <input
          v-model="title"
          type="text"
          id="title"
          placeholder="Заголовок"
          class="border rounded p-2 w-full"
          required
        />
      </div>

      <div>
        <label for="todo" class="block font-semibold text-white">Задачи</label>
        <div v-for="(todo, index) in todos" :key="index" class="flex gap-2 mt-2">
          <input v-model="todo.text" type="text" placeholder="Задача" class="border rounded p-2 w-full" />
          <div class="flex-center gap-3 border rounded px-2">
            <Button @click="removeTodo(index)" type="button" variant="danger" icon="close" size="6x" class="h-6 w-6">
            </Button>
          </div>
        </div>
        <div class="mt-6 flex-between w-full gap-2 flex-wrap">
          <Button
            @click="addTodo"
            type="button"
            class="text-white text-xs sm:text-base md:text-lg xl:text-xl"
            icon="plus"
            size="2x"
            variant="primary"
            :noSafari="isSafari"
          >
            <p class="ml-1 whitespace-nowrap">Добавить задачу</p>
          </Button>
          <Button
            type="submit"
            class="text-white text-xs sm:text-base md:text-lg xl:text-xl"
            icon="circle-check"
            size="2x"
            variant="active"
            :noSafari="isSafari"
          >
            <p class="ml-1 whitespace-nowrap">Создать</p>
          </Button>
          <Button
            @click="showModal('cancel')"
            type="button"
            class="text-[#0a0a08] text-xs sm:text-base md:text-lg xl:text-xl"
            icon="ban"
            size="2x"
            variant="danger"
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
import QuestModal from "@/components/ui/QuestModal.vue";
import { useNotesStore } from "@/stores/notes";
import { useToastsStore } from "@/stores/toasts";
import { validateNote } from "@/utils/vlidate-note";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const notesStore = useNotesStore();
const toastsStore = useToastsStore();
const router = useRouter();

const isSafari = ref(false);
const title = ref("");
const todos = ref([{ text: "", completed: false }]);

onMounted(() => {
  isSafari.value = /^((?!chrome|android).)*safari/i.test(navigator?.userAgent);
});

const showModalFlag = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");
const modalAction = ref<() => void>(() => {});

const addTodo = () => {
  todos.value.push({ text: "", completed: false });
};

const removeTodo = (index: number) => {
  todos.value.splice(index, 1);
};

const submitForm = () => {
  const newNote = {
    id: Date.now(),
    title: title.value,
    todos: todos.value,
  };
  const validate = validateNote(newNote);
  if (validate.validate) {
    notesStore.addNote(newNote);
    toastsStore.addToast("Блокнот успешно добавлен", "success");
    router.push("/");
  } else toastsStore.addToast(validate.message, "error");
};

const showModal = (type: string) => {
  if (type === "cancel") {
    modalTitle.value = "Подтверждение отмены";
    modalMessage.value = "Вы уверены, что хотите отменить создание?";
    modalAction.value = cancelEdit;
  }
  showModalFlag.value = true;
};

const cancelEdit = () => {
  router.push("/");
  showModalFlag.value = false;
};
</script>
