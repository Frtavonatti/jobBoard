import { useState } from "react"
import { Link } from "react-router-dom"
import { signup } from "../services/user"
import FormInput from "../components/form/FormInput"
import FormSelect from "../components/form/FormSelect"

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('candidate')

  // TODO: Implement Error Handling Notifications
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      console.log(email, password, role);
      
      const data = await signup(email, password, role);
      console.log('SignUp successful:', data);
      return data;
    } catch (error) {
      console.error('SignUp failed:', error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Create an account
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignUp} className="space-y-6">
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
            </div>

            <FormSelect
              options={['candidate', 'company']}
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <button type="submit" className="btn btn-primary"> Register </button>
          </form>

          <p className="mt-10 text-center text-sm/6">
            Already have an account?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Log in
              </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUpPage