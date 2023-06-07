import { Comment } from '@/models/json-placeholder-api';

interface Props {
  comment: Comment;
}

function BaseComment({ comment }: Props) {
  return (
    <small>
      <strong>{comment.email}</strong> • {comment.body}
    </small>
  );
}

export default BaseComment;
