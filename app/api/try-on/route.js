import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

export async function POST(request) {
  try {
    const { userImage } = await request.json();
    const output = await replicate.run(
      "stability-ai/sdxl-inpainting:9a499812403c682e5ef5ecf191197473fe0000a65e9f82635293217d8487e954",
      { input: { image: userImage, prompt: "A person wearing stylish eyeglasses, hyper-realistic, 8k", prompt_strength: 0.7 } }
    );
    return NextResponse.json({ resultImageUrl: output[0] });
  } catch (error) {
    return NextResponse.json({ error: 'خطأ في السيرفر' }, { status: 500 });
  }
}
