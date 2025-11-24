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
                placeholder="John Doe"
                name="name"
                required
              />
              <FieldDescription>
                This appears on invoices and emails.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                autoComplete="off"
                aria-invalid
                name="address"
                placeholder="username@example.com"
                required
              />
              <FieldError>Choose another username.</FieldError>
            </Field>
          </div>

          <div className="flex gap-3 flex-col md:flex-row">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                autoComplete="off"
                aria-invalid
                name="email"
                type="email"
                placeholder="username@example.com"
                required
              />
              <FieldError>Choose another username.</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                type="password"
                id="password"
                autoComplete="off"
                placeholder="Enter your password"
                name="password"
                required
              />
              <FieldDescription>
                This appears on invoices and emails.
              </FieldDescription>
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
              required
            />
            <FieldDescription>
              This appears on invoices and emails.
            </FieldDescription>
          </Field>

          <FieldGroup>
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>
              <FieldDescription>
                Already have an account?
                <Link href="/login">Login</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </>
  );
};

export default RegisterForm;
