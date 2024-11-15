{{={= =}=}}
import { createTheme } from '@stitches/react'
import { UseFormReturn, RegisterOptions } from 'react-hook-form'
import type { LoginSignupFormFields } from './internal/common/LoginSignupForm'

// PRIVATE API
export enum State {
  Login = 'login',
  Signup = 'signup',
  {=# isEmailAuthEnabled =}
  ForgotPassword = 'forgot-password',
  ResetPassword = 'reset-password',
  VerifyEmail = 'verify-email',
  {=/ isEmailAuthEnabled =}
}

// PUBLIC API
export type CustomizationOptions = {
  logo?: string
  socialLayout?: 'horizontal' | 'vertical'
  appearance?: Parameters<typeof createTheme>[0]
  labels?: {
    login?: string
    signup?: string
    forgetPassword?: string
    resetPassword?: string
    verifyEmail?: string
    userName?: string
    password?: string;
    email?: string
    loginBtn?: string;
    signupBtn?: string
  }
}

// PRIVATE API
export type ErrorMessage = {
  title: string
  description?: string
}

// PRIVATE API
export type FormState = {
  isLoading: boolean
}

// PRIVATE API
export type AdditionalSignupFieldRenderFn = (
  hookForm: UseFormReturn<LoginSignupFormFields>,
  formState: FormState
) => React.ReactNode

// PRIVATE API
export type AdditionalSignupField = {
  name: string
  label: string
  type: 'input' | 'textarea'
  validations?: RegisterOptions<LoginSignupFormFields>
}

// PRIVATE API
export type AdditionalSignupFields =
  | (AdditionalSignupField | AdditionalSignupFieldRenderFn)[]
  | AdditionalSignupFieldRenderFn
