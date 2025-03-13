import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/users";
import FormInput from "../../components/form/FormInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO: Implement Error Handling Messages
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
      // console.log('Login successful:', data);
      return data;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="mt-28 min-h-full rounded-lg border border-solid border-white px-6 py-12 md:mx-28 lg:px-8">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Sign in to your account
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="mt-2">
              <FormInput
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <FormInput
                label="Password"
                name="password"
                type="password"
                autoComplete="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mr-2 mt-2">
                <a
                  href="#"
                  className="block text-right text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>

          <p className="mt-10 text-center text-sm/6">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
