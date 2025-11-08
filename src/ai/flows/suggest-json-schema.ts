'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests a JSON schema based on the provided JSON input.
 *
 * The flow takes a JSON string as input and returns a suggested Zod schema as a string.
 * This schema helps in validating the JSON structure, identifying errors, and enforcing data consistency.
 *
 * @interface SuggestJSONSchemaInput - Input type for the suggestJSONSchema function, containing the raw JSON string.
 * @interface SuggestJSONSchemaOutput - Output type for the suggestJSONSchema function, containing the suggested Zod schema as a string.
 * @function suggestJSONSchema - The main function that triggers the schema suggestion flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const SuggestJSONSchemaInputSchema = z.object({
  jsonString: z
    .string()
    .describe('The raw JSON string for which a schema is to be suggested.'),
});

export type SuggestJSONSchemaInput = z.infer<typeof SuggestJSONSchemaInputSchema>;

const SuggestJSONSchemaOutputSchema = z.object({
  suggestedSchema: z
    .string()
    .describe('The suggested Zod schema as a string, based on the input JSON.'),
});

export type SuggestJSONSchemaOutput = z.infer<typeof SuggestJSONSchemaOutputSchema>;

/**
 * Analyzes a JSON string and suggests a Zod schema for it.
 * @param input - The input containing the JSON string.
 * @returns The suggested Zod schema as a string.
 */
export async function suggestJSONSchema(
  input: SuggestJSONSchemaInput
): Promise<SuggestJSONSchemaOutput> {
  return suggestJSONSchemaFlow(input);
}

const suggestJSONSchemaPrompt = ai.definePrompt({
  name: 'suggestJSONSchemaPrompt',
  input: {schema: SuggestJSONSchemaInputSchema},
  output: {schema: SuggestJSONSchemaOutputSchema},
  prompt: `You are a helpful AI assistant that suggests a Zod schema for a given JSON string.

  Analyze the following JSON string and provide a Zod schema that accurately represents the structure and data types within the JSON.
  The suggested schema should include appropriate type annotations and descriptions for each field to ensure clarity and maintainability.

  JSON String:
  {{jsonString}}

  Ensure the generated schema is a valid Zod schema and can be used for validating similar JSON structures.
  Return only the Zod schema.
  `,
  model: googleAI.model('gemini-1.5-flash'),
});

const suggestJSONSchemaFlow = ai.defineFlow(
  {
    name: 'suggestJSONSchemaFlow',
    inputSchema: SuggestJSONSchemaInputSchema,
    outputSchema: SuggestJSONSchemaOutputSchema,
  },
  async input => {
    const {output} = await suggestJSONSchemaPrompt(input);
    return output!;
  }
);
