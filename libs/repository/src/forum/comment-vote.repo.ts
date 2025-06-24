import { UniqueEntityID } from '@core/domain';

export interface CommentVotesRepo {
  exists(commentId: UniqueEntityID, memberId: UniqueEntityID, voteType: VoteType): Promise<boolean>;
  getVotesForCommentByMemberId(commentId: UniqueEntityID, memberId: UniqueEntityID): Promise<CommentVote[]>;
  countUpvotesForCommentByCommentId(comment: UniqueEntityID): Promise<number>;
  countDownvotesForCommentByCommentId(comment: UniqueEntityID): Promise<number>;
  countAllPostCommentUpvotes(postId: UniqueEntityID): Promise<number>;
  countAllPostCommentDownvotes(postId: UniqueEntityID): Promise<number>;
  countAllPostCommentUpvotesExcludingOP(postId: UniqueEntityID): Promise<number>;
  countAllPostCommentDownvotesExcludingOP(postId: UniqueEntityID): Promise<number>;
  saveBulk(votes: CommentVotes): Promise<any>;
  save(vote: CommentVote): Promise<any>;
  delete(vote: CommentVote): Promise<any>;
}
