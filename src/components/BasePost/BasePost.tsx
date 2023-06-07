import { Comment, Post } from '@/models/json-placeholder-api';
import { generateAboutUserPath } from '@/router/routeList';
import { useState } from 'react';
import { classNamesFunc } from 'classnames-generics';
import { Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommentList from '../CommentList';

import styles from './BasePost.module.scss';

const classNames = classNamesFunc<keyof typeof styles>();

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
    if (isLoadingComments) return;
    setСommentListOpened(true);
    if (onOpenCommentList) onOpenCommentList();
  }

  function closeCommentList() {
    setСommentListOpened(false);
    if (onCloseCommentList) onCloseCommentList();
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Link
            className={classNames(styles.link)}
            to={generateAboutUserPath(String(post.userId))}
          >
            🙍‍♂️ {post.title}
          </Link>
        </Card.Title>
        <Card.Text>{post.body}</Card.Text>
        <Button
          disabled={isLoadingComments}
          variant='link'
          onClick={commentListOpened ? closeCommentList : openCommentList}
        >
          {isLoadingComments ? (
            <Spinner size='sm' />
          ) : commentListOpened ? (
            'скрыть комментарии'
          ) : (
            'окрыть комментарии'
          )}{' '}
        </Button>
        {!isLoadingComments && commentListOpened && commentList && (
          <CommentList commentList={commentList} />
        )}
      </Card.Body>
    </Card>
  );
}

export default BasePost;
