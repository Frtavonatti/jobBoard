import FormInput from "../components/form/FormInput"

const LoginPage = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div className="mt-2">
              <FormInput label="Email" name="email" type="email" autoComplete="email" required/>
            </div>

            <div className="mt-2">
              <FormInput label="Password" name="password" type="password" autoComplete="password" required/>
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