import { ReactNode, useEffect } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}
const PageTitle = ({ title, children }: Props) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = 'Exchanger';
    };
  }, [title, children]);

  return children;
};

export default PageTitle;
