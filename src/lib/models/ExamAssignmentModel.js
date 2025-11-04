export default class ExamAssignmentModel {
    constructor({id = '', examId = '', examName = '', groupLabel = '', startAt = null, endAt = null, maxAttempts = 0, accessCode = '', audienceCode = ''} = {}) {
        this.id = id;
        this.examId = examId;
        this.examName = examName;
        this.groupLabel = groupLabel;
        this.startAt = startAt;
        this.endAt = endAt;
        this.maxAttempts = maxAttempts;
        this.accessCode = accessCode;
        this.audienceCode = audienceCode;
    }
}