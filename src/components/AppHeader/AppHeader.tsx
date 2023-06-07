import { generatePostListPath, generateAboutMePath } from '@/router/routeList';
import { Stack, Image, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import myPhoto from '@assets/ya.jpeg';
import { classNamesFunc } from 'classnames-generics';
import styles from './AppHeader.module.scss';

const classNames = classNamesFunc<keyof typeof styles>();

function AppHeader() {
  return (
    <Navbar bg='light' expand={false} collapseOnSelect>
      <Container>
        <Stack gap={3} direction='horizontal'>
          <Image className={classNames(styles.image)} src={myPhoto} rounded />
          <Stack>
            <Navbar.Brand>Булгатов Александр</Navbar.Brand>
            <a href='mailto:alexandr.bulgatov13@gmail.com'>
              alexandr.bulgatov13@gmail.com
            </a>
          </Stack>
        </Stack>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={Link} eventKey={1} to={generatePostListPath()}>
              Список постов
            </Nav.Link>
            <Nav.Link as={Link} eventKey={2} to={generateAboutMePath()}>
              Обо мне
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
