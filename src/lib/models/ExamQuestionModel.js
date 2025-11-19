export default class ExamQuestionModel {
    constructor({id = '', examId = '', examName = '', questionId = '', questionStem = '', points = 0.0, orderIndex = 0, required = null, attemptAnswer = []} = {}) {
        this.id = id;
        this.examId = examId;
        this.examName = examName;
        this.questionId = questionId;
        this.questionStem = questionStem;
        this.points = points;
        this.orderIndex = orderIndex;
        this.required = required;
        this.attemptAnswer = attemptAnswer;
    }
}