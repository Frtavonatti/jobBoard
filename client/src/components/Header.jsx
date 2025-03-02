import { Link } from "react-router-dom";
import { logout } from "../services/user";
import ToggleThemeIcon from "./ui/ToggleThemeIcon";
import reactLogo from "../assets/react.svg";

const Header = ({ handleTheme, user }) => {
  return (
    <header className="flex items-center justify-between p-2">
      <div className="flex items-center justify-center">
        <img src={reactLogo} className="ml-2" alt="React logo" />
        <Link to="/" className="logo">
          <span className="ml-2 text-2xl font-bold">Recruitalize</span>
        </Link>
      </div>

      <div className="flex items-center justify-center">
        <ToggleThemeIcon handleTheme={handleTheme} />
        <details className="dropdown">
          <summary className="btn ml-4">
            {user.email}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 inline-block h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </summary>
          <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
            <li>
              <Link to="/myjobs">My Jobposts</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </details>
      </div>
    </header>
  );
};

export default Header;
