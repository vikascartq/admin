export type topicQuestionsDetails = {
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    answer: string
}

export interface TopicInitVal {
    id?: string;
    category: string;
    subCategory: string;
    topicName: string;
    theory: string;
    topicQuestions: topicQuestionsDetails[];
}

export interface AddQuestionIniValI {
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    answer: string
}