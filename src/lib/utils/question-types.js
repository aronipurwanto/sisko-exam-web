export const QuestionType = {
    MCO: 'MCO',
    ESSAY: 'ESSAY'
};

export function getQuestionTypes() {
    return Object.values(QuestionType);
}

export function getQuestionTypeDisplayName(type) {
    const displayNames = {
        [QuestionType.MCO]: 'Multiple Choice',
        [QuestionType.ESSAY]: 'Essay'
    };
    return displayNames[type] || type;
}