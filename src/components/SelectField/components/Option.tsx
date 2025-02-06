import { Flex } from '@chakra-ui/react';
import { components } from 'react-select';

const Option = (props: any) => {
  return (
    <components.Option {...props}>
      <Flex alignItems={'center'} gap={'10px'} color={'white'}>
        {props?.data?.img && (
          <img
            src={props?.data?.img}
            alt={'-'}
            style={{ maxWidth: '20px', maxHeight: '20px', marginRight: '8px' }}
          />
        )}
        {props.label}
      </Flex>
    </components.Option>
  );
};

export default Option;
