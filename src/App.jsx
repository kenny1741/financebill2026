import { useState, useEffect } from "react";

// ─── ACCURATE CLAUSES FROM FINANCE BILL 2026 ─────────────────────────────────

const CLAUSES = [
  {
    id: 1,
    title: "Tax on Card Payment Fees",
    sector: "Fintech",
    impact: "High Impact",
    summary: "Banks will now pay tax on the small fees they charge when you swipe your card at a shop.",
    detail: "Right now, when you pay at a supermarket using your card, the bank charges the shop a tiny fee. The government wants to tax that fee. The shop will not absorb that cost — they will simply increase the price of your groceries so they don't lose money. In the end, YOU pay more for the same items.",
    citizenImpact: "Your shopping, food, and everyday items will become more expensive.",
    color: "#DC2626",
  },
  {
    id: 2,
    title: "Tax on Mobile Payment Fees",
    sector: "Fintech",
    impact: "High Impact",
    summary: "Businesses that accept M-Pesa, Airtel Money, or card payments will be taxed extra on every transaction.",
    detail: "Every time a business accepts payment via M-Pesa Paybill, Till Number, or card, they pay a small processing fee. The government now wants to tax that fee. Small businesses like mama mbogas, salons, and hardware shops will raise their prices to cover this extra cost. You will feel it every time you buy something.",
    citizenImpact: "Prices at small shops and businesses will go up. Some may stop accepting M-Pesa altogether.",
    color: "#DC2626",
  },
  {
    id: 3,
    title: "Netflix, Spotify & App Subscriptions Will Cost More",
    sector: "Telecommunications",
    impact: "High Impact",
    summary: "The government is expanding what counts as a 'royalty' — meaning Netflix, Spotify, software, and cloud services will be taxed more.",
    detail: "Currently, when you pay for Netflix, Spotify, Microsoft Office, or any app, a portion of that money is sent to a foreign company. The government wants to tax these payments as 'royalties'. The companies will respond by increasing what they charge Kenyan users. Students, professionals, and businesses that rely on digital tools will be hit hardest.",
    citizenImpact: "Your Netflix, Spotify, software subscriptions, and cloud services will become more expensive.",
    color: "#DC2626",
  },
  {
    id: 4,
    title: "Betting Winnings Taxed More",
    sector: "Betting",
    impact: "Moderate Impact",
    summary: "If you win from betting, the government will now take 30% instead of 20%.",
    detail: "Currently if you win KSh 10,000 from betting, you take home KSh 8,000 after tax. Under the new bill, you would only take home KSh 7,000. That is KSh 1,000 less in your pocket for the same win. Many young Kenyans who bet to supplement their income will feel this directly.",
    citizenImpact: "You keep less money when you win a bet. Your winnings are reduced by 30% instead of 20%.",
    color: "#F59E0B",
  },
  {
    id: 5,
    title: "Shorter Deadlines to File Tax Returns",
    sector: "Banking",
    impact: "Moderate Impact",
    summary: "Businesses and individuals now have less time to file their taxes — the deadline is being moved 2 months earlier.",
    detail: "Previously you had until June 30 to file your taxes for the previous year. The new bill moves this to April 30 — two months earlier. For small business owners who don't have accountants, this is a huge pressure. Missing the deadline means fines and interest charges piling on top of the tax you already owe.",
    citizenImpact: "Small business owners face fines and penalties if they miss the tighter new deadline.",
    color: "#F59E0B",
  },
  {
    id: 6,
    title: "KRA Will Fill Your Tax Return For You",
    sector: "Banking",
    impact: "Moderate Impact",
    summary: "KRA will pre-fill your tax return using data they gather. You may not know if it's wrong.",
    detail: "KRA wants to automatically fill in your tax return using information from your employer, bank, and other sources. While this sounds helpful, if KRA uses wrong information — like if your employer made an error — you could be billed more tax than you actually owe. There is no clear way in the bill for you to easily challenge a mistake.",
    citizenImpact: "You might be asked to pay more tax than you owe because of errors in KRA's pre-filled data.",
    color: "#F59E0B",
  },
  {
    id: 7,
    title: "Foreign Landlords Will Pass Tax Costs to Tenants",
    sector: "Real Estate",
    impact: "High Impact",
    summary: "If your office or business space is owned by a foreign company, your business must now pay tax on their behalf.",
    detail: "Many commercial buildings in Kenya — offices, malls, warehouses — are owned by foreign companies. Under this bill, if you rent from a foreign landlord, YOU (the tenant) are responsible for calculating and paying a withholding tax to KRA on their behalf. Most foreign landlords will simply raise rent to cover this hassle. Your business costs go up.",
    citizenImpact: "Business rent costs increase, which gets passed on to customers through higher prices.",
    color: "#DC2626",
  },
  {
    id: 8,
    title: "House Rent Tax Goes Up to 10%",
    sector: "Real Estate",
    impact: "High Impact",
    summary: "Landlords will pay more tax on rental income — from 7.5% to 10%. They will simply charge tenants more rent.",
    detail: "If your landlord earns KSh 20,000/month from renting to you, they currently pay KSh 1,500 in tax. Under the new bill, they will pay KSh 2,000 — an extra KSh 500 per month. Landlords will simply add this to your rent. In a country where housing is already expensive and many people struggle to pay rent, this is a direct hit on millions of tenants.",
    citizenImpact: "Your monthly rent will go up. Landlords will pass the extra tax directly to you.",
    color: "#DC2626",
  },
  {
    id: 9,
    title: "Phones & Laptops Will Be More Expensive",
    sector: "Telecommunications",
    impact: "High Impact",
    summary: "The excise duty on phones is being raised to 25%, and the tax is charged when your phone is activated — not just imported.",
    detail: "Currently phones are taxed when they enter Kenya. The new bill raises the excise duty to 25% AND changes when the tax is charged — now it applies when the phone is activated (i.e. when you first turn it on with a SIM card). This means every new or second-hand phone you buy and activate in Kenya becomes more expensive. For students and families who need phones for school and work, this is a serious burden.",
    citizenImpact: "New and second-hand phones will cost more. Laptops and tablets may also be affected.",
    color: "#DC2626",
  },
  {
    id: 10,
    title: "VAT Added to M-Pesa & Digital Payment Services",
    sector: "Fintech",
    impact: "High Impact",
    summary: "For the first time, VAT will be charged on M-Pesa transfers, Paybill, and digital payment services.",
    detail: "Right now M-Pesa transaction fees do not have VAT added on top. Under this bill, VAT will apply to mobile money transfers, payment processing, and digital financial services. This means every time you send money, pay a bill, or use a digital payment, the fee you pay will be higher. For millions of Kenyans who use M-Pesa as their only bank, this is a tax on daily survival.",
    citizenImpact: "Sending money via M-Pesa or paying bills digitally will cost you more every single day.",
    color: "#DC2626",
  },
  {
    id: 11,
    title: "Tax on Second-Hand Clothes (Mitumba)",
    sector: "Banking",
    impact: "High Impact",
    summary: "A new 5% tax on imported second-hand clothes and shoes will make mitumba more expensive.",
    detail: "Millions of Kenyans buy mitumba — second-hand imported clothes — because they are affordable. The bill proposes a 5% tax on the customs value of all imported second-hand clothes and shoes. This will be passed on to you as the buyer. For low-income families that rely on mitumba for school uniforms, work clothes, and everyday wear, this directly increases the cost of dressing.",
    citizenImpact: "Mitumba clothes and shoes will become more expensive at the market.",
    color: "#DC2626",
  },
  {
    id: 12,
    title: "Vintage & Antique Cars Taxed at 50%",
    sector: "Betting",
    impact: "Low Impact",
    summary: "Classic, vintage, and antique cars will now attract a 50% excise duty.",
    detail: "If you own or plan to import a classic or vintage car, you will now pay 50% excise duty on it. While this affects fewer ordinary Kenyans directly, it signals a pattern of new excise duties being introduced across multiple categories — and historically these categories tend to expand over time to include more everyday items.",
    citizenImpact: "Collectors and enthusiasts will pay significantly more. A broader trend of new excise duties.",
    color: "#16A34A",
  },
];

const SECTORS = ["All", "Fintech", "Telecommunications", "Real Estate", "Betting", "Banking"];

const GREETINGS = [
  "I am writing to formally register my strong objection to",
  "I wish to place on record my firm opposition to",
  "As a concerned Kenyan citizen, I write to formally reject",
  "I respectfully but firmly oppose",
  "This letter serves as my formal rejection of",
];
const OPENERS = [
  "This proposal will directly increase the cost of living for millions of ordinary Kenyans who are already struggling with rising prices and economic hardship.",
  "At a time when Kenyans are navigating rising inflation and reduced purchasing power, this clause adds an unjustifiable financial burden on ordinary citizens.",
  "The implementation of this clause will deepen economic inequality and push more Kenyans further away from financial stability and basic affordability.",
  "This measure, if enacted, will make everyday life more expensive for hardworking Kenyan families who deserve relief, not more taxation.",
];
const BODIES = [
  [
    "The cost of this tax will inevitably be passed on to ordinary citizens through higher prices, reduced access to services, and increased cost of doing business.",
    "Small business owners — the backbone of Kenya's economy — will be disproportionately affected, with many unable to absorb the additional compliance and financial costs.",
    "Kenya's progress on digital financial inclusion, celebrated globally, risks being reversed if mobile and digital services become cost-prohibitive for low-income citizens.",
  ],
  [
    "Lower-income Kenyans, who already spend the majority of their earnings on basic needs, will bear the heaviest burden of this proposed change.",
    "The informal sector, which employs the majority of Kenya's workforce, has no capacity to absorb further taxation without reducing employment or raising prices on consumers.",
    "Kenya's competitive position as a digital economy leader in Africa will be undermined if digital transactions continue to be taxed more heavily than in peer economies.",
  ],
  [
    "This clause fails to consider the cumulative effect of multiple tax measures piling on a single household's budget — the combined pressure on ordinary Kenyans is unsustainable.",
    "Access to affordable financial and digital services is not a luxury — it is a fundamental necessity for economic participation. This clause restricts that access.",
    "Young Kenyans, small entrepreneurs, and innovators will face a more hostile economic environment if the cost of essential services continues to rise.",
  ],
];
const CLOSINGS = [
  "I urge Parliament to withdraw this clause and engage in broader, genuine public consultation before any revised version is tabled.",
  "Parliament must prioritise the welfare of ordinary Kenyans over revenue targets that harm the very citizens it is meant to serve.",
  "I implore the National Assembly to reconsider this provision and replace it with equitable alternatives that do not punish citizens for basic economic participation.",
  "Kenya deserves a Finance Bill that fosters growth, inclusion, and shared prosperity — not one that extracts more from those who can least afford it.",
];
const SIGNATURES = [
  "A deeply concerned Kenyan citizen and taxpayer",
  "A Kenyan who believes in fair and equitable taxation",
  "A Kenyan taxpayer exercising their constitutional right to public participation",
  "A citizen committed to a fair and prosperous Kenya for all",
];

function generateEmail(clause) {
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const subject = `Formal Objection – Finance Bill 2026: ${clause.title} | Public Participation Submission`;
  const body =
`The Clerk of the National Assembly,
National Assembly of Kenya,
Parliament Buildings, Nairobi.

${new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}

Dear Clerk,

RE: FORMAL OBJECTION – FINANCE BILL 2026: ${clause.title.toUpperCase()}

${pick(GREETINGS)} the proposed "${clause.title}" clause in the Finance Bill 2026.

${pick(OPENERS)}

${pick(BODIES).join("\n\n")}

Specifically on this clause: ${clause.citizenImpact}

${pick(CLOSINGS)}

This submission is made in accordance with Article 118 of the Constitution of Kenya, which guarantees every citizen the right to participate in the legislative process.

Yours faithfully,

${pick(SIGNATURES)}`;

  return { subject, body, recipient: "cna@parliament.go.ke" };
}

// Open Gmail correctly on every device
function openGmail(clause, setEmailsSent, setConfirmed) {
  const { subject, body, recipient } = generateEmail(clause);
  const enc = s => encodeURIComponent(s);
  const ua = navigator.userAgent || "";
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isMobile = /android|iphone|ipad|ipod/i.test(ua);

  if (!isMobile) {
    // Desktop: Gmail web compose
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(recipient)}&su=${enc(subject)}&body=${enc(body)}`,
      "_blank"
    );
  } else if (isIOS) {
    // iOS: try Gmail app, fallback to mailto after short delay
    window.location.href =
      `googlegmail://co?to=${enc(recipient)}&subject=${enc(subject)}&body=${enc(body)}`;
    setTimeout(() => {
      window.location.href =
        `mailto:${recipient}?subject=${enc(subject)}&body=${enc(body)}`;
    }, 1000);
  } else {
    // Android: mailto: is handled by Gmail directly — NO intent:// (that opens Play Store)
    window.location.href =
      `mailto:${recipient}?subject=${enc(subject)}&body=${enc(body)}`;
  }

  setEmailsSent(prev => prev + 1);
  setConfirmed(clause);
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function ImpactBadge({ level }) {
  const map = {
    "High Impact":     { bg: "rgba(220,38,38,0.15)",   border: "rgba(220,38,38,0.35)",   color: "#f87171" },
    "Moderate Impact": { bg: "rgba(245,158,11,0.15)",  border: "rgba(245,158,11,0.35)",  color: "#fbbf24" },
    "Low Impact":      { bg: "rgba(22,163,74,0.15)",   border: "rgba(22,163,74,0.35)",   color: "#4ade80" },
  };
  const s = map[level] || map["Low Impact"];
  return (
    <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
      {level}
    </span>
  );
}

function SectorBadge({ sector }) {
  const map = {
    Fintech:           { bg: "rgba(14,165,233,0.12)", color: "#38bdf8" },
    Telecommunications:{ bg: "rgba(139,92,246,0.12)", color: "#a78bfa" },
    "Real Estate":     { bg: "rgba(249,115,22,0.12)", color: "#fb923c" },
    Betting:           { bg: "rgba(236,72,153,0.12)", color: "#f472b6" },
    Banking:           { bg: "rgba(20,184,166,0.12)", color: "#2dd4bf" },
  };
  const s = map[sector] || { bg: "rgba(255,255,255,0.06)", color: "#94a3b8" };
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px" }}>
      {sector}
    </span>
  );
}

function ClauseCard({ clause, onReject }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(145deg,#1a1f2e,#13182400)",
        backgroundColor: "#13182b",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.5)" : "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div style={{ height: "3px", borderRadius: "16px 16px 0 0", background: clause.color }} />

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "#4b5563", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Clause {clause.id}
          </span>
          <ImpactBadge level={clause.impact} />
        </div>

        <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.3, margin: 0 }}>
          {clause.title}
        </h3>

        <SectorBadge sector={clause.sector} />

        <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>
          {clause.summary}
        </p>

        <div style={{ background: "rgba(220,38,38,0.07)", border: "1px solid rgba(220,38,38,0.18)", borderRadius: "8px", padding: "10px 12px" }}>
          <p style={{ fontSize: "10px", fontWeight: 800, color: "#f87171", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            What this means for you
          </p>
          <p style={{ fontSize: "12px", color: "#fca5a5", margin: 0, lineHeight: 1.5 }}>
            {clause.citizenImpact}
          </p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          style={{ background: "none", border: "none", color: "#60a5fa", fontSize: "12px", fontWeight: 600, cursor: "pointer", padding: 0, textAlign: "left" }}
        >
          {expanded ? "▲ Show Less" : "▼ Full Explanation"}
        </button>

        {expanded && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
            <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.75, margin: 0 }}>
              {clause.detail}
            </p>
          </div>
        )}
      </div>

      <div style={{ padding: "0 20px 20px" }}>
        <button
          onClick={() => onReject(clause)}
          style={{
            width: "100%", padding: "13px",
            background: "linear-gradient(135deg,#dc2626,#b91c1c)",
            color: "white", border: "none", borderRadius: "10px",
            fontSize: "14px", fontWeight: 800, cursor: "pointer",
            letterSpacing: "0.02em", boxShadow: "0 4px 15px rgba(220,38,38,0.28)",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          ✕ Reject This Clause
        </button>
      </div>
    </div>
  );
}

function ConfirmToast({ clause, onClose }) {
  const [copied, setCopied] = useState(false);
  const ua = navigator.userAgent || "";
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isMobile = /android|iphone|ipad|ipod/i.test(ua);

  const handleCopy = () => {
    const { subject, body, recipient } = generateEmail(clause);
    navigator.clipboard.writeText(`To: ${recipient}\nSubject: ${subject}\n\n${body}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleRetry = () => {
    const { subject, body, recipient } = generateEmail(clause);
    const enc = s => encodeURIComponent(s);
    if (!isMobile) {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${enc(recipient)}&su=${enc(subject)}&body=${enc(body)}`, "_blank");
    } else if (isIOS) {
      window.location.href = `googlegmail://co?to=${enc(recipient)}&subject=${enc(subject)}&body=${enc(body)}`;
      setTimeout(() => { window.location.href = `mailto:${recipient}?subject=${enc(subject)}&body=${enc(body)}`; }, 1000);
    } else {
      window.location.href = `mailto:${recipient}?subject=${enc(subject)}&body=${enc(body)}`;
    }
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: "#141926", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", maxWidth: "420px", width: "100%", overflow: "hidden" }}>
        <div style={{ height: "4px", background: "linear-gradient(90deg,#16a34a,#22c55e)" }} />
        <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: "14px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", lineHeight: 1 }}>📬</div>

          <div>
            <h3 style={{ color: "#f1f5f9", fontSize: "19px", fontWeight: 800, margin: "0 0 6px" }}>
              {isMobile ? "Gmail App is Opening!" : "Gmail is Opening!"}
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
              Your rejection email for <strong style={{ color: "#f1f5f9" }}>{clause.title}</strong> is pre-written and ready to send.
            </p>
          </div>

          <div style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)", borderRadius: "10px", padding: "12px 14px", textAlign: "left" }}>
            <p style={{ color: "#4ade80", fontSize: "10px", fontWeight: 800, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>✓ Already done for you</p>
            <p style={{ color: "#86efac", fontSize: "12px", margin: "0 0 3px" }}>📨 To: cna@parliament.go.ke</p>
            <p style={{ color: "#86efac", fontSize: "12px", margin: "0 0 3px" }}>📝 Subject: pre-filled</p>
            <p style={{ color: "#86efac", fontSize: "12px", margin: 0 }}>✉️ Full rejection message: pre-written</p>
          </div>

          <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.22)", borderRadius: "10px", padding: "12px 14px" }}>
            <p style={{ color: "#fbbf24", fontSize: "13px", fontWeight: 800, margin: "0 0 4px" }}>👉 One step left:</p>
            <p style={{ color: "#fde68a", fontSize: "13px", margin: 0, lineHeight: 1.6 }}>
              In Gmail, just tap <strong>Send ➤</strong>. Your objection goes straight to Parliament.
            </p>
          </div>

          {/* Retry button */}
          <button
            onClick={handleRetry}
            style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg,#dc2626,#b91c1c)", color: "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
          >
            📧 Try Again
          </button>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
            <p style={{ color: "#4b5563", fontSize: "11px", margin: "0 0 8px" }}>
              Gmail didn't open? Copy the message and paste it into any email app.
            </p>
            <button
              onClick={handleCopy}
              style={{ width: "100%", padding: "11px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: copied ? "#4ade80" : "#94a3b8", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
            >
              {copied ? "✓ Copied!" : "📋 Copy Full Message"}
            </button>
          </div>

          <div>
            <p style={{ color: "#374151", fontSize: "11px", margin: "0 0 8px", fontWeight: 600 }}>Tell others:</p>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just formally rejected Finance Bill 2026 – " + clause.title + ". Make your voice heard! #FinanceBill2026 #PublicParticipation #KenyaDecides")}`} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 12px", background: "#1d9bf0", color: "white", borderRadius: "8px", fontSize: "11px", fontWeight: 700, textDecoration: "none" }}>X / Twitter</a>
              <a href={`https://wa.me/?text=${encodeURIComponent("I rejected Finance Bill 2026 clause: " + clause.title + ". You can too — submit to Parliament before July 1! #FinanceBill2026")}`} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 12px", background: "#25D366", color: "white", borderRadius: "8px", fontSize: "11px", fontWeight: 700, textDecoration: "none" }}>WhatsApp</a>
              <a href={`https://www.facebook.com/sharer/sharer.php`} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 12px", background: "#1877f2", color: "white", borderRadius: "8px", fontSize: "11px", fontWeight: 700, textDecoration: "none" }}>Facebook</a>
            </div>
          </div>

          <button onClick={onClose} style={{ padding: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#4b5563", borderRadius: "10px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [confirmed, setConfirmed] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSector, setActiveSector] = useState("All");
  const [emailsSent, setEmailsSent] = useState(1247);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const filtered = CLAUSES.filter(c => {
    const ms = activeSector === "All" || c.sector === activeSector;
    const mq = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return ms && mq;
  });

  const stats = [
    { label: "Total Clauses", value: "57", icon: "📋" },
    { label: "Implementation", value: "July 1", icon: "⏰" },
    { label: "Sectors Hit", value: "5+", icon: "🏢" },
    { label: "Days Left", value: Math.max(0, Math.ceil((new Date("2026-07-01") - new Date()) / 86400000)).toString(), icon: "🔥" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", fontFamily: "'Segoe UI',system-ui,sans-serif", color: "#f1f5f9" }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse  { 0%,100% { opacity:1; } 50% { opacity:0.55; } }
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#0d1117; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#0d1117; }
        ::-webkit-scrollbar-thumb { background:#374151; border-radius:3px; }
        input::placeholder { color:#4b5563; }
        input:focus { outline:none; border-color:rgba(96,165,250,0.5) !important; box-shadow:0 0 0 3px rgba(96,165,250,0.08); }
        a { -webkit-tap-highlight-color: transparent; }
        button { -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* ── NAV ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(13,17,23,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
      }}>
        <nav style={{ maxWidth: "1200px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "20px" }}>🇰🇪</span>
            <span style={{ fontSize: "15px", fontWeight: 900, letterSpacing: "-0.02em" }}>
              <span style={{ color: "#f1f5f9" }}>Finance</span>
              <span style={{ color: "#ef4444" }}>Bill</span>
              <span style={{ color: "#60a5fa" }}>2026</span>
            </span>
          </div>
          <span style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: "10px", fontWeight: 800, padding: "4px 10px", borderRadius: "20px", animation: "pulse 2s infinite", letterSpacing: "0.08em" }}>
            OPEN FOR SUBMISSIONS
          </span>
        </nav>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>

        {/* ── HERO ── */}
        <section style={{ padding: "48px 0 32px", textAlign: "center", animation: "fadeIn 0.5s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "20px", padding: "5px 12px", marginBottom: "20px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", animation: "pulse 1.5s infinite", display: "inline-block", flexShrink: 0 }} />
            <span style={{ color: "#f87171", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>Deadline: July 1, 2026</span>
          </div>

          <h1 style={{ fontSize: "clamp(28px,6vw,56px)", fontWeight: 900, lineHeight: 1.1, marginBottom: "16px", letterSpacing: "-0.03em" }}>
            Your Voice On The<br />
            <span style={{ background: "linear-gradient(135deg,#ef4444,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Finance Bill 2026</span>
          </h1>

          <p style={{ fontSize: "clamp(14px,2.5vw,17px)", color: "#94a3b8", maxWidth: "580px", margin: "0 auto 12px", lineHeight: 1.75 }}>
            The Finance Bill 2026 has <strong style={{ color: "#f1f5f9" }}>57 clauses</strong> that could make your rent, food, M-Pesa transactions, phone, and daily life <strong style={{ color: "#ef4444" }}>more expensive</strong>. Parliament is listening until <strong style={{ color: "#ef4444" }}>July 1, 2026</strong>.
          </p>

          <p style={{ fontSize: "13px", color: "#4b5563", maxWidth: "480px", margin: "0 auto 28px", lineHeight: 1.65 }}>
            Under Article 118 of the Constitution, you have the right to tell Parliament what you think. Click any clause below and we open Gmail with your rejection message already written — just hit Send.
          </p>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#clauses" style={{ padding: "13px 24px", background: "linear-gradient(135deg,#dc2626,#b91c1c)", color: "white", borderRadius: "10px", fontSize: "14px", fontWeight: 800, textDecoration: "none", boxShadow: "0 4px 20px rgba(220,38,38,0.28)" }}>
              See All Clauses →
            </a>
            <a href="#how" style={{ padding: "13px 24px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              How it Works
            </a>
          </div>
        </section>

        {/* ── STATS — single horizontal row, small ── */}
        <div style={{
          display: "flex",
          gap: "10px",
          marginBottom: "36px",
          overflowX: "auto",
          paddingBottom: "4px",
          WebkitOverflowScrolling: "touch",
        }}>
          {stats.map(s => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px",
              padding: "12px 16px",
              textAlign: "center",
              flex: "1 0 auto",
              minWidth: "90px",
            }}>
              <div style={{ fontSize: "18px", marginBottom: "4px" }}>{s.icon}</div>
              <div style={{ fontSize: "20px", fontWeight: 900, color: "#f1f5f9", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "10px", color: "#4b5563", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "3px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── CLAUSES ── */}
        <section id="clauses" style={{ paddingBottom: "56px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "6px", letterSpacing: "-0.02em" }}>Bill Clauses</h2>
            <p style={{ color: "#4b5563", fontSize: "13px", marginBottom: "18px" }}>
              Written in plain language. Tap "Reject This Clause" and Gmail opens with your message ready.
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search clauses..."
                style={{ padding: "9px 14px", background: "#1a2030", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "9px", color: "#f1f5f9", fontSize: "13px", flex: "1", minWidth: "160px" }}
              />
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {SECTORS.map(s => (
                  <button key={s} onClick={() => setActiveSector(s)} style={{
                    padding: "7px 12px",
                    background: activeSector === s ? "rgba(96,165,250,0.18)" : "rgba(255,255,255,0.04)",
                    border: activeSector === s ? "1px solid rgba(96,165,250,0.4)" : "1px solid rgba(255,255,255,0.07)",
                    color: activeSector === s ? "#60a5fa" : "#64748b",
                    borderRadius: "8px", fontSize: "11px", fontWeight: 700, cursor: "pointer",
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "16px", alignItems: "start" }}>
            {filtered.map(c => (
              <ClauseCard key={c.id} clause={c} onReject={cl => openGmail(cl, setEmailsSent, setConfirmed)} />
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: "#374151" }}>
                No clauses match your search.
              </div>
            )}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how" style={{ textAlign: "center", paddingBottom: "56px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "6px" }}>How It Works</h2>
          <p style={{ color: "#4b5563", fontSize: "13px", marginBottom: "28px" }}>Two taps. That's it.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "14px", maxWidth: "600px", margin: "0 auto" }}>
            {[
              { n: "1", icon: "📖", label: "Read a clause and see how it affects you" },
              { n: "2", icon: "✕",  label: "Tap Reject — Gmail opens with message ready" },
              { n: "3", icon: "📤", label: "Press Send in Gmail. Parliament receives it." },
            ].map(s => (
              <div key={s.n} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px 14px" }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{s.icon}</div>
                <div style={{ background: "rgba(96,165,250,0.14)", color: "#60a5fa", fontSize: "10px", fontWeight: 800, width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>{s.n}</div>
                <p style={{ color: "#64748b", fontSize: "12px", lineHeight: 1.55 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SHARE ── */}
        <section style={{ textAlign: "center", paddingBottom: "48px" }}>
          <p style={{ color: "#374151", fontSize: "12px", marginBottom: "12px", fontWeight: 600 }}>Help spread the word</p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Kenya's Finance Bill 2026 will make rent, M-Pesa, food and phones more expensive. Tell Parliament NO before July 1. #FinanceBill2026 #PublicParticipation")}`} target="_blank" rel="noopener noreferrer" style={{ padding: "9px 16px", background: "#1d9bf0", color: "white", borderRadius: "8px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>Share on X</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://financebill2026.ke`} target="_blank" rel="noopener noreferrer" style={{ padding: "9px 16px", background: "#1877f2", color: "white", borderRadius: "8px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>Facebook</a>
            <a href={`https://wa.me/?text=${encodeURIComponent("The Finance Bill 2026 will make M-Pesa, rent, phones and food more expensive. Tell Parliament NO before July 1. #FinanceBill2026")}`} target="_blank" rel="noopener noreferrer" style={{ padding: "9px 16px", background: "#25D366", color: "white", borderRadius: "8px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>WhatsApp</a>
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "20px", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ color: "#1f2937", fontSize: "11px", lineHeight: 1.6, marginBottom: "4px" }}>
            <strong style={{ color: "#374151" }}>Disclaimer:</strong> This platform is independently created to simplify public participation. It is not affiliated with Parliament of Kenya or any government body.
          </p>
          <p style={{ color: "#1f2937", fontSize: "11px", marginBottom: "10px" }}>
            Submissions go to cna@parliament.go.ke — the official National Assembly inbox.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
            <span style={{ display: "inline-block", width: "32px", height: "3px", background: "#006600", borderRadius: "2px" }} />
            <span style={{ display: "inline-block", width: "32px", height: "3px", background: "#BB0000", borderRadius: "2px" }} />
            <span style={{ display: "inline-block", width: "32px", height: "3px", background: "#006600", borderRadius: "2px" }} />
          </div>
        </div>
      </footer>

      {confirmed && <ConfirmToast clause={confirmed} onClose={() => setConfirmed(null)} />}
    </div>
  );
}