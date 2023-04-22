import { NoteData, Tag } from "../App";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <>
      <h2 className="text-2xl mb-4">New Note</h2>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </>
  );
}
