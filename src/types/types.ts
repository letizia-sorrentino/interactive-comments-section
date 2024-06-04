export type Image = {
  png: string;
  webp: string;
};

export type User = {
  image: Image;
  username: string;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
};

export type Reply = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  replies?: Reply[];
  user: User;
};

export type Data = {
  comments: Comment[];
  currentUser: User;
};
