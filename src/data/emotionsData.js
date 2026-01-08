import { Cloud, Wind, Sparkles, Sun, Waves } from 'lucide-react';

export const emotionsData = {
  sad: {
    name: 'Sad',
    icon: Cloud,
    color: '#4A5568',
    accentColor: '#60A5FA',
    bgColor: 'from-slate-900 via-blue-900 to-indigo-900',
    quotes: [
      "It's okay to feel sad. This feeling will pass, and brighter days are ahead.",
      "Your feelings are valid. Be gentle with yourself during difficult times.",
      "Even the darkest night will end and the sun will rise."
    ],
    tips: [
      "Take slow, deep breaths for 2 minutes",
      "Write down three things you're grateful for",
      "Reach out to a friend or loved one"
    ],
    animation: 'rain'
  },
  anxious: {
    name: 'Anxious',
    icon: Wind,
    color: '#D97706',
    accentColor: '#FBBF24',
    bgColor: 'from-orange-900 via-amber-800 to-yellow-900',
    quotes: [
      "You are stronger than your anxiety. Take one moment at a time.",
      "Worrying does not take away tomorrow's troubles, it takes away today's peace.",
      "This too shall pass. You've overcome challenges before."
    ],
    tips: [
      "Practice the 5-4-3-2-1 grounding technique",
      "Focus on what you can control right now",
      "Take a short walk outside if possible"
    ],
    animation: 'storm'
  },
  helpless: {
    name: 'Helpless',
    icon: Cloud,
    color: '#6B7280',
    accentColor: '#9CA3AF',
    bgColor: 'from-gray-900 via-slate-800 to-zinc-900',
    quotes: [
      "You are not alone. Small steps forward are still progress.",
      "Every ending is a new beginning. You have the strength within you.",
      "It's okay to ask for help. Reaching out is a sign of courage."
    ],
    tips: [
      "Break your challenges into smaller, manageable steps",
      "Remember past difficulties you've overcome",
      "Connect with a support system or counselor"
    ],
    animation: 'aurora'
  },
  unfocused: {
    name: 'Unfocused',
    icon: Sparkles,
    color: '#8B5CF6',
    accentColor: '#A78BFA',
    bgColor: 'from-purple-900 via-indigo-900 to-violet-900',
    quotes: [
      "Clear your mind, one task at a time. You've got this.",
      "Progress, not perfection. Focus on what matters most right now.",
      "Take a break when needed. Your mind deserves rest too."
    ],
    tips: [
      "Try the Pomodoro technique: 25 minutes focus, 5 minutes break",
      "Remove distractions from your environment",
      "Start with the easiest task to build momentum"
    ],
    animation: 'galaxy'
  },
  happy: {
    name: 'Happy',
    icon: Sun,
    color: '#10B981',
    accentColor: '#34D399',
    bgColor: 'from-emerald-900 via-green-800 to-teal-900',
    quotes: [
      "Your joy is contagious. Share your light with the world.",
      "Celebrate this moment. You deserve all the happiness you feel.",
      "Happiness looks good on you. Keep spreading those positive vibes!"
    ],
    tips: [
      "Share your happiness with someone you care about",
      "Write down what made you happy today",
      "Take a moment to savor this feeling"
    ],
    animation: 'fireflies'
  },
  calm: {
    name: 'Calm',
    icon: Waves,
    color: '#3B82F6',
    accentColor: '#60A5FA',
    bgColor: 'from-cyan-900 via-blue-900 to-teal-900',
    quotes: [
      "Peace begins with a smile and a deep breath.",
      "In the midst of movement and chaos, keep stillness inside of you.",
      "You are exactly where you need to be. Breathe and be present."
    ],
    tips: [
      "Practice mindful breathing for 3 minutes",
      "Observe your surroundings without judgment",
      "Enjoy this peaceful moment fully"
    ],
    animation: 'ocean'
  }
};