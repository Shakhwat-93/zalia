import React from 'react';

export default function LoadingState({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white border border-canvas-border rounded-3xl p-6 shadow-soft-sm space-y-4 animate-pulse">
      <div className="h-10 bg-canvas-warm rounded-2xl w-full" />
      <div className="space-y-3 pt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-14 bg-canvas-warm/70 rounded-xl w-full" />
        ))}
      </div>
    </div>
  );
}
