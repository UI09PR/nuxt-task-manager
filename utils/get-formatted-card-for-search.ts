import { Note } from "@/stores/notes";

export const getFormattedCardForSearch = (note: Note) => {
    const todos = note.todos.map((el, i) => i + ') ' + el.text)
    return `${note.title + ' ' + todos.join(' ')}`
}