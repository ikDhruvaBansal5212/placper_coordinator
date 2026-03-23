// Format date string to human-readable format
export function formatDate(dateStr) {
  if (!dateStr) return '';

  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate - today;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Today
  if (diffDays === 0) return 'Today';

  // Tomorrow
  if (diffDays === 1) return 'Tomorrow';

  // Past dates
  if (diffDays < 0) {
    const absDays = Math.abs(diffDays);
    return `${absDays}d ago`;
  }

  // Future dates within 7 days
  if (diffDays <= 7) {
    return `In ${diffDays} days`;
  }

  // Further dates - format as "Mon DD"
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
}

// Get urgency color based on date
export function dateUrgencyColor(dateStr) {
  if (!dateStr) return 'var(--muted)';

  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate - today;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Past dates
  if (diffDays < 0) return 'var(--muted)';

  // 0-2 days away (urgent)
  if (diffDays <= 2) return 'var(--red)';

  // 3-7 days away (soon)
  if (diffDays <= 7) return 'var(--amber)';

  // 8+ days away (plenty of time)
  return 'var(--green)';
}

// Get today's date as YYYY-MM-DD
export function todayKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Get tomorrow's date as YYYY-MM-DD
export function tomorrowKey() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Calculate consecutive days streak for a habit
export function getStreak(completionHistory, habitId) {
  if (!completionHistory || !habitId) return 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Check backwards from today
  while (true) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;

    const completions = completionHistory[dateKey] || [];

    // If habitId appears in this day's completions, increment streak
    if (completions.includes(habitId)) {
      streak++;
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      // Streak broken
      break;
    }
  }

  return streak;
}

// Calculate percentage of completed tasks
export function getProgressPercent(tasks) {
  if (!tasks || tasks.length === 0) return 0;

  const completedCount = tasks.filter(task => task.done).length;
  const percent = (completedCount / tasks.length) * 100;

  return Math.round(percent);
}
