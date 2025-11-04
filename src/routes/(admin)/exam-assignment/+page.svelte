<script>
import {onMount} from "svelte";
import {alertError, alertSuccess, alertConfirm} from "$lib/alert.js";
import {examAssignmentDelete, examAssignmentGetList} from "$lib/api/ExamAssignmentApi.js";
import {formatDateWIB} from "$lib/utils/times.js";

let examAssignments = $state([]);

async function examAssignmentList() {
    try {
        examAssignments = await examAssignmentGetList();
    } catch (err) {
        await alertError(err.message);
    }
}

async function examAssignmentRemove(id) {
    if (!await alertConfirm('are you sure want to delete this exam-assignment?')) return;

    try {
        await examAssignmentDelete(id);
        await alertSuccess();
        await examAssignmentList();
    } catch (err) {
        await alertError(err.message);
    }
}

onMount(async () => {
    await examAssignmentList();
});
</script>
<svelte:head>
    <title>Exam-Assignment List</title>
</svelte:head>
<div class="card shadow-sm border-1 p-4 mb-4">
    <div class="d-flex justify-content-between align-items-center">
        <h3 class="tile-title">
            <i class="bi bi-table me-1"></i>Table Exam-Assignment
        </h3>
        <a class="btn btn-outline-success bi-plus py-1 px-2"
           href="/exam-assignment/add">
            New Exam-Assignment
        </a>
    </div>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
            <tr>
                <th class="px-6 py-3 text-left">#</th>
                <th class="px-6 py-3 text-left">ID</th>
                <th class="px-6 py-3 text-left">Exam Name</th>
                <th class="px-6 py-3 text-left">Group Label</th>
                <th class="px-6 py-3 text-left">Start At</th>
                <th class="px-6 py-3 text-left">End At</th>
                <th class="px-6 py-3 text-left">Max Attempts</th>
                <th class="px-6 py-3 text-left">Access Code</th>
                <th class="px-6 py-3 text-left">Audience Code</th>
                <th class="px-6 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each examAssignments as examAssignment, index}
                <tr>
                    <th class="text-center">{index+1}</th>
                    <td>{examAssignment.id}</td>
                    <td>{examAssignment.examName}</td>
                    <td>{examAssignment.groupLabel}</td>
                    <td>{formatDateWIB(examAssignment.startAt)}</td>
                    <td>{formatDateWIB(examAssignment.endAt)}</td>
                    <td>{examAssignment.maxAttempts}</td>
                    <td>{examAssignment.accessCode}</td>
                    <td>{examAssignment.audienceCode}</td>
                    <td class="text-center">
                        <a class="btn btn-outline-primary py-0 px-1"
                           href="/exam-assignment/{examAssignment.id}">
                            <i class="bi bi-eye me-1"></i>Detail
                        </a>
                        <a class="btn btn-outline-warning py-0 px-1 ms-1 me-1"
                           href="/exam-assignment/{examAssignment.id}/edit">
                            <i class="bi bi-pencil me-1"></i>Edit
                        </a>
                        <button onclick={() => examAssignmentRemove(examAssignment.id)}
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