<script>
    import ExamQuestionModel from "$lib/models/ExamQuestionModel.js";
    import {examQuestionApi} from "$lib/api/ExamQuestionApi.js";
    import {alertError} from "$lib/alert.js";
    import {onMount} from "svelte";
    import QuestionModel from "$lib/models/QuestionModel.js";
    import ExamModel from "$lib/models/ExamModel.js";
    import {questionApi} from "$lib/api/QuestionApi.js";
    import {examApi} from "$lib/api/ExamApi.js";
    import {page} from "$app/state";
    import {goto} from "$app/navigation";

    const {id} = page.params;

    let examQuestions = $state({...new ExamQuestionModel()});
    let questions = $state({...new QuestionModel()});
    let exams = $state({...new ExamModel()});
    let errors = $state({});
    let selectedAnswer = $state(null);

    let totalQuestions = $state(1);
    let currentNumber = $state(1);

    async function examQuestionGet() {
        try {
            examQuestions = await examQuestionApi.get(id);
        } catch (err) {
            await alertError(err.message);
        }
    }

    async function examGet(examId) {
        try {
            exams = await examApi.get(examId);
            totalQuestions = exams.examQuestions?.length ?? 1;

        } catch (err) {
            await alertError(err.message);
        }
    }

    async function questionGet(questionId) {
        try {
            questions = await questionApi.get(questionId);
        } catch (err) {
            await alertError(err.message);
        }
    }

    function prevQuestion() {
        if (currentNumber > 1) {
            goto(`/exam-view/${exam.id}/q/${currentNumber - 1}`);
        }
    }

    function nextQuestion() {
        if (currentNumber < totalQuestions) {
            goto(`/exam-view/${exam.id}/q/${currentNumber + 1}`);
        }
    }

    async function submitExam() {
        await alertSuccess("Ujian selesai! Jawaban Anda telah disimpan.");
        goto("/exam/done");
    }

    onMount(async () => {
        await examQuestionGet();
        await examGet(examQuestions.examId);
        await questionGet(examQuestions.questionId);
        currentNumber = (examQuestions.orderIndex ?? 0) + 1;
    });
</script>
<svelte:head>
    <title>Exam List</title>
</svelte:head>
<div class="card shadow-sm border-1 p-4 mb-4">

    <!-- Header -->
    <div class="mb-4">
        <h3 class="fw-bold">{exams.name}</h3>
        <div class="text-muted">Soal {currentNumber} dari {totalQuestions}</div>
    </div>

    <!-- Card Soal (Google Form Style) -->
    <div class="p-4 bg-white shadow-sm rounded-3 border">

        <!-- Text Soal -->
        <p class="fs-5 fw-semibold mb-4">{questions.stem}</p>

        <!-- Pilihan (Google Form Style) -->
        <div class="d-flex flex-column gap-3">
            {#each questions.questionOptions as option}
                <label class="d-flex align-items-start gap-3">
                    <input
                            type="radio"
                            class="form-check-input mt-1"
                            name="answer"
                            value={option.content}
                            bind:group={selectedAnswer}
                            style="transform: scale(1.3);"
                    >
                    <span class="fs-6">{option.label}</span>
                </label>
            {/each}
        </div>

    </div>

    <!-- Navigation -->
    <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-outline-secondary" onclick={prevQuestion} disabled={currentNumber === 1}>
            Sebelumnya
        </button>

        {#if currentNumber < totalQuestions}
            <button class="btn btn-primary" onclick={nextQuestion}>
                Selanjutnya
            </button>
        {:else}
            <button class="btn btn-success" onclick={submitExam}>
                Kirim Ujian
            </button>
        {/if}
    </div>
</div>
