import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import { useMemo, useState } from "react";

type SimplifiedNote = {
  tags: Tag[];
  id: string;
  title: string;
};

type NoteListProp = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
};

export function NoteList({ availableTags, notes }: NoteListProp) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => note.tags.some((noteTag) => noteTag.id === tag.id)))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1>Notes</h1>

        <div className="flex gap-x-2 flex-wrap">
          <Link to="/new">
            <button className="border border-grey rounded px-2.5 py-1">Create</button>
          </Link>

          <button className="border border-grey rounded px-2.5 py-1">Edit Tags</button>
        </div>
      </div>

      <form className="mb-8">
        <div className="grid gap-y-2 gap-x-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-grey rounded px-2.5 py-1"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="react-select-3-input">Tags</label>
            <ReactSelect
              value={selectedTags.map((tag) => ({ label: tag.label, value: tag.id }))}
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) =>
                setSelectedTags(tags.map((tag) => ({ label: tag.label, id: tag.value })))
              }
              isMulti
            />
          </div>
        </div>
      </form>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} id={note.id} title={note.title} tags={note.tags} />
        ))}
      </div>
    </>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Link
      to={`/${id}`}
      className="flex flex-col gap-y-3 items-center border border-grey rounded p-5"
    >
      <p>{title}</p>

      {tags.length > 0 && (
        <ul className="flex justify-center gap-2 flex-wrap">
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="border border-grey rounded px-2.5 py-1 font-bold text-xs"
            >
              {tag.label}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
