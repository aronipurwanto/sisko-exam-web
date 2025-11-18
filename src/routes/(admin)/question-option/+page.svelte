<script>
import {onMount} from "svelte";
import {alertError, alertSuccess, alertConfirm} from "$lib/alert.js";
import {questionOptionApi} from "$lib/api/QuestionOptionApi.js";

let questionOptions = $state([]);

async function questionOptionList() {
    try {
        questionOptions = await questionOptionApi.getAll();
    } catch (err) {
        await alertError(err.message);
    }
}

async function questionOptionRemove(id) {
    if (!await alertConfirm('are you sure want to delete this question option?')) return;

    try {
        await questionOptionApi.delete(id);
        await alertSuccess();
        await questionOptionList();
    } catch (err) {
        await alertError(err.message);
    }
}

onMount(async () => {
    await questionOptionList();
});
</script>
<svelte:head>
    <title>Question Option List</title>
</svelte:head>
<div class="card shadow-sm border-1 p-4 mb-4">
    <div class="d-flex justify-content-between align-items-center">
        <h3 class="tile-title">
            <i class="bi bi-table me-1"></i>Table Question Option
        </h3>
        <a class="btn btn-outline-success bi-plus py-1 px-2"
           href="/question-option/add">
            New Question Option
        </a>
    </div>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
            <tr>
                <th class="px-6 py-3 text-left">#</th>
                <th class="px-6 py-3 text-left">ID</th>
                <th class="px-6 py-3 text-left">Question Stem</th>
                <th class="px-6 py-3 text-left">Label</th>
                <th class="px-6 py-3 text-left">Content</th>
                <th class="px-6 py-3 text-left">Correct</th>
                <th class="px-6 py-3 text-left">Order Index</th>
                <th class="px-6 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each questionOptions as questionOption, index}
                <tr>
                    <th class="text-center">{index+1}</th>
                    <td>{questionOption.id}</td>
                    <td>{questionOption.questionStem}</td>
                    <td>{questionOption.label}</td>
                    <td>{questionOption.content}</td>
                    <td>{questionOption.correct}</td>
                    <td>{questionOption.orderIndex}</td>
                    <td class="text-center">
                        <a class="btn btn-outline-primary py-0 px-1"
                           href="/question-option/{questionOption.id}">
                            <i class="bi bi-eye me-1"></i>Detail
                        </a>
                        <a class="btn btn-outline-warning py-0 px-1 ms-1 me-1"
                           href="/question-option/{questionOption.id}/edit">
                            <i class="bi bi-pencil me-1"></i>Edit
                        </a>
                        <button onclick={() => questionOptionRemove(questionOption.id)}
                                class="btn btn-outline-danger py-0 px-1">
                            <i class="bi bi-trash me-1"></i>Delete
                        </button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>