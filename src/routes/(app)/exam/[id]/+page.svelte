<script>
    import {page} from "$app/state";
    import {getBooleanDisplayYes} from "$lib/enums/boolean.js";
    import {getExamStatusDisplayName} from "$lib/enums/exam-status.js";
    import ExamModel from "$lib/models/ExamModel.js";
    import {examGet} from "$lib/api/ExamApi.js";
    import {alertError} from "$lib/alert.js";
    import {onMount} from "svelte";

    const {id} = page.params;
    let exam = $state({...new ExamModel()})

    function formatDateWIB(dateString) {
        if (!dateString) return '-';

        const date = new Date(dateString);

        const options = {
            timeZone: 'Asia/Jakarta',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };

        const formatted = date.toLocaleString('id-ID', options);
        return `${formatted} WIB`;
    }

    async function examDetails() {
        try {
            exam = await examGet(id);
        } catch (err) {
            await alertError(err.message);
        }
    }

    onMount(async () => {
        await examDetails();
    });
</script>
<svelte:head>
    <title>Exam Details</title>
</svelte:head>
<div class="card shadow-sm border-1 p-4 mb-4">
    <h2 class="h4 fw-bold mb-4 text-dark">
        <i class="bi bi-folder-fill me-1"></i>Exam Details
    </h2>
    <div class="mb-3">
        <label for="name" class="form-label fw-semibold">Name:</label>
        <input
                id="name"
                type="text"
                class="form-control"
                bind:value={exam.name}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="instruction" class="form-label fw-semibold">Instruction:</label>
        <input
                id="instruction"
                type="text"
                class="form-control"
                bind:value={exam.instructions}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="durationMinutes" class="form-label fw-semibold">Duration In Minutes</label>
        <input
                id="durationMinutes"
                type="number"
                class="form-control"
                bind:value={exam.durationMinutes}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="randomizeQuestions" class="form-label fw-semibold">Randomize Question?</label>
        <input
                id="randomizeQuestions"
                type="text"
                class="form-control"
                value={getBooleanDisplayYes(exam.randomizeQuestions)}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="randomizeOptions" class="form-label fw-semibold">Randomize Options?</label>
        <input
                id="randomizeOptions"
                type="text"
                class="form-control"
                value={getBooleanDisplayYes(exam.randomizeOptions)}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="examStatus" class="form-label fw-semibold">Status:</label>
        <input
                id="examStatus"
                type="text"
                class="form-control"
                value={getExamStatusDisplayName(exam.status)}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="startAt" class="form-label fw-semibold">Start At:</label>
        <input
                id="startAt"
                type="text"
                class="form-control"
                value={formatDateWIB(exam.startAt)}
                readonly
        />
        <small class="form-text text-muted">Start Exam Time</small>
    </div>
    <div class="mb-3">
        <label for="endAt" class="form-label fw-semibold">End At:</label>
        <input
                id="endAt"
                type="text"
                class="form-control"
                value={formatDateWIB(exam.endAt)}
                readonly
        />
        <small class="form-text text-muted">End Exam Time</small>
    </div>
    <div class="d-flex justify-content-end gap-2 mt-4">
        <a href="/exam" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i>Back
        </a>
    </div>
</div>
