import {PUBLIC_SISKO_EXAM_API} from "$env/static/public"
import {http} from "$lib/api/http.js";

const base = `${PUBLIC_SISKO_EXAM_API}/exam-question`;

export const examQuestionApi = {
    getAll() {
        return http(base);
    },
    get(id) {
        return http(`${base}/${id}`);
    },
    post(payload) {
        return http(base, {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },
    patch(payload) {
        return http(`${base}/${payload.id}`, {
            method: "PATCH",
            body: JSON.stringify(payload)
        });
    },
    delete(id) {
        return http(`${base}/${id}`, { method: "DELETE" });
    }
};