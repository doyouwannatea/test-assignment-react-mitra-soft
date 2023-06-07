import { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';
import AppHeader from '../AppHeader';

function BasePageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppHeader />
      <Container className='mt-2'>{children}</Container>
    </>
  );
}

export default BasePageLayout;
