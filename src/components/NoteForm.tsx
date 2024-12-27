import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";
import { Button } from "./ui/button";
import { CircleX, Save } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
          <Input
            ref={titleRef}
            defaultValue={title}
            id="title"
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
            value={selectedTags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) =>
              setSelectedTags(
                tags.map((tag) => ({ label: tag.label, id: tag.value }))
              )
            }
            isMulti
            classNames={{
              control: () =>
                "shadow-sm !border-input !rounded-md !bg-card !text-base md:!text-sm",
              placeholder: () => "!text-muted-foreground",
              input: () => "dark:text-white",
              menu: () => "!border-input !rounded-md",
              menuList: () => "!py-0 !rounded-md",
              option: (state) =>
                `!cursor-pointer dark:text-primary-foreground ${
                  state.isFocused ? "!bg-primary" : "!bg-transparent"
                }`,
              multiValue: () =>
                "!rounded-full !bg-primary !px-1.5 !text-primary-foreground",
              multiValueRemove: () => "!text-primary-foreground",
            }}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                boxShadow: state.isFocused
                  ? "0 0 0px 1px rgba(0, 0, 0, 1)"
                  : "none",
              }),
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="markdown">Body</label>
        <Textarea
          ref={markdownRef}
          defaultValue={markdown}
          id="markdown"
          rows={15}
          required
        />
      </div>

      <div className="flex flex-col basis-full gap-2 sm:flex-row sm:self-end">
        <Button asChild variant="outline">
          <Link to="..">
            <CircleX /> Cancel
          </Link>
        </Button>

        <Button type="submit">
          <Save /> Save note
        </Button>
      </div>
    </form>
  );
}
