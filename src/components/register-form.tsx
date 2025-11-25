/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import { useActionState } from "react";
import { registerPatient } from "@/services/auth/registerPatient";

const RegisterForm = () => {
      const [state, formAction, isPending] = useActionState(registerPatient, null)

      
  const getFieldErrors = (fieldName: string) => {
    if (state?.errors) {
      const error = state.errors.find(
        (error: any) => error.field === fieldName
      );

      return error?.message;
    }
  };

      console.log(state);
  
  return (
    <>
      <form action={formAction}>
        <FieldGroup>
          <div className="flex gap-3 flex-col md:flex-row">
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input
                id="name"
                autoComplete="off"
                aria-invalid={!!getFieldErrors("name")}
                placeholder="John Doe"
                name="name"
              />
              {getFieldErrors("name") && (
                <FieldError>{getFieldErrors("name")}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                autoComplete="off"
                aria-invalid={!!getFieldErrors("address")}
                name="address"
                placeholder="username@example.com"
              />
              {getFieldErrors("address") && (
                <FieldError>{getFieldErrors("address")}</FieldError>
              )}
            </Field>
          </div>

          <div className="flex gap-3 flex-col md:flex-row">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                autoComplete="off"
                aria-invalid={!!getFieldErrors("email")}
                name="email"
                type="email"
                placeholder="username@example.com"
              />
              {getFieldErrors("email") && (
                <FieldError>{getFieldErrors("email")}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                type="password"
                id="password"
                autoComplete="off"
                placeholder="Enter your password"
                name="password"
                aria-invalid={!!getFieldErrors("password")}
              />
              {getFieldErrors("password") && (
                <FieldError>{getFieldErrors("password")}</FieldError>
              )}
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              type="password"
              id="confirmPassword"
              autoComplete="off"
              placeholder="Enter your password"
              name="confirmPassword"
              aria-invalid={!!getFieldErrors("confirmPassword")}
            />
            {getFieldErrors("confirmPassword") && (
              <FieldError>{getFieldErrors("confirmPassword")}</FieldError>
            )}
          </Field>

          <FieldGroup className="text-center">
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>
              <FieldDescription>
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </>
  );
};

export default RegisterForm;
