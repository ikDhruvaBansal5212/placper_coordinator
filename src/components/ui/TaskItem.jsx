import { useState } from 'react';
import Tag from './Tag';
import { TASK_CATEGORIES, TASK_CATEGORY_COLORS } from '../../utils/constants';
import { colorToStyle } from '../../utils/colorUtils';

export default function TaskItem({ task, onToggle, onDelete }) {
  const [showDelete, setShowDelete] = useState(false);

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '10px 14px',
    transition: 'border-color 0.15s',
    position: 'relative',
  };

  const checkboxStyle = {
    width: 18,
    height: 18,
    borderRadius: '50%',
    border: '1.5px solid var(--border2)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.15s',
    ...(task.done && {
      background: 'var(--accent)',
      borderColor: 'var(--accent)',
    }),
    ...(!task.done && {
      background: 'transparent',
    }),
  };

  const checkmarkStyle = {
    fontSize: 11,
    color: '#0e0f11',
    fontWeight: 700,
  };

  const middleStyle = {
    flex: 1,
  };

  const textStyle = {
    fontSize: 13,
    fontWeight: 500,
    color: task.done ? 'var(--muted)' : 'var(--text)',
    textDecoration: task.done ? 'line-through' : 'none',
    marginBottom: 6,
  };

  const deleteButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'var(--muted)',
    cursor: 'pointer',
    fontSize: 18,
    padding: '0 4px',
    lineHeight: 1,
  };

  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const deleteButtonHoverStyle = {
    ...deleteButtonStyle,
    ...(isDeleteHovered && { color: 'var(--red)' }),
  };

  return (
    <div
      style={rowStyle}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {/* LEFT - Checkbox */}
      <div style={checkboxStyle} onClick={() => onToggle(task.id)}>
        {task.done && <span style={checkmarkStyle}>✓</span>}
      </div>

      {/* MIDDLE - Text and Tag */}
      <div style={middleStyle}>
        <div style={textStyle}>{task.text}</div>
        <Tag
          color={TASK_CATEGORY_COLORS[task.category]}
        >
          {TASK_CATEGORIES[task.category]}
        </Tag>
      </div>

      {/* RIGHT - Delete Button */}
      {showDelete && (
        <button
          style={deleteButtonHoverStyle}
          onClick={() => onDelete(task.id)}
          onMouseEnter={() => setIsDeleteHovered(true)}
          onMouseLeave={() => setIsDeleteHovered(false)}
        >
          ×
        </button>
      )}
    </div>
  );
}
