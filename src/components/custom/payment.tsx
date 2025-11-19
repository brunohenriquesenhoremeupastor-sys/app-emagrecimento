'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Lock, Users, Check, Loader2, AlertCircle } from 'lucide-react';
import { getStripe } from '@/lib/stripe';

type PaymentButtonProps = {
  onSuccess?: () => void;
};

export function PaymentButton({ onSuccess }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      // Criar sessão de checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          userId: 'user_' + Date.now(), // Substituir por ID real do usuário autenticado
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // Redirecionar para checkout do Stripe
      const stripe = await getStripe();
      if (!stripe) {
        setError('Erro ao carregar Stripe. Verifique as configurações.');
        setLoading(false);
        return;
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        setError('Erro ao redirecionar para pagamento. Tente novamente.');
      }
    } catch (error) {
      setError('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-lg py-6"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Assinar Agora
          </>
        )}
      </Button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-800">
            <p className="font-medium">Erro ao processar pagamento</p>
            <p className="text-red-700 mt-1">{error}</p>
            {error.includes('variáveis de ambiente') && (
              <p className="text-xs mt-2 text-red-600">
                Configure as chaves do Stripe nas variáveis de ambiente para habilitar pagamentos.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type PremiumCardProps = {
  onBack: () => void;
  onUpgrade?: () => void;
};

export function PremiumCard({ onBack, onUpgrade }: PremiumCardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Premium</h2>
        <div className="w-20" />
      </div>

      <Card className="border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader>
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-10 h-10 text-amber-600" />
            <div>
              <CardTitle className="text-3xl">Desbloqueie Todo o Potencial</CardTitle>
              <CardDescription className="text-base mt-1">
                Acesso completo a todos os recursos premium
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg space-y-2">
              <div className="text-3xl mb-2">👨‍⚕️</div>
              <h3 className="font-semibold text-lg">Nutricionista Virtual</h3>
              <p className="text-sm text-muted-foreground">
                Plano alimentar avançado com ajustes dinâmicos e dietas específicas (low carb, cetogênica, vegana)
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg space-y-2">
              <div className="text-3xl mb-2">💪</div>
              <h3 className="font-semibold text-lg">Treinos HIIT</h3>
              <p className="text-sm text-muted-foreground">
                Vídeos com treinos guiados e programas personalizados de 7, 14 e 30 dias
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg space-y-2">
              <div className="text-3xl mb-2">📸</div>
              <h3 className="font-semibold text-lg">Análise por Foto (IA)</h3>
              <p className="text-sm text-muted-foreground">
                Tire foto da refeição e receba análise instantânea de calorias e macronutrientes
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg space-y-2">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-lg">Comunidade & Coaching</h3>
              <p className="text-sm text-muted-foreground">
                Fóruns exclusivos, grupos de apoio e lives com especialistas em saúde
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg border-2 border-amber-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">Plano Premium</h3>
                <p className="text-muted-foreground">Acesso ilimitado a todos os recursos</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-amber-600">R$ 29,90</div>
                <div className="text-sm text-muted-foreground">/mês</div>
              </div>
            </div>

            <PaymentButton onSuccess={onUpgrade} />

            <p className="text-xs text-center text-muted-foreground mt-3">
              Cancele quando quiser • Sem compromisso
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>7 dias grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" />
              <span>+10k usuários</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
