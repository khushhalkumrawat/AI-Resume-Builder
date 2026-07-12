import React from "react";

import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

const SectionOrder = ({ sections, setSections, setResumeData }) => {

    const handleDragEnd = (event) => {

        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = sections.findIndex(
            (item) => item.id === active.id
        );

        const newIndex = sections.findIndex(
            (item) => item.id === over.id
        );

        const updated = arrayMove(sections, oldIndex, newIndex);

        setSections(updated);

        setResumeData(prev => ({
            ...prev,
            sectionOrder: updated,
        }));
    };

    return (
        <div className="bg-white rounded-xl border p-5 mt-8">

            <h3 className="text-lg font-semibold">
                Resume Section Order
            </h3>

            <p className="text-sm text-gray-500 mb-5">
                Drag sections to change the order in your resume.
            </p>

            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sections}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-3">

                        {sections.map((section) => (
                            <SortableItem
                                key={section.id}
                                section={section}
                            />
                        ))}

                    </div>
                </SortableContext>
            </DndContext>

        </div>
    );
};

export default SectionOrder;