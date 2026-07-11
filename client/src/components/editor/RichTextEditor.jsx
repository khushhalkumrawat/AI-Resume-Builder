import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import extensions from "./extensions";
import Toolbar from "./Toolbar";
import "./editor.css";

const RichTextEditor = ({
  value = "",
  onChange,
  placeholder = "Start typing..."
}) => {

  const editor = useEditor({
    extensions,
    content: value,
    immediatelyRender: false,
    autofocus: false,
  });

  // Update editor if parent changes value
  useEffect(() => {
    if (!editor) return;

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor]);

  if (!editor) {
    return (
      <div className="editor-container">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="editor-container">

      <Toolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="editor-content"
      />

    </div>
  );
};

export default RichTextEditor;