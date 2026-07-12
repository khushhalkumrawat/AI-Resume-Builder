export const PAGE_HEIGHT = 1122;

export const fitResume = (resumeData) => {
    const updated = { ...resumeData };

    if (updated.font_size > 10) {
        updated.font_size -= 0.5;
    }

    if (updated.line_height > 1.2) {
        updated.line_height -= 0.03;
    }

    if (updated.section_spacing > 8) {
        updated.section_spacing -= 1;
    }

    return updated;
};