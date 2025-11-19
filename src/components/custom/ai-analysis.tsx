'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Camera, Upload, Loader2, Sparkles, Lock } from 'lucide-react';
import { FoodAnalysisResult } from '@/lib/types';

type AiAnalysisProps = {
  onBack: () => void;
  isPremium: boolean;
};

export function AiAnalysis({ onBack, isPremium }: AiAnalysisProps) {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<FoodAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;

    setAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image })
      });

      if (!response.ok) throw new Error('Erro ao analisar imagem');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Não foi possível analisar a imagem. Tente novamente.');
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  if (!isPremium) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-2xl font-bold">Análise por Foto (IA)</h2>
          <div className="w-20" />
        </div>

        <Card className="border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-8 h-8 text-amber-600" />
              <CardTitle className="text-2xl">Recurso Premium</CardTitle>
            </div>
            <CardDescription className="text-base">
              Desbloqueie a análise inteligente de alimentos por foto com IA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span className="font-semibold">Reconhecimento automático de alimentos</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span className="font-semibold">Estimativa precisa de calorias e macros</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span className="font-semibold">Análise instantânea com IA avançada</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span className="font-semibold">Histórico completo de análises</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-lg py-6">
              <Lock className="w-5 h-5 mr-2" />
              Assinar Premium por R$ 29,90/mês
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
        <h2 className="text-2xl font-bold">Análise por Foto (IA)</h2>
        <div className="w-20" />
      </div>

      <Alert className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-300">
        <Sparkles className="w-4 h-4 text-pink-600" />
        <AlertDescription className="text-pink-900">
          Tire uma foto da sua refeição e nossa IA identificará os alimentos e calculará calorias e macronutrientes automaticamente!
        </AlertDescription>
      </Alert>

      {/* Upload de Imagem */}
      {!image && (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-4">
              <Camera className="w-16 h-16 text-muted-foreground" />
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Adicione uma foto da refeição</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tire uma foto ou selecione da galeria
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-pink-500 to-rose-600 text-white"
                size="lg"
              >
                <Upload className="w-5 h-5 mr-2" />
                Selecionar Foto
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview da Imagem */}
      {image && (
        <Card>
          <CardContent className="p-4">
            <img
              src={image}
              alt="Refeição"
              className="w-full h-auto rounded-lg max-h-96 object-cover"
            />
            <div className="flex gap-2 mt-4">
              <Button
                onClick={analyzeImage}
                disabled={analyzing}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 text-white"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analisar com IA
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setImage(null);
                  setResult(null);
                  setError(null);
                }}
              >
                Nova Foto
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Erro */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Resultado da Análise */}
      {result && (
        <div className="space-y-4">
          <Card className="border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-600" />
                Análise Completa
              </CardTitle>
              <CardDescription>
                Confiança da análise: {(result.confidence * 100).toFixed(0)}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{result.totalCalories}</div>
                  <div className="text-xs text-muted-foreground">Calorias</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{result.totalProtein}g</div>
                  <div className="text-xs text-muted-foreground">Proteínas</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{result.totalCarbs}g</div>
                  <div className="text-xs text-muted-foreground">Carboidratos</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{result.totalFat}g</div>
                  <div className="text-xs text-muted-foreground">Gorduras</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Alimentos Identificados:</h4>
                {result.foods.map((food, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <div className="font-semibold">{food.name}</div>
                      <div className="text-sm text-muted-foreground">{food.quantity}</div>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      {food.calories} kcal
                    </Badge>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                Adicionar ao Diário
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
