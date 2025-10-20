import {PUBLIC_SISKO_EXAM_API} from "$env/static/public"
import {apiRequest} from "$lib/api/BaseApiRequest.js";

export const examGetList = async () => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/exam`);
}

export const examGet = async (id) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/exam/${id}`);
}

export const examPost = async (exam) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/exam`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(exam)
    });
}

export const examPatch = async (exam) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/exam/${exam.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exam)
    });
}

export const examDelete = async (id) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/exam/${id}`, {
        method: "DELETE"
    });
}