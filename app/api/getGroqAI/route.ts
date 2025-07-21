import queryGroqAI from "../../../helpers/querygroqai";

export async function POST(request: Request) {
    const { prompt } = await request.json();
    const responce = await queryGroqAI(prompt)
    return new Response(responce);
}