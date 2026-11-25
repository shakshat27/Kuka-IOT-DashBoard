# KUKA IoT Dashboard

A web dashboard for KUKA industrial robots that reads live joint positions from the robot controller over OPC UA.

<!-- screenshot: docs/dashboard.png -->

## Features

- **Live axis status**: A1-A6 actual positions from the KUKA controller's OPC UA server, refreshed every 2 s
- Overview, robots, maintenance and analytics tabs with stat cards, a performance chart and an error table
  (these currently show sample data)
- Light and dark theme, responsive layout

## Architecture

```
KUKA controller (OPC UA, port 4840)
        │  opcua client
        ▼
opc_server.py  (Flask, :5005)  ── GET /api/axis-positions
        │
        ▼
Next.js API route /api/robot-axes ──► React dashboard (Status tab)
```

## Tech stack

Next.js 15 · React · TypeScript · Tailwind CSS · shadcn/ui · Recharts · Python · Flask · python-opcua

## Run locally

```bash
# 1. OPC UA bridge
pip install flask opcua
export OPCUA_URL=opc.tcp://<controller-ip>:4840 OPCUA_USER=<user> OPCUA_PASSWORD=<password>
python opc_server.py

# 2. Dashboard
npm install
npm run dev        # http://localhost:3000
```

## Structure

| path | contents |
|---|---|
| `opc_server.py` | Flask bridge: connects to the controller and returns A1-A6 as JSON |
| `app/api/robot-axes/route.ts` | Next.js route that proxies the bridge |
| `components/kuka-robot-dashboard.tsx` | main dashboard layout and tabs |
| `components/axis-status-tab.tsx` | live axis view |
| `components/ui/` | shadcn/ui components |
