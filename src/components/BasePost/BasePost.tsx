import { Comment, Post } from '@/models/json-placeholder-api';
import { generateAboutUserPath } from '@/router/routeList';
import { useState } from 'react';
import { classNamesFunc } from 'classnames-generics';
import { Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommentList from '../CommentList';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { noop } from '@/utils/shared';

import styles from './BasePost.module.scss';

const classNames = classNamesFunc<keyof typeof styles>();

interface Props {
  post: Post;
  commentList: Comment[];
  isLoadingComments?: boolean;
  marked?: boolean;
  onMark?: (isMarked: boolean) => void;
  onOpenCommentList?: () => void;
  onCloseCommentList?: () => void;
}

function BasePost({
  post,
  commentList,
  marked = false,
  onMark = noop,
  onOpenCommentList = noop,
  onCloseCommentList = noop,
  isLoadingComments = false,
}: Props) {
  const [commentListOpened, setСommentListOpened] = useState(false);

  function openCommentList() {
    if (isLoadingComments) return;
    setСommentListOpened(true);
    onOpenCommentList();
  }

  function closeCommentList() {
    setСommentListOpened(false);
    onCloseCommentList();
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
          )}
        </Button>
        {!isLoadingComments && commentListOpened && commentList && (
          <CommentList commentList={commentList} />
        )}
        <Button variant='link' onClick={() => onMark(!marked)}>
          {marked ? <AiFillLike /> : <AiOutlineLike />}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BasePost;
