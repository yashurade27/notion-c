"use client";

import { useEffect, useState, useMemo } from "react";
import * as Y from "yjs";
import { useRoom, useSelf } from "@liveblocks/react";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/shadcn/style.css";
import "@blocknote/core/fonts/inter.css";
import stringToColor from "@/lib/stringToColor";

const Editor = () => {
  const room = useRoom();
  const self = useSelf();
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<LiveblocksYjsProvider | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const userInfo = useMemo(() => self?.info, [self]);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);


    return () => {
      yProvider.destroy();
      yDoc.destroy();
    };
  }, [room]);

  // Don't create editor or render until everything is ready
  const editor = useCreateBlockNote(
    doc && provider && userInfo
      ? {
        collaboration: {
          provider,
          fragment: doc.getXmlFragment("document-store"),
          user: {
            name: userInfo.name || "Anonymous",
            color: stringToColor(userInfo.email || "default"),
          },
        },
      }
      : undefined
  );

  if (!userInfo || !doc || !provider || !editor) return null;

  const style = `hover:text-white ${darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-900"
      : "text-gray-900 bg-gray-100 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 justify-end mb-10">
        <Button className={style} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      <div className="relative max-w-6xl mx-auto">
        <BlockNoteView editor={editor} theme={darkMode ? "dark" : "light"} />
      </div>
    </div>
  );
};

export default Editor;
