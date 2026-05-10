// ===== Config =====
const CONFIG = {
  github: "VijoJohn",
  email: "Vjohn1111@gmail.com",
  cacheTTL: 10 * 60 * 1000, // 10 minutes
};

// Edit these strings to update the // NOW ticker
const NOW = {
  building: "An autonomous SOI-review pipeline for mutual funds.",
  reading:  "Patterns for production agentic AI in regulated finance.",
  questing: "Hardening the NAV-break investigator under SOC1 controls.",
};

// ===== Boot-up sequence (one-time per session) =====
(function bootSequence() {
  const boot = document.getElementById("boot");
  if (!boot) return;
  if (sessionStorage.getItem("vj-booted") === "1") {
    boot.classList.add("hidden");
    setTimeout(() => boot.remove(), 600);
    return;
  }
  const lines = [
    "> initializing VJ-OS...",
    "> loading agent registry........[OK]",
    "> mounting fund-admin modules...[OK]",
    "> calibrating ethics framework..[OK]",
    "> linking GitHub feed...........[OK]",
    "> READY PLAYER ONE.",
  ];
  const linesEl = document.getElementById("boot-lines");
  const barEl = document.getElementById("boot-bar-fill");
  let i = 0;
  function step() {
    if (i < lines.length && linesEl) {
      linesEl.textContent += lines[i] + "\n";
      i++;
      if (barEl) barEl.style.width = (i / lines.length) * 100 + "%";
      setTimeout(step, 220);
    } else {
      setTimeout(finish, 350);
    }
  }
  function finish() {
    sessionStorage.setItem("vj-booted", "1");
    boot.classList.add("hidden");
    setTimeout(() => boot.remove(), 600);
  }
  function skip() {
    if (barEl) barEl.style.width = "100%";
    finish();
  }
  boot.addEventListener("click", skip, { once: true });
  window.addEventListener("keydown", skip, { once: true });
  step();
})();

// ===== Pixel rain (canvas) =====
(function pixelRain() {
  const canvas = document.getElementById("pixel-rain");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  const dropCount = Math.min(40, Math.floor((w * h) / 30000));
  const drops = Array.from({ length: dropCount }, () => spawn(true));
  function spawn(initial) {
    return {
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 10,
      size: 1 + Math.random() * 2.5,
      speed: 0.2 + Math.random() * 0.7,
      drift: (Math.random() - 0.5) * 0.2,
      hue: Math.random() < 0.7 ? 165 : 310, // teal or magenta
      a: 0.25 + Math.random() * 0.45,
    };
  }
  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const d of drops) {
      d.y -= d.speed;
      d.x += d.drift;
      if (d.y < -10) Object.assign(d, spawn(false));
      ctx.fillStyle = `hsla(${d.hue}, 100%, 65%, ${d.a})`;
      ctx.fillRect(d.x, d.y, d.size, d.size);
    }
    requestAnimationFrame(frame);
  }
  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });
  frame();
})();

// ===== Reveal panels on scroll =====
(function revealOnScroll() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
})();

// ===== +XP popup on quest hover =====
(function xpPopups() {
  const quests = document.querySelectorAll(".quest");
  quests.forEach((q) => {
    let last = 0;
    q.addEventListener("mouseenter", (e) => {
      const now = Date.now();
      if (now - last < 700) return;
      last = now;
      const pop = document.createElement("div");
      pop.className = "xp-pop";
      pop.textContent = "+10 XP";
      const rect = q.getBoundingClientRect();
      pop.style.left = (rect.right - 70) + "px";
      pop.style.top = (rect.top + window.scrollY + 10) + "px";
      document.body.appendChild(pop);
      setTimeout(() => pop.remove(), 950);
    });
  });
})();

// ===== Clock (HUD) =====
function tickClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
setInterval(tickClock, 1000);
tickClock();

// ===== Year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Typewriter tagline =====
const phrases = [
  "Building AI-led autonomous finance.",
  "Agentic systems for fund administration.",
  "Turning checklists into self-driving workflows.",
  "Currently grinding NAV-break boss fights...",
  "Press START to continue.",
];
const typer = document.getElementById("typer");
let pIdx = 0, cIdx = 0, deleting = false;
function type() {
  if (!typer) return;
  const word = phrases[pIdx];
  if (!deleting) {
    typer.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typer.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 30 : 60);
}
type();

// ===== Cached fetch (sessionStorage) =====
async function ghFetch(url) {
  const key = "gh:" + url;
  try {
    const cached = sessionStorage.getItem(key);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < CONFIG.cacheTTL) return data;
    }
  } catch (_) {}
  const r = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!r.ok) throw new Error("GitHub fetch failed: " + r.status);
  const data = await r.json();
  try { sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch (_) {}
  return data;
}

// ===== Hydrate user-level info =====
async function hydrateUser() {
  try {
    const u = await ghFetch(`https://api.github.com/users/${CONFIG.github}`);

    // Avatar (use the higher-res GitHub avatar URL if available)
    const img = document.getElementById("avatar-img");
    if (img && u.avatar_url) img.src = u.avatar_url + "&s=320";

    // Bio overrides the static lore intro if GitHub bio is set
    if (u.bio) {
      const bioEl = document.getElementById("bio-line");
      if (bioEl) {
        bioEl.innerHTML = `Greetings, traveler. I'm <b>${u.name || "Vijo John"}</b> — <b>${u.bio}</b>`;
      }
    }

    // Level = public_repos (capped at 99 for vibes, +1 to feel non-zero)
    const lvl = document.getElementById("level");
    if (lvl && typeof u.public_repos === "number") {
      lvl.textContent = Math.min(99, u.public_repos);
    }

    // XP bar = followers progress to next milestone
    const xpText = document.getElementById("xp-text");
    if (xpText && typeof u.followers === "number") {
      const next = Math.max(10, Math.ceil((u.followers + 1) / 10) * 10);
      xpText.textContent = `${u.followers} / ${next}`;
      const xpFill = document.querySelector(".bar-fill.xp");
      if (xpFill) xpFill.style.width = Math.min(100, (u.followers / next) * 100) + "%";
    }

    // Achievements meta
    const ach = document.getElementById("ach-meta");
    if (ach) ach.textContent = `unlocked · ${u.public_repos || 0} repos · ${u.followers || 0} followers`;
  } catch (e) {
    console.warn("hydrateUser failed", e);
    const ach = document.getElementById("ach-meta");
    if (ach) ach.textContent = "unlocked · live data offline";
  }
}

// ===== Hydrate each quest card with live repo data =====
function relTime(iso) {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const day = 86400000;
  if (diff < day) return "today";
  if (diff < day * 2) return "yesterday";
  if (diff < day * 30) return `${Math.floor(diff / day)}d ago`;
  if (diff < day * 365) return `${Math.floor(diff / (day * 30))}mo ago`;
  return `${Math.floor(diff / (day * 365))}y ago`;
}

async function hydrateQuests() {
  const cards = [...document.querySelectorAll(".quest[data-repo]")];
  let liveCount = 0;
  await Promise.all(cards.map(async (el) => {
    const slug = el.dataset.repo;
    try {
      const d = await ghFetch(`https://api.github.com/repos/${CONFIG.github}/${slug}`);

      const descEl = el.querySelector(".quest-desc");
      if (descEl && d.description) descEl.textContent = d.description;

      const tagsEl = el.querySelector(".quest-tags");
      if (tagsEl) {
        const meta = [];
        if (d.language) meta.push(d.language);
        if (typeof d.stargazers_count === "number" && d.stargazers_count > 0) meta.push(`★ ${d.stargazers_count}`);
        if (typeof d.forks_count === "number" && d.forks_count > 0) meta.push(`⑂ ${d.forks_count}`);
        if (d.updated_at) meta.push(`upd ${relTime(d.updated_at)}`);
        if (meta.length) tagsEl.innerHTML = meta.map((m) => `<span>${m}</span>`).join("");
      }
      liveCount++;
    } catch (e) {
      console.warn("hydrateQuest failed for", slug, e);
    }
  }));

  const meta = document.getElementById("quest-meta");
  if (meta) {
    meta.textContent = liveCount > 0
      ? `live from github · ${liveCount} synced`
      : `${cards.length} curated · live data offline`;
  }
}

hydrateUser();
hydrateQuests();

// ===== NOW ticker (populate values from NOW config) =====
(function populateNow() {
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set("now-building", NOW.building);
  set("now-reading", NOW.reading);
  set("now-questing", NOW.questing);
})();

// ===== Contact form (mailto fallback) =====
(function contactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");
  const setStatus = (msg, kind) => {
    if (!status) return;
    status.textContent = msg;
    status.className = "form-status" + (kind ? " " + kind : "");
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    [...form.querySelectorAll("input, textarea")].forEach((el) => el.classList.remove("invalid"));
    const missing = [];
    if (!name) missing.push("name");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push("email");
    if (!message) missing.push("message");
    if (missing.length) {
      missing.forEach((n) => {
        const el = form.querySelector(`[name="${n}"]`);
        if (el) el.classList.add("invalid");
      });
      setStatus("✗ Check the highlighted fields.", "err");
      return;
    }

    const subject = encodeURIComponent(`Portfolio: transmission from ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    setStatus("✓ Opening your mail client…", "ok");
    setTimeout(() => setStatus("", ""), 5000);
  });
})();

// ===== Konami code easter egg =====
const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let kIdx = 0;
window.addEventListener("keydown", (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === konami[kIdx]) {
    kIdx++;
    if (kIdx === konami.length) {
      kIdx = 0;
      const lvl = document.getElementById("level");
      if (lvl) lvl.textContent = "MAX";
      document.body.animate(
        [{ filter: "hue-rotate(0deg)" }, { filter: "hue-rotate(360deg)" }],
        { duration: 1500, iterations: 1 }
      );
      const toast = document.createElement("div");
      toast.textContent = "🏆 ACHIEVEMENT UNLOCKED — Konami Master";
      Object.assign(toast.style, {
        position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)",
        background: "#ffcc4d", color: "#1a1300", padding: "12px 18px",
        borderRadius: "10px", fontFamily: '"Press Start 2P", monospace',
        fontSize: "11px", zIndex: "999", boxShadow: "0 0 20px rgba(255,204,77,0.7)"
      });
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3500);
    }
  } else {
    kIdx = 0;
  }
});
