import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-purple-400">My first nextjs project</h1>
      <Link href="/documents/123">click <span className="text-blue-400 underline">here</span> to browse to document</Link>
      <Button>Click me</Button>
    </div>
  );
}
