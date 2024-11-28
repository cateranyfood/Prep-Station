'use client';
import React from 'react';
import TextField from '@mui/material/TextField';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#f44336',
    },
  },
});


interface CustomTextFieldProps {
  id: string;
  label: string;
  type?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  error?: FieldError; // React Hook Form error object
  helperText?: string; // Optional additional helper text
  register: UseFormRegisterReturn; // Provided by react-hook-form's `register`
  sx?: object; // Optional Material-UI `sx` styles
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  label,
  type = 'text',
  variant = 'standard',
  multiline = false,
  rows,
  fullWidth = true,
  error,
  helperText = '',
  register,
  sx,
}) => {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      variant={variant}
      multiline={multiline}
      rows={rows}
      fullWidth={fullWidth}
      error={!!error}
      helperText={error?.message || helperText} // Show error message or helper text
      {...register}
      color='primary'
    />
  );
};

export default CustomTextField;