import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-appear">
      <ArrowLeftCircle className="w-6 h-6"/>
      <h1 className="font-medium">Get started with creating a New Document</h1>
    </main>
  );
}
