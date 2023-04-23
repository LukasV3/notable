import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

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
        <h2 className="text-2xl">Notes</h2>

        <div className="flex gap-x-2 gap-y-1 flex-wrap">
          <button onClick={() => setShowEditTagsModal(true)} className="btn btn-border">
            <PencilSquareIcon className="w-3 h-3 shrink-0" />
            Edit tags
          </button>

          <Link to="/new" className="btn btn-volt">
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
              className="border border-grey-border rounded-lg px-2.5 py-1.5 placeholder-grey/25 dark:bg-[#22262a] dark:border-transparent dark:placeholder:text-white/25"
              placeholder="Search..."
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
              classNames={{
                control: () =>
                  "!border-grey-border !rounded-lg dark:bg-[#22262a] dark:!border-transparent",
                placeholder: () => "!text-grey/25 dark:!text-white/25",
                input: () => "dark:text-white",
                menu: () => "!border-grey-border !rounded-lg dark:bg-[#22262a]",
                menuList: () => "!py-0 !rounded-lg",
                option: (state) =>
                  `!cursor-pointer ${
                    state.isFocused ? "!bg-volt dark:text-grey" : "!bg-transparent"
                  }`,
                multiValue: () => "!rounded-full !bg-volt !px-1.5 !text-grey",
              }}
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
      className="flex flex-col gap-y-5 rounded-lg bg-white p-4 dark:bg-[#161818]"
    >
      <p className="text-sm">{title}</p>

      {tags.length > 0 && (
        <ul className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="bg-volt rounded-full px-2.5 py-1 text-xs dark:text-grey"
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
    <div className="fixed inset-0 z-50 h-full w-full bg-grey/80 flex justify-center items-start dark:bg-grey-dark/95">
      <div className="container max-w-lg bg-volt-light rounded-lg p-5 mt-10 mx-10 w-full flex flex-col gap-y-6 dark:bg-[#0d0f10]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">Edit Tags</h2>

          <button onClick={onClose} className="btn btn-volt">
            <span className="text-base leading-4">&#60;</span> Back
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
                    className="grow border border-grey-border rounded-lg px-2.5 py-1 dark:bg-[#22262a] dark:border-transparent"
                  />

                  <button
                    onClick={() => onDeleteTag(tag.id)}
                    className="btn-border bg-white text-grey rounded-full p-2.5 hover:bg-grey hover:text-white duration-150 dark:text-white dark:bg-[#121316]"
                  >
                    <TrashIcon className="w-4 h-4" />
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
