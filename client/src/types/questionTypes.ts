import type { z } from 'zod';
import type QuestionSchema from '../utils/questionValidations';

export type QuestionType = z.infer<typeof QuestionSchema>;
