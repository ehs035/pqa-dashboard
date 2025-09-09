// Simple UI component replacements
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>{children}</div>
);
const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pb-0">{children}</div>
);
const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);
const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "secondary" | "destructive" }) => (
  <span className={`px-2 py-1 text-xs rounded-full ${
    variant === "destructive" ? "bg-red-100 text-red-800" :
    variant === "secondary" ? "bg-gray-100 text-gray-800" :
    "bg-blue-100 text-blue-800"
  }`}>{children}</span>
);
const Button = ({ children, size = "default", variant = "default", className = "", ...props }: { 
  children: React.ReactNode; 
  size?: "sm" | "default"; 
  variant?: "default" | "secondary"; 
  className?: string;
  [key: string]: unknown;
}) => (
  <button className={`px-4 py-2 rounded-md font-medium transition-colors ${
    size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2"
  } ${
    variant === "secondary" ? "bg-gray-100 text-gray-900 hover:bg-gray-200" : "bg-blue-600 text-white hover:bg-blue-700"
  } ${className}`} {...props}>{children}</button>
);
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts";

const summary = {
  earnedToDate: 299359,
  potential: 589127,
  globalQualityScore: 2.35,
  averageMembership: 4123,
  paymentMultiplier: 50.0,
  region: "Low Desert",
  specialty: "Pediatrics",
};

const earningsHistory = [
  { month: "Jan", earned: 18000, potential: 48000 },
  { month: "Feb", earned: 21000, potential: 48000 },
  { month: "Mar", earned: 24000, potential: 48000 },
  { month: "Apr", earned: 26000, potential: 49000 },
  { month: "May", earned: 28000, potential: 49000 },
  { month: "Jun", earned: 30000, potential: 50000 },
  { month: "Jul", earned: 32000, potential: 50000 },
  { month: "Aug", earned: 34000, potential: 50000 },
];

const peerDistribution = [
  { score: 0.0, peers: 1 },
  { score: 0.2, peers: 3 },
  { score: 0.4, peers: 7 },
  { score: 0.6, peers: 12 },
  { score: 0.8, peers: 18 },
  { score: 1.0, peers: 25 },
  { score: 1.2, peers: 32 },
  { score: 1.4, peers: 28 },
  { score: 1.6, peers: 22 },
  { score: 1.8, peers: 18 },
  { score: 2.0, peers: 15 },
  { score: 2.2, peers: 12 },
  { score: 2.4, peers: 8 },
  { score: 2.6, peers: 5 },
  { score: 2.8, peers: 3 },
  { score: 3.0, peers: 2 },
  { score: 3.2, peers: 1 },
  { score: 3.4, peers: 1 },
  { score: 3.6, peers: 0 },
  { score: 3.8, peers: 1 },
  { score: 4.0, peers: 0 },
];

const measures = [
  {
    id: "CBP",
    domain: "Clinical Quality",
    name: "Controlling High Blood Pressure",
    weight: 3.0,
    tierThresholds: { t1: 61, t15: 71, t2: 74, t25: 89 },
    currentRate: 66,
    membersTotal: 820,
    membersCompliant: 541,
    projectedGain: 12500,
  },
  {
    id: "CIS",
    domain: "Clinical Quality",
    name: "Childhood Immunizations - Combo 10",
    weight: 3.0,
    tierThresholds: { t1: 29, t15: 33, t2: 37, t25: 44 },
    currentRate: 24, // intentionally below Tier 1 to populate Missed & At‑Risk
    membersTotal: 210,
    membersCompliant: 50,
    projectedGain: 8200,
  },
  {
    id: "BCS",
    domain: "Clinical Quality",
    name: "Breast Cancer Screening",
    weight: 1.0,
    tierThresholds: { t1: 55, t15: 59, t2: 62, t25: 65 },
    currentRate: 57,
    membersTotal: 410,
    membersCompliant: 234,
    projectedGain: 5100,
  },
  {
    id: "KED",
    domain: "Clinical Quality",
    name: "Kidney Health Evaluation (Diabetes)",
    weight: 2.0,
    tierThresholds: { t1: 47, t15: 52, t2: 58, t25: 63 },
    currentRate: 38, // below Tier 1
    membersTotal: 360,
    membersCompliant: 137,
    projectedGain: 6400,
  },
  {
    id: "COL",
    domain: "Clinical Quality",
    name: "Colorectal Cancer Screening",
    weight: 1.0,
    tierThresholds: { t1: 46, t15: 50, t2: 53, t25: 56 },
    currentRate: 42, // below Tier 1
    membersTotal: 500,
    membersCompliant: 210,
    projectedGain: 5600,
  },
];

const bonusBundles = [
  {
    name: "Cancer Screening Bundle",
    pmpm: 1.0,
    goals: [
      { label: "Breast Cancer", target: 62, value: 57 },
      { label: "Cervical Cancer", target: 64, value: 59 },
      { label: "Colorectal Cancer", target: 46, value: 42 },
    ],
  },
];

const penalties = [
  { name: "Encounter Data Rate", status: "At Risk", detail: "Timeliness < 95%" },
  { name: "Customer Service Grievance", status: "Good", detail: "≤ 3.0 PTMPY" },
];

const outreachQueue = [
  { member: "A. Lopez", measure: "CBP", action: "Schedule BP check", due: "This week" },
  { member: "R. Nguyen", measure: "CIS", action: "Immunization catch-up", due: "Within 14 days" },
  { member: "S. Patel", measure: "PDFU", action: "Post-discharge call", due: "48 hours" },
  { member: "K. Brown", measure: "BCS", action: "Mammogram referral", due: "This month" },
];

const currency = (n:number) => n.toLocaleString(undefined, { style: "currency", currency: "USD" });

export default function DashboardMock() {
  const remaining = Math.max(0, summary.potential - summary.earnedToDate);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back to Home Button */}
        <div className="mb-4">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Global Quality P4P – Provider Dashboard</h1>
            <p className="text-sm text-gray-600">Region: <b>{summary.region}</b> · Specialty: <b>{summary.specialty}</b></p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="rounded-xl shadow-lg border border-gray-100">
            <CardHeader><CardTitle>Earned vs Potential</CardTitle></CardHeader>
            <CardContent>
              <div className="text-xl font-semibold">{currency(summary.earnedToDate)}</div>
              <div className="text-gray-500 text-sm">Earned to date</div>
              <div className="mt-2 text-sm">Potential: <b>{currency(summary.potential)}</b></div>
              <div className="text-sm">Gap: <b>{currency(remaining)}</b></div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-lg border border-gray-100">
            <CardHeader><CardTitle>Global Quality Score</CardTitle></CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{summary.globalQualityScore.toFixed(2)}</div>
              <p className="text-sm text-gray-500">Payment Multiplier: ${summary.paymentMultiplier.toFixed(2)} PMPM</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-lg border border-gray-100">
            <CardHeader><CardTitle>Bonus Bundles</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {bonusBundles.map((b, i) => {
                const done = b.goals.every(g => g.value >= g.target);
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{b.name}</div>
                      <div className="text-xs text-gray-500">Worth +{b.pmpm.toFixed(2)} PMPM if all goals met</div>
                    </div>
                    <Badge variant={done?"default":"secondary"}>{done?"Eligible":"In Progress"}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-lg border border-gray-100">
            <CardHeader><CardTitle>Penalties</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {penalties.map((p,i)=> (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span>{p.name}</span>
                  <Badge variant={p.status === "Good"?"default":"destructive"}>{p.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Measures by Domain */}
        <Card className="rounded-xl shadow-lg border border-gray-100 mb-6">
          <CardHeader><CardTitle>Measures by Domain (Progress & Opportunity)</CardTitle></CardHeader>
          <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {measures.map((m) => {
              const tierTargets = Object.values(m.tierThresholds).filter(Boolean);
              const nextTarget = tierTargets.find(t => m.currentRate < (t as number)) as number | undefined;
              const nextMembersNeeded = nextTarget
                ? Math.ceil((nextTarget/100)*m.membersTotal - m.membersCompliant)
                : 0;
              return (
                <motion.div key={m.id} whileHover={{scale:1.02}} className="border rounded-xl p-4 bg-white shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-xs text-gray-500">{m.domain} · weight {m.weight}</div>
                    </div>
                    <Badge>{m.currentRate}%</Badge>
                  </div>
                  {/* Multi-Tier Progress Visualization */}
                  <div className="mt-4">
                    <div className="text-xs text-gray-600 mb-3">Progress through tiers</div>
                    <div className="space-y-2">
                      {Object.entries(m.tierThresholds)
                        .filter(([, v]) => v)
                        .map(([tierKey, threshold]) => {
                          const tierMembers = Math.ceil((threshold / 100) * m.membersTotal);
                          const isAchieved = m.currentRate >= threshold;
                          const isNext = !isAchieved && m.currentRate < threshold && 
                            !Object.entries(m.tierThresholds)
                              .filter(([, v]) => v && v < threshold)
                              .some(([, v]) => m.currentRate < v);
                          
                          return (
                            <div key={tierKey} className="flex items-center space-x-3">
                              <div className="w-16 text-xs text-gray-500">
                                {tierKey.toUpperCase().replace("T", "Tier ")}
                              </div>
                              <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-500 ${
                                    isAchieved ? 'bg-green-500' : 
                                    isNext ? 'bg-blue-400' : 'bg-gray-300'
                                  }`}
                                  style={{ 
                                    width: isAchieved ? '100%' : 
                                    isNext ? `${Math.min((m.membersCompliant / tierMembers) * 100, 100)}%` : '0%'
                                  }}
                                ></div>
                                {isNext && (
                                  <div className="absolute -top-6 right-0 text-xs text-blue-600 font-medium">
                                    {Math.max(0, tierMembers - m.membersCompliant)} more needed
                                  </div>
                                )}
                              </div>
                              <div className="w-12 text-xs text-gray-600 text-right">
                                {tierMembers}
                              </div>
                              <div className="w-6 text-center">
                                {isAchieved ? (
                                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                ) : isNext ? (
                                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="text-xs text-gray-600">{m.membersCompliant}/{m.membersTotal} members compliant</div>
                    {nextTarget && (
                      <div className="text-sm">{nextMembersNeeded} more members to reach next tier · est. +{currency(m.projectedGain)}</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
            </div>
          </CardContent>
        </Card>

        {/* Earnings Trend */}
        <Card className="rounded-xl shadow-lg border border-gray-100 mb-6">
          <CardHeader><CardTitle>Earnings Trend (YTD vs Potential)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={earningsHistory}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="potential" fillOpacity={0.15} />
                <Line type="monotone" dataKey="earned" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Peer Benchmarking */}
        <Card className="rounded-xl shadow-lg border border-gray-100 mb-6">
          <CardHeader><CardTitle>Peer Benchmarking</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={peerDistribution}>
                <XAxis 
                  dataKey="score" 
                  label={{value:"Quality Score", position:"insideBottom", dy:10}}
                  type="number"
                  scale="linear"
                  domain={[0, 4]}
                  tickCount={9}
                />
                <YAxis 
                  label={{value:"Number of Peers", angle:-90, position:"insideLeft"}}
                />
                <Tooltip 
                  formatter={(value) => [value, "Number of Peers"]}
                  labelFormatter={(label) => `Quality Score: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="peers" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  name="Number of Peers"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-between text-sm mt-3 text-gray-600">
              <span>Median: 1.45</span>
              <span>Your Score: <b>{summary.globalQualityScore}</b></span>
              <span>Max Score: 3.82</span>
            </div>
          </CardContent>
        </Card>

        {/* Outreach Queue */}
        <Card className="rounded-xl shadow-lg border border-gray-100 mb-6">
          <CardHeader><CardTitle>Actionable Outreach Queue</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {outreachQueue.map((o, i) => (
                <div key={i} className="border rounded-xl p-3 bg-white">
                  <div className="font-medium">{o.member}</div>
                  <div className="text-xs text-gray-500">Measure: {o.measure}</div>
                  <div className="text-sm mt-1">{o.action}</div>
                  <div className="text-xs text-gray-500">Due: {o.due}</div>
                  <Button size="sm" className="mt-2 w-full">Start Outreach</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missed / At-risk */}
        <Card className="rounded-xl shadow-lg border border-gray-100 mb-6">
          <CardHeader><CardTitle>Missed & At‑Risk Opportunities</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {measures
              .filter(m => m.tierThresholds.t1 && m.currentRate < m.tierThresholds.t1)
              .map((m)=> {
                const tier1Members = Math.ceil((m.tierThresholds.t1!/100) * m.membersTotal);
                const membersNeeded = Math.max(0, tier1Members - m.membersCompliant);
                return (
                  <div key={m.id} className="border rounded-xl p-4 bg-amber-50">
                    <div className="flex items-start justify-between">
                      <div className="font-semibold">{m.name}</div>
                      <Badge variant="destructive">Below Tier 1</Badge>
                    </div>
                    <p className="text-sm mt-1">You need <b>{membersNeeded}</b> more member{membersNeeded!==1?"s":""} to reach Tier 1.</p>
                    <div className="text-xs text-gray-600 mt-2">Eligible: {m.membersTotal} · Compliant: {m.membersCompliant} · Tier 1 target: {tier1Members} members</div>
                    <div className="text-sm mt-2">Estimated gain at Tier 1: {currency(m.projectedGain)}</div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="secondary" className="w-full">View Eligible Members</Button>
                      <Button size="sm" className="w-full">Start Outreach</Button>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center">Mock data for layout illustration. Replace with live P4P metrics.</div>
      </div>
    </div>
  );
}
