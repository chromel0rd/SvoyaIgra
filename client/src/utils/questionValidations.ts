import { z } from "zod";

 const QuestionSchema = z.object({
    id: z.number(),
    category: z.string(),
    difficulty: z.string(),
    question: z.string(),
    answer: z.string(),
})

export default QuestionSchema;