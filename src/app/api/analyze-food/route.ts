import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'Imagem não fornecida' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analise esta imagem de refeição e identifique todos os alimentos visíveis. Para cada alimento, estime:
              - Nome do alimento
              - Quantidade aproximada (em gramas ou porções)
              - Calorias
              - Proteínas (g)
              - Carboidratos (g)
              - Gorduras (g)
              
              Retorne APENAS um JSON válido no seguinte formato (sem markdown, sem explicações):
              {
                "foods": [
                  {
                    "name": "Nome do alimento",
                    "quantity": "quantidade estimada",
                    "calories": número,
                    "protein": número,
                    "carbs": número,
                    "fat": número
                  }
                ],
                "totalCalories": número,
                "totalProtein": número,
                "totalCarbs": número,
                "totalFat": número,
                "confidence": número entre 0 e 1
              }`
            },
            {
              type: 'image_url',
              image_url: {
                url: image
              }
            }
          ]
        }
      ],
      max_tokens: 1000
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('Resposta vazia da API');
    }

    // Remove markdown code blocks se existirem
    const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(cleanContent);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro ao analisar imagem:', error);
    return NextResponse.json(
      { error: 'Erro ao processar análise' },
      { status: 500 }
    );
  }
}
