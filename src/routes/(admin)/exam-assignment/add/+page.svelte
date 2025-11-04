<script>
    import {alertError, alertSuccess} from "$lib/alert.js";
    import AppTitle from "$lib/components/AppTitle.svelte";
    import {goto} from "$app/navigation";
    import ExamAssignmentModel from "$lib/models/ExamAssignmentModel.js";
    import {examAssignmentPost} from "$lib/api/ExamAssignmentApi.js";
    import {examGetList} from "$lib/api/ExamApi.js";
    import {onMount} from "svelte";

    let examAssignment = $state({...new ExamAssignmentModel()});
    let exams = $state([]);

    async function examAssignmentAdd() {
        try {
            await examAssignmentPost(examAssignment);
            await alertSuccess()
            await goto('/exam-assignment')
        } catch (err) {
            await alertError(err.message);
        }
    }

    async function examAssignmentForm(event) {
        event.preventDefault();
        await examAssignmentAdd();
    }

    onMount(async () => {
        exams = await examGetList();
    })
</script>
<svelte:head>
    <title>New Exam-Assignment</title>
</svelte:head>
<AppTitle
        title="Exam Assignment"
        desc="This page is add exam-assignment"
        iconTitle="bi bi-table"
        url="/exam-assignment"
/>
<div class="card shadow-sm border-1 p-4 mb-4">
    <h2 class="h4 fw-bold mb-4 text-dark">
        <i class="bi bi-folder-fill me-1"></i>New Exam Assignment
    </h2>
    <form onsubmit={examAssignmentForm}>
        <div class="mb-3">
            <label for="examName" class="form-label fw-semibold">Exam Name</label>
            <select
                    id="examName"
                    class="form-select"
                    bind:value={examAssignment.examId}
            >
                <option value="" disabled>select exam</option>
                {#each exams as exam}
                    <option value={exam.id}>{exam.name}</option>
                {/each}
            </select>
        </div>
        <div class="mb-3">
            <label for="groupLabel" class="form-label fw-semibold">Group Label</label>
            <input
                    id="groupLabel"
                    type="text"
                    class="form-control"
                    bind:value={examAssignment.groupLabel}
            />
        </div>
        <div class="mb-3">
            <label for="startAt" class="form-label fw-semibold">Start At:</label>
            <input
                    id="startAt"
                    type="datetime-local"
                    class="form-control"
                    bind:value={examAssignment.startAt}
            />
            <small class="form-text text-muted">Start Exam Assignment Time</small>
        </div>
        <div class="mb-3">
            <label for="endAt" class="form-label fw-semibold">End At:</label>
            <input
                    id="endAt"
                    type="datetime-local"
                    class="form-control"
                    bind:value={examAssignment.endAt}
            />
            <small class="form-text text-muted">End Exam Assignment Time</small>
        </div>
        <div class="mb-3">
            <label for="maxAttempts" class="form-label fw-semibold">Max Attempts</label>
            <input
                    id="maxAttempts"
                    type="number"
                    class="form-control"
                    bind:value={examAssignment.maxAttempts}
            />
        </div>
        <div class="mb-3">
            <label for="accessCode" class="form-label fw-semibold">Access Code</label>
            <input
                    id="accessCode"
                    type="text"
                    class="form-control"
                    bind:value={examAssignment.accessCode}
            />
        </div>
        <div class="mb-3">
            <label for="audienceCode" class="form-label fw-semibold">Audience Code</label>
            <input
                    id="audienceCode"
                    type="text"
                    class="form-control"
                    bind:value={examAssignment.audienceCode}
            />
        </div>
        <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="submit" class="btn btn-outline-success">
                <i class="bi bi-check me-1"></i>Save
            </button>
            <a href="/exam-assignment" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left me-1"></i>Back
            </a>
        </div>
    </form>
</div>