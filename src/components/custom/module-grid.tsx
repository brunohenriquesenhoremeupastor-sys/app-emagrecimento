'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Check } from 'lucide-react';

type Module = {
  id: string;
  title: string;
  description: string;
  icon: string;
  isPremium: boolean;
  color: string;
};

const modules: Module[] = [
  {
    id: 'meal_plan_basic',
    title: 'Plano Alimentar Básico',
    description: 'Questionário personalizado e sugestões de refeições saudáveis',
    icon: '🍽️',
    isPremium: false,
    color: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'food_diary',
    title: 'Diário de Alimentação',
    description: 'Registre suas refeições e acompanhe seu progresso calórico',
    icon: '📔',
    isPremium: false,
    color: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'challenges',
    title: 'Desafios Semanais',
    description: 'Missões de hábitos saudáveis com recompensas em pontos',
    icon: '🏆',
    isPremium: false,
    color: 'from-purple-400 to-pink-600'
  },
  {
    id: 'meal_plan_advanced',
    title: 'Nutricionista Virtual',
    description: 'Plano alimentar avançado com ajustes dinâmicos e dietas específicas',
    icon: '👨‍⚕️',
    isPremium: true,
    color: 'from-orange-400 to-red-600'
  },
  {
    id: 'workouts',
    title: 'Treinos HIIT',
    description: 'Vídeos com treinos guiados e programas de 7, 14 e 30 dias',
    icon: '💪',
    isPremium: true,
    color: 'from-indigo-400 to-purple-600'
  },
  {
    id: 'ai_analysis',
    title: 'Análise por Foto (IA)',
    description: 'Tire foto da refeição e receba análise de calorias e macros',
    icon: '📸',
    isPremium: true,
    color: 'from-pink-400 to-rose-600'
  },
  {
    id: 'community',
    title: 'Comunidade & Coaching',
    description: 'Fóruns, grupos de apoio e lives com especialistas',
    icon: '👥',
    isPremium: true,
    color: 'from-cyan-400 to-blue-600'
  }
];

type ModuleGridProps = {
  onSelectModule: (moduleId: string) => void;
  isPremium: boolean;
};

export function ModuleGrid({ onSelectModule, isPremium }: ModuleGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {modules.map((module) => (
        <Card
          key={module.id}
          className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2"
          onClick={() => {
            if (!module.isPremium || isPremium) {
              onSelectModule(module.id);
            }
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-5`} />
          
          {module.isPremium && !isPremium && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0">
                <Lock className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
          )}

          {!module.isPremium && (
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300">
                <Check className="w-3 h-3 mr-1" />
                Grátis
              </Badge>
            </div>
          )}

          <CardHeader>
            <div className="text-5xl mb-3">{module.icon}</div>
            <CardTitle className="text-lg md:text-xl">{module.title}</CardTitle>
            <CardDescription className="text-sm">
              {module.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              className={`w-full ${
                module.isPremium && !isPremium
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700'
                  : `bg-gradient-to-r ${module.color}`
              } text-white border-0`}
              disabled={module.isPremium && !isPremium}
            >
              {module.isPremium && !isPremium ? (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Assinar Premium
                </>
              ) : (
                'Acessar Módulo'
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
