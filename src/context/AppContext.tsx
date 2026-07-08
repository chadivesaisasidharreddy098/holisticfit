import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Task, Reward, RedemptionCode } from '../types';
import { DEFAULT_TASKS, DEFAULT_REWARDS } from '../data/defaults';

interface AppContextType {
  currentUser: User | null;
  tasks: Task[];
  rewards: Reward[];
  redemptionCodes: RedemptionCode[];
  loading: boolean;
  error: string | null;
  setError: (err: string | null) => void;
  signup: (username: string, email: string, password_hash: string, gender: string) => boolean;
  login: (email: string, password_hash: string) => boolean;
  logout: () => void;
  completeTask: (taskId: string) => void;
  purchaseReward: (rewardId: string) => boolean;
  toggleRedemptionCodeUsed: (codeId: string) => void;
  addCustomTask: (title: string, description: string, coins: number) => void;
  deleteTask: (taskId: string) => void;
  addCustomReward: (title: string, description: string, cost: number, imageUrl?: string) => void;
  deleteReward: (rewardId: string) => void;
  checkAndResetTasks: () => void;
  forceResetAllTasks: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [redemptionCodes, setRedemptionCodes] = useState<RedemptionCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data on mount
  useEffect(() => {
    try {
      // Check if we need to initialize a default demo user
      const usersRaw = localStorage.getItem('gamified_users');
      let registeredUsers = usersRaw ? JSON.parse(usersRaw) : [];
      if (registeredUsers.length === 0) {
        // Create demo user
        const demoUser: User = {
          id: 'u_demo_alex',
          username: 'Alex (Demo)',
          email: 'alex@example.com',
          gender: 'other',
          coins: 350, // Nice balance to purchase something
          createdAt: new Date().toISOString()
        };
        registeredUsers = [demoUser];
        localStorage.setItem('gamified_users', JSON.stringify(registeredUsers));

        // Create credential
        const credentials = [{ userId: demoUser.id, email: 'alex@example.com', password: 'password123' }];
        localStorage.setItem('gamified_credentials', JSON.stringify(credentials));

        // Create default tasks for demo user
        const demoTasks: Task[] = DEFAULT_TASKS.map((t, idx) => ({
          ...t,
          id: `t_demo_alex_${idx}`,
          userId: demoUser.id,
          completed: idx < 3, // mark first 3 tasks as completed
          lastCompleted: idx < 3 ? new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() : null, // 4 hours ago
          createdAt: new Date().toISOString()
        }));
        localStorage.setItem(`gamified_tasks_${demoUser.id}`, JSON.stringify(demoTasks));

        // Create a custom redemption code to show claimed rewards
        const demoCode: RedemptionCode = {
          id: 'c_demo_1',
          code: 'A39F7D0E2B8C',
          userId: demoUser.id,
          rewardId: 'r_book', // Free Book of Choice
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          used: false
        };
        localStorage.setItem(`gamified_codes_${demoUser.id}`, JSON.stringify([demoCode]));
      }

      // Load current user
      const savedUser = localStorage.getItem('gamified_current_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser) as User;
        setCurrentUser(parsedUser);

        // Load tasks for this user
        const savedTasks = localStorage.getItem(`gamified_tasks_${parsedUser.id}`);
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }

        // Load redemption codes for this user
        const savedCodes = localStorage.getItem(`gamified_codes_${parsedUser.id}`);
        if (savedCodes) {
          setRedemptionCodes(JSON.parse(savedCodes));
        }
      }

      // Load rewards
      const savedRewards = localStorage.getItem('gamified_rewards');
      if (savedRewards) {
        setRewards(JSON.parse(savedRewards));
      } else {
        setRewards(DEFAULT_REWARDS);
        localStorage.setItem('gamified_rewards', JSON.stringify(DEFAULT_REWARDS));
      }
    } catch (e) {
      console.error('Failed to load initial data', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync tasks when they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`gamified_tasks_${currentUser.id}`, JSON.stringify(tasks));
    }
  }, [tasks, currentUser]);

  // Sync redemption codes when they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`gamified_codes_${currentUser.id}`, JSON.stringify(redemptionCodes));
    }
  }, [redemptionCodes, currentUser]);

  // Sync current user when they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('gamified_current_user', JSON.stringify(currentUser));
      // Update the user details in the general users registry
      const registeredUsers = JSON.parse(localStorage.getItem('gamified_users') || '[]');
      const updatedUsers = registeredUsers.map((u: User) => u.id === currentUser.id ? currentUser : u);
      localStorage.setItem('gamified_users', JSON.stringify(updatedUsers));
    } else {
      localStorage.removeItem('gamified_current_user');
    }
  }, [currentUser]);

  // Check for 24-hour daily task reset
  const checkAndResetTasks = () => {
    if (!currentUser || tasks.length === 0) return;

    const now = new Date();
    let hasChanges = false;

    const updatedTasks = tasks.map(task => {
      if (task.completed && task.lastCompleted) {
        const lastCompletedTime = new Date(task.lastCompleted);
        const diffMs = now.getTime() - lastCompletedTime.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        // Reset if 24 hours have passed
        if (diffHours >= 24) {
          hasChanges = true;
          return {
            ...task,
            completed: false,
            lastCompleted: null
          };
        }
      }
      return task;
    });

    if (hasChanges) {
      setTasks(updatedTasks);
    }
  };

  // Run the check on load and periodically
  useEffect(() => {
    checkAndResetTasks();
    const interval = setInterval(checkAndResetTasks, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [currentUser, tasks]);

  // Force reset all completed tasks (for testing/demo convenience!)
  const forceResetAllTasks = () => {
    if (!currentUser) return;
    const updatedTasks = tasks.map(t => ({
      ...t,
      completed: false,
      lastCompleted: null
    }));
    setTasks(updatedTasks);
  };

  const signup = (username: string, email: string, password_hash: string, gender: string): boolean => {
    setError(null);
    try {
      const usersRaw = localStorage.getItem('gamified_users');
      const registeredUsers = usersRaw ? JSON.parse(usersRaw) : [];

      // Email check
      const emailExists = registeredUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        setError('Email is already registered.');
        return false;
      }

      // Username check
      const usernameExists = registeredUsers.some((u: any) => u.username.toLowerCase() === username.toLowerCase());
      if (usernameExists) {
        setError('Username is already taken.');
        return false;
      }

      const newUser: User = {
        id: 'u_' + Math.random().toString(36).substr(2, 9),
        username,
        email,
        gender,
        coins: 100, // Starts with 100 welcome coins!
        createdAt: new Date().toISOString()
      };

      // Save user record (simulate hash storage alongside user info for simple mock auth)
      const credentials = JSON.parse(localStorage.getItem('gamified_credentials') || '[]');
      credentials.push({ userId: newUser.id, email, password: password_hash });
      localStorage.setItem('gamified_credentials', JSON.stringify(credentials));

      registeredUsers.push(newUser);
      localStorage.setItem('gamified_users', JSON.stringify(registeredUsers));

      // Login
      setCurrentUser(newUser);

      // Initialize user's tasks
      const initialTasks: Task[] = DEFAULT_TASKS.map((t, idx) => ({
        ...t,
        id: `t_${newUser.id}_${idx}_${Math.random().toString(36).substr(2, 5)}`,
        userId: newUser.id,
        completed: false,
        lastCompleted: null,
        createdAt: new Date().toISOString()
      }));

      setTasks(initialTasks);
      setRedemptionCodes([]);

      return true;
    } catch (e) {
      console.error(e);
      setError('An error occurred during sign up.');
      return false;
    }
  };

  const login = (email: string, password_hash: string): boolean => {
    setError(null);
    try {
      const credentials = JSON.parse(localStorage.getItem('gamified_credentials') || '[]');
      const match = credentials.find((c: any) => c.email.toLowerCase() === email.toLowerCase() && c.password === password_hash);

      if (!match) {
        setError('Invalid email or password.');
        return false;
      }

      const usersRaw = localStorage.getItem('gamified_users');
      const registeredUsers = usersRaw ? JSON.parse(usersRaw) : [];
      const matchedUser = registeredUsers.find((u: User) => u.id === match.userId);

      if (!matchedUser) {
        setError('User record not found.');
        return false;
      }

      // Load details
      setCurrentUser(matchedUser);

      const savedTasks = localStorage.getItem(`gamified_tasks_${matchedUser.id}`);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        // Fallback or re-init defaults if somehow missing
        const initialTasks: Task[] = DEFAULT_TASKS.map((t, idx) => ({
          ...t,
          id: `t_${matchedUser.id}_${idx}_${Math.random().toString(36).substr(2, 5)}`,
          userId: matchedUser.id,
          completed: false,
          lastCompleted: null,
          createdAt: new Date().toISOString()
        }));
        setTasks(initialTasks);
      }

      const savedCodes = localStorage.getItem(`gamified_codes_${matchedUser.id}`);
      if (savedCodes) {
        setRedemptionCodes(JSON.parse(savedCodes));
      } else {
        setRedemptionCodes([]);
      }

      return true;
    } catch (e) {
      console.error(e);
      setError('An error occurred during log in.');
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setTasks([]);
    setRedemptionCodes([]);
    setError(null);
  };

  const completeTask = (taskId: string) => {
    if (!currentUser) return;

    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const task = tasks[taskIndex];
    if (task.completed) return; // Prevent double completion

    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...task,
      completed: true,
      lastCompleted: new Date().toISOString()
    };

    setTasks(updatedTasks);

    // Reward coins
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        coins: prev.coins + task.coins
      };
    });
  };

  const purchaseReward = (rewardId: string): boolean => {
    if (!currentUser) return false;

    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) {
      setError('Reward not found.');
      return false;
    }

    if (currentUser.coins < reward.cost) {
      setError('Not enough coins!');
      return false;
    }

    // Generate unique code similar to Flask code
    // Flask: code = ''.join([str(hex(int(c))[2:]).upper() for c in os.urandom(6)])
    // Let's create an elegant hex code
    const hexChars = '0123456789ABCDEF';
    let code = '';
    for (let i = 0; i < 12; i++) {
      code += hexChars[Math.floor(Math.random() * 16)];
    }

    const newRedemption: RedemptionCode = {
      id: 'c_' + Math.random().toString(36).substr(2, 9),
      code,
      userId: currentUser.id,
      rewardId: reward.id,
      createdAt: new Date().toISOString(),
      used: false
    };

    // Deduct coins
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        coins: prev.coins - reward.cost
      };
    });

    setRedemptionCodes(prev => [newRedemption, ...prev]);
    return true;
  };

  const toggleRedemptionCodeUsed = (codeId: string) => {
    if (!currentUser) return;
    setRedemptionCodes(prev =>
      prev.map(c => c.id === codeId ? { ...c, used: !c.used } : c)
    );
  };

  const addCustomTask = (title: string, description: string, coins: number) => {
    if (!currentUser) return;

    const newTask: Task = {
      id: `t_${currentUser.id}_custom_${Math.random().toString(36).substr(2, 9)}`,
      userId: currentUser.id,
      title,
      description,
      coins,
      completed: false,
      lastCompleted: null,
      createdAt: new Date().toISOString(),
      isCustom: true
    };

    setTasks(prev => [newTask, ...prev]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const addCustomReward = (title: string, description: string, cost: number, imageUrl?: string) => {
    if (!currentUser) return;

    const fallbackImages = [
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80', // Wellness
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80', // Yoga
      'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600&q=80', // Spa
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80'  // Coffee/gift
    ];

    const randomImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

    const newReward: Reward = {
      id: `r_custom_${Math.random().toString(36).substr(2, 9)}`,
      title,
      description,
      cost,
      imageUrl: imageUrl || randomImage,
      isCustom: true
    };

    const updatedRewards = [newReward, ...rewards];
    setRewards(updatedRewards);
    localStorage.setItem('gamified_rewards', JSON.stringify(updatedRewards));
  };

  const deleteReward = (rewardId: string) => {
    const updatedRewards = rewards.filter(r => r.id !== rewardId);
    setRewards(updatedRewards);
    localStorage.setItem('gamified_rewards', JSON.stringify(updatedRewards));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      tasks,
      rewards,
      redemptionCodes,
      loading,
      error,
      setError,
      signup,
      login,
      logout,
      completeTask,
      purchaseReward,
      toggleRedemptionCodeUsed,
      addCustomTask,
      deleteTask,
      addCustomReward,
      deleteReward,
      checkAndResetTasks,
      forceResetAllTasks
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
