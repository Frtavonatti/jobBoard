const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick} 
      className="p-3 m-1 text-sm rounded-md font-sans font-semibold 
      bg-slate-800 text-slate-100 hover:bg-slate-900 
      dark:bg-slate-100 dark:text-slate-800 dark:hover:bg-slate-200
      ">
      { text }
    </button>
  )
}

export default Button
