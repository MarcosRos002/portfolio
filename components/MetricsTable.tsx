import type { ProjectMetrics } from "@/lib/projects";

// MetricsTable.tsx — leads each case study with production metrics (stub).
// TODO (Phase 1): proper styling; highlight precision/recall vs latency/cost.
export function MetricsTable({ metrics }: { metrics: ProjectMetrics }) {
  const rows: [string, string][] = [
    ["Precision", metrics.precision],
    ["Recall", metrics.recall],
    ["Latency P50", metrics.latencyP50],
    ["Latency P95", metrics.latencyP95],
    ["Cost / request", metrics.costPerRequest],
  ];

  return (
    <table>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <th scope="row" style={{ textAlign: "left", paddingRight: "1rem" }}>
              {label}
            </th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
