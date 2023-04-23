import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";
import { ArrowDownTrayIcon, XCircleIcon } from "@heroicons/react/24/solid";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-7">
      <div className="grid gap-y-2 gap-x-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            ref={titleRef}
            defaultValue={title}
            id="title"
            className="border border-grey-border rounded-lg px-2.5 py-1.5 placeholder-grey/25 dark:bg-[#22262a] dark:border-transparent dark:placeholder:text-white/25"
            placeholder="Enter a title..."
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

      <div className="flex flex-col gap-1">
        <label htmlFor="markdown">Body</label>
        <textarea
          ref={markdownRef}
          defaultValue={markdown}
          id="markdown"
          rows={15}
          required
          className="rounded-lg p-4 dark:bg-[#22262a] dark:border-transparent"
        />
      </div>

      <div className="flex flex-col basis-full gap-2 sm:flex-row sm:self-end">
        <button type="submit" className="btn btn-volt">
          <ArrowDownTrayIcon className="w-3 h-3 shrink-0" />
          Save note
        </button>

        <Link to=".." className="contents">
          <button type="submit" className="btn btn-border">
            <XCircleIcon className="w-4 h-4 shrink-0" />
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}
