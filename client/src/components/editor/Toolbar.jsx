import React from "react";
import {
    Bold,
    Italic,
    Underline,
} from "lucide-react";

const Toolbar = ({ editor }) => {

    if (!editor) return null;

    const Button = ({ onClick, active, children }) => (

        <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
            className={`p-2 rounded-md transition-all
            ${active
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-200"
                }`}
        >
            {children}
        </button>

    );

    return (

        <div className="editor-toolbar">

            <Button
                active={editor.isActive("bold")}
                onClick={() =>
                    editor.chain().focus().toggleBold().run()
                }
            >
                <Bold size={18} />
            </Button>

            <Button
                active={editor.isActive("italic")}
                onClick={() =>
                    editor.chain().focus().toggleItalic().run()
                }
            >
                <Italic size={18} />
            </Button>

            <Button
                active={editor.isActive("underline")}
                onClick={() =>
                    editor.chain().focus().toggleUnderline().run()
                }
            >
                <Underline size={18} />
            </Button>

        </div>

    );

};

export default Toolbar;