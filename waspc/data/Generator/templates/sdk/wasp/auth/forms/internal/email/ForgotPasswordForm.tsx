import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { requestPasswordReset } from '../../../email/actions/passwordReset.js'
import { Form, FormItemGroup, FormLabel, FormInput, SubmitButton, FormError } from '../Form'
import { AuthContext } from '../../Auth'

// PRIVATE API
export const ForgotPasswordForm = ({
  labels = {}
}: {
  labels: Record<string, string>
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ email: string }>()
  const { isLoading, setErrorMessage, setSuccessMessage, setIsLoading } = useContext(AuthContext)

  const onSubmit = async (data) => {
    setIsLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)
    try {
      await requestPasswordReset(data)
      reset()
      setSuccessMessage('Check your email for a password reset link.')
    } catch (error) {
      setErrorMessage({
        title: error.message,
        description: error.data?.data?.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const { email } = labels;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItemGroup>
          <FormLabel>{email}</FormLabel>
          <FormInput
            {...register('email', {
              required: 'Email is required',
            })}
            type="email"
            disabled={isLoading}
          />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </FormItemGroup>
        <FormItemGroup>
          <SubmitButton type="submit" disabled={isLoading}>
            Send password reset email
          </SubmitButton>
        </FormItemGroup>
      </Form>
    </>
  )
}
