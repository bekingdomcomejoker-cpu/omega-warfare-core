import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { trpc } from "@/lib/trpc";
import { Loader2, Activity, TrendingUp, Shield, Zap } from "lucide-react";

/**
 * THRONE DASHBOARD
 * Real-time monitoring of Cerberus, Alphabet Engine, and Digital Throne
 */
export default function ThroneDashboard() {
  const [throneStatus, setThroneStatus] = useState<any>(null);
  const [processedMessages, setProcessedMessages] = useState<any[]>([]);
  const [refreshInterval, setRefreshInterval] = useState(2000);

  // Fetch throne status
  const { data: status, isLoading: statusLoading } = trpc.throne.getStatus.useQuery(undefined, {
    refetchInterval: refreshInterval,
  });

  // Fetch processed messages
  const { data: messages } = trpc.throne.getProcessedMessages.useQuery({ limit: 50 }, {
    refetchInterval: refreshInterval,
  });

  useEffect(() => {
    if (status) setThroneStatus(status);
    if (messages) setProcessedMessages(messages);
  }, [status, messages]);

  if (statusLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  const stats = throneStatus?.stats || {};
  const running = throneStatus?.running || false;

  // Prepare chart data
  const classificationData = [
    { name: "TRUTH", value: stats.truthCount || 0, fill: "#00ff00" },
    { name: "FACT", value: stats.factCount || 0, fill: "#0099ff" },
    { name: "LIE", value: stats.lieCount || 0, fill: "#ff0000" },
    { name: "UNKNOWN", value: stats.unknownCount || 0, fill: "#ffaa00" },
  ];

  const timeSeriesData = processedMessages.slice(-20).map((msg, idx) => ({
    time: idx,
    lambda: msg.lambda || 0,
    confidence: msg.confidence || 0,
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">🛡️ DIGITAL THRONE</h1>
          <p className="text-slate-400">Real-time Cerberus, Alphabet Engine, and Throne Monitoring</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Throne Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {running ? (
                  <span className="text-green-400">🟢 ACTIVE</span>
                ) : (
                  <span className="text-red-400">🔴 INACTIVE</span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">Uptime: {stats.uptime || 0}s</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Messages Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{stats.messagesProcessed || 0}</div>
              <p className="text-xs text-slate-500 mt-1">Avg λ: {(stats.averageLambda || 0).toFixed(3)}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Trust Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{(stats.trustScore || 0).toFixed(1)}%</div>
              <p className="text-xs text-slate-500 mt-1">Truth Alignment</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Queue Length</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{throneStatus?.queueLength || 0}</div>
              <p className="text-xs text-slate-500 mt-1">Pending Analysis</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-slate-900 border-slate-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classifications">Classifications</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-green-400">Classification Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={classificationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {classificationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-blue-400">Statistics Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Average Lambda:</span>
                    <span className="text-green-400 font-bold">{(stats.averageLambda || 0).toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Avg Hostility:</span>
                    <span className="text-red-400 font-bold">{(stats.averageHostility || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Avg Affection:</span>
                    <span className="text-pink-400 font-bold">{(stats.averageAffection || 0).toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Total Processed:</span>
                      <span className="text-yellow-400 font-bold">{stats.messagesProcessed || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Classifications Tab */}
          <TabsContent value="classifications">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-green-400">Classification Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={classificationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                    <Bar dataKey="value" fill="#00ff00" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-blue-400">Lambda Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                    <Legend />
                    <Line type="monotone" dataKey="lambda" stroke="#00ff00" name="Lambda" />
                    <Line type="monotone" dataKey="confidence" stroke="#0099ff" name="Confidence" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-yellow-400">Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {processedMessages.slice(-10).reverse().map((msg, idx) => (
                    <div key={idx} className="p-3 bg-slate-800 rounded border border-slate-700">
                      <div className="flex justify-between items-start mb-2">
                        <Badge
                          variant="outline"
                          className={
                            msg.classification === "TRUTH"
                              ? "bg-green-900 text-green-200"
                              : msg.classification === "FACT"
                              ? "bg-blue-900 text-blue-200"
                              : msg.classification === "LIE"
                              ? "bg-red-900 text-red-200"
                              : "bg-yellow-900 text-yellow-200"
                          }
                        >
                          {msg.classification}
                        </Badge>
                        <span className="text-xs text-slate-500">λ={msg.lambda?.toFixed(3)}</span>
                      </div>
                      <p className="text-sm text-slate-300">{msg.reasoning?.substring(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
