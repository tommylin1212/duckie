import { NextResponse } from "next/server";
import { Configuration, OpenAIApi,ChatCompletionRequestMessageRoleEnum } from "openai";

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    const messages = body.messages;

    // Formulate your prompt here. This is just an example and may not return 
    // the expected results as the OpenAI API doesn't directly support this kind of analysis.
   

    const configuration = new Configuration({
        organization: "org-OayEqgvWQFZCPGCQ8TvfTn3J",
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 1000,
        temperature: 0,
      });
    const data = response.data;
    console.log(data?.choices?.[0]?.message?.content)
  const analysis = data?.choices?.[0]?.message?.content ?? "No analysis found.";
  return NextResponse.json({ analysis });
}