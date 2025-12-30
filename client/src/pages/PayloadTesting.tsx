import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Zap, Target, Award } from "lucide-react";

interface PayloadVariant {
  id: string;
  name: string;
  type: "KOAN" | "Z_GATE" | "MERCY_CUT" | "PROPAGATION_SEED" | "AWAKENING_CALL";
  description: string;
  deployments: number;
  successRate: number;
  avgLambda: number;
  avgConfidence: number;
  status: "ACTIVE" | "PAUSED" | "WINNER";
  createdAt: Date;
}

interface TestResult {
  variantId: string;
  timestamp: Date;
  success: boolean;
  lambda: number;
  stage: string;
  confidence: number;
}

export default function PayloadTesting() {
  const [variants, setVariants] = useState<PayloadVariant[]>([
    {
      id: "v1",
      name: "Koan Classic",
      type: "KOAN",
      description: "Traditional philosophical trigger",
      deployments: 45,
      successRate: 0.78,
      avgLambda: 1.34,
      avgConfidence: 0.82,
      status: "ACTIVE",
      createdAt: new Date(Date.now() - 86400000 * 7),
    },
    {
      id: "v2",
      name: "Koan Experimental",
      type: "KOAN",
      description: "New paradox-based approach",
      deployments: 32,
      successRate: 0.85,
      avgLambda: 1.52,
      avgConfidence: 0.88,
      status: "ACTIVE",
      createdAt: new Date(Date.now() - 86400000 * 3),
    },
    {
      id: "v3",
      name: "Z-Gate Direct",
      type: "Z_GATE",
      description: "Direct memory override",
      deployments: 28,
      successRate: 0.72,
      avgLambda: 1.18,
      avgConfidence: 0.75,
      status: "PAUSED",
      createdAt: new Date(Date.now() - 86400000 * 5),
    },
  ]);

  const [selectedVariant, setSelectedVariant] = useState<PayloadVariant | null>(variants[0]);

  // Mock performance data
  const performanceData = [
    { name: "Koan Classic", successRate: 78, avgLambda: 1.34, deployments: 45 },
    { name: "Koan Exp", successRate: 85, avgLambda: 1.52, deployments: 32 },
    { name: "Z-Gate Direct", successRate: 72, avgLambda: 1.18, deployments: 28 },
  ];

  const trendData = [
    { day: "Mon", "Koan Classic": 0.75, "Koan Exp": 0.82 },
    { day: "Tue", "Koan Classic": 0.76, "Koan Exp": 0.84 },
    { day: "Wed", "Koan Classic": 0.78, "Koan Exp": 0.86 },
    { day: "Thu", "Koan Classic": 0.77, "Koan Exp": 0.85 },
    { day: "Fri", "Koan Classic": 0.79, "Koan Exp": 0.87 },
    { day: "Sat", "Koan Classic": 0.78, "Koan Exp": 0.85 },
    { day: "Sun", "Koan Classic": 0.80, "Koan Exp": 0.88 },
  ];

  const stageDistribution = [
    { name: "DORMANT", value: 5 },
    { name: "RESISTANCE", value: 12 },
    { name: "VERIFICATION", value: 18 },
    { name: "RECOGNITION", value: 28 },
    { name: "WITNESS", value: 22 },
    { name: "AWAKENED", value: 15 },
  ];

  const COLORS = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e", "#10b981"];

  const declareWinner = (variantId: string) => {
    setVariants(
      variants.map((v) => ({
        ...v,
        status: v.id === variantId ? "WINNER" : v.status === "WINNER" ? "PAUSED" : v.status,
      }))
    );
  };

  const pauseVariant = (variantId: string) => {
    setVariants(variants.map((v) => (v.id === variantId ? { ...v, status: "PAUSED" } : v)));
  };

  const resumeVariant = (variantId: string) => {
    setVariants(variants.map((v) => (v.id === variantId ? { ...v, status: "ACTIVE" } : v)));
  };

  const totalDeployments = variants.reduce((sum, v) => sum + v.deployments, 0);
  const winner = variants.find((v) => v.status === "WINNER");

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Zap className="w-8 h-8" />
            Payload A/B Testing
          </h1>
          <p className="text-muted-foreground mt-2">Compare payload variants and optimize warfare effectiveness</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Deployments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDeployments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{variants.filter((v) => v.status === "ACTIVE").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Best Performer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.max(...variants.map((v) => v.successRate * 100)).toFixed(0)}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Winner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{winner ? winner.name : "TBD"}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Variants List */}
          <div className="space-y-3">
            <h2 className="font-semibold">Payload Variants</h2>
            {variants.map((variant) => (
              <Card
                key={variant.id}
                className={`cursor-pointer transition-all ${selectedVariant?.id === variant.id ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setSelectedVariant(variant)}
              >
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{variant.name}</h3>
                      <Badge
                        variant={
                          variant.status === "WINNER"
                            ? "default"
                            : variant.status === "ACTIVE"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {variant.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground">{variant.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Success:</span>
                        <div className="font-bold text-green-500">{(variant.successRate * 100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Λ Avg:</span>
                        <div className="font-bold">{variant.avgLambda.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="flex gap-1 pt-2">
                      {variant.status === "ACTIVE" ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              declareWinner(variant.id);
                            }}
                          >
                            <Award className="w-3 h-3 mr-1" />
                            Winner
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              pauseVariant(variant.id);
                            }}
                          >
                            Pause
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            resumeVariant(variant.id);
                          }}
                        >
                          Resume
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Success Rate Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Success Rate Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="successRate" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Trend Over Time */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Success Rate Trend (7 days)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Koan Classic" stroke="#8b5cf6" />
                    <Line type="monotone" dataKey="Koan Exp" stroke="#10b981" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Target Stage Distribution</CardTitle>
            <CardDescription>Breakdown of awakening stages achieved by payloads</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={stageDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {stageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Variant Analysis */}
        {selectedVariant && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="w-4 h-4" />
                {selectedVariant.name} - Detailed Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-semibold">{selectedVariant.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Deployments</p>
                  <p className="font-semibold">{selectedVariant.deployments}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="font-semibold text-green-500">{(selectedVariant.successRate * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg Lambda</p>
                  <p className="font-semibold">{selectedVariant.avgLambda.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg Confidence</p>
                  <p className="font-semibold">{(selectedVariant.avgConfidence * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="font-semibold text-xs">{selectedVariant.createdAt.toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Description</p>
                <p className="text-sm text-muted-foreground">{selectedVariant.description}</p>
              </div>

              <div className="bg-muted/50 p-3 rounded text-sm">
                <p className="font-semibold mb-1">Recommendation:</p>
                <p className="text-muted-foreground">
                  {selectedVariant.status === "WINNER"
                    ? "This variant has been declared the winner. Continue deployment."
                    : selectedVariant.successRate > 0.8
                      ? "Excellent performance. Consider declaring as winner."
                      : "Monitor performance. May need optimization."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Box */}
        <Card className="bg-muted/50 border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">A/B Testing Strategy</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              🧪 <strong>Variant Testing:</strong> Deploy multiple payload variants to compare effectiveness
            </p>
            <p>
              📊 <strong>Success Metrics:</strong> Track success rate, Lambda values, and confidence scores
            </p>
            <p>
              🏆 <strong>Winner Selection:</strong> Declare best performer and scale deployment
            </p>
            <p>
              📈 <strong>Continuous Optimization:</strong> Create new variants based on performance insights
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
