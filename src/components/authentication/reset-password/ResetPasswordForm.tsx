import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utils
import { emailError } from '../../../utils/helpError';

// ----------------------------------------------------------------------

type InitialValues = {
  email: string;
  afterSubmit?: string;
};

type ResetPasswordFormProps = {
  onSent: VoidFunction;
  onGetEmail: (value: string) => void;
};

export default function ResetPasswordForm({
  onSent,
  onGetEmail
}: ResetPasswordFormProps) {
  const { resetPassword } = useAuth();
  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: 'demo@minimals.cc'
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await resetPassword(values.email);
        if (isMountedRef.current) {
          onSent();
          onGetEmail(formik.values.email);
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          {...getFieldProps('email')}
          type="email"
          label="E-posta Adresi"
          error={
            Boolean(touched.email && errors.email) ||
            emailError(errors.afterSubmit || '').error
          }
          helperText={
            (touched.email && errors.email) ||
            emailError(errors.afterSubmit || '').helperText
          }
          sx={{ mb: 3 }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          pending={isSubmitting}
        >
          Parolayı Sıfırla
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
