import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

interface Props {
  name: string;
  required?: boolean;
  label?: string;
}

const FileUploader: React.FC<Props> = ({ name, required = false, label }) => {
  const { control } = useFormContext();

  return (
    <FormControl isInvalid={!!control.getFieldState(name).error}>
      {label && <FormLabel>{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? 'Заполните это поле' : undefined,
        }}
        render={({ field, fieldState }) => (
          <>
            <Input
              type='file'
              onChange={(e) => {
                field.onChange(e.target.files);
              }}
              accept='image/*'
              multiple={false}
            />
            <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
          </>
        )}
      />
    </FormControl>
  );
};

export default FileUploader;
