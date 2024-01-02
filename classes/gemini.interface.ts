export interface GeminiResponse {
  candidates: Candidate[];
  promptFeedback: PromptFeedback;
}

interface PromptFeedback {
  safetyRatings: SafetyRating[];
}

interface Candidate {
  content: Content;
  finishReason: string;
  index: number;
  safetyRatings: SafetyRating[];
}

interface SafetyRating {
  category: string;
  probability: string;
}

interface Content {
  parts: Part[];
  role: string;
}

interface Part {
  text: string;
}
