export default class ExamModel {
    constructor({id = '', name = '', instructions = '', durationMinutes = 0, randomizeQuestions = null, randomizeOptions = null, status = null, startAt = null, endAt = null, examAssignments = []} = {}) {
        this.id = id;
        this.name = name;
        this.instructions = instructions;
        this.durationMinutes = durationMinutes;
        this.randomizeQuestions = randomizeQuestions;
        this.randomizeOptions = randomizeOptions;
        this.status = status;
        this.startAt = startAt ? new Date(startAt) : null;
        this.endAt = endAt ? new Date(endAt) : null;
        this.examAssignments = examAssignments;
    }
}