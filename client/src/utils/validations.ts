import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  // email: z.string().email(),
  email: z.string(),
  name: z.string(),
});

export const UserResponseSchema = z.object({
  accessToken: z.string(),
  user: UserSchema,
});


