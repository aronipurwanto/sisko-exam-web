<script>
import AppTitle from "$lib/components/AppTitle.svelte";
import {onMount} from "svelte";
import {questionDelete, questionGetList} from "$lib/api/QuestionApi.js";
import {alertError, alertSuccess, alertConfirm} from "$lib/alert.js";

let questions = $state([]);

async function questionList() {
    try {
        questions = await questionGetList();
    } catch (err) {
        await alertError(err.message);
    }
}

async function questionRemove(id) {
    if (!await alertConfirm('are you sure want to delete this question?')) return;

    try {
        await questionDelete(id);
        await alertSuccess();
        await questionList();
    } catch (err) {
        await alertError(err.message);
    }
}

onMount(async () => {
    await questionList();
});
</script>
<svelte:head>
    <title>Question List</title>
</svelte:head>
<div class="clearfix">
    <div class="tile rounded">
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="tile-title">
                <i class="bi bi-table me-1"></i>Table Question
            </h3>
            <a class="btn btn-outline-success bi-plus py-1 px-2"
               href="/question/add">
                Add Question
            </a>
        </div>
        <table class="table table-hover">
            <thead>
            <tr>
                <th class="px-6 py-3 text-left">#</th>
                <th class="px-6 py-3 text-left">ID</th>
                <th class="px-6 py-3 text-left">Type</th>
                <th class="px-6 py-3 text-left">Answer Policy</th>
                <th class="px-6 py-3 text-left">Stem</th>
                <th class="px-6 py-3 text-left">Point Default</th>
                <th class="px-6 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each questions as question, index}
                <tr>
                    <th class="text-center">{index+1}</th>
                    <td>{question.id}</td>
                    <td>{question.qtype}</td>
                    <td>{question.questionAnswerPolicy}</td>
                    <td>{question.stem}</td>
                    <td class="text-left">{question.pointsDefault}</td>
                    <td class="text-center">
                        <a class="btn btn-outline-primary py-0 px-1"
                           href="/question/{question.id}">
                            <i class="bi bi-eye me-1"></i>Detail
                        </a>
                        <a class="btn btn-outline-warning py-0 px-1 ms-1 me-1"
                           href="/question/{question.id}/edit">
                            <i class="bi bi-pencil me-1"></i>Edit
                        </a>
                        <button onclick={() => questionRemove(question.id)}
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