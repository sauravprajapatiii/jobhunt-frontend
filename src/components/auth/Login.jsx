<div className="flex justify-center items-center min-h-screen px-4 sm:px-6">
  <form
    onSubmit={handleSubmit}
    className="w-full sm:w-3/4 lg:w-1/2 border border-gray-200 rounded-md p-4 sm:p-6 shadow-sm"
  >
    <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

    {/* Email */}
    <div className="mb-3">
      <label className="block text-sm font-medium">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="w-full border p-2 rounded disabled:bg-gray-100"
        required
        value={input.email}
        onChange={handleChange}
        disabled={loading}
      />
    </div>

    {/* Password */}
    <div className="mb-3">
      <label className="block text-sm font-medium">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        className="w-full border p-2 rounded disabled:bg-gray-100"
        required
        value={input.password}
        onChange={handleChange}
        disabled={loading}
      />
    </div>

    {/* Role */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mt-4">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="role"
          value="recruiter"
          onChange={handleChange}
          checked={input.role === "recruiter"}
          disabled={loading}
        />
        Recruiter
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="role"
          value="student"
          onChange={handleChange}
          checked={input.role === "student"}
          disabled={loading}
        />
        Student
      </label>
    </div>

    {/* Button */}
    <button
      disabled={loading}
      className="w-full bg-[#F83002] hover:bg-red-600 transition text-white py-2 mt-7 rounded-md font-medium flex items-center justify-center gap-2 disabled:opacity-70"
    >
      {loading && <Loader2 className="h-5 w-5 animate-spin" />}
      {loading ? "Please wait..." : "Login"}
    </button>

    {/* Register */}
    <div className="mt-3 text-sm text-center">
      Don&apos;t have an account?{" "}
      <Link to="/register" className="text-blue-600 hover:underline">
        Register
      </Link>
    </div>
  </form>
</div>;
