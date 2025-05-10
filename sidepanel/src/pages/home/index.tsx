import { OmrOptionForm } from "./ui/omr-option-form";

export function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col gap-6 px-6 pt-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tighter">OMR</h1>
        <p className="text-sm text-zinc-400">
          Select options for using simulator
        </p>
      </div>
      <OmrOptionForm />
    </main>
  );
}
