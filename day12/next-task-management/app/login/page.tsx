"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { login } from "@/app/lib/api"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/lib/auth-context"
import { useState } from "react"

interface IFormInput {
  username: string
  password: string
}

const validationSchema: yup.ObjectSchema<IFormInput> = yup.object({
  username: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),
})

export default function LoginPage() {
  const { setUser } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      username: "tungnt@softech.vn",
      password: "123456789",
    },
  })

  const onSubmit = async (data: IFormInput): Promise<void> => {
    try {
      setError("")
      console.log("Attempting login with:", { username: data.username })

      const user = await login(data.username, data.password)
      console.log("Login successful, user:", user)

      if (!user) {
        throw new Error("Login returned null user")
      }

      setUser(user)

      setTimeout(() => {
        router.push("/tasks")
      }, 100)
    } catch (error) {
      console.error("Login error:", error)
      setError(`Login failed: ${error instanceof Error ? error.message : "Please try again."}`)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to access the task management system</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>}

          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                errors.username
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : !errors.username && dirtyFields.username
                    ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : !errors.password && dirtyFields.password
                    ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              isSubmitting || !isValid
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="text-center">
            <p className={`text-sm ${isValid ? "text-green-500" : "text-red-500"}`}>
              {isValid ? "Form is valid ✓" : "Please fill in all required fields correctly"}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}