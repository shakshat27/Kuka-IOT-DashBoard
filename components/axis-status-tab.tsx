import React, { useEffect, useState } from "react"

const AXES = ["A1", "A2", "A3", "A4", "A5", "A6"]

type AxisPositions = {
  [key: string]: number | null
}

export function AxisStatusTab() {
  const [positions, setPositions] = useState<AxisPositions>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPositions() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch("/api/robot-axes")
        const data = await res.json()
        setPositions(data)
      } catch (err) {
        setError("Failed to fetch OPC UA data")
      } finally {
        setLoading(false)
      }
    }
    fetchPositions()
    const interval = setInterval(fetchPositions, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Axis Positions (Live from OPC UA)</h2>
      {error && <div className="text-red-600">{error}</div>}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-shrink-0 cursor-pointer">
          <img
            src="/robot-visual.png"
            alt="KUKA Robot Visual"
            className="w-[320px] h-[390px] object-contain"
            style={{ background: "transparent" }}
          />
        </div>
        <div className="flex-1">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-border rounded-lg">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left">Axis</th>
                  <th className="px-4 py-2 text-left">Position (°)</th>
                </tr>
              </thead>
              <tbody>
                {AXES.map(axis => (
                  <tr key={axis} className="border-t border-border">
                    <td className="px-4 py-2 font-medium">{axis}</td>
                    <td className="px-4 py-2">{positions[axis] !== undefined && positions[axis] !== null ? Number(positions[axis]).toFixed(2) : loading ? "Loading..." : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
