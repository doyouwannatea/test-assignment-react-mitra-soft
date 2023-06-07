import { User } from '@/models/json-placeholder-api';
import { Card } from 'react-bootstrap';

type Props = {
  user: User;
};

function UserCard({ user }: Props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {user.id}: {user.username}
        </Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>{user.email}</Card.Subtitle>
        <Card.Subtitle className='mb-2 text-muted'>{user.phone}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
