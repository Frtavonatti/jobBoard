import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { logout } from "../../services/users";
import ToggleThemeIcon from "../ui/ToggleThemeIcon";
import reactLogo from "../../assets/react.svg";

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
            <ChevronDown />
          </summary>
          <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
            <li>
              {user.role === "company" ? (
                <Link to="/myjobs">My Jobs</Link>
              ) : (
                <Link to={`/myapplications/${user.profile.id}`}>
                  My Applications
                </Link>
              )}
            </li>
            <li>
              <button onClick={logout}>Sign Out</button>
            </li>
          </ul>
        </details>
      </div>
    </header>
  );
};

export default Header;
