import { Card, CardBody, CardHeader, Heading, Stack } from '@chakra-ui/react';
import '../styles/customScrollbar.scss';
interface Props {
  children: React.ReactNode;
  title: string;
}
const OptionPanel = ({ children, title }: Props) => {
  return (
    <Card
      minW={'sm'}
      maxW={'lg'}
      minH={'lg'}
      maxH={'lg'}
      bgColor={'#232334'}
      boxShadow={'0 2px 24px rgba(24,32,82,.05)'}
      borderRadius={'16px'}
      color={'white'}
    >
      <CardHeader>
        <Heading size='lg'>{title}</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing='4' maxH={'400px'} overflowY={'auto'} className='custom-scrollbar'>
          {children}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default OptionPanel;
