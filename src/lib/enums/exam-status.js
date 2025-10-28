export const ExamStatus = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED'
};

export function getExamStatus() {
    return Object.values(ExamStatus);
}

export function getExamStatusDisplayName(type) {
    const displayName = {
        [ExamStatus.DRAFT]: 'Draft',
        [ExamStatus.PUBLISHED]: 'Published',
        [ExamStatus.ARCHIVED]: 'Archived'
    };
    return displayName[type] || type;
}