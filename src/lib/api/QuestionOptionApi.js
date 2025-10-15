import {PUBLIC_SISKO_EXAM_API} from "$env/static/public"
import {apiRequest} from "$lib/api/BaseApiRequest.js";

export const questionOptionGetList = async () => {
    await apiRequest(`${PUBLIC_SISKO_EXAM_API}/question`);
}

export const questionOptionGet = async (id) => {
    await apiRequest(`${PUBLIC_SISKO_EXAM_API}/question/${id}`);
}

export const questionOptionPost = async (questionOption) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/question-option`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionOption)
    });
}

export const questionOptionListPost = async (questionOption) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/question-option/all`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionOption)
    });
}

export const questionOptionPatch = async (questionOption) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/question-option/${questionOption.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionOption)
    });
}

export const questionOptionDelete = async (id) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/question-option/${id}`, {
        method: "DELETE"
    });
}