import {PUBLIC_SISKO_EXAM_API} from "$env/static/public"
import {apiRequest} from "$lib/api/BaseApiRequest.js";

export const examAssignmentGetList = async () => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/exam-assignment`);
}

export const examAssignmentGet = async (id) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/exam-assignment/${id}`);
}

export const examAssignmentPost = async (examAssignment) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/exam-assignment`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(examAssignment)
    });
}

export const examAssignmentPatch = async (examAssignment) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/exam-assignment/${examAssignment.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(examAssignment)
    });
}

export const examAssignmentDelete = async (id) => {
    return await apiRequest(`${PUBLIC_SISKO_EXAM_API}/exam-assignment/${id}`, {
        method: "DELETE"
    });
}