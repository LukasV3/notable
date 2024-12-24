import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Button } from "./ui/button";
import { ChevronLeft, SquarePen, Trash } from "lucide-react";
import { Badge } from "./ui/badge";

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between gap-x-4 mb-8">
        <div className="flex flex-col justify-between gap-y-6">
          <h2 className="text-2xl">{note.title}</h2>

          {note.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {note.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.label}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between items-end gap-y-6">
          <Button asChild variant="secondary">
            <Link to="/">
              <ChevronLeft /> Back
            </Link>
          </Button>

          <div className="flex flex-wrap justify-end gap-2">
            <Button asChild variant="outline">
              <Link to={`/${note.id}/edit`}>
                <SquarePen /> Edit note
              </Link>
            </Button>

            <Button
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
              variant="destructive"
            >
              <Trash /> Delete note
            </Button>
          </div>
        </div>
      </div>

      <ReactMarkdown className="bg-white p-4 rounded-lg min-h-[360px] dark:bg-[#161818] dark:border-transparent">
        {note.markdown}
      </ReactMarkdown>
    </>
  );
}
