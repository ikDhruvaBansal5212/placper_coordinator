import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { todayKey } from '../utils/dateUtils';

const AppContext = createContext(null);

function AppProvider({ children }) {
  // State management using localStorage
  const [apps, setApps] = useLocalStorage('placement_apps', []);
  const [resumes, setResumes] = useLocalStorage('resume_vault', []);
  const [tasks, setTasks] = useLocalStorage('planner_tasks', []);
  const [habitCompletions, setHabitCompletions] = useLocalStorage('habit_completions', {});
  const [tomorrowNote, setTomorrowNote] = useLocalStorage('tomorrow_note', '');

  // Seed sample data on first use
  useEffect(() => {
    if (apps.length === 0) {
      // Add 3 sample applications
      const sampleApps = [
        {
          id: Date.now().toString(),
          company: 'Infosys',
          role: 'Systems Engineer',
          source: 'college',
          status: 'test',
          addedOn: new Date().toISOString()
        },
        {
          id: (Date.now() + 1).toString(),
          company: 'Razorpay',
          role: 'SDE Intern',
          source: 'linkedin',
          status: 'applied',
          addedOn: new Date().toISOString()
        },
        {
          id: (Date.now() + 2).toString(),
          company: 'TCS',
          role: 'Digital',
          source: 'college',
          status: 'applied',
          addedOn: new Date().toISOString()
        }
      ];
      setApps(sampleApps);

      // Add 1 sample resume
      const sampleResume = {
        id: Date.now().toString(),
        name: 'Resume v1',
        label: 'General'
      };
      setResumes([sampleResume]);

      // Add 2 sample tasks
      const sampleTasks = [
        {
          id: Date.now().toString(),
          text: 'Solve 2 LeetCode problems',
          category: 'dsa',
          type: 'habit',
          done: false,
          createdAt: todayKey()
        },
        {
          id: (Date.now() + 1).toString(),
          text: 'Check college placement portal',
          category: 'placement',
          type: 'task',
          done: false,
          createdAt: todayKey()
        }
      ];
      setTasks(sampleTasks);
    }
  }, []);

  // Application functions
  const addApp = (data) => {
    const newApp = {
      ...data,
      id: Date.now().toString(),
      addedOn: new Date().toISOString()
    };
    setApps([...apps, newApp]);
  };

  const updateApp = (id, data) => {
    setApps(apps.map(app => app.id === id ? { ...app, ...data } : app));
  };

  const deleteApp = (id) => {
    setApps(apps.filter(app => app.id !== id));
  };

  // Resume functions
  const addResume = (data) => {
    const newResume = {
      ...data,
      id: Date.now().toString()
    };
    setResumes([...resumes, newResume]);
  };

  const updateResume = (id, data) => {
    setResumes(resumes.map(resume => resume.id === id ? { ...resume, ...data } : resume));
  };

  const deleteResume = (id) => {
    setResumes(resumes.filter(resume => resume.id !== id));
  };

  // Task functions
  const addTask = (data) => {
    const newTask = {
      ...data,
      id: Date.now().toString(),
      done: false,
      createdAt: todayKey()
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Habit completion functions
  const toggleHabitToday = (habitId) => {
    const today = todayKey();
    const currentCompletions = habitCompletions[today] || [];

    if (currentCompletions.includes(habitId)) {
      // Remove habitId
      setHabitCompletions({
        ...habitCompletions,
        [today]: currentCompletions.filter(id => id !== habitId)
      });
    } else {
      // Add habitId
      setHabitCompletions({
        ...habitCompletions,
        [today]: [...currentCompletions, habitId]
      });
    }
  };

  const value = {
    // State
    apps,
    resumes,
    tasks,
    habitCompletions,
    tomorrowNote,
    // Functions
    addApp,
    updateApp,
    deleteApp,
    addResume,
    updateResume,
    deleteResume,
    addTask,
    toggleTask,
    deleteTask,
    toggleHabitToday,
    setTomorrowNote
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);

export default AppProvider;
