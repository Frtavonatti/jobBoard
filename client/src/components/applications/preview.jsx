const Preview = ({ application }) => {
  return (
    <>
      <div className="my-4 border p-4">
        <h3 className="text-xl font-semibold">
          {application.data.firstName} {application.data.lastName}
        </h3>
        <div>
          <span>{application.date.split("T")[0]} </span>
          <span>{application.status}</span>
        </div>

        <div>
          <p>{application.data.email}</p>
          <p>{application.data.phone}</p>
          <p>{application.data.locations}</p>
        </div>

        {application.answers.map((answer) => (
          <div key={answer.question_id} className="my-4">
            <h4 className="text-lg font-semibold">{answer.question}</h4>
            <p>{answer.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Preview;
