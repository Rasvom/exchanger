import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

interface additionalInfo {
  errorTitle?: string;
  errorDefaultDescription?: string;
  successTitle?: string;
  successDefaultDescription?: string;
  isShowSuccess: boolean;
  isShowError: boolean;
  successCb?: () => void;
  duration?: number;
}

interface info {
  isError: boolean;
  isSuccess?: boolean;
  error?: any;
}

/**
 * 
  useShowToastNotification(updateInfo, {
    isShowError: true,
    isShowSuccess: true,
    errorDefaultDescription: '',
    errorTitle: '',
    successDefaultDescription: '',
    successTitle: '',
  });
 */

const useShowToastNotification = (
  info: info,
  {
    errorTitle,
    errorDefaultDescription,
    successTitle,
    successDefaultDescription,
    isShowSuccess,
    isShowError,
    successCb,
    duration = 5000,
  }: additionalInfo,
) => {
  const toast = useToast();

  useEffect(() => {
    if (!isShowError) {
      return;
    }

    if (info.isError || info.error) {
      toast({
        title: errorTitle || '',
        description:
          (info.error as { data: { error: string } })?.data?.error || errorDefaultDescription || '',
        status: 'error',
        duration,
      });
    }
  }, [
    isShowError,
    info.isError,
    info.error,
    info,
    toast,
    errorTitle,
    errorDefaultDescription,
    duration,
  ]);

  useEffect(() => {
    if (!isShowSuccess) {
      return;
    }

    if (info.isSuccess) {
      successCb?.();
      toast({
        title: successTitle || '',
        description: successDefaultDescription || '',
        status: 'success',
        duration,
      });
    }
  }, [info.isSuccess, isShowSuccess]);

  return null;
};

export default useShowToastNotification;
