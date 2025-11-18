<script>
    import {page} from "$app/state";
    import {getExamStatusDisplayName} from "$lib/utils/exam-status.js";
    import {alertError} from "$lib/alert.js";
    import {onMount} from "svelte";
    import QuestionOptionModel from "$lib/models/QuestionOptionModel.js";
    import {questionOptionApi} from "$lib/api/QuestionOptionApi.js";

    const {id} = page.params;
    let questionOption = $state({...new QuestionOptionModel()})


    async function questionOptionDetail() {
        try {
            questionOption = await questionOptionApi.get(id)
        } catch (err) {
            await alertError(err.message);
        }
    }

    onMount(async () => {
        await questionOptionDetail();
    });
</script>
<svelte:head>
    <title>Question Option Details</title>
</svelte:head>
<div class="card shadow-sm border-1 p-4 mb-4">
    <h2 class="h4 fw-bold mb-4 text-dark">
        <i class="bi bi-folder-fill me-1"></i>Question Option Details
    </h2>
    <div class="mb-3">
        <label for="question-id" class="form-label fw-semibold">Question Stem</label>
        <input
                id="question-id"
                type="text"
                class="form-control"
                value={questionOption.questionStem}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="label" class="form-label fw-semibold">Label</label>
        <input
                id="label"
                type="text"
                class="form-control"
                value={questionOption.label}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="content" class="form-label fw-semibold">Content</label>
        <input
                id="content"
                type="text"
                class="form-control"
                value={questionOption.content}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="correct" class="form-label fw-semibold">Correct</label>
        <input
                id="correct"
                type="text"
                class="form-control"
                value={getExamStatusDisplayName(questionOption.correct)}
                readonly
        />
    </div>
    <div class="mb-3">
        <label for="order-index" class="form-label fw-semibold">Order Index</label>
        <input
                id="order-index"
                type="number"
                class="form-control"
                value={questionOption.orderIndex}
                readonly
        />
    </div>
    <div class="d-flex justify-content-end gap-2 mt-4">
        <a href="/question-option" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i>Back
        </a>
    </div>
</div>
