
const logTokenUsage = (usage) => {
    const promptTokens = usage.prompt_tokens; // Tokens used by the input prompt
    const completionTokens = usage.completion_tokens; // Tokens used by the output (AI response)
    const totalTokens = usage.total_tokens; // Total tokens used (input + output)
  
    // Log token usage information
    console.log(`Prompt tokens: ${promptTokens}`);
    console.log(`Completion tokens (output): ${completionTokens}`);
    console.log(`Total tokens used: ${totalTokens}`);
  };
  
  module.exports = logTokenUsage;