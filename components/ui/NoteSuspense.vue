<script setup lang="ts">
import { getFormattedDate } from '@/utils/get-formatted-day';
const props = defineProps<{
    isVisible: boolean;
  }>();
</script>

<template>
    <div
    v-if="isVisible"
        class="p-4 w-[100%] my-3 border rounded-md shadow-md flex-between flex-row"
      >
        <div class="flex-between items-start flex-row w-[100%]">
          <div class="flex flex-col w-full">
            <h2
              class="text-xl font-semibold whitespace-wrap flex w-full"
            >
              Первый блокнот
              <div class="w-full flex justify-start items-start gap-2 ml-2">
                <Button
                  icon="pen-to-square"
                  size="xl"
                  variant="primary"
                  class="text-sm text-[#000] h-7 w-7"
                ></Button>
                <Button
                  icon="trash"
                  size="xl"
                  variant="danger"
                  class="text-sm text-[#000] h-7 w-7"
                ></Button>
              </div>
            </h2>
            <p class="text-lg text-gray-400">Завершено {{ 0 }}/{{ 0 }}</p>
            <p class="text-xs text-gray-500">Создано: {{ getFormattedDate(new Date()) }}</p>
          </div>
        </div>
      </div>
</template>