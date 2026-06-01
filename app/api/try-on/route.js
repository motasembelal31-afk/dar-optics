import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request) {
  try {
    const { userImage, angle } = await request.json();
    if (!userImage) return NextResponse.json({ error: 'الصورة الشخصية للزاوية المطلوبة مفقودة' }, { status: 400 });

    // تشغيل نموذج التوليد المتطور للحصول على مظهر طبيعي 100% للنظارة على الوجه
    const output = await replicate.run(
      "stability-ai/sdxl-inpainting:9a499812403c682e5ef5ecf191197473fe0000a65e9f82635293217d8487e954",
      {
        input: {
          image: userImage,
          prompt: `A premium high-end professional commercial photo of this exact person viewing from the ${angle || 'front'} angle, naturally wearing luxury designer eyewear glasses, matching lighting, realistic drop shadows, photorealistic 8k`,
          negative_prompt: "blurry, worst quality, ugly, deformed glasses, wrong eye fit, cartoon",
          prompt_strength: 0.75,
          guidance_scale: 8.0,
          num_inference_steps: 35
        }
      }
    );

    return NextResponse.json({ resultImageUrl: output[0] });
  } catch (error) {
    return NextResponse.json({ error: 'عذراً، حدث خطأ أثناء الاتصال بالخادم الذكي' }, { status: 500 });
  }
}
