<script>
    import {alertError, alertSuccess} from "$lib/alert.js";
    import AppTitle from "$lib/components/AppTitle.svelte";
    import {page} from "$app/state";
    import {onMount} from "svelte";
    import QuestionOptionModel from "$lib/models/QuestionOptionModel.js";
    import {getBooleanEnum, getBooleanEnumDisplayName} from "$lib/utils/boolean.js";
    import {questionOptionApi} from "$lib/api/QuestionOptionApi.js";
    import {questionApi} from "$lib/api/QuestionApi.js";

    const {id} = page.params;
    let questionOption = $state({...new QuestionOptionModel()});
    let questions = $state([]);
    let errors = $state({});
    const booleans = getBooleanEnum();

    async function questionOptionEdit() {
        try {
            await questionOptionApi.patch(questionOption);
            await alertSuccess()
        } catch (err) {
            if (err?.error) {
                errors = err.error;
            } else {
                await alertError(err.message);
            }
        }
    }

    async function questionOptionDetail() {
        try {
            questionOption = await questionOptionApi.get(id)
        } catch (err) {
            if (err?.error) {
                errors = err.error;
            } else {
                await alertError(err.message);
            }
        }
    }

    async function questionOptionForm(event) {
        event.preventDefault();
        await questionOptionEdit();
    }

    onMount(async () => {
        await questionOptionDetail();
        questions = await questionApi.getAll();
    });
</script>
<svelte:head>
    <title>Edit Question Option</title>
</svelte:head>
<AppTitle
        title="Exam"
        desc="This page is add exam"
        iconTitle="bi bi-table"
        url="/question-option"
/>
<div class="card shadow-sm border-1 p-4 mb-4">
    <h2 class="h4 fw-bold mb-4 text-dark">
        <i class="bi bi-folder-fill me-1"></i>Edit Question Option
    </h2>
    <form onsubmit={questionOptionForm}>
        <div class="mb-3">
            <label for="questionStem" class="form-label fw-semibold">Question Stem</label>
            <select
                    id="questionStem"
                    class="form-select {errors.questionId ? 'is-invalid' : ''}"
                    bind:value={questionOption.questionId}
            >
                <option value="" disabled>select question stem</option>
                {#each questions as question}
                    <option value={question.id}>{question.stem}</option>
                {/each}
            </select>
            {#if errors.questionId}
                <small class="text-danger">{errors.questionId}</small>
            {/if}
        </div>
        <div class="mb-3">
            <label for="label" class="form-label fw-semibold">Label</label>
            <input
                    id="label"
                    type="text"
                    class="form-control {errors.label ? 'is-invalid' : ''}"
                    bind:value={questionOption.label}
            />
            {#if errors.label}
                {#each errors.label as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-3">
            <label for="content" class="form-label fw-semibold">Content</label>
            <input
                    id="content"
                    type="text"
                    class="form-control {errors.content ? 'is-invalid' : ''}"
                    bind:value={questionOption.content}
            />
            {#if errors.content}
                {#each errors.content as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-3">
            <label for="correct" class="form-label fw-semibold">Correct</label>
            <select
                    id="correct"
                    class="form-select {errors.correct ? 'is-invalid' : ''}"
                    bind:value={questionOption.correct}
            >
                <option value="" disabled>select correct</option>
                {#each booleans as boolean}
                    <option value={boolean}>{getBooleanEnumDisplayName(boolean)}</option>
                {/each}
            </select>
            {#if errors.correct}
                {#each errors.correct as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-3">
            <label for="orderIndex" class="form-label fw-semibold">Order Index</label>
            <input
                    id="orderIndex"
                    type="number"
                    class="form-control {errors.orderIndex ? 'is-invalid' : ''}"
                    bind:value={questionOption.orderIndex}
            />
            {#if errors.orderIndex}
                {#each errors.orderIndex as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="submit" class="btn btn-outline-warning">
                <i class="bi bi-check me-1"></i>Save Changes
            </button>
            <a href="/question-option" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left me-1"></i>Back
            </a>
        </div>
    </form>
</div>