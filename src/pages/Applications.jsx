import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Modal, { FormGroup, inputStyle } from '../components/ui/Modal';
import Button from '../components/ui/Button';
import AppCard from '../components/ui/AppCard';
import EmptyState from '../components/ui/EmptyState';
import { DEFAULT_STEPS } from '../utils/constants';

function AppFormModal({ isOpen, onClose, editingApp }) {
  const { addApp, updateApp, resumes } = useApp();

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [source, setSource] = useState('college');
  const [resume, setResume] = useState('');
  const [status, setStatus] = useState('applied');
  const [deadline, setDeadline] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [platformlink, setPlatformlink] = useState('');
  const [steps, setSteps] = useState([...DEFAULT_STEPS]);
  const [notes, setNotes] = useState('');
  const [companyError, setCompanyError] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingApp) {
      setCompany(editingApp.company || '');
      setRole(editingApp.role || '');
      setSource(editingApp.source || 'college');
      setResume(editingApp.resume || '');
      setStatus(editingApp.status || 'applied');
      setDeadline(editingApp.deadline || '');
      setLogin(editingApp.login || '');
      setPassword(editingApp.password || '');
      setPlatformlink(editingApp.platformlink || '');
      setSteps(editingApp.steps || [...DEFAULT_STEPS]);
      setNotes(editingApp.notes || '');
      setCompanyError(false);
    } else {
      // Reset to defaults
      setCompany('');
      setRole('');
      setSource('college');
      setResume('');
      setStatus('applied');
      setDeadline('');
      setLogin('');
      setPassword('');
      setPlatformlink('');
      setSteps([...DEFAULT_STEPS]);
      setNotes('');
      setCompanyError(false);
    }
  }, [editingApp, isOpen]);

  const handleSave = () => {
    // Validate company field
    if (!company.trim()) {
      setCompanyError(true);
      return;
    }

    const appData = {
      company,
      role,
      source,
      resume,
      status,
      deadline,
      login,
      password,
      platformlink,
      steps: steps.filter((s) => s.trim()),
      notes,
    };

    if (editingApp) {
      updateApp(editingApp.id, appData);
    } else {
      addApp(appData);
    }

    onClose();
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const updateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingApp ? 'Edit Application' : 'Add New Application'}
    >
      {/* ROW 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <FormGroup label="Company *" error={companyError ? 'Company is required' : null}>
          <input
            type="text"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              setCompanyError(false);
            }}
            style={{
              ...inputStyle,
              ...(companyError && {
                borderColor: 'var(--red)',
                background: 'var(--red-dim)',
              }),
            }}
            placeholder="Google, Microsoft, etc."
          />
        </FormGroup>

        <FormGroup label="Role">
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
            placeholder="Software Engineer"
          />
        </FormGroup>
      </div>

      {/* ROW 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <FormGroup label="Source">
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={inputStyle}
          >
            <option value="college">College Placement Cell</option>
            <option value="linkedin">LinkedIn</option>
            <option value="naukri">Naukri</option>
            <option value="direct">Direct Apply</option>
            <option value="other">Other</option>
          </select>
        </FormGroup>

        <FormGroup label="Resume Used">
          <select
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            style={inputStyle}
          >
            <option value="">No resume linked</option>
            {resumes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </FormGroup>
      </div>

      {/* ROW 3 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <FormGroup label="Status">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={inputStyle}
          >
            <option value="applied">Applied</option>
            <option value="test">Online Test</option>
            <option value="interview">Interview Round</option>
            <option value="offer">Offer Received</option>
            <option value="rejected">Rejected</option>
          </select>
        </FormGroup>

        <FormGroup label="Next Deadline">
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={inputStyle}
          />
        </FormGroup>
      </div>

      {/* ROW 4 */}
      <FormGroup label="Portal Login">
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          style={inputStyle}
          placeholder="username or email"
        />
      </FormGroup>

      {/* ROW 5 */}
      <FormGroup label="Portal Password">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          placeholder="••••••••"
        />
      </FormGroup>

      {/* ROW 6 */}
      <FormGroup label="Source Platform Link">
        <input
          type="text"
          value={platformlink}
          onChange={(e) => setPlatformlink(e.target.value)}
          style={inputStyle}
          placeholder="https://linkedin.com/jobs/... or college portal URL"
        />
      </FormGroup>

      {/* ROW 7 - Recruitment Steps */}
      <FormGroup label="Recruitment Steps">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {steps.map((step, index) => (
            <div key={index} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="text"
                value={step}
                onChange={(e) => updateStep(index, e.target.value)}
                style={{ ...inputStyle, padding: '8px 10px', flex: 1 }}
                placeholder={`Step ${index + 1}`}
              />
              <button
                onClick={() => removeStep(index)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  color: 'var(--red)',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addStep}
            style={{
              background: 'transparent',
              border: '1px dashed var(--border)',
              borderRadius: 'var(--radius)',
              padding: '8px 12px',
              cursor: 'pointer',
              color: 'var(--muted)',
              fontSize: 13,
              fontWeight: 500,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border2)';
              e.currentTarget.style.color = 'var(--text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--muted)';
            }}
          >
            + Add Step
          </button>
        </div>
      </FormGroup>

      {/* ROW 8 - Notes */}
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
          placeholder="Additional notes or reminders..."
        />
      </FormGroup>

      {/* FOOTER */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <Button size="md" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button size="md" variant="primary" onClick={handleSave}>
          Save Application
        </Button>
      </div>
    </Modal>
  );
}

export default function Applications() {
  const { apps, deleteApp } = useApp();
  const location = useLocation();

  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSource, setFilterSource] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  // Check if modal should be opened on mount (from navigation state)
  useEffect(() => {
    if (location.state?.openModal) {
      setIsModalOpen(true);
    }
  }, [location.state]);

  // Filtering logic
  const filtered = apps
    .filter((a) => {
      if (!searchText) return true;
      return [a.company, a.role, a.source].some((f) =>
        f?.toLowerCase().includes(searchText.toLowerCase())
      );
    })
    .filter((a) => !filterStatus || a.status === filterStatus)
    .filter((a) => !filterSource || a.source === filterSource);

  const handleEdit = (id) => {
    setEditingApp(apps.find((a) => a.id === id));
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this application?')) {
      deleteApp(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingApp(null);
  };

  return (
    <div>
      {/* TOP BAR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
            Applications
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>
            {apps.length} {apps.length === 1 ? 'application' : 'applications'} tracked
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Quick Add
        </Button>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <input
          type="text"
          placeholder="Search company, role, source..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            flex: 1,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            padding: '9px 14px',
            borderRadius: 'var(--radius)',
            fontSize: 13,
            outline: 'none',
          }}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            padding: '9px 14px',
            borderRadius: 'var(--radius)',
            fontSize: 13,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="">All Status</option>
          <option value="applied">Applied</option>
          <option value="test">Online Test</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            padding: '9px 14px',
            borderRadius: 'var(--radius)',
            fontSize: 13,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="">All Sources</option>
          <option value="college">College Cell</option>
          <option value="linkedin">LinkedIn</option>
          <option value="naukri">Naukri</option>
          <option value="direct">Direct Apply</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* RENDER LIST */}
      {apps.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No applications yet"
          subtitle="Click Quick Add to track your first"
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No results found"
          subtitle="Try different search or filters"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...filtered].reverse().map((app) => (
            <AppCard
              key={app.id}
              app={app}
              compact={false}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* MODAL */}
      <AppFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingApp={editingApp}
      />
    </div>
  );
}
