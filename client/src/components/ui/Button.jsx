const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="m-1 rounded-md bg-slate-800 p-3 font-sans text-sm font-semibold text-slate-100 hover:bg-slate-900 dark:bg-slate-100 dark:text-slate-800 dark:hover:bg-slate-200"
    >
      {text}
    </button>
  );
};

export default Button;
