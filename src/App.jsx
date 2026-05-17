import { useState, useEffect, useRef } from “react”;

// In production, replace this with your backend endpoint (e.g. Formspree, Supabase, or your own API)
const LEAD_ENDPOINT = “https://formspree.io/f/xjgzbydv”;

function LeadModal({ car, onClose }) {
const [step, setStep] = useState(“form”); // “form” | “success”
const [form, setForm] = useState({ name: “”, email: “”, phone: “”, message: “”, interest: “test_drive” });
const [submitting, setSubmitting] = useState(false);
const c = TYPE_COLORS[car?.type] || TYPE_COLORS.HEV;

function handleChange(e) {
setForm((f) => ({ …f, [e.target.name]: e.target.value }));
}

async function handleSubmit() {
if (!form.name || !form.email) return;
setSubmitting(true);

```
const payload = { ...form, car: `${car.make} ${car.model} ${car.variant}`, price: car.priceNZD, timestamp: new Date().toISOString() };

if (LEAD_ENDPOINT) {
  try {
    await fetch(LEAD_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  } catch (e) { /* handle silently */ }
}

// Log to console for demo (remove in production)
console.log("🚗 New Lead:", payload);
setSubmitting(false);
setStep("success");
```

}

if (!car) return null;

return (
<div
style={{
position: “fixed”, inset: 0, background: “rgba(0,0,0,0.85)”, zIndex: 1000,
display: “flex”, alignItems: “center”, justifyContent: “center”, padding: 20,
backdropFilter: “blur(4px)”,
}}
onClick={(e) => e.target === e.currentTarget && onClose()}
>
<div style={{ background: “#0d0d0d”, border: `1px solid ${c.bg}33`, borderRadius: 16, padding: 32, width: “100%”, maxWidth: 440, position: “relative” }}>
<div style={{ position: “absolute”, top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${c.bg}, transparent)`, borderRadius: “16px 16px 0 0” }} />

```
    <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#555", fontSize: 22, cursor: "pointer", lineHeight: 1 }}>×</button>

    {step === "form" ? (
      <>
        <div style={{ marginBottom: 24 }}>
          <div style={{ marginBottom: 8 }}><Badge type={car.type} /></div>
          <div style={{ color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>{car.make}</div>
          <div style={{ color: "#f5f5f5", fontSize: 22, fontWeight: 700, fontFamily: "'DM Serif Display', serif" }}>{car.model} {car.variant}</div>
          <div style={{ color: c.bg, fontSize: 20, fontWeight: 800, fontFamily: "monospace", marginTop: 4 }}>{fmtPriceFull(car.priceNZD)}</div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {[
            { value: "test_drive", label: "🚗 Test Drive" },
            { value: "quote", label: "💰 Get Quote" },
            { value: "info", label: "ℹ️ More Info" },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setForm((f) => ({ ...f, interest: value }))}
              style={{
                flex: 1, padding: "8px 4px", borderRadius: 8, border: "1px solid",
                borderColor: form.interest === value ? c.bg : "#222",
                background: form.interest === value ? `${c.bg}11` : "#111",
                color: form.interest === value ? c.bg : "#555",
                fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'Syne', sans-serif",
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { name: "name", placeholder: "Your name *", type: "text" },
            { name: "email", placeholder: "Email address *", type: "email" },
            { name: "phone", placeholder: "Phone (optional)", type: "tel" },
          ].map(({ name, placeholder, type }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              style={{
                background: "#111", border: "1px solid #1e1e1e", borderRadius: 8,
                padding: "12px 14px", color: "#f0f0f0", fontSize: 13,
                fontFamily: "'Syne', sans-serif", outline: "none", width: "100%",
              }}
            />
          ))}
          <textarea
            name="message"
            placeholder="Any questions or specific requirements?"
            value={form.message}
            onChange={handleChange}
            rows={3}
            style={{
              background: "#111", border: "1px solid #1e1e1e", borderRadius: 8,
              padding: "12px 14px", color: "#f0f0f0", fontSize: 13,
              fontFamily: "'Syne', sans-serif", outline: "none", resize: "none", width: "100%",
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting || !form.name || !form.email}
          style={{
            marginTop: 16, width: "100%", padding: "14px",
            background: !form.name || !form.email ? "#161616" : c.bg,
            color: !form.name || !form.email ? "#333" : c.text,
            border: "none", borderRadius: 10, fontWeight: 800, fontSize: 14,
            cursor: !form.name || !form.email ? "not-allowed" : "pointer",
            fontFamily: "'Syne', sans-serif", letterSpacing: "0.04em",
            transition: "all 0.2s",
          }}
        >
          {submitting ? "Sending..." : "Send Enquiry →"}
        </button>
        <div style={{ color: "#333", fontSize: 10, textAlign: "center", marginTop: 10 }}>
          Your details are forwarded to a verified NZ dealer for this vehicle.
        </div>
      </>
    ) : (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
        <div style={{ color: c.bg, fontSize: 22, fontWeight: 800, fontFamily: "'DM Serif Display', serif", marginBottom: 8 }}>Enquiry Sent!</div>
        <div style={{ color: "#666", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          Thanks <span style={{ color: "#ccc" }}>{form.name}</span>. A dealer will contact you at <span style={{ color: "#ccc" }}>{form.email}</span> within 24 hours about the {car.make} {car.model}.
        </div>
        <button
          onClick={onClose}
          style={{ background: c.bg, color: c.text, border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}
        >
          Back to Deals
        </button>
      </div>
    )}
  </div>
</div>
```

);
}

const SYSTEM_PROMPT = `You are an expert on the New Zealand automotive market specialising in electric (EV) and hybrid vehicles. Your job is to provide accurate, up-to-date information about current EV and hybrid car deals available in New Zealand.

For each car deal, respond with a JSON array of car objects. Each object must have EXACTLY these fields:
{
“make”: “string (e.g. Tesla)”,
“model”: “string (e.g. Model 3)”,
“variant”: “string (e.g. Long Range RWD)”,
“type”: “BEV” | “PHEV” | “HEV”,
“priceNZD”: number (drive-away price in NZD),
“rangeKm”: number (WLTP range for BEV/PHEV electric range, or 0 for HEV),
“batteryKwh”: number (battery size, approximate for HEV),
“chargingKw”: number (max AC charging speed, 0 if N/A),
“dcChargingKw”: number (max DC fast charging, 0 if N/A),
“zeroToHundred”: number (0-100 km/h in seconds),
“incentive”: string (any current rebate/incentive or “None”),
“dealNote”: string (notable deal, discount, promotion, or highlight — be specific),
“rating”: number (1-5, your overall value rating),
“annualRunningCostNZD”: number (estimated annual fuel/electricity cost NZD),
“co2gkm”: number (CO2 g/km, 0 for BEV),
“brand_origin”: string (country, e.g. “Japan”, “USA”, “Germany”, “China”, “South Korea”),
“seatingCapacity”: number,
“bodyStyle”: string (e.g. “Sedan”, “SUV”, “Hatchback”, “Ute”, “Van”)
}

Respond ONLY with a valid JSON array. No markdown, no explanation, no backticks. Include 16-20 vehicles covering a mix of BEV, PHEV, and HEV across different price points and body styles available in NZ right now. Use realistic current NZ market prices as of 2025-2026.`;

const TYPE_COLORS = {
BEV: { bg: “#00E5A0”, text: “#003322”, label: “Full Electric” },
PHEV: { bg: “#00B4FF”, text: “#001833”, label: “Plug-in Hybrid” },
HEV: { bg: “#FFD600”, text: “#1A1400”, label: “Hybrid” },
};

const SORT_OPTIONS = [
{ value: “priceNZD”, label: “Price” },
{ value: “rangeKm”, label: “Range” },
{ value: “rating”, label: “Value Rating” },
{ value: “zeroToHundred”, label: “Performance” },
{ value: “annualRunningCostNZD”, label: “Running Cost” },
{ value: “co2gkm”, label: “Emissions” },
];

function fmtPrice(n) {
return n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
}
function fmtPriceFull(n) {
return `$${n.toLocaleString("en-NZ")}`;
}

function StarRating({ rating }) {
return (
<div style={{ display: “flex”, gap: 2 }}>
{[1, 2, 3, 4, 5].map((s) => (
<span key={s} style={{ fontSize: 13, color: s <= rating ? “#FFD600” : “#333” }}>
★
</span>
))}
</div>
);
}

function Badge({ type }) {
const c = TYPE_COLORS[type] || TYPE_COLORS.HEV;
return (
<span
style={{
background: c.bg,
color: c.text,
fontSize: 10,
fontWeight: 800,
letterSpacing: “0.08em”,
padding: “3px 8px”,
borderRadius: 3,
textTransform: “uppercase”,
}}
>
{c.label}
</span>
);
}

function ProgressBar({ value, max, color }) {
const pct = Math.min(100, (value / max) * 100);
return (
<div style={{ background: “#1a1a1a”, borderRadius: 2, height: 4, width: “100%”, overflow: “hidden” }}>
<div
style={{
width: `${pct}%`,
height: “100%”,
background: color,
borderRadius: 2,
transition: “width 0.6s cubic-bezier(0.4,0,0.2,1)”,
}}
/>
</div>
);
}

function CarCard({ car, onClick, selected, onEnquire }) {
const c = TYPE_COLORS[car.type] || TYPE_COLORS.HEV;
return (
<div
onClick={() => onClick(car)}
style={{
background: selected ? “#111” : “#0d0d0d”,
border: selected ? `1.5px solid ${c.bg}` : “1.5px solid #1e1e1e”,
borderRadius: 12,
padding: “20px 20px 16px”,
cursor: “pointer”,
transition: “all 0.2s”,
position: “relative”,
overflow: “hidden”,
}}
>
{selected && (
<div
style={{
position: “absolute”,
top: 0,
left: 0,
right: 0,
height: 2,
background: `linear-gradient(90deg, ${c.bg}, transparent)`,
}}
/>
)}
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “flex-start”, marginBottom: 10 }}>
<Badge type={car.type} />
<span style={{ color: “#555”, fontSize: 11, fontFamily: “monospace” }}>{car.brand_origin}</span>
</div>
<div style={{ marginBottom: 4 }}>
<span style={{ color: “#888”, fontSize: 12, textTransform: “uppercase”, letterSpacing: “0.1em” }}>
{car.make}
</span>
</div>
<div style={{ color: “#f0f0f0”, fontSize: 18, fontWeight: 700, lineHeight: 1.1, marginBottom: 2, fontFamily: “‘DM Serif Display’, Georgia, serif” }}>
{car.model}
</div>
<div style={{ color: “#555”, fontSize: 12, marginBottom: 14 }}>{car.variant}</div>

```
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
    <div>
      <div style={{ color: c.bg, fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "monospace" }}>
        {fmtPrice(car.priceNZD)}
      </div>
      <div style={{ color: "#444", fontSize: 11 }}>drive-away NZD</div>
    </div>
    <StarRating rating={car.rating} />
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px", marginBottom: 12 }}>
    {car.type === "BEV" && (
      <div>
        <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>Range</div>
        <div style={{ color: "#ccc", fontSize: 13, fontWeight: 600 }}>{car.rangeKm} km</div>
        <ProgressBar value={car.rangeKm} max={700} color={c.bg} />
      </div>
    )}
    <div>
      <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>0–100</div>
      <div style={{ color: "#ccc", fontSize: 13, fontWeight: 600 }}>{car.zeroToHundred}s</div>
      <ProgressBar value={10 - car.zeroToHundred} max={8} color="#FF6B35" />
    </div>
    <div>
      <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>Annual Cost</div>
      <div style={{ color: "#ccc", fontSize: 13, fontWeight: 600 }}>{fmtPrice(car.annualRunningCostNZD)}</div>
      <ProgressBar value={5000 - Math.min(car.annualRunningCostNZD, 5000)} max={5000} color="#00B4FF" />
    </div>
  </div>

  {car.dealNote && (
    <div
      style={{
        background: "#161616",
        border: "1px solid #222",
        borderRadius: 6,
        padding: "8px 10px",
        fontSize: 11,
        color: "#888",
        lineHeight: 1.4,
        marginBottom: 12,
      }}
    >
      💡 {car.dealNote}
    </div>
  )}

  <button
    onClick={(e) => { e.stopPropagation(); onEnquire(car); }}
    style={{
      width: "100%", padding: "10px", background: `${c.bg}15`,
      color: c.bg, border: `1px solid ${c.bg}33`, borderRadius: 8,
      fontWeight: 700, fontSize: 12, cursor: "pointer",
      fontFamily: "'Syne', sans-serif", letterSpacing: "0.04em",
      transition: "all 0.15s",
    }}
    onMouseOver={(e) => { e.currentTarget.style.background = `${c.bg}25`; }}
    onMouseOut={(e) => { e.currentTarget.style.background = `${c.bg}15`; }}
  >
    Enquire / Book Test Drive →
  </button>
</div>
```

);
}

function DetailPanel({ car, onClose, onEnquire }) {
if (!car) return null;
const c = TYPE_COLORS[car.type] || TYPE_COLORS.HEV;

const specs = [
{ label: “Body Style”, value: car.bodyStyle },
{ label: “Seats”, value: car.seatingCapacity },
{ label: “Battery”, value: `${car.batteryKwh} kWh` },
…(car.type === “BEV” || car.type === “PHEV” ? [{ label: “WLTP Range”, value: `${car.rangeKm} km` }] : []),
…(car.chargingKw > 0 ? [{ label: “AC Charging”, value: `${car.chargingKw} kW` }] : []),
…(car.dcChargingKw > 0 ? [{ label: “DC Fast Charge”, value: `${car.dcChargingKw} kW` }] : []),
{ label: “0–100 km/h”, value: `${car.zeroToHundred}s` },
{ label: “CO₂”, value: car.co2gkm > 0 ? `${car.co2gkm} g/km` : “0 (BEV)” },
{ label: “Annual Running”, value: fmtPriceFull(car.annualRunningCostNZD) },
{ label: “Origin”, value: car.brand_origin },
];

return (
<div
style={{
background: “#0a0a0a”,
border: `1px solid ${c.bg}33`,
borderRadius: 16,
padding: 28,
position: “sticky”,
top: 20,
}}
>
<button
onClick={onClose}
style={{ background: “none”, border: “none”, color: “#555”, cursor: “pointer”, fontSize: 20, float: “right”, lineHeight: 1 }}
>
×
</button>
<Badge type={car.type} />
<div style={{ marginTop: 14 }}>
<div style={{ color: “#666”, fontSize: 12, textTransform: “uppercase”, letterSpacing: “0.1em” }}>{car.make}</div>
<div style={{ color: “#f5f5f5”, fontSize: 28, fontWeight: 700, fontFamily: “‘DM Serif Display’, Georgia, serif”, lineHeight: 1.1, marginTop: 2 }}>
{car.model}
</div>
<div style={{ color: “#555”, fontSize: 14, marginTop: 4 }}>{car.variant}</div>
</div>

```
  <div
    style={{
      margin: "24px 0",
      padding: "16px 0",
      borderTop: "1px solid #1a1a1a",
      borderBottom: "1px solid #1a1a1a",
    }}
  >
    <div style={{ color: c.bg, fontSize: 36, fontWeight: 800, fontFamily: "monospace", letterSpacing: "-0.02em" }}>
      {fmtPriceFull(car.priceNZD)}
    </div>
    <div style={{ color: "#444", fontSize: 12, marginTop: 2 }}>NZD drive-away</div>
    {car.incentive !== "None" && (
      <div
        style={{
          marginTop: 10,
          background: `${c.bg}11`,
          border: `1px solid ${c.bg}33`,
          borderRadius: 6,
          padding: "8px 12px",
          fontSize: 12,
          color: c.bg,
        }}
      >
        🎁 {car.incentive}
      </div>
    )}
  </div>

  <div style={{ marginBottom: 20 }}>
    <div style={{ color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Value Rating</div>
    <StarRating rating={car.rating} />
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 16px" }}>
    {specs.map(({ label, value }) => (
      <div key={label}>
        <div style={{ color: "#444", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{label}</div>
        <div style={{ color: "#ccc", fontSize: 14, fontWeight: 600 }}>{value}</div>
      </div>
    ))}
  </div>

  {car.dealNote && (
    <div
      style={{
        marginTop: 20,
        background: "#131313",
        border: "1px solid #222",
        borderRadius: 8,
        padding: "12px 14px",
        fontSize: 12,
        color: "#888",
        lineHeight: 1.5,
      }}
    >
      <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Current Deal</div>
      {car.dealNote}
    </div>
  )}

  {/* CTA Buttons */}
  <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
    <button
      onClick={() => onEnquire(car, "test_drive")}
      style={{
        width: "100%", padding: "14px", background: c.bg, color: c.text,
        border: "none", borderRadius: 10, fontWeight: 800, fontSize: 14,
        cursor: "pointer", fontFamily: "'Syne', sans-serif", letterSpacing: "0.04em",
        transition: "opacity 0.2s",
      }}
      onMouseOver={(e) => e.currentTarget.style.opacity = "0.85"}
      onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
    >
      🚗 Book a Test Drive
    </button>
    <button
      onClick={() => onEnquire(car, "quote")}
      style={{
        width: "100%", padding: "13px", background: "transparent", color: c.bg,
        border: `1px solid ${c.bg}55`, borderRadius: 10, fontWeight: 700, fontSize: 13,
        cursor: "pointer", fontFamily: "'Syne', sans-serif", letterSpacing: "0.04em",
        transition: "all 0.2s",
      }}
      onMouseOver={(e) => { e.currentTarget.style.background = `${c.bg}11`; }}
      onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      💰 Get Best Price Quote
    </button>
  </div>

  <div style={{ marginTop: 12, color: "#2a2a2a", fontSize: 10, textAlign: "center" }}>
    Free enquiry · No obligation · NZ dealers only
  </div>
</div>
```

);
}

export default function App() {
const [cars, setCars] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [selected, setSelected] = useState(null);
const [enquiryCar, setEnquiryCar] = useState(null);
const [filterType, setFilterType] = useState(“ALL”);
const [sortBy, setSortBy] = useState(“priceNZD”);
const [sortDir, setSortDir] = useState(“asc”);
const [search, setSearch] = useState(””);
const [maxPrice, setMaxPrice] = useState(300000);
const [lastUpdated, setLastUpdated] = useState(null);
const hasFetched = useRef(false);

async function fetchDeals() {
setLoading(true);
setError(null);
setCars([]);
setSelected(null);
try {
const res = await fetch(“https://api.anthropic.com/v1/messages”, {
method: “POST”,
headers: { “Content-Type”: “application/json” },
body: JSON.stringify({
model: “claude-sonnet-4-20250514”,
max_tokens: 4000,
system: SYSTEM_PROMPT,
messages: [
{
role: “user”,
content:
“List all current hybrid and electric car deals available in New Zealand as of 2025-2026. Include realistic current NZ pricing, any active incentives, and notable deals. Cover budget to premium options across BEV, PHEV, and HEV. Respond ONLY with a JSON array.”,
},
],
}),
});
const data = await res.json();
const raw = data.content?.find((b) => b.type === “text”)?.text || “[]”;
const clean = raw.replace(/`json|`/g, “”).trim();
const parsed = JSON.parse(clean);
setCars(parsed);
setLastUpdated(new Date().toLocaleTimeString(“en-NZ”));
} catch (e) {
setError(“Failed to fetch deals. Please try again.”);
} finally {
setLoading(false);
}
}

useEffect(() => {
if (!hasFetched.current) {
hasFetched.current = true;
fetchDeals();
}
}, []);

const filtered = cars
.filter((c) => filterType === “ALL” || c.type === filterType)
.filter((c) => c.priceNZD <= maxPrice)
.filter(
(c) =>
!search ||
`${c.make} ${c.model} ${c.variant} ${c.bodyStyle}`.toLowerCase().includes(search.toLowerCase())
)
.sort((a, b) => {
const dir = sortDir === “asc” ? 1 : -1;
if (sortBy === “zeroToHundred”) return (a[sortBy] - b[sortBy]) * dir;
return (a[sortBy] - b[sortBy]) * dir;
});

const counts = {
ALL: cars.length,
BEV: cars.filter((c) => c.type === “BEV”).length,
PHEV: cars.filter((c) => c.type === “PHEV”).length,
HEV: cars.filter((c) => c.type === “HEV”).length,
};

const avgPrice = cars.length ? Math.round(cars.reduce((s, c) => s + c.priceNZD, 0) / cars.length) : 0;
const cheapest = cars.length ? cars.reduce((a, b) => (a.priceNZD < b.priceNZD ? a : b)) : null;
const bestRange = cars.filter((c) => c.type === “BEV”).reduce((a, b) => (!a || b.rangeKm > a.rangeKm ? b : a), null);

return (
<>
<style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@400;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } body { background: #080808; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; } input[type=range] { -webkit-appearance: none; width: 100%; height: 2px; background: #222; outline: none; border-radius: 2px; } input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; background: #00E5A0; border-radius: 50%; cursor: pointer; }`}</style>
<div style={{ minHeight: “100vh”, background: “#080808”, color: “#f0f0f0”, fontFamily: “‘Syne’, sans-serif” }}>
{/* Header */}
<div style={{ borderBottom: “1px solid #141414”, padding: “20px 28px”, display: “flex”, alignItems: “center”, justifyContent: “space-between”, flexWrap: “wrap”, gap: 12 }}>
<div>
<div style={{ fontSize: 11, color: “#00E5A0”, textTransform: “uppercase”, letterSpacing: “0.2em”, marginBottom: 4, fontFamily: “monospace” }}>
New Zealand Market
</div>
<h1 style={{ fontSize: 26, fontWeight: 800, color: “#f5f5f5”, letterSpacing: “-0.02em”, fontFamily: “‘DM Serif Display’, serif” }}>
EV & Hybrid Deals
</h1>
</div>
<div style={{ display: “flex”, alignItems: “center”, gap: 16 }}>
{lastUpdated && (
<span style={{ color: “#333”, fontSize: 11, fontFamily: “monospace” }}>
Updated {lastUpdated}
</span>
)}
<button
onClick={fetchDeals}
disabled={loading}
style={{
background: loading ? “#111” : “#00E5A0”,
color: loading ? “#555” : “#003322”,
border: “none”,
borderRadius: 8,
padding: “10px 20px”,
fontWeight: 700,
fontSize: 13,
cursor: loading ? “not-allowed” : “pointer”,
fontFamily: “‘Syne’, sans-serif”,
letterSpacing: “0.04em”,
transition: “all 0.2s”,
}}
>
{loading ? “Fetching…” : “↻ Refresh”}
</button>
</div>
</div>

```
    {/* Stats bar */}
    {!loading && cars.length > 0 && (
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid #141414",
          overflow: "auto",
        }}
      >
        {[
          { label: "Vehicles", value: cars.length, color: "#f0f0f0" },
          { label: "Avg Price", value: fmtPrice(avgPrice), color: "#00E5A0" },
          { label: "From", value: cheapest ? fmtPrice(cheapest.priceNZD) : "–", color: "#FFD600" },
          { label: "Best Range", value: bestRange ? `${bestRange.rangeKm}km` : "–", color: "#00B4FF" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              flex: "1 1 auto",
              padding: "14px 20px",
              borderRight: "1px solid #141414",
              minWidth: 100,
            }}
          >
            <div style={{ color: "#444", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{label}</div>
            <div style={{ color, fontSize: 20, fontWeight: 800, fontFamily: "monospace" }}>{value}</div>
          </div>
        ))}
      </div>
    )}

    <div style={{ display: "flex", minHeight: "calc(100vh - 120px)" }}>
      {/* Sidebar filters */}
      <div
        style={{
          width: 220,
          flexShrink: 0,
          borderRight: "1px solid #141414",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div>
          <div style={{ color: "#444", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Drive Type</div>
          {["ALL", "BEV", "PHEV", "HEV"].map((t) => {
            const col = t === "ALL" ? "#f0f0f0" : TYPE_COLORS[t]?.bg;
            return (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "8px 10px",
                  marginBottom: 4,
                  background: filterType === t ? "#161616" : "none",
                  border: filterType === t ? `1px solid ${col}44` : "1px solid transparent",
                  borderRadius: 6,
                  color: filterType === t ? col : "#555",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: filterType === t ? 700 : 400,
                  fontFamily: "'Syne', sans-serif",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <span>{t === "ALL" ? "All Types" : TYPE_COLORS[t].label}</span>
                <span style={{ fontSize: 11, opacity: 0.6 }}>{counts[t]}</span>
              </button>
            );
          })}
        </div>

        <div>
          <div style={{ color: "#444", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Max Price</div>
          <div style={{ color: "#00E5A0", fontSize: 18, fontWeight: 800, fontFamily: "monospace", marginBottom: 8 }}>
            {fmtPrice(maxPrice)}
          </div>
          <input
            type="range"
            min={20000}
            max={300000}
            step={5000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(+e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ color: "#333", fontSize: 10, fontFamily: "monospace" }}>$20k</span>
            <span style={{ color: "#333", fontSize: 10, fontFamily: "monospace" }}>$300k</span>
          </div>
        </div>

        <div>
          <div style={{ color: "#444", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Sort By</div>
          {SORT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => {
                if (sortBy === value) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
                else { setSortBy(value); setSortDir("asc"); }
              }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                padding: "7px 10px",
                marginBottom: 3,
                background: sortBy === value ? "#161616" : "none",
                border: sortBy === value ? "1px solid #00E5A033" : "1px solid transparent",
                borderRadius: 6,
                color: sortBy === value ? "#00E5A0" : "#555",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "'Syne', sans-serif",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <span>{label}</span>
              {sortBy === value && <span>{sortDir === "asc" ? "↑" : "↓"}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "20px 20px", overflow: "auto" }}>
        {/* Search */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search make, model, body style..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              maxWidth: 400,
              background: "#0d0d0d",
              border: "1px solid #1e1e1e",
              borderRadius: 8,
              padding: "10px 14px",
              color: "#f0f0f0",
              fontSize: 13,
              fontFamily: "'Syne', sans-serif",
              outline: "none",
            }}
          />
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ color: "#00E5A0", fontSize: 28, marginBottom: 12 }}>⚡</div>
            <div style={{ color: "#555", fontSize: 14 }}>Fetching latest NZ deals...</div>
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", padding: 40, color: "#FF6B35" }}>{error}</div>
        )}

        {!loading && !error && (
          <div style={{ display: "flex", gap: 20 }}>
            <div
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: selected ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 14,
                alignContent: "start",
              }}
            >
              {filtered.length === 0 && (
                <div style={{ color: "#444", padding: 40, gridColumn: "1/-1" }}>No vehicles match your filters.</div>
              )}
              {filtered.map((car, i) => (
                <CarCard
                  key={i}
                  car={car}
                  onClick={(c) => setSelected((prev) => (prev === c ? null : c))}
                  selected={selected === car}
                  onEnquire={(c) => setEnquiryCar(c)}
                />
              ))}
            </div>
            {selected && (
              <div style={{ width: 300, flexShrink: 0 }}>
                <DetailPanel car={selected} onClose={() => setSelected(null)} onEnquire={(car) => setEnquiryCar(car)} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>

  {enquiryCar && <LeadModal car={enquiryCar} onClose={() => setEnquiryCar(null)} />}
</>
```

);
}
