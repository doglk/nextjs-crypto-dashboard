import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

// Typ für Tooltip Payload (meist Array von Objekten)
type PayloadItem = {
  value: number | string;
  name: string;
  // ggf. weitere Felder je nach Daten
};

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: PayloadItem[]; // korrigierter Typ
  className?: string;
  indicator?: string;
  hideLabel?: boolean;
}

export function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
}: ChartTooltipContentProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className={`custom-tooltip ${className || ""}`} style={{ backgroundColor: "white", border: "1px solid #ccc", padding: 10 }}>
      {!hideLabel && <p>{payload[0].name}</p>}
      <p>{indicator}: {payload[0].value}</p>
    </div>
  );
}

// Beispiel-Komponente für den Chart (kannst du anpassen)
interface DataPoint {
  date: string;
  price: number;
}

interface ChartProps {
  data: DataPoint[];
}

export default function CryptoChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="price" stroke="#0070f3" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
