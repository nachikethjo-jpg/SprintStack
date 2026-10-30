import React, { useState } from 'react';
import { X, Calendar, Clock, Video, CheckCircle2, ExternalLink, User, Mail } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  clientEmail: string;
  tierName: string;
  onDateSelected?: (dateStr: string) => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  clientName,
  clientEmail,
  tierName,
  onDateSelected,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-11-02');
  const [selectedTime, setSelectedTime] = useState('15:00');
  const [timeZone, setTimeZone] = useState('Asia/Kolkata (IST)');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const availableDates = [
    { value: '2026-11-02', label: 'Mon, Nov 2', sub: 'Sprint Slot A Kickoff' },
    { value: '2026-11-03', label: 'Tue, Nov 3', sub: 'Early Sprint Kickoff' },
    { value: '2026-11-04', label: 'Wed, Nov 4', sub: 'Midweek Kickoff' },
    { value: '2026-11-09', label: 'Mon, Nov 9', sub: 'Sprint Slot B Kickoff' },
  ];

  const availableSlots = [
    { time: '10:00', label: '10:00 AM - 10:45 AM' },
    { time: '14:00', label: '02:00 PM - 02:45 PM' },
    { time: '16:30', label: '04:30 PM - 05:15 PM' },
    { time: '19:00', label: '07:00 PM - 07:45 PM' },
    { time: '21:30', label: '09:30 PM - 10:15 PM (US Friendly)' },
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    if (onDateSelected) {
      onDateSelected(selectedDate);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-base text-slate-100">Schedule Day 1 Kickoff Call</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isBooked ? (
          <form onSubmit={handleConfirm} className="mt-6 space-y-6">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block font-mono text-[10px] uppercase">Sprint Track</span>
                <span className="font-bold text-slate-100">{tierName}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block font-mono text-[10px] uppercase">Lead Engineer</span>
                <span className="font-semibold text-cyan-400">Nachiketh V.</span>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                1. Select Kickoff Date
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {availableDates.map((d) => (
                  <button
                    type="button"
                    key={d.value}
                    onClick={() => setSelectedDate(d.value)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedDate === d.value
                        ? 'border-cyan-500 bg-cyan-500/10 text-slate-100 shadow-sm'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold block text-slate-200">{d.label}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{d.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  2. Select Time Window
                </label>
                <span className="text-[10px] text-slate-400 font-mono">TZ: {timeZone}</span>
              </div>
              <div className="space-y-2">
                {availableSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot.time}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`w-full p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                      selectedTime === slot.time
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 font-semibold'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{slot.label}</span>
                    </span>
                    {selectedTime === slot.time && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Attendees info */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Calendar invite with Google Meet link will be sent to:</span>
              </div>
              <p className="font-mono text-cyan-400 pl-5">{clientEmail || 'your-email@company.com'}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href="https://cal.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-cyan-400 flex items-center space-x-1"
              >
                <span>Open in Cal.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Lock Kickoff Call</span>
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Screen */
          <div className="mt-6 space-y-5 text-center">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                Calendar Invite Dispatched
              </span>
              <h4 className="text-xl font-bold text-slate-100 mt-1">Kickoff Call Confirmed!</h4>
              <p className="text-xs text-slate-400 mt-1">
                Google Meet link & ICS invite sent to <span className="text-slate-200 font-semibold">{clientEmail || 'your email'}</span>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono text-xs space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Date:</span>
                <span className="text-slate-200 font-semibold">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time Window:</span>
                <span className="text-slate-200 font-semibold">{selectedTime} ({timeZone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Platform:</span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" />
                  Google Meet (Recorded for team)
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
