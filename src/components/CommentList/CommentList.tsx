import { Comment } from '@/models/json-placeholder-api';
import BaseComment from '../BaseComment';

interface Props {
  commentList: Comment[];
}

function CommentList({ commentList }: Props) {
  return (
    <ul>
      {commentList.map((comment) => (
        <li key={comment.id}>
          <BaseComment comment={comment} />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
