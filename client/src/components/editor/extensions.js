import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

const extensions = [
    StarterKit,

    Underline,

    Link.configure({
        openOnClick: false,
    }),

    TextAlign.configure({
        types: ["heading", "paragraph"],
    }),

    Placeholder.configure({
        placeholder: "Start typing...",
    }),
];

export default extensions;