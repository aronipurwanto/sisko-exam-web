<script>
import {onMount} from "svelte";
import {alertError, alertSuccess, alertConfirm} from "$lib/alert.js";
import {examDelete, examGetList} from "$lib/api/ExamApi.js";

let exams = $state([]);

async function examList() {
    try {
        exams = await examGetList();
    } catch (err) {
        await alertError(err.message);
    }
}

async function examRemove(id) {
    if (!await alertConfirm('are you sure want to delete this exam?')) return;

    try {
        await examDelete(id);
        await alertSuccess();
        await examList();
    } catch (err) {
        await alertError(err.message);
    }
}

onMount(async () => {
    await examList();
});
</script>
<svelte:head>
    <title>Exam List</title>
</svelte:head>
<div class="clearfix">
    <div class="tile rounded">
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="tile-title">
                <i class="bi bi-table me-1"></i>Table Exam
            </h3>
            <a class="btn btn-outline-success bi-plus py-1 px-2"
               href="/exam/add">
                New Exam
            </a>
        </div>
        <table class="table table-hover">
            <thead>
            <tr>
                <th class="px-6 py-3 text-left">#</th>
                <th class="px-6 py-3 text-left">ID</th>
                <th class="px-6 py-3 text-left">Name</th>
                <th class="px-6 py-3 text-left">Instructions</th>
                <th class="px-6 py-3 text-left">Duration Minutes</th>
                <th class="px-6 py-3 text-left">Randomize Question</th>
                <th class="px-6 py-3 text-left">Randomize Option</th>
                <th class="px-6 py-3 text-left">Status</th>
                <th class="px-6 py-3 text-left">Start At</th>
                <th class="px-6 py-3 text-left">End At</th>
                <th class="px-6 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each exams as exam, index}
                <tr>
                    <th class="text-center">{index+1}</th>
                    <td>{exam.id}</td>
                    <td>{exam.name}</td>
                    <td>{exam.instructions}</td>
                    <td>{exam.durationMinutes}</td>
                    <td>{exam.randomizeQuestions}</td>
                    <td>{exam.randomizeOptions}</td>
                    <td>{exam.status}</td>
                    <td>{exam.startAt}</td>
                    <td>{exam.endAt}</td>
                    <td class="text-center">
                        <a class="btn btn-outline-primary py-0 px-1"
                           href="/exam/{exam.id}">
                            <i class="bi bi-eye me-1"></i>Detail
                        </a>
                        <a class="btn btn-outline-warning py-0 px-1 ms-1 me-1"
                           href="/exam/{exam.id}/edit">
                            <i class="bi bi-pencil me-1"></i>Edit
                        </a>
                        <button onclick={() => examRemove(exam.id)}
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