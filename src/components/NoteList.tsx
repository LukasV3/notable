import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

type SimplifiedNote = {
  tags: Tag[];
  id: string;
  title: string;
};

type NoteListProp = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

type EditTagsModalProps = {
  onClose: () => void;
  availableTags: Tag[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

export function NoteList({
  availableTags,
  notes,
  onDeleteTag,
  onUpdateTag,
}: NoteListProp) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [showEditTagsModal, setShowEditTagsModal] = useState(false);

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
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h1 className="text-3xl">Notes</h1>

        <div className="flex gap-x-2 gap-y-1 flex-wrap">
          <button
            onClick={() => setShowEditTagsModal(true)}
            className="px-4 py-1.5 border border-[#edeee7] text-xs rounded flex items-center gap-x-1.5"
          >
            <PencilSquareIcon className="w-3 h-3" />
            Edit Tags
          </button>

          <Link
            to="/new"
            className="px-4 py-1.5 bg-volt text-grey text-xs rounded flex items-center gap-x-1.5 hover:bg-grey-dark hover:text-white duration-150"
          >
            <span className="text-base leading-4">+</span> Add new note
          </Link>
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

      {showEditTagsModal &&
        createPortal(
          <EditTagsModal
            onClose={() => setShowEditTagsModal(false)}
            availableTags={availableTags}
            onUpdateTag={onUpdateTag}
            onDeleteTag={onDeleteTag}
          />,
          document.body
        )}
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

function EditTagsModal({
  onClose,
  availableTags,
  onUpdateTag,
  onDeleteTag,
}: EditTagsModalProps) {
  return (
    <div className="fixed inset-0 z-50 h-full w-full bg-gray-600/60 flex justify-center items-start">
      <div className="container bg-white rounded p-5 mt-10 mx-10 w-full flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <h2>Edit Tags</h2>

          <button onClick={onClose} className="text-3xl">
            &times;
          </button>
        </div>

        {availableTags.length > 0 && (
          <ul className="flex flex-col gap-y-2">
            {availableTags.map((tag) => {
              return (
                <li key={tag.id} className="flex gap-x-3">
                  <input
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                    defaultValue={tag.label}
                    className="grow border border-grey rounded px-2.5 py-1"
                  />

                  <button
                    onClick={() => onDeleteTag(tag.id)}
                    className="border border-grey rounded px-2.5 py-1"
                  >
                    &times;
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
