import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Assinatura do webhook ausente' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('❌ Erro ao verificar webhook:', err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Processar eventos do Stripe
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Pagamento concluído:', session.id);
        
        // Aqui você pode:
        // 1. Atualizar status do usuário no banco de dados
        // 2. Enviar email de boas-vindas
        // 3. Ativar recursos premium
        const userId = session.metadata?.userId;
        if (userId) {
          console.log(`🎉 Usuário ${userId} agora é Premium!`);
          // TODO: Atualizar banco de dados (Supabase)
          // await supabase.from('users').update({ is_premium: true }).eq('id', userId);
        }
        break;

      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        console.log('❌ Assinatura cancelada:', subscription.id);
        
        // Aqui você pode:
        // 1. Remover status premium do usuário
        // 2. Enviar email de feedback
        const canceledUserId = subscription.metadata?.userId;
        if (canceledUserId) {
          console.log(`👋 Usuário ${canceledUserId} cancelou o Premium`);
          // TODO: Atualizar banco de dados
          // await supabase.from('users').update({ is_premium: false }).eq('id', canceledUserId);
        }
        break;

      case 'invoice.payment_failed':
        const invoice = event.data.object as Stripe.Invoice;
        console.log('⚠️ Pagamento falhou:', invoice.id);
        
        // Aqui você pode:
        // 1. Notificar o usuário sobre falha no pagamento
        // 2. Dar período de graça antes de cancelar
        break;

      default:
        console.log(`ℹ️ Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}
