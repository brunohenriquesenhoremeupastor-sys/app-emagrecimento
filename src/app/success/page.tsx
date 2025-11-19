'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // Aqui você pode verificar o status da sessão e atualizar o usuário
      setTimeout(() => setLoading(false), 1000);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Processando seu pagamento...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-emerald-500">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <CardTitle className="text-3xl mb-2">Pagamento Confirmado!</CardTitle>
          <CardDescription className="text-base">
            Bem-vindo ao VitaFit Premium 🎉
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-amber-600" />
              <h3 className="font-semibold text-lg">Sua assinatura está ativa!</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>7 dias de teste grátis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Acesso a todos os recursos premium</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Cancele quando quiser</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                Começar a Usar
              </Button>
            </Link>
            <p className="text-xs text-center text-muted-foreground">
              Um email de confirmação foi enviado para você
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
