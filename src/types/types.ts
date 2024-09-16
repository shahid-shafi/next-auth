export type TApiResponse = {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

export type TSessionTokenCookie = { value: string | null };