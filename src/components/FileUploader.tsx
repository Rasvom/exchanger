import React, { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { AttachmentIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons';

interface Props {
  name: string;
  required?: boolean;
  label?: string;
}

const FileUploader: React.FC<Props> = ({ name, required = false, label }) => {
  const { control } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const toast = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, onChange: (files: FileList | null) => void) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];

      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Ошибка',
          description: 'Можно загружать только изображения',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Проверяем размер файла (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Ошибка',
          description: 'Размер файла не должен превышать 5MB',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setSelectedFile(file);
      onChange(files);
    }
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (files: FileList | null) => void,
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onChange(files);
    }
  };

  const handleRemoveFile = (onChange: (files: FileList | null) => void) => {
    setSelectedFile(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <FormControl isInvalid={!!control.getFieldState(name).error}>
      {label && <FormLabel color='white'>{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? 'Заполните это поле' : undefined,
        }}
        render={({ field, fieldState }) => (
          <>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              multiple={false}
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e, field.onChange)}
            />

            {!selectedFile ? (
              <Box
                border='2px dashed'
                borderColor={isDragging ? '#F0B90B' : '#474D57'}
                borderRadius='12px'
                p={6}
                textAlign='center'
                bg={isDragging ? 'rgba(240, 185, 11, 0.1)' : '#2a2a3e'}
                transition='all 0.2s ease'
                cursor='pointer'
                _hover={{ borderColor: '#F0B90B', bg: 'rgba(240, 185, 11, 0.05)' }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, field.onChange)}
                onClick={() => fileInputRef.current?.click()}
              >
                <VStack spacing={3}>
                  <Icon as={AttachmentIcon} boxSize={8} color='#F0B90B' />
                  <VStack spacing={1}>
                    <Text color='white' fontWeight='medium'>
                      Перетащите файл сюда или нажмите для выбора
                    </Text>
                    <Text color='gray.400' fontSize='sm'>
                      Поддерживаются: JPG, PNG, JPEG (макс. 5MB)
                    </Text>
                  </VStack>
                  <Button
                    size='sm'
                    bg='#F0B90B'
                    color='black'
                    _hover={{ bg: '#d9a30b' }}
                    leftIcon={<AttachmentIcon />}
                  >
                    Выбрать файл
                  </Button>
                </VStack>
              </Box>
            ) : (
              <Box
                border='2px solid'
                borderColor='#F0B90B'
                borderRadius='12px'
                p={4}
                bg='rgba(240, 185, 11, 0.1)'
              >
                <HStack justify='space-between' align='center'>
                  <HStack spacing={3} flex={1}>
                    <Icon as={CheckIcon} color='green.400' boxSize={5} />
                    <VStack align='start' spacing={0} flex={1}>
                      <Text color='white' fontWeight='medium' fontSize='sm' noOfLines={1}>
                        {selectedFile.name}
                      </Text>
                      <Text color='gray.400' fontSize='xs'>
                        {formatFileSize(selectedFile.size)}
                      </Text>
                    </VStack>
                  </HStack>
                  <Button
                    size='sm'
                    variant='ghost'
                    color='red.400'
                    _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                    onClick={() => handleRemoveFile(field.onChange)}
                  >
                    <DeleteIcon />
                  </Button>
                </HStack>
              </Box>
            )}

            <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
          </>
        )}
      />
    </FormControl>
  );
};

export default FileUploader;
