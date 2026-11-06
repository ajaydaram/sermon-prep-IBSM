import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Retrieves the stored Gemini API key from localStorage.
 */
export const getApiKey = (): string => {
  return localStorage.getItem('bs510_gemini_api_key') || '';
};

/**
 * Saves the Gemini API key to localStorage.
 */
export const saveApiKey = (key: string): void => {
  localStorage.setItem('bs510_gemini_api_key', key.trim());
};

/**
 * Helper to call the Gemini API.
 */
export const callGemini = async (prompt: string, systemInstruction?: string): Promise<string> => {
  const key = getApiKey();
  if (!key) {
    throw new Error('Gemini API key is not configured. Please enter your API key in the settings.');
  }

  // Initialize the Generative Client
  const ai = new GoogleGenerativeAI(key);
  const model = ai.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: systemInstruction || 'You are a helpful, expert academic teaching assistant for Inductive Bible Study Methods.'
  });

  const result = await model.generateContent(prompt);
  return result.response.text() || 'No response generated.';
};

/**
 * Socratic Tutor request: Prompts the student with questions based on their observations or inputs.
 */
export const getSocraticFeedback = async (assignmentName: string, studentInput: string): Promise<string> => {
  const systemInstruction = 
    "You are Dr. Shubert, an expert Inductive Bible Study Method tutor. Your goal is to guide students to discover truths themselves. " +
    "Do NOT give answers directly. Instead, ask 1 or 2 targeted Socratic questions based on their input to deepen their observation, " +
    "historical analysis, or application relevance. Keep responses brief (under 120 words).";
    
  const prompt = `Student assignment: "${assignmentName}"\n\nStudent drafted input:\n"""\n${studentInput}\n"""\n\nProvide Socratic guidance:`;
  return callGemini(prompt, systemInstruction);
};

/**
 * AI Rubric Critic request: Evaluates the Argument Builder drafts against the 600-point rubric.
 */
export const getRubricEvaluation = async (argDetails: {
  title: string;
  intro: string;
  bookChart: string;
  gridChart: string;
  simpleOutline: string;
  sentenceOutline: string;
  argumentText: string;
}): Promise<string> => {
  const systemInstruction = 
    "You are an expert grader for BS510 Inductive Bible Study Methods. Evaluate the student's argument portfolio based on the 600-point rubric: " +
    "Introductory Material (48 pts), Book Chart (120 pts), Grid Chart (24 pts), Simple Outline (24 pts), Sentence Outline (180 pts), and Argument Essay (204 pts). " +
    "Ensure the sentence outline uses complete sentences (each stating a complete thought starting with capital and ending with punctuation). " +
    "Provide a detailed academic evaluation report in structured markdown.";

  const prompt = `
Please evaluate the following argument portfolio for "${argDetails.title}":

=== 1. INTRODUCTORY MATERIAL ===
${argDetails.intro || 'Empty'}

=== 2. BOOK CHART ===
${argDetails.bookChart || 'Empty'}

=== 3. GRID CHART ===
${argDetails.gridChart || 'Empty'}

=== 4. SIMPLE OUTLINE ===
${argDetails.simpleOutline || 'Empty'}

=== 5. SENTENCE OUTLINE ===
${argDetails.sentenceOutline || 'Empty'}

=== 6. THE ARGUMENT ===
${argDetails.argumentText || 'Empty'}

Format your response exactly with these markdown headings:
### Score Estimate (X/600 pts)
### Key Strengths
### Rubric Deficiencies & Concerns
### Socratic Recommendations for Revision
`;

  return callGemini(prompt, systemInstruction);
};
