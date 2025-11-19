<script>
    import {alertError, alertSuccess} from "$lib/alert.js";
    import AppTitle from "$lib/components/AppTitle.svelte";
    import {page} from "$app/state";
    import {onMount} from "svelte";
    import {examAssignmentApi} from "$lib/api/ExamAssignmentApi.js";
    import {examApi} from "$lib/api/ExamApi.js";
    import ExamAssignmentModel from "$lib/models/ExamAssignmentModel.js";

    const {id} = page.params;
    let examAssignment = $state({...new ExamAssignmentModel()});
    let exams = $state([]);
    let errors = $state({});

    async function examAssignmentEdit() {
        try {
            await examAssignmentApi.patch(examAssignment);
            await alertSuccess()
        } catch (err) {
            if (err?.error) {
                errors = err.error;
            } else {
                await alertError(err.message);
            }
        }
    }

    async function examAssignmentDetail() {
        try {
            examAssignment = await examAssignmentApi.get(id)
        } catch (err) {
            if (err?.error) {
                errors = err.error;
            } else {
                await alertError(err.message);
            }
        }
    }

    async function examAssignmentForm(event) {
        event.preventDefault();
        await examAssignmentEdit();
    }

    onMount(async () => {
        await examAssignmentDetail();
        exams = await examApi.getAll();
    });
</script>
<svelte:head>
    <title>Edit Exam Assignment</title>
</svelte:head>
<AppTitle
        title="Exam"
        desc="This page is add exam"
        iconTitle="bi bi-table"
        url="/exam-assignment"
/>
<div class="card shadow-sm border-1 p-4 mb-4">
    <h2 class="h4 fw-bold mb-4 text-dark">
        <i class="bi bi-folder-fill me-1"></i>Edit Exam Assignment
    </h2>
    <form onsubmit={examAssignmentForm}>
        <div class="mb-3">
            <label for="examName" class="form-label fw-semibold">Exam Name</label>
            <select
                    id="examName"
                    class="form-select {errors.examId ? 'is-invalid' : ''}"
                    bind:value={examAssignment.examId}
            >
                <option value="" disabled>select exam</option>
                {#each exams as exam}
                    <option value={exam.id}>{exam.name}</option>
                {/each}
            </select>
            {#if errors.examId}
                <small class="text-danger">{errors.examId}</small>
            {/if}
        </div>
        <div class="mb-3">
            <label for="groupLabel" class="form-label fw-semibold">Group Label</label>
            <input
                    id="groupLabel"
                    type="text"
                    class="form-control {errors.groupLabel ? 'is-invalid' : ''}"
                    bind:value={examAssignment.groupLabel}
            />
            {#if errors.groupLabel}
                {#each errors.groupLabel as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-3">
            <label for="startAt" class="form-label fw-semibold">Start At:</label>
            <input
                    id="startAt"
                    type="datetime-local"
                    class="form-control {errors.startAt ? 'is-invalid' : ''}"
                    bind:value={examAssignment.startAt}
            />
            {#if errors.startAt}
                {#each errors.startAt as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
            <small class="form-text text-muted">Start Exam Assignment Time</small>
        </div>
        <div class="mb-3">
            <label for="endAt" class="form-label fw-semibold">End At:</label>
            <input
                    id="endAt"
                    type="datetime-local"
                    class="form-control {errors.endAt ? 'is-invalid' : ''}"
                    bind:value={examAssignment.endAt}
            />
            {#if errors.endAt}
                {#each errors.endAt as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
            <small class="form-text text-muted">End Exam Assignment Time</small>
        </div>
        <div class="mb-3">
            <label for="maxAttempts" class="form-label fw-semibold">Max Attempts</label>
            <input
                    id="maxAttempts"
                    type="number"
                    class="form-control {errors.maxAttempts ? 'is-invalid' : ''}"
                    bind:value={examAssignment.maxAttempts}
            />
            {#if errors.maxAttempts}
                {#each errors.maxAttempts as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-3">
            <label for="accessCode" class="form-label fw-semibold">Access Code</label>
            <input
                    id="accessCode"
                    type="text"
                    class="form-control {errors.accessCode ? 'is-invalid' : ''}"
                    bind:value={examAssignment.accessCode}
            />
            {#if errors.accessCode}
                {#each errors.accessCode as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-3">
            <label for="audienceCode" class="form-label fw-semibold">Audience Code</label>
            <input
                    id="audienceCode"
                    type="text"
                    class="form-control {errors.audienceCode ? 'is-invalid' : ''}"
                    bind:value={examAssignment.audienceCode}
            />
            {#if errors.audienceCode}
                {#each errors.audienceCode as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="submit" class="btn btn-outline-warning">
                <i class="bi bi-check me-1"></i>Save Changes
            </button>
            <a href="/exam-assignment" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left me-1"></i>Back
            </a>
        </div>
    </form>
</div>