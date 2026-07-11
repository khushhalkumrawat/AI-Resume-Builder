import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

const SortableItem = ({ section }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: section.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between p-3 rounded-lg border bg-white shadow-sm"
        >
            <div className="flex items-center gap-3">
                <GripVertical
                    className="w-5 h-5 text-gray-500 cursor-grab"
                    {...attributes}
                    {...listeners}
                />

                <span className="font-medium">
                    {section.label}
                </span>
            </div>
        </div>
    );
};

export default SortableItem;