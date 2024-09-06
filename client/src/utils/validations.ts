import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  // email: z.string().email(),
  email: z.string(),
  name: z.string(),
  totalScore: z.number()
});

export const UserResponseSchema = z.object({
  accessToken: z.string(),
  user: UserSchema,
});

export const UserBoardSchema = z.array(UserSchema);
