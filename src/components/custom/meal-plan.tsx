'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Clock, Flame, ChefHat } from 'lucide-react';
import { SAMPLE_RECIPES } from '@/lib/constants';
import { Recipe } from '@/lib/types';
import { OnboardingForm, OnboardingData } from './onboarding-form';

type MealPlanProps = {
  onBack: () => void;
};

export function MealPlan({ onBack }: MealPlanProps) {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userData, setUserData] = useState<OnboardingData | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserData(data);
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <div className="space-y-6">
        <OnboardingForm
          onComplete={handleOnboardingComplete}
          onBack={onBack}
        />
      </div>
    );
  }

  if (selectedRecipe) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedRecipe(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-2xl font-bold">Receita</h2>
          <div className="w-20" />
        </div>

        <Card>
          <img
            src={selectedRecipe.imageUrl}
            alt={selectedRecipe.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{selectedRecipe.name}</CardTitle>
                <CardDescription className="text-base">{selectedRecipe.category}</CardDescription>
              </div>
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                {selectedRecipe.calories} kcal
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-xs text-muted-foreground">Preparo</div>
                  <div className="font-semibold">{selectedRecipe.prepTime} min</div>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-muted-foreground">Proteína</div>
                <div className="font-semibold text-blue-700">{selectedRecipe.protein}g</div>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <div className="text-xs text-muted-foreground">Carboidratos</div>
                <div className="font-semibold text-amber-700">{selectedRecipe.carbs}g</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-xs text-muted-foreground">Gorduras</div>
                <div className="font-semibold text-orange-700">{selectedRecipe.fat}g</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Ingredientes</h3>
              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Modo de Preparo</h3>
              <ol className="space-y-3">
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="flex-1">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              Adicionar ao Meu Plano
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Plano Alimentar</h2>
        <div className="w-20" />
      </div>

      {/* Resumo do Perfil */}
      {userData && (
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300">
          <CardHeader>
            <CardTitle>Olá, {userData.name}! 👋</CardTitle>
            <CardDescription className="text-base">
              Seu plano foi personalizado para{' '}
              {userData.goal === 'lose_weight' ? 'perda de peso' : userData.goal === 'maintain' ? 'manutenção' : 'ganho de massa muscular'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xs text-muted-foreground">Peso</div>
                <div className="font-semibold">{userData.weight} kg</div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xs text-muted-foreground">Altura</div>
                <div className="font-semibold">{userData.height} cm</div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xs text-muted-foreground">Idade</div>
                <div className="font-semibold">{userData.age} anos</div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xs text-muted-foreground">Meta Diária</div>
                <div className="font-semibold flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  2000 kcal
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Receitas */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="breakfast">Café</TabsTrigger>
          <TabsTrigger value="lunch">Almoço</TabsTrigger>
          <TabsTrigger value="dinner">Jantar</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_RECIPES.map((recipe) => (
              <Card
                key={recipe.id}
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      {recipe.calories} kcal
                    </Badge>
                  </div>
                  <CardDescription>{recipe.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.prepTime} min
                    </div>
                    <div className="flex gap-2">
                      <span>P: {recipe.protein}g</span>
                      <span>C: {recipe.carbs}g</span>
                      <span>G: {recipe.fat}g</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="breakfast" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_RECIPES.filter(r => r.category === 'Café da Manhã').map((recipe) => (
              <Card
                key={recipe.id}
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-48 object-cover rounded-t-lg" />
                <CardHeader>
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  <CardDescription>{recipe.calories} kcal</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lunch" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_RECIPES.filter(r => r.category === 'Almoço').map((recipe) => (
              <Card
                key={recipe.id}
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-48 object-cover rounded-t-lg" />
                <CardHeader>
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  <CardDescription>{recipe.calories} kcal</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dinner" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_RECIPES.filter(r => r.category === 'Jantar').map((recipe) => (
              <Card
                key={recipe.id}
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-48 object-cover rounded-t-lg" />
                <CardHeader>
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  <CardDescription>{recipe.calories} kcal</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
