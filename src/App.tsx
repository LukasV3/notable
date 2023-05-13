import { Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { useLocalStorage } from "./helpers/UseLocaleStorage";
import { NewNote } from "./components/NewNote";
import { NoteList } from "./components/NoteList";
import { NoteLayout } from "./components/NoteLayout";
import { Note } from "./components/Note";
import { EditNote } from "./components/EditNote";
import { TopBar } from "./components/TopBar";

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("Notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("Tags", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) }];
    });
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  function addTag(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));

    setNotes((prevNotes) => {
      return prevNotes.map((note) => ({
        ...note,
        tagIds: note.tagIds.filter((tagId) => tagId !== id),
      }));
    });
  }

  return (
    <div className="bg-volt-light min-h-screen dark:bg-[#0d0f10]">
      <div className="container py-6">
        <TopBar />
        <Routes>
          <Route
            path="/"
            element={
              <NoteList
                availableTags={tags}
                notes={notesWithTags}
                onUpdateTag={updateTag}
                onDeleteTag={deleteTag}
              />
            }
          />
          <Route
            path="/new"
            element={
              <NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />
            }
          />
          <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
            <Route index element={<Note onDelete={onDeleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={onUpdateNote}
                  onAddTag={addTag}
                  availableTags={tags}
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
