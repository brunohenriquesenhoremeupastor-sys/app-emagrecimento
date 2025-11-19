'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ModuleGrid } from '@/components/custom/module-grid';
import { MealPlan } from '@/components/custom/meal-plan';
import { FoodDiary } from '@/components/custom/food-diary';
import { Challenges } from '@/components/custom/challenges';
import { AiAnalysis } from '@/components/custom/ai-analysis';
import { Heart, Sparkles, TrendingDown, Users, Lock } from 'lucide-react';

type View = 'home' | 'meal_plan_basic' | 'food_diary' | 'challenges' | 'ai_analysis' | 'premium';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isPremium, setIsPremium] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  const handleModuleSelect = (moduleId: string) => {
    if (moduleId === 'meal_plan_advanced' || moduleId === 'workouts' || moduleId === 'community') {
      setCurrentView('premium');
    } else {
      setCurrentView(moduleId as View);
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  if (currentView === 'meal_plan_basic') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <MealPlan onBack={handleBackToHome} />
        </div>
      </div>
    );
  }

  if (currentView === 'food_diary') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <FoodDiary onBack={handleBackToHome} />
        </div>
      </div>
    );
  }

  if (currentView === 'challenges') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Challenges onBack={handleBackToHome} />
        </div>
      </div>
    );
  }

  if (currentView === 'ai_analysis') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <AiAnalysis onBack={handleBackToHome} isPremium={isPremium} />
        </div>
      </div>
    );
  }

  if (currentView === 'premium') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBackToHome}>
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

                <Button
                  onClick={() => setIsPremium(true)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-lg py-6"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Assinar Agora
                </Button>

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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  VitaFit
                </h1>
                <p className="text-xs text-muted-foreground">Sua jornada de saúde</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-200">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-700">{userPoints} pontos</span>
              </div>

              {!isPremium && (
                <Button
                  onClick={() => setCurrentView('premium')}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Assinar Premium
                </Button>
              )}

              {isPremium && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Transforme Sua Saúde com Inteligência
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Planos alimentares personalizados, análise de calorias por IA e desafios motivadores para alcançar seus objetivos
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <TrendingDown className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">Emagrecimento Saudável</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <Sparkles className="w-5 h-5 text-pink-600" />
                <span className="font-semibold">Análise por IA</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="font-semibold">Comunidade Ativa</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-emerald-600">10k+</CardTitle>
                <CardDescription>Usuários Ativos</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-teal-600">500k+</CardTitle>
                <CardDescription>Refeições Analisadas</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-purple-600">95%</CardTitle>
                <CardDescription>Satisfação</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Modules Grid */}
          <ModuleGrid onSelectModule={handleModuleSelect} isPremium={isPremium} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
          <p>© 2024 VitaFit. Todos os direitos reservados.</p>
          <p className="mt-2">Sua jornada para uma vida mais saudável começa aqui 💚</p>
        </div>
      </footer>
    </div>
  );
}
