import React, { useState } from 'react';
import {
  FileText,
  Crosshair,
  Camera,
  Mic,
  AlertTriangle,
  CheckCircle2,
  ThumbsUp,
  Clock,
  MapPin,
  ShieldAlert,
  Send,
  Plus
} from 'lucide-react';

interface ReportItem {
  id: string;
  coords: { x: number; y: number };
  category: string;
  severity: string;
  description: string;
  hasPhoto: boolean;
  hasAudio: boolean;
  matchesCount: number;
  timestamp: string;
  status: 'Pending Review' | 'Community Supported' | 'Verified by Trusted Source' | 'Resolved';
  upvotes: number;
  authorHandle: string;
}

interface CommunityReportsViewProps {
  reports: ReportItem[];
  onSubmitReport: (data: {
    category: string;
    severity: string;
    description: string;
    hasPhoto: boolean;
    hasAudio: boolean;
    coords?: { x: number; y: number };
  }) => void;
  onUpvoteReport: (id: string) => void;
  isPinDropMode: boolean;
  setIsPinDropMode: (val: boolean) => void;
  tempPin: { x: number; y: number } | null;
  onSelectReportOnMap: (coords: { x: number; y: number }) => void;
}

export const CommunityReportsView: React.FC<CommunityReportsViewProps> = ({
  reports,
  onSubmitReport,
  onUpvoteReport,
  isPinDropMode,
  setIsPinDropMode,
  tempPin,
  onSelectReportOnMap
}) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Road Hazard');
  const [severity, setSeverity] = useState('Medium');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const categories = [
    'Road Hazard',
    'Accident Bottleneck',
    'Safety & Lighting',
    'Temporary Closure',
    'Accessibility Barrier',
    'Cleanliness Issue',
    'Weather Disruption',
    'Local Recommendation'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onSubmitReport({
      category,
      severity,
      description: description.trim(),
      hasPhoto,
      hasAudio,
      coords: tempPin || undefined
    });

    setDescription('');
    setHasPhoto(false);
    setHasAudio(false);
  };

  const filteredReports = reports.filter(r => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  const getStatusBadge = (status: ReportItem['status']) => {
    switch (status) {
      case 'Verified by Trusted Source':
        return { label: 'Verified by Trusted Source', bg: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' };
      case 'Community Supported':
        return { label: 'Community Supported', bg: 'bg-amber-500/15 text-amber-500 border-amber-500/30' };
      case 'Resolved':
        return { label: 'Resolved Issue', bg: 'bg-sky-500/15 text-sky-500 border-sky-500/30' };
      default:
        return { label: 'Pending Review', bg: 'bg-slate-500/15 text-slate-400 border-slate-500/30' };
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500/10 via-[var(--bg-card)] to-amber-500/10 border border-[var(--border-strong)] rounded-3xl p-6 sm:p-8 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold">
            <FileText className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Citizen Civic Transparency
          </span>
        </div>

        <h2 className="font-editorial text-2xl sm:text-4xl font-black text-[var(--text-main)] leading-tight">
          Community Reports & Civic Hazard Verification
        </h2>

        <p className="text-xs sm:text-sm text-[var(--text-subtle)] max-w-2xl leading-relaxed">
          Contribute timely updates on road damages, unlit stretches, flash waterlogging, and accessibility obstacles. Reports are auto-clustered within 500m to eliminate duplicates.
        </p>

        <div className="mt-2 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
          <span>Anti-Spam Threshold: Proximity cluster radius ~500m</span>
          <span className="text-rose-500 font-bold">{reports.length} Active Citizen Reports</span>
        </div>
      </div>

      {/* Submit Report Card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-editorial text-lg font-black text-[var(--text-main)] flex items-center gap-2">
            <span>Submit a Civic Report or Hazard</span>
          </h3>

          <button
            type="button"
            onClick={() => setIsPinDropMode(!isPinDropMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
              isPinDropMode
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-main)] border-[var(--border-subtle)] hover:text-rose-500'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>{isPinDropMode ? 'Pin Drop Active (Tap Map)' : 'Choose Exact Location on Map'}</span>
          </button>
        </div>

        {tempPin && (
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center justify-between font-mono">
            <span>Pinned Location: Coordinates [{tempPin.x}, {tempPin.y}]</span>
            <span className="font-bold">Locked ✓</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-bold text-[var(--text-muted)] block mb-1">
                CATEGORY
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-xs text-[var(--text-main)] focus:outline-none focus:border-amber-500"
              >
                {categories.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[var(--text-muted)] block mb-1">
                SEVERITY
              </label>
              <select
                value={severity}
                onChange={e => setSeverity(e.target.value)}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-xs text-[var(--text-main)] focus:outline-none focus:border-amber-500"
              >
                <option value="Low">Low (Informational / Minor)</option>
                <option value="Medium">Medium (Caution / Delay)</option>
                <option value="High">High (Immediate Danger / Avoid)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[var(--text-muted)] block mb-1">
              HAZARD DESCRIPTION
            </label>
            <textarea
              rows={3}
              placeholder="Describe the condition with landmark context (e.g. Uncovered trench outside metro pillar 42, streetlights dark for 200m stretch)..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl p-3 text-xs text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
              <label className="flex items-center gap-1.5 cursor-pointer hover:text-[var(--text-main)]">
                <input
                  type="checkbox"
                  checked={hasPhoto}
                  onChange={e => setHasPhoto(e.target.checked)}
                  className="rounded accent-amber-500"
                />
                <Camera className="w-3.5 h-3.5 text-amber-500" />
                <span>Attach Photo Proof (+1 Verification)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-[var(--text-main)]">
                <input
                  type="checkbox"
                  checked={hasAudio}
                  onChange={e => setHasAudio(e.target.checked)}
                  className="rounded accent-amber-500"
                />
                <Mic className="w-3.5 h-3.5 text-sky-500" />
                <span>Audio Note Attached</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!description.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Citizen Report</span>
            </button>
          </div>
        </form>
      </div>

      {/* Filter Reports by Status */}
      <div className="flex items-center justify-between gap-3 flex-wrap text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[var(--text-muted)]">Filter Status:</span>
          {(['all', 'Verified by Trusted Source', 'Community Supported', 'Pending Review'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === s
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-main)]'
              }`}
            >
              {s === 'all' ? 'All Reports' : s}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-[var(--text-muted)] font-mono">
          Showing {filteredReports.length} reports
        </span>
      </div>

      {/* Reports Feed */}
      <div className="space-y-3">
        {filteredReports.map(report => {
          const badge = getStatusBadge(report.status);

          return (
            <div
              key={report.id}
              className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col justify-between gap-3 shadow-sm hover:border-amber-500/40 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-[var(--text-main)] uppercase tracking-wider">
                      {report.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg}`}>
                      {badge.label}
                    </span>
                    <span className="text-[10px] text-rose-500 font-mono font-bold">
                      Severity: {report.severity}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-main)] mt-2 leading-relaxed">
                    {report.description}
                  </p>
                </div>

                <button
                  onClick={() => onUpvoteReport(report.id)}
                  className="px-3 py-1.5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-amber-500 hover:text-white border border-[var(--border-subtle)] text-xs font-bold flex items-center gap-1.5 transition-all shrink-0"
                  title="Confirm report is accurate"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>+1 Confirm</span>
                  <span className="font-mono text-amber-500">({report.upvotes})</span>
                </button>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
                <div className="flex items-center gap-3">
                  <span>@{report.authorHandle}</span>
                  <span>•</span>
                  <span>{report.timestamp}</span>
                  {report.hasPhoto && <span>• 📷 Photo Attached</span>}
                  {report.hasAudio && <span>• 🎙️ Audio Attached</span>}
                </div>

                <button
                  onClick={() => onSelectReportOnMap(report.coords)}
                  className="text-amber-500 hover:underline font-bold"
                >
                  Highlight on Map [{report.coords.x}, {report.coords.y}] →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
