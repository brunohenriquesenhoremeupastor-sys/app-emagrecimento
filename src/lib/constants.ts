import { Challenge, Recipe } from './types';

export const FREE_MODULES = [
  'meal_plan_basic',
  'food_diary',
  'challenges'
] as const;

export const PREMIUM_MODULES = [
  'meal_plan_advanced',
  'workouts',
  'ai_analysis',
  'community'
] as const;

export const SAMPLE_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'Hidratação Diária',
    description: 'Beba 2 litros de água por dia durante 7 dias',
    duration: 7,
    points: 50,
    icon: 'Droplets',
    completed: false,
    progress: 0
  },
  {
    id: '2',
    title: 'Zero Açúcar',
    description: 'Evite açúcar refinado por 3 dias consecutivos',
    duration: 3,
    points: 30,
    icon: 'Candy',
    completed: false,
    progress: 0
  },
  {
    id: '3',
    title: 'Caminhada Matinal',
    description: 'Caminhe 30 minutos todas as manhãs por 5 dias',
    duration: 5,
    points: 40,
    icon: 'Footprints',
    completed: false,
    progress: 0
  },
  {
    id: '4',
    title: 'Alimentação Consciente',
    description: 'Registre todas as refeições por 7 dias',
    duration: 7,
    points: 60,
    icon: 'BookOpen',
    completed: false,
    progress: 0
  }
];

export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Omelete de Claras com Vegetais',
    category: 'Café da Manhã',
    calories: 180,
    protein: 22,
    carbs: 8,
    fat: 6,
    prepTime: 15,
    ingredients: [
      '4 claras de ovo',
      '1 tomate picado',
      '1/2 cebola picada',
      'Espinafre a gosto',
      'Sal e pimenta'
    ],
    instructions: [
      'Bata as claras levemente',
      'Refogue os vegetais',
      'Adicione as claras e cozinhe até firmar',
      'Tempere e sirva'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    isPremium: false
  },
  {
    id: '2',
    name: 'Salada de Quinoa com Frango',
    category: 'Almoço',
    calories: 420,
    protein: 35,
    carbs: 42,
    fat: 12,
    prepTime: 25,
    ingredients: [
      '150g de peito de frango grelhado',
      '1 xícara de quinoa cozida',
      'Alface, tomate, pepino',
      'Azeite e limão'
    ],
    instructions: [
      'Cozinhe a quinoa',
      'Grelhe o frango e corte em cubos',
      'Monte a salada com os vegetais',
      'Tempere com azeite e limão'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    isPremium: false
  },
  {
    id: '3',
    name: 'Salmão com Batata Doce',
    category: 'Jantar',
    calories: 480,
    protein: 38,
    carbs: 35,
    fat: 18,
    prepTime: 30,
    ingredients: [
      '180g de salmão',
      '200g de batata doce',
      'Brócolis no vapor',
      'Ervas finas'
    ],
    instructions: [
      'Asse a batata doce em cubos',
      'Grelhe o salmão com ervas',
      'Cozinhe o brócolis no vapor',
      'Monte o prato e sirva'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    isPremium: false
  }
];

export const DAILY_CALORIE_GOALS = {
  lose_weight: -500,
  maintain: 0,
  gain_muscle: 300
};

export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9
};
