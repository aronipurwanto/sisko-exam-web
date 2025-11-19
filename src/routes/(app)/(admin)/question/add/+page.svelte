<script>
    import QuestionModel from "$lib/models/QuestionModel.js";
    import QuestionOptionModel from "$lib/models/QuestionOptionModel.js";
    import {questionApi} from "$lib/api/QuestionApi.js";
    import {alertError, alertSuccess} from "$lib/alert.js";
    import {goto} from "$app/navigation";
    import {getQuestionTypes, getQuestionTypeDisplayName} from "$lib/utils/question-types.js";
    import {getAnswerPolicy, getAnswerPolicyDisplayName} from "$lib/utils/answer-policy.js";
    import {getLabel} from "$lib/utils/label.js";
    import {getBooleanEnum, getBooleanEnumDisplayName} from "$lib/utils/boolean.js";
    import {questionOptionApi} from "$lib/api/QuestionOptionApi.js";
    import AppTitle from "$lib/components/AppTitle.svelte";

    let question = $state({...new QuestionModel()});
    let errors = $state({});
    let questionOptions = $state([
        {...new QuestionOptionModel()},
        {...new QuestionOptionModel()}
    ]);

    const types = getQuestionTypes();
    const policies = getAnswerPolicy();
    const labels = getLabel();
    const booleans = getBooleanEnum();

    async function questionAdd() {
        try {
            question = await questionApi.post(question);
            await alertSuccess("save question success");
            await goto('/question');
        } catch (err) {
            if (err?.error) {
                errors = err.error;
            } else {
                await alertError(err.message);
            }
        }

        if (question.qtype === types[0]) {
            questionOptions = questionOptions.map(opt => ({
                ...opt,
                questionId: question.id,
            }));
        }
    }

    async function questionOptionAdd() {
        try {
            for (const questionOption of questionOptions) {
                try {
                    await questionOptionApi.post(questionOption);
                } catch (err) {
                    await alertError(err.message);
                }
            }
            await alertSuccess("save question option success");
            await goto("/question");
        } catch (err) {
            await alertError(err.message);
        }
    }

    function addOption(e) {
        e.preventDefault();

        questionOptions = [
            ...questionOptions,
            {...new QuestionOptionModel()}
        ];
    }

    function removeLastOption() {
        if (questionOptions.length > 2) { // misalnya jangan hapus kalau tinggal 1
            questionOptions = questionOptions.slice(0, -1);
        }
    }

    async function questionForm(event) {
        event.preventDefault();
        await questionAdd();
        if (question.qtype === types[0]) {
            await questionOptionAdd();
        }
    }
</script>
<svelte:head>
    <title>New Question</title>
</svelte:head>
<AppTitle
        title="Question"
        desc="This page is bank question"
        iconTitle="bi bi-table"
        url="/question"
/>
<div class="card shadow-sm border-1 p-4 mb-4">
    <h2 class="h4 fw-bold mb-4 text-dark">
        <i class="bi bi-folder-fill me-1"></i>New Question
    </h2>
    <form onsubmit={questionForm}>
        <div class="mb-3">
            <label for="qtype" class="form-label fw-semibold">Type</label>
            <select
                    id="qtype"
                    class="form-select {errors.qtype ? 'is-invalid' : ''}"
                    bind:value={question.qtype}
                    required
            >
                <option value="" disabled>select type</option>
                {#each types as type}
                    <option value={type}>{getQuestionTypeDisplayName(type)}</option>
                {/each}
            </select>
            {#if errors.qtype}
                {#each errors.qtype as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        {#if question.qtype === types[0]}
            <div class="mb-3">
                <label for="answer-policy" class="form-label fw-semibold">Answer Policy</label>
                <select
                        id="answer-policy"
                        class="form-select {errors.questionAnswerPolicy ? 'is-invalid' : ''}"
                        bind:value={question.questionAnswerPolicy}
                        required
                >
                    <option value="" disabled>select policy</option>
                    {#each policies as policy}
                        <option value={policy}>{getAnswerPolicyDisplayName(policy)}</option>
                    {/each}
                </select>
                {#if errors.questionAnswerPolicy}
                    {#each errors.questionAnswerPolicy as msg}
                        <small class="text-danger">{msg}</small><br>
                    {/each}
                {/if}
            </div>
        {/if}
        <div class="mb-3">
            <label for="stem" class="form-label fw-semibold">Stem</label>
            <input
                    id="stem"
                    type="text"
                    class="form-control {errors.stem ? 'is-invalid' : ''}"
                    bind:value={question.stem}
            />
            {#if errors.stem}
                {#each errors.stem as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        <div class="mb-4">
            <label for="point" class="form-label fw-semibold">Point</label>
            <input
                    id="point"
                    type="number"
                    class="form-control {errors.pointsDefault ? 'is-invalid' : ''}"
                    bind:value={question.pointsDefault}
            />
            {#if errors.pointsDefault}
                {#each errors.pointsDefault as msg}
                    <small class="text-danger">{msg}</small><br>
                {/each}
            {/if}
        </div>
        {#if question.qtype === types[0]}
            {#each questionOptions as questionOption, i}
                <div class="card border-1 shadow-sm mb-4">
                    <div class="card-body">
                        <h5 class="card-title fw-bold mb-3">
                            MCO {questionOption.label = labels[i]}
                        </h5>
                        <div class="mb-3">
                            <label for="label-{i}" class="form-label fw-semibold">Label</label>
                            <input
                                    id="label-{i}"
                                    class="form-control"
                                    bind:value={questionOption.label}
                                    required
                                    readonly
                            />
                        </div>
                        <div class="mb-3">
                            <label for="content-{i}" class="form-label fw-semibold">Content</label>
                            <input
                                    id="content-{i}"
                                    type="text"
                                    class="form-control"
                                    bind:value={questionOption.content}
                            />
                        </div>
                        <div class="mb-3">
                            <label for="correct-{i}" class="form-label fw-semibold">Correct</label>
                            <select
                                    id="correct-{i}"
                                    class="form-select"
                                    bind:value={questionOption.correct}
                            >
                                <option value="" disabled>select correct</option>
                                {#each booleans as boolean}
                                    <option value={boolean}>{getBooleanEnumDisplayName(boolean)}</option>
                                {/each}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="orderIndex-{i}" class="form-label fw-semibold">Order Index</label>
                            <input
                                    id="orderIndex-{i}"
                                    type="number"
                                    class="form-control"
                                    bind:value={questionOption.orderIndex}
                            />
                        </div>
                    </div>
                </div>
            {/each}
            <div class="d-flex gap-2 mb-4">
                {#if questionOptions.length < 6}
                    <button
                            type="button"
                            class="btn btn-outline-primary bi bi-plus"
                            onclick={addOption}
                    >
                        Add Option
                    </button>
                {/if}
                {#if questionOptions.length > 2}
                    <button
                            type="button"
                            class="btn btn-outline-danger bi bi-dash"
                            onclick={removeLastOption}
                    >
                        Remove Option
                    </button>
                {/if}
            </div>
        {/if}
        <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="submit" class="btn btn-outline-success">
                <i class="bi bi-check me-1"></i>Save
            </button>
            <a href="/question" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left me-1"></i>Back
            </a>
        </div>
    </form>
</div>
