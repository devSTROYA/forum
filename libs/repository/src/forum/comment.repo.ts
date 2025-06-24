import { UniqueEntityID } from '@core/domain';

export abstract class CommentRepo {
  abstract exists(commentId: UniqueEntityID): Promise<boolean>;
  abstract getDetailsByPostSlug(slug: string, memberId?: UniqueEntityID, offset?: number): Promise<any[]>;
  abstract getDetailsByCommentId(commentId: UniqueEntityID, memberId?: UniqueEntityID): Promise<any>;
  abstract getByCommentId(commentId: UniqueEntityID): Promise<any>;
  abstract save(comment: Comment): Promise<void>;
  abstract saveBulk(comments: Comment[]): Promise<void>;
  abstract deleteComment(commentId: UniqueEntityID): Promise<void>;
}
