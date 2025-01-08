import ToggleThemeIcon from './ui/ToggleThemeIcon'
import reactLogo from '../assets/react.svg'

const Header = ({ handleTheme }) => {
  return (
    <header className='flex just justify-between items-center'>
      <div className='flex justify-center items-center'>
        <img src={reactLogo} className="logo react" alt="React logo" />
        <span className='text-2xl ml-2'>Recruitalize</span>
      </div>

      <div className='flex justify-center items-center'>
        <ToggleThemeIcon handleTheme={handleTheme} />
        <details className="dropdown">
          <summary className="btn ml-4">
            Test@test.com
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><a>My Jobposts</a></li>
            <li><a>Logout</a></li>
          </ul>
        </details>
      </div>
    </header>
  )
}

export default Header