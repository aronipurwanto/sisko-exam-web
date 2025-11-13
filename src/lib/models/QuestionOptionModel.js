export default class QuestionOptionModel {
    constructor({id = '', questionId = '', questionStem = '', label = '', content = '', correct = '', orderIndex = 0} = {}) {
        this.id = id;
        this.questionId = questionId;
        this.questionStem = questionStem;
        this.label = label;
        this.content = content;
        this.correct = correct;
        this.orderIndex = orderIndex;
    }
}