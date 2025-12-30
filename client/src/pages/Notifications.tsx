import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, CheckCircle, Zap, TrendingUp } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Notification {
  id: string;
  type: "THRESHOLD" | "PROPAGATION" | "STRIKE" | "AWAKENING";
  title: string;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  timestamp: Date;
  read: boolean;
  metadata?: Record<string, any>;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "critical">("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate real-time notifications
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // In production, this would be a WebSocket connection
      const randomNotification: Notification = {
        id: `notif-${Date.now()}`,
        type: ["THRESHOLD", "PROPAGATION", "STRIKE", "AWAKENING"][Math.floor(Math.random() * 4)] as any,
        title: `Event: ${Math.random() > 0.5 ? "Prophetic Threshold Crossed" : "Propagation Generation"}`,
        description: `Node detected critical Lambda value or network expansion event`,
        severity: ["LOW", "MEDIUM", "HIGH", "CRITICAL"][Math.floor(Math.random() * 4)] as any,
        timestamp: new Date(),
        read: false,
      };

      setNotifications((prev) => [randomNotification, ...prev].slice(0, 50));
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "critical") return n.severity === "CRITICAL";
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-500";
      case "HIGH":
        return "bg-orange-500";
      case "MEDIUM":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "THRESHOLD":
        return <AlertCircle className="w-4 h-4" />;
      case "PROPAGATION":
        return <TrendingUp className="w-4 h-4" />;
      case "STRIKE":
        return <Zap className="w-4 h-4" />;
      case "AWAKENING":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const criticalCount = notifications.filter((n) => n.severity === "CRITICAL").length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bell className="w-8 h-8" />
              Real-time Notifications
            </h1>
            <p className="text-muted-foreground mt-2">
              Live alerts for critical warfare events, threshold crossings, and network propagation
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unread</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-muted-foreground mt-1">notifications waiting</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{criticalCount}</div>
              <p className="text-xs text-muted-foreground mt-1">require immediate action</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <p className="text-xs text-muted-foreground mt-1">all-time events</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
              size="sm"
            >
              Unread ({unreadCount})
            </Button>
            <Button
              variant={filter === "critical" ? "default" : "outline"}
              onClick={() => setFilter("critical")}
              size="sm"
            >
              Critical ({criticalCount})
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={autoRefresh ? "default" : "outline"}
              onClick={() => setAutoRefresh(!autoRefresh)}
              size="sm"
            >
              {autoRefresh ? "🔴 Live" : "⚪ Paused"}
            </Button>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                Mark all read
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center text-muted-foreground">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No notifications in this view</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all ${
                  !notification.read ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-2 rounded-lg text-white ${getSeverityColor(notification.severity)}`}>
                      {getTypeIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {!notification.read && <Badge className="bg-primary">New</Badge>}
                        <Badge variant="outline">{notification.severity}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>

                      {/* Metadata */}
                      {notification.metadata && (
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          {Object.entries(notification.metadata).map(([key, value]) => (
                            <div key={key} className="bg-muted p-2 rounded">
                              <span className="font-medium">{key}:</span> {String(value)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                      {notification.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Info Box */}
        <Card className="bg-muted/50 border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">Real-time Notification System</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              🔔 <strong>Prophetic Threshold Events:</strong> Alerts when nodes cross Lambda thresholds indicating
              awakening
            </p>
            <p>
              📈 <strong>Propagation Milestones:</strong> Notifications when network reaches new generations (3^g
              growth)
            </p>
            <p>
              ⚡ <strong>Warfare Events:</strong> Real-time updates on payload deployments and strike outcomes
            </p>
            <p>
              🎯 <strong>Critical Alerts:</strong> Immediate notifications for system-critical events requiring
              commander attention
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
