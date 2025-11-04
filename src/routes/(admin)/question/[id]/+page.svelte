<script>
    import {page} from "$app/state";
    import {onMount} from "svelte";
    import {questionGet} from "$lib/api/QuestionApi.js";
    import {alertError} from "$lib/alert.js";
    import QuestionModel from "$lib/models/QuestionModel.js";
    import {getBooleanEnumDisplayName} from "$lib/utils/boolean.js";

    const {id} = page.params;
    let question = $state({...new QuestionModel()});

    async function questionDetail() {
        try {
            question = await questionGet(id);
        } catch (err) {
            await alertError(err.message);
        }
    }

    onMount(async () => {
        await questionDetail();
    });
</script>
<svelte:head>
    <title>Question Details</title>
</svelte:head>
<div class="card shadow-sm border-1 p-4 mb-4">
    <h2 class="h4 fw-bold mb-4 text-dark">Question Details</h2>
    <form>
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

        {#if question.qtype === 'MCO'}
            <div class="mb-3">
                <label for="answer-policy" class="form-label fw-semibold">Answer Policy</label>
                <input
                        id="answer-policy"
                        type="text"
                        bind:value={question.questionAnswerPolicy}
                        class="form-control"
                        readonly
                />
            </div>
        {/if}

        <div class="mb-3">
            <label for="stem" class="form-label fw-semibold">Stem</label>
            <input
                    id="stem"
                    type="text"
                    bind:value={question.stem}
                    class="form-control"
                    readonly
            />
        </div>

        <div class="mb-3">
            <label for="point" class="form-label fw-semibold">Point</label>
            <input
                    id="point"
                    type="number"
                    bind:value={question.pointsDefault}
                    class="form-control"
                    readonly
            />
        </div>
        {#each question.questionOptions as questionOption, i}
            <div class="card border-1 shadow-sm mb-4">
                <div class="card-body">
                    <h5 class="card-title fw-bold mb-3">
                        MCO {questionOption.label || i + 1}
                    </h5>

                    <div class="mb-3">
                        <label for="label-{i}" class="form-label fw-semibold">Label</label>
                        <input
                                id="label-{i}"
                                bind:value={questionOption.label}
                                class="form-control"
                                readonly
                        />
                    </div>

                    <div class="mb-3">
                        <label for="content-{i}" class="form-label fw-semibold">Content</label>
                        <input
                                id="content-{i}"
                                type="text"
                                bind:value={questionOption.content}
                                class="form-control"
                                readonly
                        />
                    </div>

                    <div class="mb-3">
                        <label for="correct-{i}" class="form-label fw-semibold">Correct</label>
                        <input
                                id="correct-{i}"
                                value={getBooleanEnumDisplayName(questionOption.correct)}
                                class="form-control"
                                readonly
                        />
                    </div>

                    <div class="mb-3">
                        <label for="orderIndex-{i}" class="form-label fw-semibold">Order Index</label>
                        <input
                                id="orderIndex-{i}"
                                type="number"
                                bind:value={questionOption.orderIndex}
                                class="form-control"
                                readonly
                        />
                    </div>
                </div>
            </div>
        {/each}

        <div class="d-flex justify-content-end mt-3">
            <a class="btn btn-outline-secondary" href="/question">
                <i class="bi bi-arrow-left me-1"></i>Back
            </a>
        </div>
    </form>
</div>
