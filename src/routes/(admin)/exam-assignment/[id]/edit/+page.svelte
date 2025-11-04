<script>
    import {alertError, alertSuccess} from "$lib/alert.js";
    import AppTitle from "$lib/components/AppTitle.svelte";
    import {examGet, examPatch} from "$lib/api/ExamApi.js";
    import ExamModel from "$lib/models/ExamModel.js";
    import {getBooleanDisplayYes, getBooleanEnum} from "$lib/utils/boolean.js";
    import {getExamStatus, getExamStatusDisplayName} from "$lib/utils/exam-status.js";
    import {page} from "$app/state";
    import {onMount} from "svelte";

    const {id} = page.params;
    let exam = $state({...new ExamModel()});

    const booleans = getBooleanEnum();
    const status = getExamStatus();

    function formatDateTimeLocal(date) {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    function parseLocalDateTime(isoString) {
        if (!isoString) return null;

        // Buat objek Date dari string ISO (UTC)
        const date = new Date(isoString);

        // Ambil offset zona waktu lokal (dalam menit)
        const offset = date.getTimezoneOffset();

        // Buat waktu baru dalam zona lokal
        return new Date(date.getTime() - offset * 60000);
    }


    function calculateEndAt() {
        if (exam.startAt && exam.durationMinutes) {
            const startDate = new Date(exam.startAt);
            exam.endAt = new Date(startDate.getTime() + exam.durationMinutes * 60000);
        }
    }

    function handleStartAtChange(event) {
        const value = event.target.value;
        exam.startAt = value ? new Date(value) : null;
        calculateEndAt();
    }

    function handleDurationChange(event) {
        exam.durationMinutes = parseInt(event.target.value);
        calculateEndAt();
    }

    async function examEdit() {
        try {
            const examToSend = {
                ...exam,
                startAt: exam.startAt ? exam.startAt.toISOString() : null,
                endAt: exam.endAt ? exam.endAt.toISOString() : null
            };
            exam = await examPatch(examToSend);
            await alertSuccess();
        } catch (err) {
            console.log(err);
            await alertError(err.message);
        }
    }

    async function examDetails() {
        try {
            exam = await examGet(id);
            exam.startAt = parseLocalDateTime(exam.startAt);
            exam.endAt = parseLocalDateTime(exam.endAt);
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
    <title>New Exam</title>
</svelte:head>
<AppTitle
        title="Exam"
        desc="This page is add exam"
        iconTitle="bi bi-table"
        url="/exam"
/>
<div class="card shadow-sm border-1 p-4 mb-4">
    <h2 class="h4 fw-bold mb-4 text-dark">
        <i class="bi bi-folder-fill me-1"></i>New Exam
    </h2>
    <form onsubmit={examForm}>
        <div class="mb-3">
            <label for="name" class="form-label fw-semibold">Name:</label>
            <input
                    id="name"
                    type="text"
                    class="form-control"
                    bind:value={exam.name}
            />
        </div>
        <div class="mb-3">
            <label for="instruction" class="form-label fw-semibold">Instruction:</label>
            <input
                    id="instruction"
                    type="text"
                    class="form-control"
                    bind:value={exam.instructions}
            />
        </div>
        <div class="mb-3">
            <label for="durationMinutes" class="form-label fw-semibold">Duration In Minutes</label>
            <input
                    id="durationMinutes"
                    type="number"
                    class="form-control"
                    value={exam.durationMinutes}
                    oninput={handleDurationChange}
            />
        </div>
        <div class="mb-3">
            <label for="randomizeQuestions" class="form-label fw-semibold">Randomize Question?</label>
            <select
                    id="randomizeQuestions"
                    class="form-select"
                    bind:value={exam.randomizeQuestions}
            >
                <option value="" disabled>select correct</option>
                {#each booleans as boolean}
                    <option value={boolean}>{getBooleanDisplayYes(boolean)}</option>
                {/each}
            </select>
        </div>
        <div class="mb-3">
            <label for="randomizeOptions" class="form-label fw-semibold">Randomize Options?</label>
            <select
                    id="randomizeOptions"
                    class="form-select"
                    bind:value={exam.randomizeOptions}
            >
                <option value="" disabled>select correct</option>
                {#each booleans as boolean}
                    <option value={boolean}>{getBooleanDisplayYes(boolean)}</option>
                {/each}
            </select>
        </div>
        <div class="mb-3">
            <label for="examStatus" class="form-label fw-semibold">Status:</label>
            <select
                    id="examStatus"
                    class="form-select"
                    bind:value={exam.status}
            >
                <option value="" disabled>select status</option>
                {#each status as s}
                    <option value={s}>{getExamStatusDisplayName(s)}</option>
                {/each}
            </select>
        </div>
        <div class="mb-3">
            <label for="startAt" class="form-label fw-semibold">Start At:</label>
            <input
                    id="startAt"
                    type="datetime-local"
                    class="form-control"
                    value={formatDateTimeLocal(exam.startAt)}
                    oninput={handleStartAtChange}
            />
            <small class="form-text text-muted">Start Exam Time</small>
        </div>
        <div class="mb-3">
            <label for="endAt" class="form-label fw-semibold">End At:</label>
            <input
                    id="endAt"
                    type="datetime-local"
                    class="form-control"
                    value={formatDateTimeLocal(exam.endAt)}
                    readonly
            />
            {#if exam.durationMinutes === 0}
                <small class="form-text text-muted">
                    End Exam Time
                </small>
            {:else}
                <small class="form-text text-muted">
                    automatic set {exam.durationMinutes || 0} minutes after time set
                </small>
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