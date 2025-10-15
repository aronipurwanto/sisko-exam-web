import {PUBLIC_SISKO_EXAM_API} from "$env/static/public"
import {apiRequest} from "$lib/api/BaseApiRequest.js";

export const questionGetList = async () => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/question`);
}

export const questionGet = async (id) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/question/${id}`);
}

export const questionPost = async (question) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/question`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(question)
    });
}

export const questionPatch = async (question) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/question/${question.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    });
}

export const questionDelete = async (id) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/question/${id}`, {
        method: "DELETE"
    });
}