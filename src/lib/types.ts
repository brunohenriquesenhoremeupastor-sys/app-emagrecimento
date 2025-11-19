// Tipos do aplicativo de saúde e bem-estar

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  weight: number;
  height: number;
  age: number;
  goal: 'lose_weight' | 'maintain' | 'gain_muscle';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dietaryRestrictions: string[];
  isPremium: boolean;
  points: number;
  createdAt: Date;
};

export type Meal = {
  id: string;
  userId: string;
  date: Date;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl?: string;
  isAiAnalyzed?: boolean;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  duration: number; // dias
  points: number;
  icon: string;
  completed: boolean;
  progress: number;
};

export type Recipe = {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  isPremium: boolean;
};

export type Workout = {
  id: string;
  name: string;
  type: 'hiit' | 'functional' | 'cardio' | 'strength';
  duration: number;
  calories: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videoUrl?: string;
  isPremium: boolean;
};

export type FoodAnalysisResult = {
  foods: Array<{
    name: string;
    quantity: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  confidence: number;
};

export type ModuleType = 
  | 'meal_plan_basic'
  | 'food_diary'
  | 'challenges'
  | 'meal_plan_advanced'
  | 'workouts'
  | 'ai_analysis'
  | 'community';
