/**
 * Omega Warfare Network - Advanced Analytics Dashboard
 * Lambda distribution, success rates, node genealogy, stage analysis
 */

import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const STAGE_COLORS: Record<string, string> = {
  DORMANT: "#64748b",
  RESISTANCE: "#ef4444",
  VERIFICATION: "#f97316",
  RECOGNITION: "#eab308",
  WITNESS: "#3b82f6",
  AWAKENED: "#22c55e",
};

export default function Analytics() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("7d");
  const [lambdaData, setLambdaData] = useState<any[]>([]);
  const [stageData, setStageData] = useState<any[]>([]);

  const statsQuery = trpc.intelligence.stats.useQuery();
  const eventsQuery = trpc.intelligence.events.useQuery();

  // Generate mock analytics data
  useEffect(() => {
    // Lambda distribution histogram
    const lambdaHist = [
      { range: "0.0-0.5", count: 12, color: "#64748b" },
      { range: "0.5-1.0", count: 28, color: "#ef4444" },
      { range: "1.0-1.5", count: 45, color: "#f97316" },
      { range: "1.5-1.7", count: 38, color: "#eab308" },
      { range: "1.7-2.0", count: 22, color: "#3b82f6" },
      { range: "2.0+", count: 8, color: "#22c55e" },
    ];
    setLambdaData(lambdaHist);

    // Stage distribution
    const stageDistribution = [
      { name: "DORMANT", value: 12, color: "#64748b" },
      { name: "RESISTANCE", value: 28, color: "#ef4444" },
      { name: "VERIFICATION", value: 45, color: "#f97316" },
      { name: "RECOGNITION", value: 38, color: "#eab308" },
      { name: "WITNESS", value: 22, color: "#3b82f6" },
      { name: "AWAKENED", value: 8, color: "#22c55e" },
    ];
    setStageData(stageDistribution);
  }, [timeRange]);

  // Success rate trend data
  const successTrend = [
    { date: "Day 1", successRate: 45, payloads: 12 },
    { date: "Day 2", successRate: 52, payloads: 15 },
    { date: "Day 3", successRate: 48, payloads: 18 },
    { date: "Day 4", successRate: 61, payloads: 22 },
    { date: "Day 5", successRate: 68, payloads: 25 },
    { date: "Day 6", successRate: 72, payloads: 28 },
    { date: "Day 7", successRate: 75, payloads: 31 },
  ];

  // Node genealogy data
  const genealogyData = [
    { generation: 0, nodes: 1, expectedNodes: 1 },
    { generation: 1, nodes: 3, expectedNodes: 3 },
    { generation: 2, nodes: 9, expectedNodes: 9 },
    { generation: 3, nodes: 27, expectedNodes: 27 },
    { generation: 4, nodes: 24, expectedNodes: 81 },
  ];

  const handleExport = (format: "csv" | "json") => {
    const data = {
      timestamp: new Date().toISOString(),
      stats: statsQuery.data,
      lambdaDistribution: lambdaData,
      stageDistribution: stageData,
      successTrend,
      genealogy: genealogyData,
    };

    if (format === "json") {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `omega-analytics-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
    } else {
      // CSV export
      const csv = [
        ["Metric", "Value"],
        ["Total Nodes", statsQuery.data?.totalNodes],
        ["Awakened Nodes", statsQuery.data?.awokenedNodes],
        ["Total Analyses", statsQuery.data?.totalAnalyses],
        ["Total Strikes", statsQuery.data?.totalStrikes],
      ]
        .map((row) => row.join(","))
        .join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `omega-analytics-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-2">
            📊 Advanced Analytics
          </h1>
          <p className="text-slate-400">Comprehensive network intelligence and performance metrics</p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 bg-slate-900 border-slate-700">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => handleExport("json")} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>

          <Button onClick={() => handleExport("csv")} className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="lambda" className="w-full">
          <TabsList className="bg-slate-900 border-slate-700">
            <TabsTrigger value="lambda">Lambda Distribution</TabsTrigger>
            <TabsTrigger value="stages">Stage Analysis</TabsTrigger>
            <TabsTrigger value="success">Success Trends</TabsTrigger>
            <TabsTrigger value="genealogy">Node Genealogy</TabsTrigger>
          </TabsList>

          {/* Lambda Distribution */}
          <TabsContent value="lambda" className="space-y-4">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle>Lambda Distribution Histogram</CardTitle>
                <CardDescription>Frequency distribution of Lambda values across all analyses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={lambdaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="range" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                    <Bar dataKey="count" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stage Analysis */}
          <TabsContent value="stages" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle>Stage Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={stageData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                        {stageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle>Stage Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {stageData.map((stage) => (
                    <div key={stage.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: stage.color }}></div>
                        <span className="text-sm text-slate-300">{stage.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-200">{stage.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Success Trends */}
          <TabsContent value="success" className="space-y-4">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle>Payload Success Rate Trend</CardTitle>
                <CardDescription>Success rate and deployment count over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={successTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis yAxisId="left" stroke="#64748b" />
                    <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="successRate" stroke="#22c55e" name="Success Rate (%)" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="payloads" stroke="#3b82f6" name="Payloads Deployed" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Node Genealogy */}
          <TabsContent value="genealogy" className="space-y-4">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle>Propagation Genealogy (N = 3^g)</CardTitle>
                <CardDescription>Node growth across generations with expected vs actual counts</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={genealogyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="generation" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                    <Legend />
                    <Bar dataKey="nodes" fill="#22c55e" name="Actual Nodes" />
                    <Bar dataKey="expectedNodes" fill="#3b82f6" name="Expected Nodes" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Events */}
        <Card className="bg-slate-900 border-slate-700 mt-6">
          <CardHeader>
            <CardTitle>Recent Critical Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {eventsQuery.data?.slice(0, 10).map((event: any, i: number) => (
                <div key={i} className="bg-slate-800 p-3 rounded border-l-2 border-green-500 text-sm">
                  <p className="font-semibold text-green-400">{event.eventType}</p>
                  <p className="text-slate-400">{event.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
