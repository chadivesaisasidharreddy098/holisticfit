import { Task, Reward } from '../types';

export const DEFAULT_TASKS: Omit<Task, 'id' | 'userId' | 'createdAt' | 'lastCompleted' | 'completed'>[] = [
  { "title": "Complete Morning Exercise", "description": "Do 30 minutes of cardio or strength training", "coins": 50 },
  { "title": "Read a Book Chapter", "description": "Read at least one chapter of your current book", "coins": 30 },
  { "title": "Meditate", "description": "Practice mindfulness meditation for 10 minutes", "coins": 25 },
  { "title": "Learn a New Skill", "description": "Spend 30 minutes learning something new", "coins": 40 },
  { "title": "Write in Journal", "description": "Document your thoughts and experiences", "coins": 20 },
  { "title": "Cook a Healthy Meal", "description": "Prepare a balanced, nutritious meal", "coins": 35 },
  { "title": "Practice an Instrument", "description": "Spend 30 minutes practicing music", "coins": 45 },
  { "title": "Clean Living Space", "description": "Tidy up and organize your environment", "coins": 30 },
  { "title": "Contact a Friend", "description": "Reach out to someone you haven't talked to in a while", "coins": 25 },
  { "title": "Take a Nature Walk", "description": "Spend 20 minutes walking outdoors", "coins": 30 },
  { "title": "Learn a New Language", "description": "Practice vocabulary and grammar for 20 minutes", "coins": 40 },
  { "title": "Create Art", "description": "Spend time drawing, painting, or crafting", "coins": 35 },
  { "title": "Volunteer", "description": "Help others in your community", "coins": 50 },
  { "title": "Practice Photography", "description": "Take and edit some photos", "coins": 30 },
  { "title": "Write a Blog Post", "description": "Share your thoughts or knowledge online", "coins": 40 },
  { "title": "Do a Puzzle", "description": "Complete a crossword or jigsaw puzzle", "coins": 25 },
  { "title": "Garden Maintenance", "description": "Tend to plants and garden tasks", "coins": 35 },
  { "title": "Learn to Code", "description": "Practice programming for 30 minutes", "coins": 45 },
  { "title": "Practice Public Speaking", "description": "Prepare and deliver a short speech", "coins": 40 },
  { "title": "Organize Digital Files", "description": "Clean up and organize your computer", "coins": 30 },
  { "title": "Try a New Recipe", "description": "Cook something you've never made before", "coins": 35 },
  { "title": "Practice Yoga", "description": "Complete a yoga session", "coins": 30 },
  { "title": "Write Poetry", "description": "Create an original poem", "coins": 25 },
  { "title": "Study History", "description": "Learn about a historical event", "coins": 35 },
  { "title": "Practice Dance", "description": "Learn or practice a dance routine", "coins": 40 },
  { "title": "Do Home Repairs", "description": "Fix something that needs attention", "coins": 45 },
  { "title": "Learn About Finance", "description": "Study personal finance topics", "coins": 35 },
  { "title": "Practice Calligraphy", "description": "Work on your handwriting skills", "coins": 30 },
  { "title": "Study Science", "description": "Learn about a scientific concept", "coins": 40 },
  { "title": "Create Music", "description": "Compose or produce a piece of music", "coins": 45 }
];

export const DEFAULT_REWARDS: Reward[] = [
  {
    id: 'r_book',
    title: 'Free Book of Choice',
    description: 'Get any book from our partner bookstores',
    cost: 200,
    imageUrl: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'r_trip',
    title: 'Adventure Trip',
    description: 'Weekend getaway to a nearby destination',
    cost: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'r_yoga',
    title: '50% Off Yoga Equipment',
    description: 'Discount on premium yoga gear',
    cost: 300,
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'r_gym',
    title: '50% Off Gym Equipment',
    description: 'Discount on home gym essentials',
    cost: 400,
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'r_nutrition',
    title: 'Nutrition Consultation',
    description: 'One-hour session with a certified nutritionist',
    cost: 350,
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'r_meditation',
    title: 'Meditation Workshop',
    description: 'Full-day mindfulness workshop',
    cost: 250,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'r_trainer',
    title: 'Personal Training Session',
    description: 'One-on-one training with a certified trainer',
    cost: 450,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'r_retreat',
    title: 'Wellness Retreat Day',
    description: 'Full day of spa and wellness activities',
    cost: 600,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
  }
];
