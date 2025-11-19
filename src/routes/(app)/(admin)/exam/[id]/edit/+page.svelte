<script>
    import {alertError, alertSuccess} from "$lib/alert.js";
    import AppTitle from "$lib/components/AppTitle.svelte";
    import {examApi} from "$lib/api/ExamApi.js";
    import ExamModel from "$lib/models/ExamModel.js";
    import {getBooleanDisplayYes, getBooleanEnum} from "$lib/utils/boolean.js";
    import {getExamStatus, getExamStatusDisplayName} from "$lib/utils/exam-status.js";
    import {page} from "$app/state";
    import {onMount} from "svelte";
    import {formatDateTimeLocal} from "$lib/utils/times.js";

    const {id} = page.params;
    let exam = $state({...new ExamModel()});
    let errors = $state({});

    const booleans = getBooleanEnum();
    const status = getExamStatus();
    let end = $derived.by(() => {
        if (!exam.startAt) return null;
        const start = new Date(exam.startAt);
        return formatDateTimeLocal(start.getTime() + (exam.durationMinutes || 0) * 60000);
    });

    async function examEdit() {
        try {
            exam.endAt = end;
            await examApi.patch(exam);
            await alertSuccess("update exam successfully");
        } catch (err) {
            if (err?.error) {
                errors = err.error;
            } else {
                await alertError(err.message);
            }
        }
    }

    async function examDetails() {
        try {
            exam = await examApi.get(id);
        } catch (err) {
            await alertError(err.message);
        }
    }

    async function examForm(event) {
        event.preventDefault();
        await examEdit();
    }

    onMount(async () => {
        await examDetails();
    });
</script>
<svelte:head>
    <title>Edit Exam</title>
</svelte:head>
<AppTitle
        title="Exam"
        desc="This page is add exam"
        iconTitle="bi bi-table"
        url="/exam"
/>
<div class="card shadow-sm border-1 p-4 mb-4">
    <h2 class="h4 fw-bold mb-4 text-dark">
        <i class="bi bi-folder-fill me-1"></i>Edit Exam
    </h2>
    <form onsubmit={examForm}>
        <div class="mb-3">
            <label for="name" class="form-label fw-semibold">Name:</label>
            <input
                    id="name"
                    type="text"
                    class="form-control {errors.name ? 'is-invalid' : ''}"
                    bind:value={exam.name}
            />
            {#if errors.name}
                {#each errors.name as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-3">
            <label for="instruction" class="form-label fw-semibold">Instruction:</label>
            <input
                    id="instruction"
                    type="text"
                    class="form-control {errors.instructions ? 'is-invalid' : ''}"
                    bind:value={exam.instructions}
            />
            {#if errors.instructions}
                {#each errors.instructions as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-3">
            <label for="durationMinutes" class="form-label fw-semibold">Duration In Minutes</label>
            <input
                    id="durationMinutes"
                    type="number"
                    class="form-control {errors.durationMinutes ? 'is-invalid' : ''}"
                    bind:value={exam.durationMinutes}
            />
            {#if errors.durationMinutes}
                {#each errors.durationMinutes as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-3">
            <label for="randomizeQuestions" class="form-label fw-semibold">Randomize Question?</label>
            <select
                    id="randomizeQuestions"
                    class="form-select {errors.randomizeQuestions ? 'is-invalid' : ''}"
                    bind:value={exam.randomizeQuestions}
            >
                <option value="" disabled>select correct</option>
                {#each booleans as boolean}
                    <option value={boolean}>{getBooleanDisplayYes(boolean)}</option>
                {/each}
            </select>
            {#if errors.randomizeQuestions}
                {#each errors.randomizeQuestions as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-3">
            <label for="randomizeOptions" class="form-label fw-semibold">Randomize Options?</label>
            <select
                    id="randomizeOptions"
                    class="form-select {errors.randomizeOptions ? 'is-invalid' : ''}"
                    bind:value={exam.randomizeOptions}
            >
                <option value="" disabled>select correct</option>
                {#each booleans as boolean}
                    <option value={boolean}>{getBooleanDisplayYes(boolean)}</option>
                {/each}
            </select>
            {#if errors.randomizeOptions}
                {#each errors.randomizeOptions as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-3">
            <label for="examStatus" class="form-label fw-semibold">Status:</label>
            <select
                    id="examStatus"
                    class="form-select {errors.status ? 'is-invalid' : ''}"
                    bind:value={exam.status}
            >
                <option value={null} disabled>select status</option>
                {#each status as s}
                    <option value={s}>{getExamStatusDisplayName(s)}</option>
                {/each}
            </select>
            {#if errors.status}
                {#each errors.status as msg}
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
                    bind:value={exam.startAt}
            />
            <small class="form-text text-muted">Start Exam Time</small><br>
            {#if errors.startAt}
                {#each errors.startAt as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-3">
            <label for="endAt" class="form-label fw-semibold">End At:</label>
            <input
                    id="endAt"
                    type="datetime-local"
                    class="form-control {errors.endAt ? 'is-invalid' : ''}"
                    value={end}
                    readonly
            />
            {#if exam.durationMinutes === 0}
                <small class="form-text text-muted">
                    End Exam Time
                </small><br>
            {:else}
                <small class="form-text text-muted">
                    automatic set {exam.durationMinutes || 0} minutes after time set
                </small><br>
            {/if}
            {#if errors.endAt}
                {#each errors.endAt as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="submit" class="btn btn-outline-warning">
                <i class="bi bi-check me-1"></i>Save Changes
            </button>
            <a href="/exam" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left me-1"></i>Back
            </a>
        </div>
    </form>
</div>