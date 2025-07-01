import { relations } from 'drizzle-orm';
import { boolean, index, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const userTable = pgTable('User', {
  id: text().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  isEmailVerified: boolean().notNull().default(false),
  isAdminUser: boolean().notNull().default(false),
  isDeleted: boolean().notNull().default(false),
  username: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const memberTable = pgTable(
  'Member',
  {
    id: text().primaryKey(),
    userId: text('userId'),
    reputation: integer().notNull().default(0),
  },
  (table) => [index('userIdIndex').on(table.userId)]
);

export const memberRelations = relations(memberTable, ({ one }) => ({
  user: one(userTable, {
    fields: [memberTable.userId],
    references: [userTable.id],
  }),
}));

export const postTable = pgTable(
  'Post',
  {
    id: text().primaryKey(),
    memberId: text('memberId'),
    type: varchar({ length: 255 }).notNull(),
    title: varchar({ length: 255 }),
    text: text('text'),
    link: varchar({ length: 255 }),
    slug: varchar({ length: 255 }).notNull(),
    points: integer().notNull().default(0),
    totalComments: integer().notNull().default(0),
  },
  (table) => [index('memberIdIndex').on(table.memberId)]
);

export const postRelations = relations(postTable, ({ one, many }) => ({
  votes: many(postVoteTable),
  comments: many(commentTable),
  member: one(memberTable, {
    fields: [postTable.memberId],
    references: [memberTable.id],
  }),
}));

export const postVoteTable = pgTable(
  'PostVote',
  {
    id: text().primaryKey(),
    postId: text('postId'),
    memberId: text('memberId'),
    type: varchar({ length: 255 }).notNull(),
  },
  (table) => [index('memberIdIndex').on(table.memberId), index('postIdIndex').on(table.postId)]
);

export const postVoteRelations = relations(postVoteTable, ({ one }) => ({
  post: one(postTable, {
    fields: [postVoteTable.postId],
    references: [postTable.id],
  }),
  member: one(memberTable, {
    fields: [postVoteTable.memberId],
    references: [memberTable.id],
  }),
}));

export const commentTable = pgTable(
  'Comment',
  {
    id: text().primaryKey(),
    postId: text('postId'),
    memberId: text('memberId'),
    parentId: text('parentId'),
    text: text('text').notNull(),
    points: integer().notNull().default(0),
  },
  (table) => [
    index('postIdIndex').on(table.postId),
    index('memberIdIndex').on(table.memberId),
    index('parentIdIndex').on(table.parentId),
  ]
);

export const commentRelations = relations(commentTable, ({ one, many }) => ({
  parent: one(commentTable, {
    fields: [commentTable.parentId],
    references: [commentTable.id],
    relationName: 'ParentChildren',
  }),
  children: many(commentTable, {
    relationName: 'ParentChildren',
  }),
  votes: many(commentVoteTable),
  post: one(postTable, {
    fields: [commentTable.postId],
    references: [postTable.id],
  }),
  member: one(memberTable, {
    fields: [commentTable.memberId],
    references: [memberTable.id],
  }),
}));

export const commentVoteTable = pgTable(
  'CommentVote',
  {
    id: text().primaryKey(),
    commentId: text('commentId'),
    memberId: text('memberId'),
    type: varchar({ length: 255 }).notNull(),
  },
  (table) => [index('commentIdIndex').on(table.commentId), index('memberIdIndex').on(table.memberId)]
);

export const commentVoteRelations = relations(commentVoteTable, ({ one }) => ({
  comment: one(commentTable, {
    fields: [commentVoteTable.commentId],
    references: [commentTable.id],
  }),
  member: one(memberTable, {
    fields: [commentVoteTable.memberId],
    references: [memberTable.id],
  }),
}));
