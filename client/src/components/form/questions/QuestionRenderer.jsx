import TextQuestion from './TextQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import CheckboxQuestion from './CheckboxQuestion';

const QuestionRenderer = ({ question, value, onChange }) => {
  const getDefaultValue = () => {
    if (question.questionType === 'multipleChoice') return '';
    if (question.questionType === 'boolean') return [];
    return '';
  };

  const questionValue = value || getDefaultValue();

  switch (question.questionType) {
    case 'text':
      return (
        <TextQuestion
          question={question}
          value={questionValue}
          onChange={onChange}
          required={question.required}
        />
      );
    case 'multipleChoice':
      return (
        <MultipleChoiceQuestion
          question={question}
          value={questionValue}
          onChange={onChange}
          required={question.required}
        />
      );
    case 'boolean':
      return (
        <CheckboxQuestion
          question={question}
          value={questionValue}
          onChange={onChange}
          required={question.required}
        />
      );
    default:
      return <p>Unsupported question type</p>;
  }
};

export default QuestionRenderer;