<script>
import AppTitle from "$lib/components/AppTitle.svelte";
import {onMount} from "svelte";
import {questionDelete, questionGetList} from "$lib/api/QuestionApi.js";
import {alertError, alertSuccess} from "$lib/alert.js";

let questions = $state([]);

async function questionList() {
    try {
        questions = await questionGetList();
    } catch (err) {
        await alertError(err.message);
    }
}

async function questionRemove(id) {
    if (!await alertConfirm('are you sure want to delete this question?')) return;

    try {
        await questionDelete(id);
        await alertSuccess();
        await questionList();
    } catch (err) {
        await alertError(err.message);
    }
}

onMount(async () => {
    await questionList();
});
</script>
<svelte:head>
    <title>question</title>
</svelte:head>
<AppTitle
        title="Question"
        desc="This page is bank question"
        iconTitle="bi bi-table"
/>
<div class="clearfix">
    <div class="tile">
        <h3 class="tile-title">Table Hover</h3>
        <table class="table table-hover">
            <thead>
            <tr>
                <th class="px-6 py-3 text-left">#</th>
                <th class="px-6 py-3 text-left">ID</th>
                <th class="px-6 py-3 text-left">Type</th>
                <th class="px-6 py-3 text-left">Answer Policy</th>
                <th class="px-6 py-3 text-left">Stem</th>
                <th class="px-6 py-3 text-left">Point Default</th>
                <th class="px-6 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each questions as question, index}
                <tr>
                    <th>{index+1}</th>
                    <td>{question.id}</td>
                    <td>{question.qtype}</td>
                    <td>{question.questionAnswerPolicy}</td>
                    <td>{question.stem}</td>
                    <td>{question.pointsDefault}</td>
                    <td>#</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>