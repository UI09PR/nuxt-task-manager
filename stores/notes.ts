import { getFormattedCardForSearch } from "@/utils/get-formatted-card-for-search";
import { MOCK_DATA } from "@/utils/mock-data";
import { defineStore } from "pinia";

export interface Todo {
  text: string;
  completed: boolean;
}

export interface Note {
  id: number;
  title: string;
  todos: Todo[];
  createdAt?: Date;
}

export type SortedTypes = "date" | "todos";

export type Sorted = "up" | "down";

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: [] as Note[],
    sortedType: "down" as Sorted,
    sortedBy: "date" as SortedTypes,
    undoStack: [] as Note[][],
    redoStack: [] as Note[][],
  }),
  actions: {
    loadNotes() {
      if (process.client) {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
          this.notes = JSON.parse(savedNotes);
        }
      }
    },
    search(str: string): Note[] {
      const lowerCaseSearch = str.toLowerCase();

      return this.notes.filter((note) => {
        const formattedCard = getFormattedCardForSearch(note).toLowerCase();
        return formattedCard.includes(lowerCaseSearch);
      });
    },
    saveNotes() {
      if (process.client) localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    clearAll() {
      if (process.client) localStorage.setItem("notes", JSON.stringify([]));
      this.notes = [];
      console.log(this.notes);
    },
    addNote(note: Note) {
      note.createdAt = new Date();
      this.undoStack.push(JSON.parse(JSON.stringify(this.notes)));
      this.notes.push(note);
      this.saveNotes();
    },
    deleteNote(id: number) {
      const noteIndex = this.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        this.undoStack.push(JSON.parse(JSON.stringify(this.notes)));
        this.notes.splice(noteIndex, 1);
        this.saveNotes();
      }
    },
    editNote(updatedNote: Note) {
      const index = this.notes.findIndex((note) => note.id === updatedNote.id);
      if (index !== -1) {
        this.undoStack.push(JSON.parse(JSON.stringify(this.notes)));
        this.redoStack = [];
        this.notes[index] = updatedNote;
        this.saveNotes();
      }
    },
    addTodo(noteId: number, todo: Todo) {
      const note = this.notes.find((n) => n.id === noteId);
      if (note) {
        note.todos.push(todo);
        this.saveNotes();
      }
    },
    removeTodo(noteId: number, todoIndex: number) {
      const note = this.notes.find((n) => n.id === noteId);
      if (note) {
        note.todos.splice(todoIndex, 1);
        this.saveNotes();
      }
    },
    toggleTodo(noteId: number, todoIndex: number) {
      const note = this.notes.find((n) => n.id === noteId);
      if (note) {
        const todo = note.todos[todoIndex];
        todo.completed = !todo.completed;
        this.saveNotes();
      }
    },
    undo() {
      if (this.undoStack.length > 0) {
        const lastState = this.undoStack.pop();
        if (lastState) {
          this.redoStack.push(JSON.parse(JSON.stringify(this.notes)));
          this.notes = lastState;
          this.saveNotes();
        }
      }
    },
    redo() {
      if (this.redoStack.length > 0) {
        const nextState = this.redoStack.pop();
        if (nextState) {
          this.undoStack.push(JSON.parse(JSON.stringify(this.notes)));
          this.notes = nextState;
          this.saveNotes();
        }
      }
    },
    loadMockNotes() {
      this.notes = MOCK_DATA;
      if (process.client) {
        localStorage.setItem("notes", JSON.stringify(MOCK_DATA));
      }
    },
    getSorted(type: SortedTypes): void {
      this.sortedBy = type;
      this.sortedType = this.sortedType === "down" ? "up" : "down";

      const isAscending = this.sortedType === "up";

      this.notes.sort((a, b) => {
        if (type === "date") {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

          return isAscending ? dateA - dateB : dateB - dateA;
        } else if (type === "todos") {
          const todosCountA = a.todos.length;
          const todosCountB = b.todos.length;

          return isAscending ? todosCountA - todosCountB : todosCountB - todosCountA;
        }

        return 0;
      });
    },
  },
});
