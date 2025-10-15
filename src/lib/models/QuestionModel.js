export default class QuestionModel {
    constructor({id = '', qtype = '', questionAnswerPolicy = null, stem = '', pointsDefault = 1.0, questionOptions = []} = {}) {
        this.id = id;
        this.qtype = qtype;
        this.questionAnswerPolicy = questionAnswerPolicy;
        this.stem = stem;
        this.pointsDefault = pointsDefault;
        this.questionOptions = questionOptions;
    }
}