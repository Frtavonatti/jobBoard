import reactLogo from '../assets/react.svg'

const Header = ({ handleTheme }) => {
  return (
    <header className='flex just justify-between items-center'>
    <div className='flex justify-center items-center'>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <h2>Recruitalize</h2>
    </div>
    <button onClick={handleTheme}>Change</button>
  </header>
  )
}

export default Header