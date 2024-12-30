import { Note } from "@/stores/notes";

export const validateNote = (note: Note) => {
  const res: { validate: boolean; message: string } = { validate: false, message: "" };
  if (note.title.length < 1 || note.title.length > 300) res.message = "В названии должно быть от 1 до 300 символов";
  else if (note.todos.some((el) => el.text.length < 1 || el.text.length > 500))
    res.message = "В заметках должно быть от 1 до 500 символов";
  else res.validate = true;
  return res;
};
