import { Comment, Post } from '@/models/json-placeholder-api';
import BasePost from '../BasePost';

interface Props {
  postList: Post[];
  commentMap: Record<number, Comment[]>;
  loadingComments: number[];
  openPostCommentList: (postId: number) => void;
}

function PostList({
  postList,
  commentMap,
  loadingComments,
  openPostCommentList,
}: Props) {
  return (
    <ul>
      {postList.map((post) => (
        <li key={post.id}>
          <BasePost
            post={post}
            commentList={commentMap[post.id]}
            onOpenCommentList={() => openPostCommentList(post.id)}
            isLoadingComments={
              loadingComments.includes(post.id) && !commentMap[post.id]
            }
          />
        </li>
      ))}
    </ul>
  );
}
export default PostList;
