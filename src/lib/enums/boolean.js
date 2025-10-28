export const BooleanEnum = {
    true: true,
    false: false
};

export function getBooleanEnum() {
    return Object.values(BooleanEnum);
}

export function getBooleanEnumDisplayName(type) {
    const displayNames = {
        [BooleanEnum.true]: 'Correct',
        [BooleanEnum.false]: 'Wrong'
    };
    return displayNames[type] || type;
}

export function getBooleanDisplayYes(type) {
    const displayNames = {
        [BooleanEnum.true]: 'Yes',
        [BooleanEnum.false]: 'No'
    }
    return displayNames[type] || type;
}