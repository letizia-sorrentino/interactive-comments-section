export type UserImage = {
  png: string;
  webp: string;
};

export type UserData = {
  image: UserImage;
  username: string;
};

export type CommentData = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserData;
  replyingTo?: string;
  replies?: CommentData[];
};

export type CommentThreadData = {
  comments: CommentData[];
  currentUser: UserData;
};
