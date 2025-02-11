import { useState } from "react"
import { login } from "../services/user"
import FormInput from "../components/form/FormInput"

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // TODO: Implement Error Handling Messages
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
      console.log('Login successful:', data);
      return data;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
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
              <div className="mt-2 mr-2">
                <a href="#" className="block text-right font-semibold text-sm text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Sign in</button>
          </form>

          <p className="mt-10 text-center text-sm/6">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage