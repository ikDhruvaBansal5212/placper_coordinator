import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Modal, { FormGroup, inputStyle } from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import EmptyState from '../components/ui/EmptyState';
import { Pencil, Trash } from 'lucide-react';

function ResumeFormModal({ isOpen, onClose, editingResume }) {
  const { addResume, updateResume } = useApp();

  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [fileName, setFileName] = useState('');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [nameError, setNameError] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingResume) {
      setName(editingResume.name || '');
      setLabel(editingResume.label || '');
      setFileName(editingResume.fileName || '');
      setLink(editingResume.link || '');
      setNotes(editingResume.notes || '');
      setNameError(false);
    } else {
      // Reset to defaults
      setName('');
      setLabel('');
      setFileName('');
      setLink('');
      setNotes('');
      setNameError(false);
    }
  }, [editingResume, isOpen]);

  const handleSave = () => {
    // Validate name field
    if (!name.trim()) {
      setNameError(true);
      return;
    }

    const resumeData = {
      name,
      label,
      fileName,
      link,
      notes,
    };

    if (editingResume) {
      updateResume(editingResume.id, resumeData);
    } else {
      addResume(resumeData);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingResume ? 'Edit Resume' : 'Add New Resume'}
    >
      {/* ROW 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <FormGroup label="Resume Name *" error={nameError ? 'Name is required' : null}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(false);
            }}
            style={{
              ...inputStyle,
              ...(nameError && {
                borderColor: 'var(--red)',
                background: 'var(--red-dim)',
              }),
            }}
            placeholder="Software Dev Resume"
          />
        </FormGroup>

        <FormGroup label="Label/Type">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            style={inputStyle}
            placeholder="e.g. Startup, Core CSE"
          />
        </FormGroup>
      </div>

      {/* ROW 2 */}
      <FormGroup label="File Name on Computer">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          style={inputStyle}
          placeholder="Resume_Arjun_v2.pdf — just the filename"
        />
      </FormGroup>

      {/* ROW 3 */}
      <FormGroup label="Online Link">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={inputStyle}
          placeholder="https://drive.google.com/... or Overleaf link"
        />
      </FormGroup>

      {/* ROW 4 */}
      <FormGroup label="Notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{
            ...inputStyle,
            minHeight: 80,
            resize: 'vertical',
            fontFamily: 'inherit',
          }}
          placeholder="What is different? Which companies is it best for?"
        />
      </FormGroup>

      {/* FOOTER */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <Button size="md" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button size="md" variant="primary" onClick={handleSave}>
          Save Resume
        </Button>
      </div>
    </Modal>
  );
}

export default function ResumeVault() {
  const { resumes, apps, deleteResume } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResume, setEditingResume] = useState(null);

  const handleEdit = (resume) => {
    setEditingResume(resume);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this resume?')) {
      deleteResume(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingResume(null);
  };

  const getResumeUsage = (resume) => {
    const usedInApps = apps.filter(
      (app) => app.resume === resume.id || app.resume === resume.name
    );
    return {
      count: usedInApps.length,
      companies: usedInApps.slice(0, 3).map((app) => app.company),
    };
  };

  return (
    <div>
      {/* TOP BAR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28,
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
            Resume Vault
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>
            All your resume versions
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Add Resume
        </Button>
      </div>

      {/* RESUME GRID */}
      {resumes.length === 0 ? (
        <EmptyState
          icon="📄"
          title="No resumes added"
          subtitle="Add your resume versions to track which one you used where"
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
          }}
        >
          {resumes.map((resume) => {
            const usage = getResumeUsage(resume);
            return (
              <div
                key={resume.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 18,
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                {/* TOP ROW */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ fontSize: 24 }}>📄</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(resume)}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(resume.id)}
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                </div>

                {/* Resume name */}
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    marginTop: 8,
                  }}
                >
                  {resume.name}
                </div>

                {/* Label tag */}
                {resume.label && (
                  <div style={{ marginTop: 6 }}>
                    <Tag color="purple" label={resume.label} />
                  </div>
                )}

                {/* File name */}
                {resume.fileName && (
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: 'DM Mono',
                      color: 'var(--muted)',
                      marginTop: 4,
                    }}
                  >
                    📁 {resume.fileName}
                  </div>
                )}

                {/* Online link */}
                {resume.link && (
                  <a
                    href={resume.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      fontSize: 11,
                      color: 'var(--blue)',
                      marginTop: 2,
                      textDecoration: 'none',
                    }}
                  >
                    🔗 Open Link
                  </a>
                )}

                {/* DIVIDER */}
                <div
                  style={{
                    borderTop: '1px solid var(--border)',
                    marginTop: 12,
                    paddingTop: 10,
                  }}
                >
                  {/* USAGE */}
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    Used in{' '}
                    <span
                      style={{
                        color: 'var(--accent)',
                        fontWeight: 600,
                      }}
                    >
                      {usage.count}
                    </span>{' '}
                    application{usage.count !== 1 ? 's' : ''}
                  </div>

                  {/* Company list */}
                  {usage.count > 0 && (
                    <div
                      style={{
                        fontSize: 11,
                        color: 'var(--muted)',
                        marginTop: 4,
                      }}
                    >
                      {usage.companies.join(', ')}
                      {usage.count > 3 && ` +${usage.count - 3} more`}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      <ResumeFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingResume={editingResume}
      />
    </div>
  );
}
