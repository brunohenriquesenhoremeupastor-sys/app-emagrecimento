'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, TrendingDown, TrendingUp, Calendar } from 'lucide-react';
import { Meal } from '@/lib/types';

type FoodDiaryProps = {
  onBack: () => void;
};

export function FoodDiary({ onBack }: FoodDiaryProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    type: 'breakfast' as const,
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const addMeal = () => {
    const meal: Meal = {
      id: Date.now().toString(),
      userId: 'user1',
      date: new Date(),
      ...newMeal
    };
    setMeals([...meals, meal]);
    setNewMeal({
      type: 'breakfast',
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
    setShowAddMeal(false);
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  const dailyGoal = 2000;
  const progress = (totalCalories / dailyGoal) * 100;

  const mealTypeLabels = {
    breakfast: 'Café da Manhã',
    lunch: 'Almoço',
    dinner: 'Jantar',
    snack: 'Lanche'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Diário de Alimentação</h2>
        <div className="w-20" />
      </div>

      {/* Resumo Diário */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Calorias Hoje</CardDescription>
            <CardTitle className="text-3xl">{totalCalories}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Meta: {dailyGoal} kcal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Proteínas</CardDescription>
            <CardTitle className="text-3xl">{totalProtein}g</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
              {((totalProtein / totalCalories) * 100 * 4 || 0).toFixed(0)}% do total
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Carboidratos</CardDescription>
            <CardTitle className="text-3xl">{totalCarbs}g</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
              {((totalCarbs / totalCalories) * 100 * 4 || 0).toFixed(0)}% do total
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Gorduras</CardDescription>
            <CardTitle className="text-3xl">{totalFat}g</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300">
              {((totalFat / totalCalories) * 100 * 9 || 0).toFixed(0)}% do total
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Botão Adicionar Refeição */}
      {!showAddMeal && (
        <Button
          onClick={() => setShowAddMeal(true)}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Refeição
        </Button>
      )}

      {/* Formulário Adicionar Refeição */}
      {showAddMeal && (
        <Card>
          <CardHeader>
            <CardTitle>Nova Refeição</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Tipo de Refeição</Label>
              <Select value={newMeal.type} onValueChange={(value: any) => setNewMeal({ ...newMeal, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Café da Manhã</SelectItem>
                  <SelectItem value="lunch">Almoço</SelectItem>
                  <SelectItem value="dinner">Jantar</SelectItem>
                  <SelectItem value="snack">Lanche</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Nome da Refeição</Label>
              <Input
                placeholder="Ex: Omelete com vegetais"
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <Label>Calorias</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newMeal.calories || ''}
                  onChange={(e) => setNewMeal({ ...newMeal, calories: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label>Proteína (g)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newMeal.protein || ''}
                  onChange={(e) => setNewMeal({ ...newMeal, protein: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label>Carboidratos (g)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newMeal.carbs || ''}
                  onChange={(e) => setNewMeal({ ...newMeal, carbs: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label>Gordura (g)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newMeal.fat || ''}
                  onChange={(e) => setNewMeal({ ...newMeal, fat: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={addMeal}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                disabled={!newMeal.name || newMeal.calories === 0}
              >
                Salvar
              </Button>
              <Button variant="outline" onClick={() => setShowAddMeal(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Refeições */}
      <div className="space-y-3">
        {meals.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhuma refeição registrada hoje</p>
              <p className="text-sm">Comece adicionando sua primeira refeição</p>
            </CardContent>
          </Card>
        ) : (
          meals.map((meal) => (
            <Card key={meal.id} className="hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{mealTypeLabels[meal.type]}</Badge>
                      <span className="font-semibold">{meal.name}</span>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{meal.calories} kcal</span>
                      <span>P: {meal.protein}g</span>
                      <span>C: {meal.carbs}g</span>
                      <span>G: {meal.fat}g</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">{meal.calories}</div>
                    <div className="text-xs text-muted-foreground">calorias</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
