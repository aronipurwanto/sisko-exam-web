<script>
    import {onMount} from "svelte";
    import {alertError} from "$lib/alert.js";
    import {examQuestionApi} from "$lib/api/ExamQuestionApi.js";

    let examQuestions = $state([]);

    async function examQuestionList() {
        try {
            examQuestions = await examQuestionApi.getAll();
        } catch (err) {
            await alertError(err.message);
        }
    }

    onMount(async () => {
        await examQuestionList();
    });

</script>
<svelte:head>
    <title>Exam Question List</title>
</svelte:head>
<div class="card shadow-sm border-1 p-4 mb-4">
    <div class="d-flex justify-content-between align-items-center">
        <h3 class="tile-title">
            <i class="bi bi-table me-1"></i>Table Exam-Question
        </h3>
    </div>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
            <tr>
                <th class="px-6 py-3 text-left">#</th>
                <th class="px-6 py-3 text-left">Exam Name</th>
                <th class="px-6 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each examQuestions as examQuestion, index}
                <tr>
                    <th class="text-center">{index+1}</th>
                    <th class="text-center">{examQuestion.examName}</th>
                    <td class="text-center">
                        <a class="btn btn-outline-warning py-0 px-1 ms-1 me-1"
                           href="/user/exam-user/{examQuestion.id}">
                            <i class="bi bi-pencil me-1"></i>Start-Exam
                        </a>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>