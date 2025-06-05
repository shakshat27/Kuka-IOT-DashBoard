"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for the errors table
const errorsData = [
  {
    id: "ERR-001",
    timestamp: "2023-05-14 08:23:15",
    robotId: "KR-1000-1",
    errorCode: "E-STOP-01",
    description: "Emergency stop triggered",
    severity: "high",
  },
  {
    id: "ERR-002",
    timestamp: "2023-05-14 10:45:32",
    robotId: "KR-1000-2",
    errorCode: "TEMP-02",
    description: "Temperature threshold exceeded",
    severity: "medium",
  },
  {
    id: "ERR-003",
    timestamp: "2023-05-14 14:12:07",
    robotId: "KR-1000-3",
    errorCode: "COMM-03",
    description: "Communication timeout",
    severity: "low",
  },
]

export function ErrorsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Robot ID</TableHead>
            <TableHead>Error Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Severity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {errorsData.map((error) => (
            <TableRow key={error.id}>
              <TableCell className="font-mono text-xs">{error.timestamp}</TableCell>
              <TableCell>{error.robotId}</TableCell>
              <TableCell className="font-mono">{error.errorCode}</TableCell>
              <TableCell>{error.description}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    error.severity === "high"
                      ? "border-red-500 text-red-500"
                      : error.severity === "medium"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-blue-500 text-blue-500"
                  }
                >
                  {error.severity}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
