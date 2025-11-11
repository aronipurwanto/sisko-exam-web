<script>
    import {page} from "$app/state";
    import {getBooleanDisplayYes} from "$lib/utils/boolean.js";
    import {getExamStatusDisplayName} from "$lib/utils/exam-status.js";
    import ExamModel from "$lib/models/ExamModel.js";
    import {examGet} from "$lib/api/ExamApi.js";
    import {alertError} from "$lib/alert.js";
    import {onMount} from "svelte";
    import ExamAssignmentModel from "$lib/models/ExamAssignmentModel.js";
    import {examAssignmentApi} from "$lib/api/ExamAssignmentApi.js";
    import {formatDateWIB} from "$lib/utils/times.js";

    const {id} = page.params;
    let examAssignment = $state({...new ExamAssignmentModel()})


    async function examAssignmentDetail() {
        try {
            examAssignment = await examAssignmentApi.get(id)
        } catch (err) {
            await alertError(err.message);
        }
    }

    onMount(async () => {
        await examAssignmentDetail();
    });
</script>
<svelte:head>
    <title>Exam Assignment Details</title>
</svelte:head>
<div class="card shadow-sm border-1 p-4 mb-4">
    <h2 class="h4 fw-bold mb-4 text-dark">
        <i class="bi bi-folder-fill me-1"></i>Exam Assignment Details
    </h2>
    <div class="mb-3">
        <label for="exam-name" class="form-label fw-semibold">Exam Name</label>
        <input
                id="exam-name"
                type="text"
                class="form-control"
                value={examAssignment.examName}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="groupLabel" class="form-label fw-semibold">Group Label</label>
        <input
                id="groupLabel"
                type="text"
                class="form-control"
                value={examAssignment.groupLabel}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="startAt" class="form-label fw-semibold">Start At:</label>
        <input
                id="startAt"
                type="text"
                class="form-control"
                value={formatDateWIB(examAssignment.startAt)}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="endAt" class="form-label fw-semibold">End At:</label>
        <input
                id="endAt"
                type="text"
                class="form-control"
                value={formatDateWIB(examAssignment.endAt)}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="maxAttempts" class="form-label fw-semibold">Max Attempts</label>
        <input
                id="maxAttempts"
                type="number"
                class="form-control"
                value={examAssignment.maxAttempts}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="accessCode" class="form-label fw-semibold">Access Code</label>
        <input
                id="accessCode"
                type="text"
                class="form-control"
                value={examAssignment.accessCode}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="audienceCode" class="form-label fw-semibold">Audience Code</label>
        <input
                id="audienceCode"
                type="text"
                class="form-control"
                value={examAssignment.audienceCode}
                readonly
        />
    </div>
    <div class="d-flex justify-content-end gap-2 mt-4">
        <a href="/exam-assignment" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i>Back
        </a>
    </div>
</div>
