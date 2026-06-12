import { Pencil } from "lucide-react";

export default function EditFab() {
  return (
    <button
      type="button"
      aria-label="Edit"
      className="fixed bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-300 text-neutral-700 shadow-lg transition-transform hover:scale-105 hover:bg-neutral-200 active:scale-95"
    >
      <Pencil className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}
