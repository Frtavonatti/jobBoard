import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../services/users";
import FormInput from "../../components/form/FormInput";
import FormSelect from "../../components/form/FormSelect";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [profileData, setProfileData] = useState({
    // Company fields
    name: "",
    industry: "",
    // Candidates fields
    first_name: "",
    last_name: ""
  });

  // TODO: Implement Error Handling Notifications
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const data = await signup(email, password, role, profileData);
      return data;
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  }

  return (
    <div className="mt-28 min-h-full rounded-lg border border-solid border-white px-6 py-12 md:mx-28 lg:px-8">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Create an account
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignUp} className="space-y-6">
            <FormSelect
              options={["candidate", "company"]}
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

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

            {role === "company" ? (
            <>
              <FormInput 
                label="Company Name"
                name="name"
                type="text"
                autoComplete="organization"
                required
                value={profileData.name}
                onChange={handleProfileChange}
              />

              <FormInput
                label="Industry"
                name="industry"
                type="text"
                autoComplete="organization-title"
                required
                value={profileData.industry}
                onChange={handleProfileChange}
              />
            </>
          ) 
          : (
            <>
              <FormInput
                label="First Name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                required
                value={profileData.first_name}
                onChange={handleProfileChange}
              />

              <FormInput
                label="Last Name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                required
                value={profileData.last_name}
                onChange={handleProfileChange}
              /> 
            </>
          )}


            <button type="submit" className="btn btn-primary">
              {" "}
              Register{" "}
            </button>
          </form>

          <p className="mt-10 text-center text-sm/6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
