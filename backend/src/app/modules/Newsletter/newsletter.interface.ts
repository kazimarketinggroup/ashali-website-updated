// newsletter.interface.ts

export type TCreateNewsletter = {
  name?: string;
  email: string;
};

export type TNewsletter = TCreateNewsletter & {
  status: 'subscribed' | 'unsubscribed';
  createdAt?: Date;
};
