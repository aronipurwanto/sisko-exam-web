<script>
    import {page} from "$app/state";
    import {onMount} from "svelte";
    import QuestionModel from "$lib/models/QuestionModel.js";
    import QuestionOptionModel from "$lib/models/QuestionOptionModel.js";
    import {getQuestionTypes} from "$lib/utils/question-types.js";
    import {getAnswerPolicy, getAnswerPolicyDisplayName} from "$lib/utils/answer-policy.js";
    import {getBooleanEnum, getBooleanEnumDisplayName} from "$lib/utils/boolean.js";
    import {questionGet, questionPatch} from "$lib/api/QuestionApi.js";
    import {alertConfirm, alertError, alertSuccess} from "$lib/alert.js";
    import {questionOptionDelete, questionOptionPatch} from "$lib/api/QuestionOptionApi.js";

    const {id} = page.params;
    let question = $state({...new QuestionModel()});
    let questionOptions = $state([{...new QuestionOptionModel()}])
    const types = getQuestionTypes();
    const policies = getAnswerPolicy();
    const booleans = getBooleanEnum();

    async function questionUpdate() {
        try {
            await questionPatch(question);
            await alertSuccess('update question successfully');
        } catch (err) {
            await alertError(err.message);
        }
    }

    async function questionDetail() {
        try {
            question = await questionGet(id);
            questionOptions = question.questionOptions;
        } catch (err) {
            await alertError(err.message);
        }
    }

    async function questionOptionUpdate() {
        try {
            questionOptions = questionOptions.map((option) => {
                questionOptionPatch(option);
            });
        } catch (err) {
            await alertError(err.message);
        }
    }

    async function questionForm(e) {
        e.preventDefault();
        await questionUpdate();
        await questionOptionUpdate();
    }

    async function questionOptionRemove(id) {
        if (!await alertConfirm('are you sure want to delete this question-option?')) return;
        try {
            await questionOptionDelete(id);
            await alertSuccess('delete successfully');
            await questionDetail();
        } catch (err) {
            await alertError(err.message);
        }
    }

    onMount(async () => {
        await questionDetail();
    });
</script>
<div class="card shadow-sm border-1 p-4 mb-4">
    <h2 class="h4 fw-bold mb-4 text-dark">Question Edit</h2>

    <form onsubmit={questionForm}>
        <!-- Type -->
        <div class="mb-3">
            <label for="qtype" class="form-label fw-semibold">Type</label>
            <input
                    id="qtype"
                    type="text"
                    bind:value={question.qtype}
                    class="form-control"
                    readonly
            />
        </div>

        <!-- Answer Policy -->
        {#if question.qtype === types[0]}
            <div class="mb-3">
                <label for="answer-policy" class="form-label fw-semibold">Answer Policy</label>
                <select
                        id="answer-policy"
                        bind:value={question.questionAnswerPolicy}
                        class="form-select"
                        required
                >
                    <option value="" disabled>select policy</option>
                    {#each policies as policy}
                        <option value={policy} selected={question.questionAnswerPolicy === policy}>
                            {getAnswerPolicyDisplayName(policy)}
                        </option>
                    {/each}
                </select>
            </div>
        {/if}

        <!-- Stem -->
        <div class="mb-3">
            <label for="stem" class="form-label fw-semibold">Stem</label>
            <input
                    id="stem"
                    type="text"
                    bind:value={question.stem}
                    class="form-control"
            />
        </div>

        <!-- Point -->
        <div class="mb-3">
            <label for="point" class="form-label fw-semibold">Point</label>
            <input
                    id="point"
                    type="number"
                    bind:value={question.pointsDefault}
                    class="form-control"
            />
        </div>

        <!-- MCO Options -->
        {#each questionOptions as questionOption, i}
            <div class="card border-1 shadow-sm mb-4">
                <div class="card-body">
                    <h5 class="card-title fw-bold mb-3">
                        MCO {questionOption.label || i + 1}
                    </h5>

                    <input type="hidden" bind:value={questionOption.id} />

                    <div class="mb-3">
                        <label for="label-{i}" class="form-label fw-semibold">Label</label>
                        <input
                                id="label-{i}"
                                bind:value={questionOption.label}
                                class="form-control"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="content-{i}" class="form-label fw-semibold">Content</label>
                        <input
                                id="content-{i}"
                                type="text"
                                bind:value={questionOption.content}
                                class="form-control"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="correct-{i}" class="form-label fw-semibold">Correct</label>
                        <select
                                id="correct-{i}"
                                bind:value={questionOption.correct}
                                class="form-select"
                        >
                            <option value="" disabled>select correct</option>
                            {#each booleans as boolean}
                                <option value={boolean} selected={questionOption.correct === boolean}>
                                    {getBooleanEnumDisplayName(boolean)}
                                </option>
                            {/each}
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="orderIndex-{i}" class="form-label fw-semibold">Order Index</label>
                        <input
                                id="orderIndex-{i}"
                                type="number"
                                bind:value={questionOption.orderIndex}
                                class="form-control"
                        />
                    </div>

                    {#if questionOptions.length > 2}
                        <div class="d-flex justify-content-end">
                            <button type="button"
                                    onclick={() => questionOptionRemove(questionOption.id)}
                                    class="btn btn-outline-danger btn-sm"
                            >
                                <i class="fas fa-trash-alt me-2"></i> Delete
                            </button>
                        </div>
                    {/if}
                </div>
            </div>
        {/each}

        <!-- Action Buttons -->
        <div class="d-flex justify-content-end gap-2 mt-3">
            <button type="submit" class="btn btn-outline-warning">
                <i class="bi bi-save me-1"></i> Save Changes
            </button>
            <a href="/question" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left me-1"></i> Back
            </a>
        </div>
    </form>
</div>
