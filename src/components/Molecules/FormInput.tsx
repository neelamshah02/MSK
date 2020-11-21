import React from 'react';
import { ErrorMessage, FieldProps } from 'formik';
import styled from 'styled-components';
import { Input } from '@sdir/sds';

interface FormInputProps extends FieldProps {
  field: any;
  label: string;
  type: any;
  hidenumberstyling?: number;
  tab: number;
  disabled: boolean;
  className?: string;
  value?: string | number | Date | undefined;
  onChangeCallback?: Function;
  onBlurField?: Function;
}

const FormInput: React.FC<FormInputProps> = ({
  field,
  label,
  type,
  tab,
  disabled,
  className = '',
  onChangeCallback,
  form,
  onBlurField
}) => {
  return (
    <div className={className}>
      <Input
        {...field}
        disabled={disabled}
        id={field.name}
        tabIndex={tab}
        type={type}
        name={field.name}
        invalid={!!(form.errors[field.name] && form.touched[field.name] && !disabled)}
        value={field.value}
        aria-label={label}
        label={label}
        onChange={(val: any) => {
          form.setFieldValue(field.name, val.target.value);
          return onChangeCallback?.(val);
        }}
        onBlur={e => {
          field.onBlur(e);
          return onBlurField?.();
        }}
      />
      <ErrorMessageStyled>
        {!disabled && <ErrorMessage name={field.name} component="span" />}
      </ErrorMessageStyled>
    </div>
  );
};

const ErrorMessageStyled = styled.div`
  color: ${({ theme }) => theme.colors.error};
`;

export default FormInput;
