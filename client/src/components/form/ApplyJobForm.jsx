import FormInput from "./inputs/FormInput";
import QuestionRenderer from "./questions/QuestionRenderer";

const ApplyJobForm = ({
  formData,
  questions = [],
  answers = {},
  handleQuestionChange,
  handleChange,
}) => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <FormInput
          value={formData.firstName}
          name="firstName"
          label="First Name"
          type="text"
          onChange={handleChange}
          disabled={formData.firstName !== undefined}
          required
        />

        <FormInput
          value={formData.lastName}
          name="lastName"
          label="Last Name"
          type="text"
          onChange={handleChange}
          disabled={formData.lastName !== undefined}
          required
        />
        <FormInput
          value={formData.email}
          name="email"
          label="Email"
          type="email"
          onChange={handleChange}
          disabled={formData.email !== undefined}
          required
        />

        <FormInput
          value={formData.phone}
          name="phone"
          label="Phone"
          type="tel"
          onChange={handleChange}
          // required
        />
      </div>

      <FormInput
        value={formData.location}
        name="location"
        label="Location"
        type="text"
        onChange={handleChange}
        // required
      />

      <FormInput
        value={formData.portfolio}
        name="portfolio"
        label="Portfolio"
        type="url"
        onChange={handleChange}
        // required
      />

      <FormInput
        value={formData.resume}
        name="resume"
        label="Resume"
        type="file"
        onChange={handleChange}
        // required
      />

      <section>
        <h3 className="text-xl font-bold">Questions</h3>
        {questions.map((question, index) => (
          <QuestionRenderer
            key={index}
            question={question}
            value={answers[question._id]}
            onChange={handleQuestionChange}
          />
        ))}
      </section>
    </div>
  );
};

export default ApplyJobForm;
