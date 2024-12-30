import { Note } from "@/stores/notes";

export const MOCK_DATA: Note[] = [
  {
    id: 1735504119570,
    title: "sdfsdfsdfsdfsdfsdfsdfsdf sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
    todos: [
      { text: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf", completed: true },
      { text: "sdf", completed: true },
      { text: "sdfdsf", completed: false },
    ],
    createdAt: new Date("2024-12-29T20:28:39.570Z"),
  },
  {
    id: 1735504136515,
    title: "sSDF",
    todos: [
      { text: "ssdf", completed: true },
      { text: "sdfsd", completed: true },
      { text: "sdf", completed: false },
    ],
    createdAt: new Date("2024-12-27T20:28:56.515Z"),
  },
  {
    id: 1735504147611,
    title: "sdfd",
    todos: [
      { text: "sdff", completed: true },
      { text: "sd", completed: false },
    ],
    createdAt: new Date("2024-12-26T20:29:07.611Z"),
  },
  {
    id: 1735504141614,
    title: "sdf",
    todos: [{ text: "fds", completed: true }],
    createdAt: new Date("2024-12-25T20:29:01.614Z"),
  },
  {
    id: 1735509253950,
    title: "sdf",
    todos: [{ text: "fds", completed: false }],
    createdAt: new Date("2024-12-24T21:54:13.950Z"),
  },
];
