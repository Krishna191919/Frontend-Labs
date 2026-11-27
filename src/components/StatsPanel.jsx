// A deliberately chunky, non-route component — lazy-loaded on demand so it
// never ships with the initial bundle.
import { Button } from './ui/Button.jsx'

const ROWS = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  label: `Metric #${i + 1}`,
  value: Math.round(Math.random() * 100),
}))

export default function StatsPanel({ onClose }) {
  const total = ROWS.reduce((sum, r) => sum + r.value, 0)
  const avg = Math.round(total / ROWS.length)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[80vh] w-full max-w-2xl overflow-auto rounded-card border border-line bg-surface p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold">Stats (heavy chunk)</h2>
          <Button variant="ghost" onClick={onClose} aria-label="Close stats">
            ✕
          </Button>
        </div>
        <p className="mt-1 text-sm text-muted">
          This panel is code-split: its code only downloads when you click the
          button. 200 rows, total {total}, avg {avg}.
        </p>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="py-1">#</th>
              <th>Metric</th>
              <th className="text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.id} className="border-b border-line/50">
                <td className="py-1 text-muted">{r.id}</td>
                <td>{r.label}</td>
                <td className="text-right text-primary">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
