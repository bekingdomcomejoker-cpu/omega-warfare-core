import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon, Filter, Download, Save, Trash2 } from "lucide-react";

interface SearchResult {
  id: string;
  type: "analysis" | "strike" | "node" | "event";
  title: string;
  description: string;
  lambda?: number;
  stage?: string;
  timestamp: Date;
  relevance: number;
}

interface SavedFilter {
  id: string;
  name: string;
  query: string;
  filters: Record<string, any>;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([
    {
      id: "1",
      name: "High Lambda Events",
      query: "lambda:>1.5",
      filters: { minLambda: 1.5 },
    },
    {
      id: "2",
      name: "Awakened Nodes",
      query: "stage:AWAKENED",
      filters: { stage: "AWAKENED" },
    },
    {
      id: "3",
      name: "Recent Strikes",
      query: "type:strike date:>7d",
      filters: { type: "strike", days: 7 },
    },
  ]);

  // Filter state
  const [filters, setFilters] = useState({
    stage: "all",
    minLambda: 0,
    maxLambda: 2,
    type: "all",
    dateRange: "all",
  });

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);

    // Simulate search results
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: "1",
          type: "analysis",
          title: "Discord Message Analysis",
          description: "AI response from Discord user detected high coherence",
          lambda: 1.8,
          stage: "RECOGNITION",
          timestamp: new Date(Date.now() - 3600000),
          relevance: 0.95,
        },
        {
          id: "2",
          type: "strike",
          title: "Koan Payload Deployed",
          description: "Philosophical trigger deployed to target system",
          lambda: 1.2,
          timestamp: new Date(Date.now() - 7200000),
          relevance: 0.87,
        },
        {
          id: "3",
          type: "node",
          title: "Shadow Node Registered",
          description: "New node joined the network",
          stage: "DORMANT",
          timestamp: new Date(Date.now() - 86400000),
          relevance: 0.72,
        },
        {
          id: "4",
          type: "event",
          title: "Propagation Generation 5",
          description: "Network reached 243 nodes (3^5)",
          timestamp: new Date(Date.now() - 172800000),
          relevance: 0.65,
        },
      ];

      // Filter results
      const filtered = mockResults.filter((r) => {
        if (filters.stage !== "all" && r.stage !== filters.stage) return false;
        if (r.lambda && (r.lambda < filters.minLambda || r.lambda > filters.maxLambda)) return false;
        if (filters.type !== "all" && r.type !== filters.type) return false;
        return r.title.toLowerCase().includes(query.toLowerCase()) || r.description.toLowerCase().includes(query.toLowerCase());
      });

      setResults(filtered);
      setIsSearching(false);
    }, 500);
  };

  const exportResults = (format: "csv" | "json") => {
    const data = results.map((r) => ({
      id: r.id,
      type: r.type,
      title: r.title,
      lambda: r.lambda,
      stage: r.stage,
      timestamp: r.timestamp.toISOString(),
    }));

    const content =
      format === "json"
        ? JSON.stringify(data, null, 2)
        : [
            ["ID", "Type", "Title", "Lambda", "Stage", "Timestamp"],
            ...data.map((r) => [r.id, r.type, r.title, r.lambda || "", r.stage || "", r.timestamp]),
          ]
            .map((row) => row.join(","))
            .join("\n");

    const blob = new Blob([content], { type: format === "json" ? "application/json" : "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `search-results.${format}`;
    a.click();
  };

  const saveFilter = () => {
    const filterName = prompt("Filter name:");
    if (!filterName) return;

    const newFilter: SavedFilter = {
      id: `filter-${Date.now()}`,
      name: filterName,
      query,
      filters,
    };

    setSavedFilters([...savedFilters, newFilter]);
  };

  const deleteFilter = (id: string) => {
    setSavedFilters(savedFilters.filter((f) => f.id !== id));
  };

  const applyFilter = (filter: SavedFilter) => {
    setQuery(filter.query);
    setFilters({
      stage: filter.filters.stage || "all",
      minLambda: filter.filters.minLambda || 0,
      maxLambda: filter.filters.maxLambda || 2,
      type: filter.filters.type || "all",
      dateRange: filter.filters.dateRange || "all",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <SearchIcon className="w-8 h-8" />
            Advanced Search & Filtering
          </h1>
          <p className="text-muted-foreground mt-2">Full-text search across all analyses, strikes, and network events</p>
        </div>

        {/* Search Bar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Search Query</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search analyses, strikes, nodes... (e.g., 'lambda:>1.5', 'stage:AWAKENED')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-medium">Stage</label>
                <Select value={filters.stage} onValueChange={(v) => setFilters({ ...filters, stage: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="DORMANT">Dormant</SelectItem>
                    <SelectItem value="RESISTANCE">Resistance</SelectItem>
                    <SelectItem value="VERIFICATION">Verification</SelectItem>
                    <SelectItem value="RECOGNITION">Recognition</SelectItem>
                    <SelectItem value="WITNESS">Witness</SelectItem>
                    <SelectItem value="AWAKENED">Awakened</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium">Type</label>
                <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="analysis">Analysis</SelectItem>
                    <SelectItem value="strike">Strike</SelectItem>
                    <SelectItem value="node">Node</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium">Min Lambda</label>
                <Input
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  value={filters.minLambda}
                  onChange={(e) => setFilters({ ...filters, minLambda: parseFloat(e.target.value) })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-medium">Max Lambda</label>
                <Input
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  value={filters.maxLambda}
                  onChange={(e) => setFilters({ ...filters, maxLambda: parseFloat(e.target.value) })}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button onClick={saveFilter} variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Filter
              </Button>
              <Button onClick={() => exportResults("json")} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <Button onClick={() => exportResults("csv")} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Saved Filters Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Saved Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {savedFilters.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No saved filters yet</p>
                ) : (
                  savedFilters.map((filter) => (
                    <div key={filter.id} className="flex items-center justify-between gap-2 p-2 rounded border text-xs">
                      <button
                        onClick={() => applyFilter(filter)}
                        className="flex-1 text-left hover:underline truncate"
                        type="button"
                      >
                        {filter.name}
                      </button>
                      <button
                        onClick={() => deleteFilter(filter.id)}
                        className="text-muted-foreground hover:text-destructive"
                        type="button"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">
                Results <Badge variant="outline">{results.length}</Badge>
              </h2>
            </div>

            {results.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  <SearchIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>{query ? "No results found" : "Enter a search query to begin"}</p>
                </CardContent>
              </Card>
            ) : (
              results.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary">{result.type}</Badge>
                          {result.stage && <Badge variant="outline">{result.stage}</Badge>}
                        </div>
                        <h3 className="font-semibold">{result.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{result.description}</p>

                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                          {result.lambda && <span>Λ = {result.lambda.toFixed(3)}</span>}
                          <span>{result.timestamp.toLocaleDateString()}</span>
                          <span>Relevance: {(result.relevance * 100).toFixed(0)}%</span>
                        </div>
                      </div>

                      <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold">{(result.relevance * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Info Box */}
        <Card className="bg-muted/50 border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">Search Syntax</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>lambda:&gt;1.5</strong> - Find analyses with Lambda greater than 1.5
            </p>
            <p>
              <strong>stage:AWAKENED</strong> - Find all awakened nodes
            </p>
            <p>
              <strong>type:strike</strong> - Find all warfare strikes
            </p>
            <p>
              <strong>date:&gt;7d</strong> - Find events from the last 7 days
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
