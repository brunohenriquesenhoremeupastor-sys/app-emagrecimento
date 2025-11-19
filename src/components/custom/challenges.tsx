'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Star, Flame } from 'lucide-react';
import { SAMPLE_CHALLENGES } from '@/lib/constants';
import { Challenge } from '@/lib/types';

type ChallengesProps = {
  onBack: () => void;
};

export function Challenges({ onBack }: ChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>(SAMPLE_CHALLENGES);
  const [totalPoints, setTotalPoints] = useState(0);

  const startChallenge = (id: string) => {
    setChallenges(challenges.map(c =>
      c.id === id ? { ...c, progress: 1 } : c
    ));
  };

  const updateProgress = (id: string) => {
    setChallenges(challenges.map(c => {
      if (c.id === id && c.progress < c.duration) {
        const newProgress = c.progress + 1;
        const completed = newProgress >= c.duration;
        
        if (completed && !c.completed) {
          setTotalPoints(prev => prev + c.points);
        }

        return {
          ...c,
          progress: newProgress,
          completed
        };
      }
      return c;
    }));
  };

  const activeCount = challenges.filter(c => c.progress > 0 && !c.completed).length;
  const completedCount = challenges.filter(c => c.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Desafios Semanais</h2>
        <div className="w-20" />
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pontos Totais</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
              {totalPoints}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Desafios Ativos</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Flame className="w-8 h-8 text-orange-500" />
              {activeCount}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Concluídos</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Trophy className="w-8 h-8 text-emerald-500" />
              {completedCount}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Lista de Desafios */}
      <div className="space-y-4">
        {challenges.map((challenge) => {
          const progressPercent = (challenge.progress / challenge.duration) * 100;
          const isActive = challenge.progress > 0 && !challenge.completed;

          return (
            <Card
              key={challenge.id}
              className={`transition-all ${
                challenge.completed
                  ? 'border-emerald-500 bg-emerald-50/50'
                  : isActive
                  ? 'border-orange-500 bg-orange-50/50'
                  : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl">{challenge.icon === 'Droplets' ? '💧' : challenge.icon === 'Candy' ? '🍬' : challenge.icon === 'Footprints' ? '👣' : '📖'}</span>
                      <CardTitle className="text-xl">{challenge.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {challenge.description}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${
                      challenge.completed
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                        : 'bg-amber-100 text-amber-700 border-amber-300'
                    }`}
                  >
                    <Star className="w-3 h-3 mr-1" />
                    {challenge.points} pts
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {challenge.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Progresso: {challenge.progress}/{challenge.duration} dias
                      </span>
                      <span className="font-semibold">{progressPercent.toFixed(0)}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                  </div>
                )}

                <div className="flex gap-2">
                  {challenge.progress === 0 && (
                    <Button
                      onClick={() => startChallenge(challenge.id)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                    >
                      Iniciar Desafio
                    </Button>
                  )}

                  {isActive && (
                    <Button
                      onClick={() => updateProgress(challenge.id)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                    >
                      Marcar Dia Completo
                    </Button>
                  )}

                  {challenge.completed && (
                    <div className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-emerald-100 text-emerald-700 rounded-md font-semibold">
                      <Trophy className="w-5 h-5" />
                      Desafio Concluído!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
