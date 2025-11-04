export const AnswerPolicy = {
    SINGLE: 'SINGLE',
    MULTI_ALL: 'MULTI_ALL',
    MULTI_PARTIAL: 'MULTI_PARTIAL'
};

// Helper function untuk mendapatkan array dari enum values
export function getAnswerPolicy() {
    return Object.values(AnswerPolicy);
}

// Helper function untuk display name yang lebih (user)-friendly
export function getAnswerPolicyDisplayName(type) {
    const displayNames = {
        [AnswerPolicy.SINGLE]: 'Single',
        [AnswerPolicy.MULTI_ALL]: 'Multi All',
        [AnswerPolicy.MULTI_PARTIAL]: 'Multi Partial'
    };
    return displayNames[type] || type;
}