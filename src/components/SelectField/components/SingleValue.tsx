import { Flex } from '@chakra-ui/react';
import { components } from 'react-select';

const SingleValue = (props: any) => {
  return (
    <components.SingleValue {...props}>
      <Flex alignItems={'center'} gap={'10px'} color={'white'}>
        {props?.data?.img && (
          <img
            src={props?.data?.img}
            alt={'-'}
            style={{ maxWidth: '20px', maxHeight: '20px', marginRight: '8px' }}
          />
        )}
        {props.children}
      </Flex>
    </components.SingleValue>
  );
};

export default SingleValue;
