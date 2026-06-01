import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

export async function POST(request) {
  try {
    const { userImage, angle, productType } = await request.json();
    
    const output = await replicate.run(
      "stability-ai/sdxl-inpainting:9a499812403c682e5ef5ecf191197473fe0000a65e9f82635293217d8487e954",
      {
        input: {
          image: userImage,
          prompt: `A high-quality photo of this person from the ${angle} angle wearing ${productType}, realistic lighting, 8k resolution`,
          negative_prompt: "deformed, blurry, bad anatomy",
          prompt_strength: 0.7
        }
      }
    );
    return NextResponse.json({ result: output[0] });
  } catch (error) {
    return NextResponse.json({ error: "API Error" }, { status: 500 });
  }
}
