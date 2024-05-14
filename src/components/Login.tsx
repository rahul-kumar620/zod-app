import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, "user name is required"),
  email: z
    .string()
    .email("Email format is not valid")
    .min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

interface FormData {
  username: string;
  email: string;
  password: string;
}

const MyForm: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const onSubmit = (data: FormData) => {
    console.log("hi", data);
  };

  return (
    <>
      <div className="w-full max-w-xs mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-left"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              {...register("username")}
              type="text"
              placeholder="Username"
              name="username"
            />
            <p className="text-red-500 text-left">{errors.username?.message}</p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-left"
              htmlFor="email"
            >
              E mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              {...register("email")}
              type="email"
              placeholder="Email"
              name="email"
            />

            <p className="text-red-500 text-left">{errors.email?.message}</p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-left"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "password is required",
                },
              })}
              placeholder="******************"
              name="password"
            />
            <p className="text-red-500 text-left">{errors.password?.message}</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyForm;
