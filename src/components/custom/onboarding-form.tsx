'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

type OnboardingProps = {
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
};

export type OnboardingData = {
  name: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  activityLevel: string;
  dietaryRestrictions: string[];
};

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetariano' },
  { id: 'vegan', label: 'Vegano' },
  { id: 'gluten_free', label: 'Sem Glúten' },
  { id: 'lactose_free', label: 'Sem Lactose' },
  { id: 'low_carb', label: 'Low Carb' },
  { id: 'diabetic', label: 'Diabético' }
];

export function OnboardingForm({ onComplete, onBack }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    name: '',
    age: 0,
    weight: 0,
    height: 0,
    goal: '',
    activityLevel: '',
    dietaryRestrictions: []
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  const toggleRestriction = (id: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(id)
        ? prev.dietaryRestrictions.filter(r => r !== id)
        : [...prev.dietaryRestrictions, id]
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Vamos Personalizar Seu Plano</CardTitle>
        <CardDescription>
          Etapa {step} de 3 - Responda algumas perguntas para criar seu plano ideal
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="30"
                  value={formData.age || ''}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div>
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div>
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height || ''}
                  onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Qual é o seu objetivo?</Label>
              <Select value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose_weight">Perder Peso</SelectItem>
                  <SelectItem value="maintain">Manter Peso</SelectItem>
                  <SelectItem value="gain_muscle">Ganhar Massa Muscular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Nível de Atividade Física</Label>
              <Select value={formData.activityLevel} onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentário (pouco ou nenhum exercício)</SelectItem>
                  <SelectItem value="light">Leve (exercício 1-3 dias/semana)</SelectItem>
                  <SelectItem value="moderate">Moderado (exercício 3-5 dias/semana)</SelectItem>
                  <SelectItem value="active">Ativo (exercício 6-7 dias/semana)</SelectItem>
                  <SelectItem value="very_active">Muito Ativo (exercício intenso diário)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Label>Restrições Alimentares (opcional)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dietaryOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={option.id}
                    checked={formData.dietaryRestrictions.includes(option.id)}
                    onCheckedChange={() => toggleRestriction(option.id)}
                  />
                  <Label htmlFor={option.id} className="cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handlePrevious}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          {step < 3 ? (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
              disabled={
                (step === 1 && (!formData.name || !formData.age || !formData.weight || !formData.height)) ||
                (step === 2 && (!formData.goal || !formData.activityLevel))
              }
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Concluir
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
