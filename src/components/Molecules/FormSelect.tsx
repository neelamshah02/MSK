import React from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import { Select } from '@sdir/sds';
import styled from 'styled-components';

interface OptionGroup {
  [key: string]: { value: string; name: string }[];
}
interface FormSelectProps extends FieldProps {
  field: any;
  options?: { value: string; name: string }[];
  OptionsGroup?: OptionGroup;
  disabled: boolean;
  defaultVal: string;
  className: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  options,
  field,
  className,
  disabled,
  defaultVal,
  form
}) => {
  const val = options?.find(option => option.value === field.value);
  return (
    <DivStyled className={className}>
      <Select
        {...field}
        isDisabled={disabled}
        id={field.name}
        options={options}
        defaultVal={defaultVal}
        invalid={!!(form.errors[field.name] && form.touched[field.name]) && !disabled}
        value={(val?.name ?? defaultVal) as any}
        handleChange={(option: any) => {
          form.setFieldValue(field.name, option);
        }}
      />
      <ErrorMessageStyled>
        {!disabled && <ErrorMessage name={field.name} component="span" />}
      </ErrorMessageStyled>
    </DivStyled>
  );
};

const ErrorMessageStyled = styled.div`
  color: ${({ theme }) => theme.colors.error};
`;

const DivStyled = styled.div``;

export default FormSelect;
