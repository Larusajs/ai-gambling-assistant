/* eslint-disable @typescript-eslint/no-explicit-any */
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log(messages);

    // Kullanıcı mesajını alın
    const userMessage = messages.find(
      (msg: any) => msg.role === "user"
    )?.content;
    if (!userMessage) {
      throw new Error("User message is missing.");
    }

    // AI cevabını oluştur
    const result = streamText({
      messages: messages,
      model: openai("gpt-4o"),
      system: `You are a blackjack dealer. You are talking to a player who is asking you questions about the game. You are trying to be helpful and informative.`,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in API:", error);
    return new Response(
      JSON.stringify({
        error: error || "An unexpected error occurred.",
      }),
      { status: 500 }
    );
  }
}
