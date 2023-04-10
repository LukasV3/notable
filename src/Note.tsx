import { Link } from "react-router-dom";
import { useNote } from "./NoteLayout";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export function Note() {
  const note = useNote();

  return (
    <>
      <div className="grid grid-cols-2 mb-4">
        <div>
          <h1>{note.title}</h1>

          {note.tags.length > 0 && (
            <ul className="flex gap-2 flex-wrap">
              {note.tags.map((tag) => (
                <li
                  key={tag.id}
                  className="border border-grey rounded px-2.5 py-1 font-bold text-xs"
                >
                  {tag.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-x-2 items-start justify-end flex-wrap">
          <Link to={`/${note.id}/edit`}>
            <button className="border border-grey rounded px-2.5 py-1">Edit</button>
          </Link>
          <button className="border border-grey rounded px-2.5 py-1">Delete</button>
          <Link to="/">
            <button className="border border-grey rounded px-2.5 py-1">Back</button>
          </Link>
        </div>
      </div>

      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}
