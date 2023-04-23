import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

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
            <ul className="flex gap-2 flex-wrap">
              {note.tags.map((tag) => (
                <li
                  key={tag.id}
                  className="bg-volt rounded-full px-2.5 py-1 font-bold text-xs dark:text-grey"
                >
                  {tag.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col justify-between items-end gap-y-6">
          <Link to="/">
            <button className="btn btn-volt">
              <span className="text-base leading-4">&#60;</span> Back
            </button>
          </Link>

          <div className="flex flex-wrap justify-end gap-2">
            <Link to={`/${note.id}/edit`}>
              <button className="btn btn-border">
                <PencilSquareIcon className="w-3 h-3 shrink-0" />
                Edit note
              </button>
            </Link>

            <button
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
              className="btn btn-grey"
            >
              <TrashIcon className="w-3 h-3 shrink-0" />
              Delete note
            </button>
          </div>
        </div>
      </div>

      <ReactMarkdown className="bg-white p-4 rounded-lg min-h-[360px] dark:bg-[#161818] dark:border-transparent">
        {note.markdown}
      </ReactMarkdown>
    </>
  );
}
