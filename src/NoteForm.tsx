import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
      <div className="grid gap-y-2 gap-x-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            ref={titleRef}
            defaultValue={title}
            id="title"
            className="border border-grey rounded px-2.5 py-1"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="react-select-3-input">Tags</label>
          <CreatableReactSelect
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
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

      <div className="flex flex-col gap-1">
        <label htmlFor="markdown">Body</label>
        <textarea
          ref={markdownRef}
          defaultValue={markdown}
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
