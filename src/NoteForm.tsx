import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

export function NoteForm({ onSubmit }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
      <div className="grid gap-y-2 gap-x-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            ref={titleRef}
            id="title"
            className="border border-grey rounded px-2.5 py-1"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="react-select-3-input">Tags</label>
          <CreatableReactSelect
            value={selectedTags.map((tag) => ({ label: tag.label, value: tag.id }))}
            onChange={(tags) =>
              setSelectedTags(tags.map((tag) => ({ label: tag.label, id: tag.value })))
            }
            isMulti
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="markdown">Body</label>
        <textarea
          ref={markdownRef}
          id="markdown"
          rows={15}
          required
          className="border border-grey rounded p-2.5"
        />
      </div>

      <div className="flex flex-wrap gap-y-2 sm:self-end sm:flex-wrap sm:gap-x-2">
        <button
          type="submit"
          className="border border-grey rounded px-2.5 py-1 w-full sm:w-auto"
        >
          Save
        </button>
        <Link to="..">
          <button
            type="button"
            className="border border-grey rounded px-2.5 py-1 w-full sm:w-auto"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}
