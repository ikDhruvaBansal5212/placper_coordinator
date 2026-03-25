import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import Modal, { FormGroup, inputStyle } from '../components/ui/Modal';
import Button from '../components/ui/Button';
import TaskItem from '../components/ui/TaskItem';
import EmptyState from '../components/ui/EmptyState';
import { TASK_CATEGORIES, TASK_CATEGORY_COLORS } from '../utils/constants';
import { todayKey, tomorrowKey, getStreak, getProgressPercent } from '../utils/dateUtils';
import { colorToText } from '../utils/colorUtils';

function TaskFormModal({ isOpen, onClose, targetDay }) {
  const { addTask } = useApp();

  const [text, setText] = useState('');
  const [category, setCategory] = useState('dsa');
  const [type, setType] = useState('task');
  const [textError, setTextError] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setText('');
      setCategory('dsa');
      setType('task');
      setTextError(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    // Validate text field
    if (!text.trim()) {
      setTextError(true);
      return;
    }

    addTask({
      text,
      category,
      type,
      targetDay,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={targetDay === 'today' ? 'Add Task for Today' : 'Add Task for Tomorrow'}
    >
      {/* Task text */}
      <FormGroup label="Task *" error={textError ? 'Task is required' : null}>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setTextError(false);
          }}
          style={{
            ...inputStyle,
            ...(textError && {
              borderColor: 'var(--red)',
              background: 'var(--red-dim)',
            }),
          }}
          placeholder="Complete DSA problems, Study for exam..."
        />
      </FormGroup>

      {/* Category */}
      <FormGroup label="Category">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        >
          {Object.entries(TASK_CATEGORIES).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </FormGroup>

      {/* Type */}
      <FormGroup label="Type">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={inputStyle}
        >
          <option value="habit">Habit - repeats daily</option>
          <option value="task">One off Task</option>
        </select>
      </FormGroup>

      {/* FOOTER */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <Button size="md" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button size="md" variant="primary" onClick={handleSave}>
          Add Task
        </Button>
      </div>
    </Modal>
  );
}

export default function DailyPlanner({ windowWidth }) {
  const {
    tasks,
    habitCompletions,
    toggleTask,
    toggleHabitToday,
    deleteTask,
    tomorrowNote,
    setTomorrowNote,
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTargetDay, setModalTargetDay] = useState('today');

  const todayFormatted = format(new Date(), 'EEEE, d MMMM');

  // Filter tasks
  const habits = tasks.filter((t) => t.type === 'habit');
  const todayTasks = tasks.filter((t) => t.type === 'task' && t.targetDay === 'today');
  const tomorrowTasks = tasks.filter((t) => t.targetDay === 'tomorrow');

  // Calculate today's progress
  const allToday = [
    ...habits.map((h) => ({
      ...h,
      done: habitCompletions[todayKey()]?.includes(h.id),
    })),
    ...todayTasks,
  ];
  const progressPct = getProgressPercent(allToday);
  const doneCount = allToday.filter((t) => t.done).length;
  const totalCount = allToday.length;

  const isSmallScreen = windowWidth < 900;

  const openModal = (targetDay) => {
    setModalTargetDay(targetDay);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* TOP BAR */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
          Daily Planner
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>
          {todayFormatted}
        </p>
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isSmallScreen ? '1fr' : '1fr 1fr',
          gap: 20,
          alignItems: 'start',
        }}
      >
        {/* ═════ LEFT COLUMN ═════ */}
        <div>
          {/* HEADER ROW */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontFamily: 'DM Mono',
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: 'var(--muted)',
              }}
            >
              TODAY'S TASKS
            </div>
            <Button size="sm" variant="primary" onClick={() => openModal('today')}>
              + Add
            </Button>
          </div>

          {/* HABITS SECTION */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'DM Mono',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: 8,
              }}
            >
              HABITS / RECURRING
            </div>
            {habits.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {habits.map((habit) => (
                  <TaskItem
                    key={habit.id}
                    task={{
                      ...habit,
                      done: habitCompletions[todayKey()]?.includes(habit.id),
                    }}
                    onToggle={() => toggleHabitToday(habit.id)}
                    onDelete={() => deleteTask(habit.id)}
                  />
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: 'var(--muted)' }}>
                No habits yet — add a daily habit to track streaks
              </p>
            )}
          </div>

          {/* ONE-OFF TASKS SECTION */}
          <div style={{ marginTop: 16 }}>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'DM Mono',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: 8,
              }}
            >
              ONE-OFF TASKS
            </div>
            {todayTasks.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {todayTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                    onDelete={() => deleteTask(task.id)}
                  />
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: 'var(--muted)' }}>
                Nothing else scheduled for today
              </p>
            )}
          </div>

          {/* PROGRESS CARD */}
          <div
            style={{
              marginTop: 16,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontFamily: 'DM Mono',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: 10,
              }}
            >
              TODAY'S PROGRESS
            </div>
            {/* Progress bar */}
            <div
              style={{
                width: '100%',
                height: 6,
                background: 'var(--border)',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPct}%`,
                  height: '100%',
                  background: 'var(--accent)',
                  borderRadius: 3,
                  transition: 'width 0.3s',
                }}
              />
            </div>
            <div
              style={{
                fontSize: 12,
                fontFamily: 'DM Mono',
                color: 'var(--muted)',
                marginTop: 8,
              }}
            >
              {progressPct}% complete · {doneCount} / {totalCount}
            </div>
          </div>
        </div>

        {/* ═════ RIGHT COLUMN ═════ */}
        <div>
          {/* HEADER ROW */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontFamily: 'DM Mono',
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: 'var(--muted)',
              }}
            >
              TOMORROW'S PLAN
            </div>
            <Button size="sm" variant="primary" onClick={() => openModal('tomorrow')}>
              + Add
            </Button>
          </div>

          {/* Tomorrow's tasks */}
          {tomorrowTasks.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tomorrowTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '20px 0',
                color: 'var(--muted)',
                fontSize: 13,
              }}
            >
              Plan your tomorrow — nothing added yet
            </div>
          )}

          {/* QUICK NOTE CARD */}
          <div
            style={{
              marginTop: 12,
              border: '1px dashed var(--border2)',
              borderRadius: 'var(--radius)',
              padding: '12px 14px',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontFamily: 'DM Mono',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: 8,
              }}
            >
              QUICK NOTE FOR TOMORROW
            </div>
            <textarea
              value={tomorrowNote}
              onChange={(e) => setTomorrowNote(e.target.value)}
              style={{
                ...inputStyle,
                minHeight: 60,
                fontSize: 12,
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
              placeholder="Anything to remember for tomorrow..."
            />
          </div>

          {/* HABIT STREAKS SECTION */}
          {habits.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: 'DM Mono',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: 10,
                }}
              >
                HABIT STREAKS
              </div>
              {habits.map((habit) => {
                const streak = getStreak(habitCompletions, habit.id);
                return (
                  <div
                    key={habit.id}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 6,
                    }}
                  >
                    {/* Category color dot */}
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: colorToText(TASK_CATEGORY_COLORS[habit.category]),
                      }}
                    />
                    {/* Task text */}
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {habit.text}
                    </div>
                    {/* Streak */}
                    <div
                      style={{
                        color: 'var(--amber)',
                        fontWeight: 700,
                        fontSize: 13,
                        fontFamily: 'DM Mono',
                        flexShrink: 0,
                      }}
                    >
                      {streak > 0 ? `🔥 ${streak} days` : '—'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetDay={modalTargetDay}
      />
    </div>
  );
}
