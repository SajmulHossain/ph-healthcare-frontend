/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { loginUser } from "./loginUser";

const registerPatientZodSchema = z
  .object({
    password: z
      .string()
      .min(6, { error: "Password must be atleast 6 characters" }),
    name: z.string().min(1, { error: "Name is required" }),
    email: z.email("Invalid email"),
    address: z.string().optional(),
    confirmPassword: z.string().min(6, { error: "Field is required" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    error: "Password not matched",
    path: ["confirmPassword", "password"],
  });

export const registerPatient = async (
  _currentState: any,
  formData: FormData
): Promise<any> => {
  try {
    const data = {
      password: formData.get("password"),
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validatedData = registerPatientZodSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        errors: validatedData.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const registerData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        email: formData.get("email"),
        address: formData.get("address"),
      },
    };

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(registerData));
    const res = await fetch(
      "http://localhost:5000/api/v1/user/create-patient",
      {
        method: "POST",
        body: newFormData,
      }
    );

    const result = await res.json();

    if (result?.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return { error: "Registration Failed", err: error };
  }
};
