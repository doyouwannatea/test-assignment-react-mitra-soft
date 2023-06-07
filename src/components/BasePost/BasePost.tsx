import { Comment, Post } from '@/models/json-placeholder-api';
import { generateAboutUserPath } from '@/router/routeList';
import { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommentList from '../CommentList';

interface Props {
  post: Post;
  commentList: Comment[];
  isLoadingComments?: boolean;
  onOpenCommentList?: () => void;
  onCloseCommentList?: () => void;
}

function BasePost({
  post,
  commentList,
  onOpenCommentList,
  onCloseCommentList,
  isLoadingComments = false,
}: Props) {
  const [commentListOpened, setСommentListOpened] = useState(false);

  function openCommentList() {
    setСommentListOpened(true);
    if (onOpenCommentList) onOpenCommentList();
  }

  function closeCommentList() {
    setСommentListOpened(false);
    if (onCloseCommentList) onCloseCommentList();
  }

  return (
    <section>
      <Link to={generateAboutUserPath(String(post.userId))}>
        🙍‍♂️ - {post.userId}
      </Link>
      <p>{post.title}</p>
      <p>{post.body}</p>
      <Button onClick={commentListOpened ? closeCommentList : openCommentList}>
        {commentListOpened ? 'скрыть' : 'окрыть'} комментарии
      </Button>
      {isLoadingComments ? (
        <Spinner size='sm' />
      ) : (
        commentListOpened &&
        commentList && <CommentList commentList={commentList} />
      )}
    </section>
  );
}

export default BasePost;
