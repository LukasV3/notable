import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { Plus, SquarePen, Trash2, ChevronLeft } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "./ui/input";

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
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h2 className="text-2xl">Notes</h2>

        <div className="flex gap-x-2 gap-y-1 flex-wrap">
          <Button onClick={() => setShowEditTagsModal(true)} variant="outline">
            <SquarePen />
            Edit tags
          </Button>

          <Button asChild>
            <Link to="/new">
              <Plus /> Add new note
            </Link>
          </Button>
        </div>
      </div>

      <form className="mb-8">
        <div className="grid gap-y-2 gap-x-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Search..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="react-select-3-input">Tags</label>
            <ReactSelect
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
                  "shadow-sm !border-input !rounded-md !bg-card !text-base md:!text-sm !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring",
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
      </form>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            tags={note.tags}
          />
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
    <Link to={`/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardFooter>
          {tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.label}
                </Badge>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
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
    <div className="fixed inset-0 z-50 h-full w-full bg-primary-foreground/90 flex justify-center items-start">
      <div className="container max-w-lg bg-card rounded-md p-5 mt-10 mx-10 w-full flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">Edit Tags</h2>

          <Button onClick={onClose} variant="secondary">
            <ChevronLeft /> Back
          </Button>
        </div>

        {availableTags.length > 0 && (
          <ul className="flex flex-col gap-y-2">
            {availableTags.map((tag) => {
              return (
                <li key={tag.id} className="flex gap-x-3">
                  <Input
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                    defaultValue={tag.label}
                  />

                  <Button
                    onClick={() => onDeleteTag(tag.id)}
                    variant="destructive"
                  >
                    <Trash2 />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
