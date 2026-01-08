import { Cloud, Wind, Sparkles, Sun, Waves } from 'lucide-react';

export const emotionsData = {
  sad: {
    name: 'Sad',
    icon: Cloud,
    color: '#64748B',
    accentColor: '#94A3B8',
    bgColor: 'from-slate-50 via-blue-50 to-indigo-100',
    textColor: 'text-slate-700',
    cardBg: 'bg-white/70',
    accentBg: 'bg-blue-100/80',
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
    color: '#EA580C',
    accentColor: '#FB923C',
    bgColor: 'from-orange-50 via-amber-50 to-yellow-100',
    textColor: 'text-orange-700',
    cardBg: 'bg-white/70',
    accentBg: 'bg-orange-100/80',
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
    bgColor: 'from-gray-50 via-slate-50 to-zinc-100',
    textColor: 'text-gray-700',
    cardBg: 'bg-white/70',
    accentBg: 'bg-gray-100/80',
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
    color: '#7C3AED',
    accentColor: '#A78BFA',
    bgColor: 'from-violet-50 via-purple-50 to-indigo-100',
    textColor: 'text-violet-700',
    cardBg: 'bg-white/70',
    accentBg: 'bg-violet-100/80',
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
    color: '#059669',
    accentColor: '#34D399',
    bgColor: 'from-emerald-50 via-green-50 to-teal-100',
    textColor: 'text-emerald-700',
    cardBg: 'bg-white/70',
    accentBg: 'bg-emerald-100/80',
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
    color: '#0891B2',
    accentColor: '#22D3EE',
    bgColor: 'from-cyan-50 via-sky-50 to-blue-100',
    textColor: 'text-cyan-700',
    cardBg: 'bg-white/70',
    accentBg: 'bg-cyan-100/80',
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