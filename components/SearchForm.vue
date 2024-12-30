<template>
  <div class="border p-2 sm:w-[60%] w-[80%] rounded-lg text-white">
    <h2 class="text-sm sm:text-base md:text-lg xl:text-xl gap-2 flex-between w-full flex-wrap">
      <p class="">Сортировать:</p>
      <input
        type="text"
        :value="search"
        @input="(e) => handleSearch((e.target as HTMLInputElement).value)"
        class="text-[#000] rounded-lg w-[50%] p-1 pl-3"
        placeholder="Поиск"
      />
      <div class="flex flex-row justify-end items-center gap-2">
        <Button icon="calendar-days" @click="() => getSotredNote('date')" :noSafari="isSafari"> </Button>
        <Button icon="list" @click="() => getSotredNote('todos')" :noSafari="isSafari"> </Button>
      </div>
    </h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Button from "./ui/Button.vue";
import { SortedTypes, useNotesStore } from "@/stores/notes";
const notesStore = useNotesStore();
const props = defineProps<{ search: string, handleSearch: (value: string) => void
 }>();
const isSafari = ref<boolean>(false);
onMounted(() => {
  isSafari.value = /^((?!chrome|android).)*safari/i.test(navigator?.userAgent);
});

const getSotredNote = (type: SortedTypes) => {
  notesStore.getSorted(type);
};
</script>
