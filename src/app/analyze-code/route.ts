import { NextResponse } from "next/server";
import { Configuration, OpenAIApi,ChatCompletionRequestMessageRoleEnum } from "openai";

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    const code = body.code;

    // Formulate your prompt here. This is just an example and may not return 
    // the expected results as the OpenAI API doesn't directly support this kind of analysis.
    const prompt = `Analyze the given code for code quality issues such as performance optimizations, readability, maintainability, and potential bugs. Provide suggestions for improvement and best practices to follow. Output the optimzed code as an example.`;

    const systemMessage={role: ChatCompletionRequestMessageRoleEnum.System, content: prompt};
    const userMessage={role: ChatCompletionRequestMessageRoleEnum.User, content: code}

    const configuration = new Configuration({
        organization: "org-OayEqgvWQFZCPGCQ8TvfTn3J",
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [systemMessage, userMessage],
        max_tokens: 1000,
        temperature: 0,
      });
    const data = response.data;
    console.log(data?.choices?.[0]?.message?.content)
  const analysis = data?.choices?.[0]?.message?.content ?? "No analysis found.";
  return NextResponse.json({ analysis });
}