import { Comment, Post } from '@/models/json-placeholder-api';
import BasePost from '../BasePost';
import { Stack } from 'react-bootstrap';

interface Props {
  postList: Post[];
  commentMap: Record<number, Comment[]>;
  markList: number[];
  onMark: (isMarked: boolean, postId: number) => void;
  loadingComments: number[];
  openPostCommentList: (postId: number) => void;
}

function PostList({
  postList,
  commentMap,
  loadingComments,
  openPostCommentList,
  markList,
  onMark,
}: Props) {
  return (
    <Stack as='ul' gap={1} className='list-inline'>
      {postList.map((post) => (
        <li key={post.id}>
          <BasePost
            post={post}
            commentList={commentMap[post.id]}
            onOpenCommentList={() => openPostCommentList(post.id)}
            isLoadingComments={
              loadingComments.includes(post.id) && !commentMap[post.id]
            }
            marked={markList.includes(post.id)}
            onMark={(isMarked) => onMark(isMarked, post.id)}
          />
        </li>
      ))}
    </Stack>
  );
}
export default PostList;
