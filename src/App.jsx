import { useState, useMemo, useEffect, useRef } from "react";
import { loadData, saveData } from "./firebase";
import {
  LayoutDashboard, Calendar, Share2, Settings,
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  Plus, X, CheckCircle, Circle, Trash2,
  ArrowLeft, Copy, Check, ExternalLink, Eye, EyeOff,
  Type, Palette, Smile, Edit3,
  Sparkles, Package, Phone, Clock, AlertTriangle, Zap
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   ✨ C O M H U B  v3 — Studio Thèmes + Hubs Dédiés
   UGH! MOOGH BUILD BIGGEST APP YET. VERY SHINY.
═══════════════════════════════════════════════════════════ */

// ─── BRANDS ────────────────────────────────────────────────
const BRANDS = {
  coriolis:{ primary:"#3B82F6", light:"#DBEAFE", name:"Coriolis" },
  care:    { primary:"#10B981", light:"#D1FAE5", name:"Care"     },
  save:    { primary:"#F59E0B", light:"#FEF3C7", name:"Save"     },
};

// ─── 20 THÈMES PRÉ-FAITS ───────────────────────────────────
const THEMES = {
  cotton_candy:{
    id:"cotton_candy", name:"🍬 Cotton Candy", desc:"Rose poudré, bleu ciel, blanc crème",
    app:"#FDF2F8", sidebar:"#FFFFFF", card:"#FFFFFF", cardInner:"#FDF6FB",
    border:"#F6D9E8", text:"#3D2438", sub:"#A56B92", muted:"#D0A8C4",
    accent:"#EC4899", accentBg:"#FCE7F3",
    shadow:"0 4px 24px rgba(236,72,153,0.12)", shadowHover:"0 8px 32px rgba(236,72,153,0.2)",
    hover:"#FDF0F8", inputBg:"#FBF0F7", bottomNav:"#FFFFFF",
  },
  latte:{
    id:"latte", name:"☕ Latte Macchiato", desc:"Beige, blanc cassé, marron chaud",
    app:"#F5EFE6", sidebar:"#FEFBF5", card:"#FEFBF5", cardInner:"#F5EDE0",
    border:"#E2D3BE", text:"#3A2E22", sub:"#8A6F52", muted:"#B8A284",
    accent:"#A0703C", accentBg:"#EFE2D0",
    shadow:"0 4px 24px rgba(160,112,60,0.12)", shadowHover:"0 8px 32px rgba(160,112,60,0.2)",
    hover:"#F0E8DA", inputBg:"#F2EADC", bottomNav:"#FEFBF5",
  },
  matcha_garden:{
    id:"matcha_garden", name:"🍵 Matcha Garden", desc:"Vert sauge, lin, écriture forêt",
    app:"#F1F4EC", sidebar:"#FBFCF8", card:"#FBFCF8", cardInner:"#EEF2E6",
    border:"#D2DCC2", text:"#26331C", sub:"#5E7048", muted:"#9AAA82",
    accent:"#5E8C4A", accentBg:"#E0EDD4",
    shadow:"0 4px 24px rgba(94,140,74,0.1)", shadowHover:"0 8px 32px rgba(94,140,74,0.18)",
    hover:"#EBF0E2", inputBg:"#EDF1E5", bottomNav:"#FBFCF8",
  },
  lavender:{
    id:"lavender", name:"💜 Lavender Fields", desc:"Lilas, violet doux, blanc",
    app:"#F5F1FB", sidebar:"#FFFFFF", card:"#FFFFFF", cardInner:"#F6F2FC",
    border:"#E0D5F2", text:"#2E2440", sub:"#7A6699", muted:"#B5A4D1",
    accent:"#8B5CF6", accentBg:"#EDE7FB",
    shadow:"0 4px 24px rgba(139,92,246,0.12)", shadowHover:"0 8px 32px rgba(139,92,246,0.2)",
    hover:"#F2ECFB", inputBg:"#F3EDFC", bottomNav:"#FFFFFF",
  },
  midnight_aes:{
    id:"midnight_aes", name:"🌌 Midnight Aesthetic", desc:"Noir profond, anthracite, néon violet",
    app:"#050510", sidebar:"#0A0A1C", card:"#101024", cardInner:"#15152E",
    border:"#222244", text:"#ECECFF", sub:"#6262C0", muted:"#373770",
    accent:"#9D7CFF", accentBg:"#1A1452",
    shadow:"0 4px 32px rgba(157,124,255,0.22)", shadowHover:"0 8px 48px rgba(157,124,255,0.34)",
    hover:"#15152E", inputBg:"#0A0A1C", bottomNav:"#0A0A1C",
  },
  peach:{
    id:"peach", name:"🍑 Peach Sorbet", desc:"Pêche doux, abricot, crème",
    app:"#FFF3EC", sidebar:"#FFFCFA", card:"#FFFCFA", cardInner:"#FFF1E8",
    border:"#FBD9C5", text:"#43271A", sub:"#B06E4C", muted:"#E0A988",
    accent:"#F97A4D", accentBg:"#FEE5D8",
    shadow:"0 4px 24px rgba(249,122,77,0.12)", shadowHover:"0 8px 32px rgba(249,122,77,0.2)",
    hover:"#FEEEE4", inputBg:"#FFF0E7", bottomNav:"#FFFCFA",
  },
  terracotta:{
    id:"terracotta", name:"🏜️ Terracotta Sun", desc:"Terre cuite, argile, sable",
    app:"#FAF0E6", sidebar:"#FEF9F2", card:"#FEF9F2", cardInner:"#F7EAD9",
    border:"#E8CBB0", text:"#3E2417", sub:"#9A6240", muted:"#C99B73",
    accent:"#C2602F", accentBg:"#F2DDC8",
    shadow:"0 4px 24px rgba(194,96,47,0.12)", shadowHover:"0 8px 32px rgba(194,96,47,0.2)",
    hover:"#F5E8D7", inputBg:"#F7EBDB", bottomNav:"#FEF9F2",
  },
  eucalyptus:{
    id:"eucalyptus", name:"🌿 Eucalyptus Clean", desc:"Vert-gris clair, blanc pur, chrome",
    app:"#F0F4F2", sidebar:"#FFFFFF", card:"#FFFFFF", cardInner:"#F2F6F4",
    border:"#D6E0DB", text:"#1F2A26", sub:"#5C6B65", muted:"#9AAAA3",
    accent:"#4A8C7C", accentBg:"#DCEDE7",
    shadow:"0 2px 16px rgba(74,140,124,0.1)", shadowHover:"0 6px 28px rgba(74,140,124,0.18)",
    hover:"#EDF2F0", inputBg:"#EFF4F2", bottomNav:"#FFFFFF",
  },
  barbie:{
    id:"barbie", name:"💖 Barbie Core", desc:"Rose flashy, blanc, paillettes dorées",
    app:"#FFEAF5", sidebar:"#FFFFFF", card:"#FFFFFF", cardInner:"#FFEFF8",
    border:"#FFC2E0", text:"#4A0E2E", sub:"#C13D86", muted:"#F08FC0",
    accent:"#E91E8C", accentBg:"#FFD6EC",
    shadow:"0 4px 24px rgba(233,30,140,0.16)", shadowHover:"0 8px 32px rgba(233,30,140,0.26)",
    hover:"#FFE4F2", inputBg:"#FFE8F4", bottomNav:"#FFFFFF",
  },
  old_money:{
    id:"old_money", name:"💎 Old Money", desc:"Vert émeraude foncé, beige, doré",
    app:"#0E2620", sidebar:"#123029", card:"#163A31", cardInner:"#1A453A",
    border:"#2A5A4C", text:"#F0E8D4", sub:"#A8C0AE", muted:"#5E8270",
    accent:"#C9A961", accentBg:"#1E4A3E",
    shadow:"0 4px 28px rgba(201,169,97,0.18)", shadowHover:"0 8px 40px rgba(201,169,97,0.3)",
    hover:"#1A453A", inputBg:"#123029", bottomNav:"#123029",
  },
  sunset:{
    id:"sunset", name:"🌅 Sunset Boulevard", desc:"Orange doux, rose, jaune crépuscule",
    app:"#FFF1E8", sidebar:"#FFFAF4", card:"#FFFAF4", cardInner:"#FFEDDF",
    border:"#FBD2BC", text:"#4A2418", sub:"#C26544", muted:"#E89F7C",
    accent:"#F26B43", accentBg:"#FEDFCE",
    shadow:"0 4px 24px rgba(242,107,67,0.14)", shadowHover:"0 8px 32px rgba(242,107,67,0.22)",
    hover:"#FFEBDC", inputBg:"#FFEEE0", bottomNav:"#FFFAF4",
  },
  cloud_nine:{
    id:"cloud_nine", name:"☁️ Cloud Nine", desc:"Gris très clair, blanc, bleu brume",
    app:"#EEF1F5", sidebar:"#FFFFFF", card:"#FFFFFF", cardInner:"#F2F5F9",
    border:"#D8DFE8", text:"#222A33", sub:"#5E6B7A", muted:"#9AA6B4",
    accent:"#5B8AC0", accentBg:"#E1EAF4",
    shadow:"0 2px 16px rgba(91,138,192,0.1)", shadowHover:"0 6px 28px rgba(91,138,192,0.18)",
    hover:"#EBEFF4", inputBg:"#EDF1F6", bottomNav:"#FFFFFF",
  },
  minimalist_dark:{
    id:"minimalist_dark", name:"⚫ Minimalist Dark", desc:"Anthracite mat, écriture blanc cassé",
    app:"#1A1A1C", sidebar:"#202023", card:"#27272B", cardInner:"#2D2D32",
    border:"#3A3A40", text:"#ECEAE4", sub:"#9A988F", muted:"#5E5C56",
    accent:"#D4D0C4", accentBg:"#333339",
    shadow:"0 4px 28px rgba(0,0,0,0.4)", shadowHover:"0 8px 40px rgba(0,0,0,0.55)",
    hover:"#2D2D32", inputBg:"#202023", bottomNav:"#202023",
  },
  lemonade:{
    id:"lemonade", name:"🍋 Lemonade", desc:"Jaune pastel, blanc, vert menthe",
    app:"#FDFBEB", sidebar:"#FFFFFF", card:"#FFFFFF", cardInner:"#FCFAE4",
    border:"#EDE4B8", text:"#33310E", sub:"#8A8340", muted:"#C2BB7A",
    accent:"#D4A017", accentBg:"#F6F0CE",
    shadow:"0 4px 24px rgba(212,160,23,0.12)", shadowHover:"0 8px 32px rgba(212,160,23,0.2)",
    hover:"#F8F4DE", inputBg:"#FAF6E0", bottomNav:"#FFFFFF",
  },
  cherry_blossom:{
    id:"cherry_blossom", name:"🌸 Cherry Blossom", desc:"Blanc rosé, rose cerisier japonais",
    app:"#FDF4F4", sidebar:"#FFFCFC", card:"#FFFCFC", cardInner:"#FDF1F1",
    border:"#F5D6D9", text:"#3E2228", sub:"#A8636E", muted:"#D8A2AB",
    accent:"#D9637B", accentBg:"#FAE2E6",
    shadow:"0 4px 24px rgba(217,99,123,0.12)", shadowHover:"0 8px 32px rgba(217,99,123,0.2)",
    hover:"#FCEEEE", inputBg:"#FDF0F0", bottomNav:"#FFFCFC",
  },
  ocean:{
    id:"ocean", name:"🌊 Ocean Breeze", desc:"Bleu lagon clair, sable, blanc",
    app:"#ECF6F8", sidebar:"#FFFFFF", card:"#FFFFFF", cardInner:"#EEF7F9",
    border:"#C6E2E8", text:"#103038", sub:"#3E7A86", muted:"#84B4BE",
    accent:"#1B9AAA", accentBg:"#D6EEF2",
    shadow:"0 4px 24px rgba(27,154,170,0.12)", shadowHover:"0 8px 32px rgba(27,154,170,0.2)",
    hover:"#E6F3F5", inputBg:"#E9F4F6", bottomNav:"#FFFFFF",
  },
  dark_academia:{
    id:"dark_academia", name:"📚 Dark Academia", desc:"Brun chocolat, beige, bordeaux",
    app:"#211810", sidebar:"#2A1F15", card:"#33271A", cardInner:"#3C2E20",
    border:"#4E3D2C", text:"#EDE0CC", sub:"#B89B78", muted:"#6E5A42",
    accent:"#9C4A3C", accentBg:"#3E2A22",
    shadow:"0 4px 28px rgba(156,74,60,0.2)", shadowHover:"0 8px 40px rgba(156,74,60,0.32)",
    hover:"#3C2E20", inputBg:"#2A1F15", bottomNav:"#2A1F15",
  },
  neon_cyber:{
    id:"neon_cyber", name:"🤖 Neon Cyber", desc:"Fond noir, rose & bleu fluo",
    app:"#06060F", sidebar:"#0C0C1A", card:"#111124", cardInner:"#16162E",
    border:"#24244A", text:"#E8F4FF", sub:"#4DD0E1", muted:"#33335E",
    accent:"#FF2EC4", accentBg:"#1A0A2E",
    shadow:"0 4px 32px rgba(255,46,196,0.24)", shadowHover:"0 8px 48px rgba(77,208,225,0.34)",
    hover:"#16162E", inputBg:"#0C0C1A", bottomNav:"#0C0C1A",
  },
  sage_cream:{
    id:"sage_cream", name:"🌱 Sage & Cream", desc:"Vert sauge, crème, gris foncé",
    app:"#F3F1E8", sidebar:"#FCFBF5", card:"#FCFBF5", cardInner:"#EFEDE0",
    border:"#D6D8C4", text:"#2A2E22", sub:"#6A7058", muted:"#A4A88E",
    accent:"#7C8A5C", accentBg:"#E6E9D6",
    shadow:"0 4px 24px rgba(124,138,92,0.1)", shadowHover:"0 8px 32px rgba(124,138,92,0.18)",
    hover:"#EDEBDE", inputBg:"#EFEDE0", bottomNav:"#FCFBF5",
  },
  bubblegum:{
    id:"bubblegum", name:"🫧 Bubblegum", desc:"Mix rose & violet pastel",
    app:"#F8EFFB", sidebar:"#FFFFFF", card:"#FFFFFF", cardInner:"#F9F0FC",
    border:"#EAD2F2", text:"#3A1E42", sub:"#9B5BAE", muted:"#CBA0D8",
    accent:"#B14FD8", accentBg:"#F2DEF9",
    shadow:"0 4px 24px rgba(177,79,216,0.12)", shadowHover:"0 8px 32px rgba(177,79,216,0.2)",
    hover:"#F4E8F9", inputBg:"#F6EBFA", bottomNav:"#FFFFFF",
  },
};

// ─── FONTS ─────────────────────────────────────────────────
// ── 20 POLICES ────────────────────────────────────────────────
const ALL_FONTS = {
  playfair:  {id:"playfair",  name:"Playfair Display", cat:"chic",    heading:"'Playfair Display',serif",          body:"'DM Sans',sans-serif"},
  lora:      {id:"lora",      name:"Lora",              cat:"chic",    heading:"'Lora',serif",                      body:"'DM Sans',sans-serif"},
  cormorant: {id:"cormorant", name:"Cormorant Garamond",cat:"chic",    heading:"'Cormorant Garamond',serif",         body:"'DM Sans',sans-serif"},
  cinzel:    {id:"cinzel",    name:"Cinzel",            cat:"chic",    heading:"'Cinzel',serif",                    body:"'Raleway',sans-serif"},
  im_fell:   {id:"im_fell",   name:"IM Fell English",   cat:"chic",    heading:"'IM Fell English',serif",           body:"'DM Sans',sans-serif"},
  poppins:   {id:"poppins",   name:"Poppins",           cat:"modern",  heading:"'Poppins',sans-serif",              body:"'Poppins',sans-serif"},
  montserrat:{id:"montserrat",name:"Montserrat",        cat:"modern",  heading:"'Montserrat',sans-serif",           body:"'Montserrat',sans-serif"},
  dm_sans:   {id:"dm_sans",   name:"DM Sans",           cat:"modern",  heading:"'DM Sans',sans-serif",              body:"'DM Sans',sans-serif"},
  jakarta:   {id:"jakarta",   name:"Plus Jakarta Sans", cat:"modern",  heading:"'Plus Jakarta Sans',sans-serif",    body:"'Plus Jakarta Sans',sans-serif"},
  outfit:    {id:"outfit",    name:"Outfit",            cat:"modern",  heading:"'Outfit',sans-serif",               body:"'Outfit',sans-serif"},
  inter:     {id:"inter",     name:"Inter",             cat:"modern",  heading:"'Inter',sans-serif",                body:"'Inter',sans-serif"},
  quicksand: {id:"quicksand", name:"Quicksand",         cat:"cute",    heading:"'Quicksand',sans-serif",            body:"'Quicksand',sans-serif"},
  fredoka:   {id:"fredoka",   name:"Fredoka",           cat:"cute",    heading:"'Fredoka',sans-serif",              body:"'Fredoka',sans-serif"},
  comfortaa: {id:"comfortaa", name:"Comfortaa",         cat:"cute",    heading:"'Comfortaa',sans-serif",            body:"'Comfortaa',sans-serif"},
  nunito:    {id:"nunito",    name:"Nunito",            cat:"cute",    heading:"'Nunito',sans-serif",               body:"'Nunito',sans-serif"},
  pacifico:  {id:"pacifico",  name:"Pacifico",          cat:"cute",    heading:"'Pacifico',cursive",                body:"'Quicksand',sans-serif"},
  josefin:   {id:"josefin",   name:"Josefin Sans",      cat:"creative",heading:"'Josefin Sans',sans-serif",         body:"'Josefin Sans',sans-serif"},
  raleway:   {id:"raleway",   name:"Raleway",           cat:"creative",heading:"'Raleway',sans-serif",              body:"'Raleway',sans-serif"},
  work:      {id:"work",      name:"Work Sans",         cat:"creative",heading:"'Work Sans',sans-serif",            body:"'Work Sans',sans-serif"},
  courier:   {id:"courier",   name:"Courier Prime",     cat:"creative",heading:"'Courier Prime',monospace",         body:"'Courier Prime',monospace"},
};
const FONT_CATS = {
  chic:    {label:"✦ Aesthetic & Chic",  ids:["playfair","lora","cormorant","cinzel","im_fell"]},
  modern:  {label:"✦ Moderne & Clean",   ids:["poppins","montserrat","dm_sans","jakarta","outfit","inter"]},
  cute:    {label:"✦ Cute & Casual",     ids:["quicksand","fredoka","comfortaa","nunito","pacifico"]},
  creative:{label:"✦ Créatif & Unique",  ids:["josefin","raleway","work","courier"]},
};
const GF_URL = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Lora:wght@400;600;700&family=Cormorant+Garamond:wght@400;600;700&family=Cinzel:wght@400;600&family=IM+Fell+English&family=Poppins:wght@400;600;700;800&family=Montserrat:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700;9..40,800;9..40,900&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Outfit:wght@400;600;700;800&family=Inter:wght@400;600;700;800&family=Quicksand:wght@400;600;700&family=Fredoka:wght@400;600&family=Comfortaa:wght@400;700&family=Nunito:wght@400;600;700;800&family=Pacifico&family=Josefin+Sans:wght@400;600;700&family=Raleway:wght@400;600;700;800&family=Work+Sans:wght@400;600;700;800&family=Courier+Prime:wght@400;700&display=swap";

// Compat alias pour les composants existants
const FONTS = {
  modern: ALL_FONTS.dm_sans,
  aesthetic: ALL_FONTS.playfair,
  typewriter: ALL_FONTS.courier,
};

// ─── CONSTANTES ─────────────────────────────────────────────
const PLATFORMS = [
  {id:"fb",  emoji:"📘", label:"Facebook",         color:"#1877F2"},
  {id:"ig",  emoji:"📸", label:"Instagram",        color:"#E1306C"},
  {id:"tt",  emoji:"🎵", label:"TikTok",           color:"#69C9D0"},
  {id:"sc",  emoji:"👻", label:"Snapchat",         color:"#FFDB00"},
  {id:"gb",  emoji:"📍", label:"Google Business",  color:"#4285F4"},
  {id:"sl",  emoji:"🔍", label:"Solocal",          color:"#FF6B35"},
  {id:"pt",  emoji:"⭐", label:"Partoo",           color:"#0EA5E9"},
  {id:"mc",  emoji:"📊", label:"Metricool",        color:"#7C3AED"},
  {id:"pj",  emoji:"📒", label:"Pages Jaunes",     color:"#FFD700"},
  {id:"web", emoji:"🌐", label:"Site Web",         color:"#6B7280"},
];

const STATUSES = [
  {id:"idee",      emoji:"💡", label:"Idée",     color:"#7C3AED", bg:"#EDE9FE"},
  {id:"redaction", emoji:"✏️", label:"En cours", color:"#2563EB", bg:"#DBEAFE"},
  {id:"pret",      emoji:"✅", label:"Prêt",     color:"#059669", bg:"#D1FAE5"},
  {id:"planifie",  emoji:"📅", label:"Planifié", color:"#D97706", bg:"#FEF3C7"},
  {id:"publie",    emoji:"🚀", label:"Publié",   color:"#475569", bg:"#F1F5F9"},
];

const EMOJI_BANK = [
  "🌊","⛵","💚","🌿","💾","🌴","✨","🌸","🎯","🌟","💫","🎨",
  "🔥","🌺","💎","🎪","🌈","🦋","🌻","🌙","⭐","🏆","💡","🎭",
  "🌍","🎬","🎤","📱","💬","🖌️","🌞","🎉","🍀","🦄","🌹","💜",
  "🩷","🧡","💛","💙","❤️","🫶","🌀","🎀","🪩","🦩","🌾","🍵",
];

const NAV = [
  {id:"hub",      icon:LayoutDashboard, label:"Hub",       labelFull:"Hub Boutiques"    },
  {id:"calendar", icon:Calendar,        label:"Objectifs", labelFull:"Temps & Objectifs"},
  {id:"social",   icon:Share2,          label:"Social",    labelFull:"Social Planner"   },
  {id:"tools",    icon:Package,         label:"Outils",    labelFull:"Boîte à Outils"   },
];

// ── COUP 2 : ROUTINE / BUDGETS / SWIPE FILE ─────────────────
const INIT_ROUTINE = []
const INIT_BUDGETS = []
const INIT_SWIPES = []

// Audit : 🟡 À faire / 🔴 En cours / 🟢 Propre
const AUDIT_STATES = [
  {id:"todo", emoji:"🟡", label:"À faire",  color:"#D97706", bg:"#FEF3C7"},
  {id:"wip",  emoji:"🔴", label:"En cours", color:"#DC2626", bg:"#FEE2E2"},
  {id:"done", emoji:"🟢", label:"Propre",   color:"#059669", bg:"#D1FAE5"},
];
const INIT_AUDIT = [
  {id:1, name:"Coriolis Brignoles",  gmb:"todo", fb:"todo", insta:"todo"},
  {id:2, name:"Coriolis St Raphaël", gmb:"todo", fb:"todo", insta:"todo"},
  {id:3, name:"Care Le Pontet",      gmb:"todo", fb:"todo", insta:"todo"},
  {id:4, name:"Care Vitrolles",      gmb:"todo", fb:"todo", insta:"todo"},
  {id:5, name:"Save Brignoles",      gmb:"todo", fb:"todo", insta:"todo"},
  {id:6, name:"Save Hyères",         gmb:"todo", fb:"todo", insta:"todo"},
]

// ── JOURS IMPORTANTS ─────────────────────────────────────────
const KEY_DATES = [
  {id:1, date:"2026-06-15", emoji:"👨", label:"Fête des Pères",       idea:"Offrez un téléphone reconditionné ! Idéal pour Papa 📱"},
  {id:2, date:"2026-06-26", emoji:"🛍️", label:"Début des Soldes",     idea:"Communication maximale sur les promotions — urgence contenu !"},
  {id:3, date:"2026-07-14", emoji:"🎆", label:"14 Juillet",            idea:"Horaires spéciaux — pensez à prévenir vos clients"},
  {id:4, date:"2026-09-01", emoji:"📚", label:"Rentrée Scolaire",      idea:"Smartphones étudiants & forfaits jeunes chez Coriolis !"},
  {id:5, date:"2026-09-21", emoji:"♻️", label:"Journée du Recyclage",  idea:"Contenu éco-responsable, reprise téléphone — Care & Save !"},
  {id:6, date:"2026-11-27", emoji:"🖤", label:"Black Friday",          idea:"Vos meilleures promos de l'année — préparez dès maintenant !"},
];
function daysUntil(ds){ return Math.ceil((new Date(ds)-new Date(2026,5,8))/86400000); }

const MEDIA_TAGS = ["#AvantApres","#Equipe","#Façade","#Promo","#TelephoneBrise","#Produit","#Lifestyle","#Behind"];
const MEDIA_STATUSES = [
  {id:"neuf",    emoji:"🟢", label:"Neuf",         desc:"Jamais utilisé"},
  {id:"utilise", emoji:"🟡", label:"Déjà utilisé", desc:"Déjà posté"},
];

const STORE_CONTACTS = [
  {manager:"", phone:"", email:"", address:"", hours:""},
  {manager:"", phone:"", email:"", address:"", hours:""},
  {manager:"", phone:"", email:"", address:"", hours:""},
  {manager:"", phone:"", email:"", address:"", hours:""},
  {manager:"", phone:"", email:"", address:"", hours:""},
  {manager:"", phone:"", email:"", address:"", hours:""},
]
const STOCK_TEMPLATES = [[],[],[],[],[],[]]
const MEDIA_TEMPLATES = [[],[],[],[],[],[]]

// ─── DONNÉES ────────────────────────────────────────────────
const INIT_STORES = [
  {id:1,name:"Coriolis Brignoles", brand:"coriolis",emoji:"🌊",customColor:null,goals:{monthly:0,done:0},weeklyTarget:0,weeklyDone:0},
  {id:2,name:"Coriolis St Raphaël",brand:"coriolis",emoji:"⛵",customColor:null,goals:{monthly:0,done:0},weeklyTarget:0,weeklyDone:0},
  {id:3,name:"Care Le Pontet",     brand:"care",    emoji:"💚",customColor:null,goals:{monthly:0,done:0},weeklyTarget:0,weeklyDone:0},
  {id:4,name:"Care Vitrolles",     brand:"care",    emoji:"🌿",customColor:null,goals:{monthly:0,done:0},weeklyTarget:0,weeklyDone:0},
  {id:5,name:"Save Brignoles",     brand:"save",    emoji:"💾",customColor:null,goals:{monthly:0,done:0},weeklyTarget:0,weeklyDone:0},
  {id:6,name:"Save Hyères",        brand:"save",    emoji:"🌴",customColor:null,goals:{monthly:0,done:0},weeklyTarget:0,weeklyDone:0},
]

const INIT_POSTS = []

const INIT_OBJ = []

// ─── DONNÉES HUBS DÉDIÉS ────────────────────────────────────
function mkStoreDetails(stores) {
  const d = {};
  const DAYS = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi"];
  stores.forEach((store, idx) => {
    d[store.id] = {
      socialLinks:  {fb:"", ig:"", tt:"", sc:"", gb:"", sl:"", pt:"", mc:"", pj:"", web:""},
      credentials:  "",
      showCreds:    false,
      projections:  "",
      gridItems:    Array.from({length:9}, (_, i) => ({
        id:i+1,
        hasContent: false,
        title: "",
        platform: "ig",
        color: BRANDS[store.brand].primary,
        status: "idee",
      })),
      weeklyPosts: DAYS.map((day, i) => ({
        id: i+1, day, platform:"ig",
        title: "",
        caption: "",
        done: false,
      })),
      mediaItems: [],
      nextMediaId: 1,
      contacts: {...(STORE_CONTACTS[idx] || STORE_CONTACTS[0])},
      adStock: [],
    };
  });
  return d;
}

// ─── HOOK RESPONSIVE ─────────────────────────────────────────
function useIsMobile() {
  const [v, setV] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setV(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return v;
}

// ─── HELPERS ─────────────────────────────────────────────────
function hexToRgba(hex, a) {
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}
function Bar({val, max, color, h=6}) {
  const pct = max===0 ? 0 : Math.min(100,Math.round((val/max)*100));
  return (
    <div style={{background:"rgba(128,128,128,0.15)",borderRadius:99,height:h,overflow:"hidden",width:"100%"}}>
      <div style={{width:`${pct}%`,background:color,borderRadius:99,height:h,transition:"width 0.5s ease"}}/>
    </div>
  );
}
function StatusPill({sid}) {
  const s = STATUSES.find(x=>x.id===sid)||STATUSES[0];
  return (
    <span style={{background:s.bg,color:s.color,fontSize:10,fontWeight:700,borderRadius:99,padding:"2px 8px"}}
      className="inline-flex items-center gap-1 whitespace-nowrap">
      {s.emoji} {s.label}
    </span>
  );
}
function CopyBtn({text, t}) {
  const [done, setDone] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).catch(()=>{});
    setDone(true);
    setTimeout(()=>setDone(false), 1800);
  };
  return (
    <button onClick={copy}
      style={{background:done?"#D1FAE5":t.hover,color:done?"#059669":t.muted,
        borderRadius:8,padding:"4px 8px",border:"none",cursor:"pointer",
        fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:4,
        transition:"all 0.2s",flexShrink:0}}>
      {done?<Check size={12}/>:<Copy size={12}/>}
      {done?"Copié !":"Copier"}
    </button>
  );
}

// ─── STUDIO THÈMES (panneau personnalisation avancé) ─────────
function ThemeStudio({onClose, themeId, setThemeId, fontId, setFontId,
  customBg, setCustomBg, customCards, setCustomCards, diy, setDiy,
  savedThemes, setSavedThemes,
  stores, setStores, t, font, isMobile}) {

  const applySaved = (st) => setDiy(p=>({...p, bg:st.bg, text:st.text, accent:st.accent, radius:st.radius, glass:st.glass, grad:st.grad, grad1:st.grad1, grad2:st.grad2}));

  const [tab, setTab] = useState("moods");
  const [emojiFor, setEmojiFor] = useState(null);
  const [themeName, setThemeName] = useState("");
  const [saved, setSaved] = useState(false);
  const upd = (id, p) => setStores(prev=>prev.map(s=>s.id===id?{...s,...p}:s));

  const tabs = [
    {id:"moods",  label:"🎨 Moods"    },
    {id:"diy",    label:"🔧 DIY"      },
    {id:"fonts",  label:"✦ 20 Polices"},
    {id:"colors", label:"🎯 Couleurs" },
    {id:"stores", label:"🏪 Boutiques"},
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end"
      style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)",animation:"fadeIn 0.25s ease"}}>
      <div className="anim-store" style={{
        background:t.sidebar, borderLeft:`1px solid ${t.border}`,
        width:isMobile?"100vw":"min(94vw,440px)", height:"100vh",
        overflowY:"auto", fontFamily:font.body,
        display:"flex", flexDirection:"column"
      }}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"20px 20px 16px",borderBottom:`1px solid ${t.border}`}}>
          <div>
            <h2 style={{color:t.text,fontWeight:800,fontSize:17,fontFamily:font.heading}}>✨ Studio de Personnalisation</h2>
            <p style={{color:t.sub,fontSize:12,marginTop:2}}>Ton espace, ton ambiance, tes règles.</p>
          </div>
          <button onClick={onClose}
            style={{background:t.hover,color:t.text,borderRadius:12,padding:8,border:"none",cursor:"pointer"}}>
            <X size={17}/>
          </button>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:3,padding:"12px 12px 0",overflowX:"auto"}}>
          {tabs.map(tb=>(
            <button key={tb.id} onClick={()=>setTab(tb.id)}
              style={{
                background:tab===tb.id?t.accentBg:"transparent",
                color:tab===tb.id?t.accent:t.sub,
                fontWeight:tab===tb.id?700:400,
                borderRadius:10,padding:"7px 12px",fontSize:12,
                border:`1.5px solid ${tab===tb.id?t.accent:"transparent"}`,
                cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.15s"
              }}>
              {tb.label}
            </button>
          ))}
        </div>

        <div key={tab} className="anim-tab" style={{padding:16,flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12}}>

          {/* ── MOODS ── */}
          {tab==="moods" && <>
            {savedThemes.length>0 && (
              <>
                <p style={{color:t.muted,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>
                  ⭐ Mes thèmes sauvegardés
                </p>
                {savedThemes.map(st=>(
                  <div key={st.id} style={{display:"flex",alignItems:"center",gap:10,background:t.hover,border:`2px solid ${t.border}`,borderRadius:18,padding:"12px 14px"}}>
                    <div style={{width:42,height:42,borderRadius:12,flexShrink:0,border:`1px solid ${t.border}`,background:st.grad?`linear-gradient(135deg,${st.grad1},${st.grad2})`:(st.bg||t.app)}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{color:t.text,fontWeight:700,fontSize:13}}>{st.name}</p>
                      <p style={{color:t.sub,fontSize:10}}>Thème perso</p>
                    </div>
                    <button onClick={()=>applySaved(st)} style={{background:t.accent,color:"#fff",borderRadius:9,padding:"6px 12px",fontSize:11,fontWeight:700,border:"none",cursor:"pointer"}}>Appliquer</button>
                    <button onClick={()=>setSavedThemes(prev=>prev.filter(x=>x.id!==st.id))} style={{background:"transparent",color:t.muted,border:"none",cursor:"pointer",padding:4}}><Trash2 size={14}/></button>
                  </div>
                ))}
                <div style={{height:1,background:t.border,margin:"4px 0"}}/>
              </>
            )}
            <p style={{color:t.muted,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>
              20 Moods — Ambiance complète en 1 clic
            </p>
            {Object.values(THEMES).map(th=>(
              <button key={th.id} onClick={()=>setThemeId(th.id)}
                style={{
                  background:th.id===themeId?t.accentBg:t.hover,
                  border:`2px solid ${th.id===themeId?t.accent:"transparent"}`,
                  borderRadius:18,color:t.text,textAlign:"left",width:"100%",padding:14,
                  display:"flex",alignItems:"center",gap:12,cursor:"pointer"
                }}
                className="transition-all hover:opacity-90">
                <div style={{width:48,height:48,borderRadius:14,overflow:"hidden",
                  flexShrink:0,display:"flex",border:`1px solid ${t.border}`}}>
                  <div style={{background:th.app,flex:1}}/>
                  <div style={{background:th.accent,width:16}}/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{color:t.text,fontWeight:700,fontSize:14}}>{th.name}</p>
                  <p style={{color:t.sub,fontSize:11}}>{th.desc}</p>
                </div>
                {th.id===themeId&&<CheckCircle size={17} style={{color:t.accent,flexShrink:0}}/>}
              </button>
            ))}
          </>}

          {/* ── DIY STUDIO ── */}
          {tab==="diy" && (
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <p style={{color:t.muted,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>Crée ton thème entièrement sur mesure</p>

              {/* Dégradé de fond */}
              <div style={{background:t.hover,borderRadius:16,padding:14}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:diy.grad?12:0}}>
                  <p style={{color:t.text,fontWeight:600,fontSize:13}}>🌈 Fond en dégradé</p>
                  <button onClick={()=>setDiy(p=>({...p,grad:!p.grad}))}
                    style={{width:44,height:24,borderRadius:99,border:"none",cursor:"pointer",background:diy.grad?t.accent:t.border,position:"relative",transition:"all 0.2s"}}>
                    <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:diy.grad?23:3,transition:"left 0.2s"}}/>
                  </button>
                </div>
                {diy.grad && (
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <div style={{height:36,borderRadius:10,border:`1px solid ${t.border}`,background:`linear-gradient(135deg,${diy.grad1},${diy.grad2})`}}/>
                    {[{k:"grad1",l:"Couleur 1"},{k:"grad2",l:"Couleur 2"}].map(g=>(
                      <div key={g.k} style={{display:"flex",gap:10,alignItems:"center"}}>
                        <div style={{position:"relative",width:34,height:34,flexShrink:0}}>
                          <div style={{background:diy[g.k],width:34,height:34,borderRadius:10,border:`2px solid ${t.border}`}}/>
                          <input type="color" value={diy[g.k]} onChange={e=>setDiy(p=>({...p,[g.k]:e.target.value}))}
                            style={{position:"absolute",inset:0,opacity:0,cursor:"pointer",width:"100%",height:"100%"}}/>
                        </div>
                        <span style={{color:t.sub,fontSize:12,flex:1}}>{g.l}</span>
                        <span style={{color:t.muted,fontSize:11,fontFamily:"monospace"}}>{diy[g.k]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {[
                {label:"🎨 Couleur du fond (uni)",    k:"bg",     base:t.app   },
                {label:"✍️ Couleur des textes",       k:"text",   base:t.text  },
                {label:"💜 Couleur d'accentuation",   k:"accent", base:t.accent},
              ].map(item=>(
                <div key={item.k} style={{background:t.hover,borderRadius:16,padding:14,opacity:(item.k==="bg"&&diy.grad)?0.45:1}}>
                  <p style={{color:t.text,fontWeight:600,fontSize:13,marginBottom:10}}>{item.label}{item.k==="bg"&&diy.grad?" (désactivé — dégradé actif)":""}</p>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{position:"relative",width:40,height:40,flexShrink:0}}>
                      <div style={{background:diy[item.k]||item.base,width:40,height:40,borderRadius:12,border:`2px solid ${t.border}`}}/>
                      <input type="color" value={diy[item.k]||item.base} onChange={e=>setDiy(p=>({...p,[item.k]:e.target.value}))}
                        style={{position:"absolute",inset:0,opacity:0,cursor:"pointer",width:"100%",height:"100%"}}/>
                    </div>
                    <input value={diy[item.k]||""} onChange={e=>{const v=e.target.value;if(v===""||/^#[0-9A-Fa-f]{0,6}$/.test(v))setDiy(p=>({...p,[item.k]:v||null}));}}
                      placeholder={item.base}
                      style={{background:t.inputBg||t.card,color:t.text,border:`1px solid ${t.border}`,borderRadius:10,flex:1,fontSize:13,padding:"9px 12px",outline:"none",fontFamily:"monospace"}}/>
                    {diy[item.k]&&<button onClick={()=>setDiy(p=>({...p,[item.k]:null}))} style={{color:t.muted,background:"transparent",border:"none",cursor:"pointer"}}><X size={13}/></button>}
                  </div>
                </div>
              ))}

              <div style={{background:t.hover,borderRadius:16,padding:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <p style={{color:t.text,fontWeight:600,fontSize:13}}>⬜ Arrondi des boutons & cartes</p>
                  <span style={{color:t.accent,fontWeight:700,fontSize:13}}>{diy.radius}px</span>
                </div>
                <input type="range" min={0} max={24} value={diy.radius} onChange={e=>setDiy(p=>({...p,radius:parseInt(e.target.value)}))}
                  style={{width:"100%",accentColor:t.accent}}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                  <span style={{color:t.muted,fontSize:10}}>Très carré</span>
                  <span style={{color:t.muted,fontSize:10}}>Très arrondi</span>
                </div>
                <div style={{display:"flex",gap:8,marginTop:10}}>
                  {[0,6,14,24].map(v=>(
                    <button key={v} onClick={()=>setDiy(p=>({...p,radius:v}))}
                      style={{background:diy.radius===v?t.accentBg:t.card,border:`1.5px solid ${diy.radius===v?t.accent:t.border}`,borderRadius:v,padding:"6px 12px",fontSize:11,fontWeight:600,cursor:"pointer",color:diy.radius===v?t.accent:t.sub}}>
                      {v}px
                    </button>
                  ))}
                </div>
              </div>

              <div style={{background:t.hover,borderRadius:16,padding:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <p style={{color:t.text,fontWeight:600,fontSize:13}}>🪟 Effet verre (opacité des cartes)</p>
                  <span style={{color:t.accent,fontWeight:700,fontSize:13}}>{Math.round(diy.glass*100)}%</span>
                </div>
                <input type="range" min={50} max={100} value={Math.round(diy.glass*100)} onChange={e=>setDiy(p=>({...p,glass:parseInt(e.target.value)/100}))}
                  style={{width:"100%",accentColor:t.accent}}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                  <span style={{color:t.muted,fontSize:10}}>Verre translucide ✨</span>
                  <span style={{color:t.muted,fontSize:10}}>Opaque (défaut)</span>
                </div>
              </div>

              {/* Enregistrer mon thème */}
              <div style={{background:t.accentBg,borderRadius:16,padding:14}}>
                <p style={{color:t.accent,fontWeight:700,fontSize:13,marginBottom:8}}>💾 Enregistrer mon thème</p>
                <div style={{display:"flex",gap:8}}>
                  <input value={themeName} onChange={e=>setThemeName(e.target.value)} placeholder="Ex: Mon Thème Printemps"
                    style={{background:t.card,color:t.text,border:`1px solid ${t.border}`,borderRadius:10,flex:1,fontSize:13,padding:"9px 12px",outline:"none",fontFamily:font.body}}/>
                  <button disabled={!themeName.trim()} onClick={()=>{
                    setSavedThemes(prev=>[...prev,{id:Date.now(),name:themeName.trim(),bg:diy.bg,text:diy.text,accent:diy.accent,radius:diy.radius,glass:diy.glass,grad:diy.grad,grad1:diy.grad1,grad2:diy.grad2}]);
                    setThemeName(""); setSaved(true); setTimeout(()=>setSaved(false),1800);
                  }}
                    style={{background:!themeName.trim()?"rgba(128,128,128,0.3)":t.accent,color:"#fff",borderRadius:10,padding:"9px 14px",fontSize:13,fontWeight:700,border:"none",cursor:!themeName.trim()?"not-allowed":"pointer",whiteSpace:"nowrap"}}>
                    {saved?"✓ Sauvé !":"Sauver"}
                  </button>
                </div>
                <p style={{color:t.sub,fontSize:10,marginTop:6}}>Retrouve-le dans l'onglet 🎨 Moods, tout en haut.</p>
              </div>

              <button onClick={()=>setDiy({bg:null,text:null,accent:null,radius:14,glass:1.0,grad:false,grad1:"#FDF2F8",grad2:"#EDE7FB"})}
                style={{background:t.hover,color:t.sub,borderRadius:12,padding:"10px",border:"none",cursor:"pointer",fontSize:13,fontWeight:600}}>
                ↺ Réinitialiser les personnalisations DIY
              </button>
            </div>
          )}

          {/* ── 20 POLICES ── */}
          {tab==="fonts" && (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {Object.entries(FONT_CATS).map(([catKey,cat])=>(
                <div key={catKey}>
                  <p style={{color:t.muted,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>{cat.label}</p>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {cat.ids.map(fid=>{
                      const f = ALL_FONTS[fid];
                      return (
                        <button key={fid} onClick={()=>setFontId(fid)}
                          style={{background:fontId===fid?t.accentBg:t.hover,border:`2px solid ${fontId===fid?t.accent:"transparent"}`,borderRadius:14,padding:"12px 14px",textAlign:"left",width:"100%",cursor:"pointer",display:"flex",alignItems:"center",gap:10,transition:"all 0.15s"}}>
                          <div style={{flex:1,minWidth:0}}>
                            <p style={{fontFamily:f.heading,fontWeight:700,fontSize:15,color:t.text,lineHeight:1.2}}>{f.name}</p>
                            <p style={{fontFamily:f.body,fontSize:11,color:t.sub,marginTop:2}}>Aperçu : Planning com multi-boutiques 2026</p>
                          </div>
                          {fontId===fid&&<Check size={16} style={{color:t.accent,flexShrink:0}}/>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── COULEURS PERSO ── */}
          {tab==="colors" && <>
            <p style={{color:t.muted,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>
              Palette personnalisée — colle ton code couleur exact
            </p>

            {[
              {label:"Arrière-plan global",value:customBg,set:setCustomBg,base:t.app,emoji:"🎨"},
              {label:"Couleur des cartes",value:customCards,set:setCustomCards,base:t.card,emoji:"🃏"},
            ].map(item=>(
              <div key={item.label} style={{background:t.hover,border:`1px solid ${t.border}`,borderRadius:18,padding:16}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                  <span style={{fontSize:18}}>{item.emoji}</span>
                  <p style={{color:t.text,fontWeight:600,fontSize:14}}>{item.label}</p>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
                  <div style={{position:"relative",width:36,height:36,flexShrink:0}}>
                    <div style={{background:item.value||item.base,width:36,height:36,
                      borderRadius:10,border:`2px solid ${t.border}`}}/>
                    <input type="color" value={item.value||item.base}
                      onChange={e=>item.set(e.target.value)}
                      style={{position:"absolute",inset:0,opacity:0,cursor:"pointer",width:"100%",height:"100%"}}/>
                  </div>
                  <input
                    value={item.value||""}
                    onChange={e=>{
                      const v=e.target.value;
                      if(v===""||/^#[0-9A-Fa-f]{0,6}$/.test(v)) item.set(v||null);
                    }}
                    placeholder={item.base+" (défaut)"}
                    style={{background:t.inputBg||t.card,color:t.text,border:`1px solid ${t.border}`,
                      borderRadius:10,flex:1,fontSize:13,padding:"9px 12px",
                      outline:"none",fontFamily:"monospace"}}/>
                </div>
                {/* Suggestions */}
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {["#FDF0F8","#F6F2EA","#030309","#FFF8F0","#EDE9FE","#F0FDF4","#FFF7ED","#F8FAFC","#FFFFFF","#0F172A"].map(c=>(
                    <button key={c} onClick={()=>item.set(c)}
                      style={{background:c,width:24,height:24,borderRadius:"50%",cursor:"pointer",
                        border:`2px solid ${(item.value||item.base)===c?t.text:t.border}`,
                        transition:"all 0.15s"}}
                      className="hover:scale-110"/>
                  ))}
                </div>
                {item.value&&(
                  <button onClick={()=>item.set(null)}
                    style={{color:t.muted,fontSize:11,marginTop:8,background:"transparent",
                      border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
                    <X size={11}/> Réinitialiser
                  </button>
                )}
              </div>
            ))}
          </>}

          {/* ── BOUTIQUES ── */}
          {tab==="stores" && <>
            <p style={{color:t.muted,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>
              Personnalise tes boutiques
            </p>
            {stores.map(store=>{
              const brandColor=BRANDS[store.brand].primary;
              const active=store.customColor||brandColor;
              return (
                <div key={store.id} style={{background:t.hover,border:`1px solid ${t.border}`,borderRadius:18,padding:14}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <div style={{width:9,height:9,borderRadius:"50%",background:active}}/>
                    <span style={{color:t.text,fontWeight:600,fontSize:14}}>{store.name}</span>
                  </div>
                  {/* Emoji */}
                  <p style={{color:t.sub,fontSize:11,marginBottom:5}}>Icône / Emoji</p>
                  <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:10}}>
                    <button onClick={()=>setEmojiFor(emojiFor===store.id?null:store.id)}
                      style={{background:t.card,border:`1.5px solid ${t.border}`,borderRadius:10,
                        fontSize:20,padding:"4px 10px",cursor:"pointer"}}>
                      {store.emoji}
                    </button>
                    {emojiFor===store.id&&(
                      <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,
                        padding:8,display:"flex",flexWrap:"wrap",gap:3,maxWidth:220}}>
                        {EMOJI_BANK.map(e=>(
                          <button key={e} onClick={()=>{upd(store.id,{emoji:e});setEmojiFor(null);}}
                            style={{fontSize:17,borderRadius:7,padding:"2px 3px",cursor:"pointer",
                              background:"transparent",border:"none"}}>{e}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Couleurs */}
                  <p style={{color:t.sub,fontSize:11,marginBottom:5}}>Couleur</p>
                  <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
                    {[brandColor,"#E879A0","#8B5CF6","#14B8A6","#F97316","#EF4444","#06B6D4"].map(c=>(
                      <button key={c} onClick={()=>upd(store.id,{customColor:c===brandColor?null:c})}
                        style={{background:c,width:26,height:26,borderRadius:"50%",cursor:"pointer",
                          border:`3px solid ${active===c?t.text:"transparent"}`,transition:"all 0.15s"}}
                        className="hover:scale-110"/>
                    ))}
                    <div style={{position:"relative",width:26,height:26}}>
                      <div style={{background:"conic-gradient(red,yellow,lime,cyan,blue,magenta,red)",
                        width:26,height:26,borderRadius:"50%"}} className="hover:scale-110 transition-transform"/>
                      <input type="color" value={active} onChange={e=>upd(store.id,{customColor:e.target.value})}
                        style={{position:"absolute",inset:0,opacity:0,cursor:"pointer",width:"100%",height:"100%"}}/>
                    </div>
                  </div>
                  {store.customColor&&(
                    <button onClick={()=>upd(store.id,{customColor:null})}
                      style={{color:t.muted,fontSize:11,marginTop:8,background:"transparent",
                        border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
                      <X size={11}/> Couleur d'origine
                    </button>
                  )}
                </div>
              );
            })}
          </>}
        </div>
      </div>
    </div>
  );
}

// ── GÉNÉRATEUR DE LÉGENDES IA ─────────────────────────────────
const PLATFORM_TONES = {
  ig:"Instagram : ton chaleureux et authentique, 4-6 emojis, 5-8 hashtags dont des locaux, appel à l'action en fin, 100-150 mots",
  tt:"TikTok : accroche ultra-choc en 5 mots max en 1ère ligne, ton très jeune et dynamique, 3-4 hashtags trending, 40-60 mots max",
  fb:"Facebook : ton informatif et professionnel, détails pratiques si pertinents, 1-2 emojis max, peu de hashtags, 150-200 mots",
  sc:"Snapchat : ultra-court, très conversationnel, ton exclusif et urgent, 1 emoji max, 25-35 mots max",
};
function CaptionGenerator({stores, t, font, isMobile, onClose}) {
  const [idea, setIdea] = useState("");
  const [storeId, setStoreId] = useState(stores[0]?.id||1);
  const [platform, setPlatform] = useState("ig");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!idea.trim()) return;
    setLoading(true); setError(null); setResult("");
    const store = stores.find(s=>s.id===storeId);
    const brandName = BRANDS[store.brand]?.name || store.brand;
    const prompt = `Tu es une experte en communication et marketing digital pour des boutiques de téléphonie mobile en France. Tu rédiges des légendes naturelles, engageantes et prêtes à poster. Tu ne mentionnes jamais que tu es une IA. Réponds UNIQUEMENT avec le texte de la légende, sans introduction ni explication.\n\nBoutique : ${store.name} (enseigne ${brandName}, spécialisée en téléphonie mobile)\nIdée brute : "${idea}"\nRéseau et format : ${PLATFORM_TONES[platform]}\n\nGénère la légende maintenant, en français.`;
    try {
      // En déploiement réel (Vercel/Firebase), on appelle une fonction serverless
      // qui garde la clé API secrète. Configurable via VITE_AI_ENDPOINT.
      const API_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT || "/api/generate";
      const resp = await fetch(API_ENDPOINT, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ max_tokens:600, messages:[{role:"user",content:prompt}] })
      });
      if (!resp.ok) { setError("Le service IA n'est pas configuré (voir README → fonction serverless)."); setLoading(false); return; }
      const data = await resp.json();
      const txt = data.content?.find(c=>c.type==="text")?.text || data.text || "";
      if (txt) setResult(txt);
      else setError("Réponse vide — réessaie !");
    } catch(e) { setError("Erreur de connexion. Vérifie ta connexion et réessaie."); }
    finally { setLoading(false); }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result).catch(()=>{});
    setCopied(true); setTimeout(()=>setCopied(false), 1800);
  };

  const plats = [{id:"ig",emoji:"📸",l:"Insta"},{id:"tt",emoji:"🎵",l:"TikTok"},{id:"fb",emoji:"📘",l:"Facebook"},{id:"sc",emoji:"👻",l:"Snap"}];
  const r = 14;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" style={{background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)"}}>
      <div className="anim-pop" style={{background:t.card,borderRadius:isMobile?"24px 24px 0 0":"24px",width:isMobile?"100%":"min(94vw,500px)",boxShadow:t.shadowHover||t.shadow,padding:isMobile?"20px 16px 32px":"28px",fontFamily:font.body,display:"flex",flexDirection:"column",gap:16,maxHeight:isMobile?"90vh":"85vh",overflowY:"auto"}}>
        {isMobile && <div style={{width:40,height:4,background:t.border,borderRadius:99,margin:"0 auto -8px"}}/>}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8}}>
          <div>
            <h2 style={{color:t.text,fontWeight:800,fontSize:isMobile?16:18,fontFamily:font.heading}}>🤖 Générateur de Légendes IA</h2>
            <p style={{color:t.sub,fontSize:12,marginTop:2}}>Tape une idée brute → la légende parfaite en 1 clic ✨</p>
          </div>
          <button onClick={onClose} style={{background:t.hover,color:t.muted,borderRadius:10,padding:8,border:"none",cursor:"pointer",flexShrink:0}}><X size={16}/></button>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:10,alignItems:"end"}}>
          <div>
            <p style={{color:t.sub,fontSize:11,marginBottom:4}}>Boutique</p>
            <select value={storeId} onChange={e=>setStoreId(parseInt(e.target.value))}
              style={{background:t.inputBg||t.hover,color:t.text,border:`1px solid ${t.border}`,borderRadius:12,padding:"9px 12px",fontSize:13,outline:"none",fontFamily:font.body,width:"100%"}}>
              {stores.map(s=><option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
            </select>
          </div>
          <div>
            <p style={{color:t.sub,fontSize:11,marginBottom:4}}>Réseau</p>
            <div style={{display:"flex",gap:5}}>
              {plats.map(pl=>(
                <button key={pl.id} onClick={()=>setPlatform(pl.id)}
                  style={{background:platform===pl.id?t.accentBg:t.hover,border:`2px solid ${platform===pl.id?t.accent:t.border}`,borderRadius:10,padding:"7px 9px",cursor:"pointer",fontSize:16,transition:"all 0.15s"}}
                  title={pl.l}>{pl.emoji}</button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p style={{color:t.sub,fontSize:11,marginBottom:4}}>Ton idée brute</p>
          <textarea value={idea} onChange={e=>setIdea(e.target.value)} rows={3}
            placeholder="Ex: Promo -20% sur les écrans chez Save Brignoles ce samedi..."
            style={{background:t.inputBg||t.hover,color:t.text,border:`1px solid ${t.border}`,borderRadius:14,width:"100%",padding:"11px 14px",fontSize:14,outline:"none",fontFamily:font.body,resize:"vertical",lineHeight:1.6,boxSizing:"border-box"}}
            onKeyDown={e=>{if(e.key==="Enter"&&(e.ctrlKey||e.metaKey))generate();}}/>
          <p style={{color:t.muted,fontSize:10,marginTop:3}}>Ctrl+Entrée pour générer rapidement</p>
        </div>

        <button onClick={generate} disabled={loading||!idea.trim()}
          style={{background:loading||!idea.trim()?"rgba(128,128,128,0.3)":t.accent,color:"#fff",width:"100%",borderRadius:14,fontWeight:700,fontSize:15,padding:13,border:"none",cursor:loading||!idea.trim()?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all 0.2s"}}>
          {loading
            ? <><div style={{width:18,height:18,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",animation:"spin 0.7s linear infinite"}}/> Génération en cours...</>
            : <><Sparkles size={16}/> Générer la légende</>}
        </button>

        {error && <div style={{background:"#FEE2E2",color:"#DC2626",borderRadius:12,padding:"10px 14px",fontSize:13}}>{error}</div>}

        {result && (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <p style={{color:t.text,fontWeight:700,fontSize:13}}>✨ Légende générée</p>
              <button onClick={copyResult}
                style={{background:copied?"#D1FAE5":t.hover,color:copied?"#059669":t.muted,borderRadius:8,padding:"5px 10px",border:"none",cursor:"pointer",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>
                {copied?<><Check size={12}/> Copié !</>:<><Copy size={12}/> Copier</>}
              </button>
            </div>
            <div style={{background:t.hover,borderRadius:14,border:`1px solid ${t.border}`,padding:14}}>
              <pre style={{color:t.text,fontSize:13,lineHeight:1.7,fontFamily:font.body,whiteSpace:"pre-wrap",margin:0}}>{result}</pre>
            </div>
            <button onClick={generate} style={{background:t.hover,color:t.sub,borderRadius:10,padding:"8px 14px",border:"none",cursor:"pointer",fontSize:12,fontWeight:600}}>
              🔄 Regénérer une variante
            </button>
          </div>
        )}
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );
}

// ── COMPTEUR JOURS IMPORTANTS ─────────────────────────────────
function KeyDatesWidget({t, font, isMobile}) {
  const upcoming = KEY_DATES
    .map(d=>({...d, days:daysUntil(d.date)}))
    .filter(d=>d.days>=0 && d.days<=90)
    .sort((a,b)=>a.days-b.days)
    .slice(0, isMobile?3:4);
  if (!upcoming.length) return null;
  return (
    <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:isMobile?18:22,boxShadow:t.shadow,padding:isMobile?14:18,marginBottom:isMobile?14:22}}>
      <h3 style={{color:t.text,fontWeight:800,fontSize:13,fontFamily:font.heading,marginBottom:12}}>
        📅 Prochains Marronniers Communication
      </h3>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)",gap:8}}>
        {upcoming.map(d=>{
          const urgent = d.days<=7, soon = d.days<=14;
          return (
            <div key={d.id} style={{background:urgent?"#FEF2F2":soon?"#FFFBEB":t.hover,border:`1px solid ${urgent?"#FECACA":soon?"#FEF3C7":t.border}`,borderRadius:14,padding:isMobile?"10px 8px":12}}>
              <div style={{fontSize:20,marginBottom:4}}>{d.emoji}</div>
              <p style={{color:urgent?"#DC2626":soon?"#D97706":t.text,fontWeight:800,fontSize:isMobile?11:12,lineHeight:1.2}}>{d.label}</p>
              <p style={{color:urgent?"#DC2626":soon?"#D97706":t.accent,fontWeight:700,fontSize:isMobile?14:16,marginTop:2}}>J-{d.days}</p>
              <p style={{color:t.muted,fontSize:9,marginTop:3,lineHeight:1.3}}>{d.idea.substring(0,52)}{d.idea.length>52?"…":""}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SIDEBAR PC ──────────────────────────────────────────────
function Sidebar({view, setView, t, font, onSettings, stores, collapsed, setCollapsed, onStoreClick, onAI}) {
  return (
    <aside style={{
      background:t.sidebar,borderRight:`1px solid ${t.border}`,
      width:collapsed?64:248,transition:"width 0.25s ease",
      flexShrink:0,fontFamily:font.body,
      display:"flex",flexDirection:"column",
      height:"100vh",position:"sticky",top:0,zIndex:30,overflow:"hidden"
    }}>
      <div style={{display:"flex",alignItems:"center",gap:10,
        borderBottom:`1px solid ${t.border}`,
        padding:collapsed?"14px 12px":"14px 16px",minHeight:62}}>
        {!collapsed&&<>
          <div style={{background:t.accentBg,borderRadius:12,width:36,height:36,
            display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:18}}>✨</div>
          <div>
            <p style={{color:t.accent,fontWeight:900,fontSize:15,fontFamily:font.heading,lineHeight:1.1}}>Com'fy</p>
            <p style={{color:t.muted,fontSize:10,whiteSpace:"nowrap"}}>Ton QG Communication</p>
          </div>
        </>}
        {collapsed&&<span style={{fontSize:20,margin:"0 auto"}}>✨</span>}
        <button onClick={()=>setCollapsed(!collapsed)}
          style={{color:t.muted,marginLeft:"auto",padding:4,borderRadius:8,
            background:"transparent",border:"none",cursor:"pointer",flexShrink:0}}>
          {collapsed?<ChevronRight size={14}/>:<ChevronLeft size={14}/>}
        </button>
      </div>
      <nav style={{flex:1,overflowY:"auto",padding:"8px 6px"}}>
        {!collapsed&&<p style={{color:t.muted,fontSize:10,fontWeight:600,letterSpacing:"0.1em",
          textTransform:"uppercase",padding:"4px 8px 2px"}}>Navigation</p>}
        {NAV.map(item=>{
          const Icon=item.icon; const active=view===item.id;
          return (
            <button key={item.id} onClick={()=>setView(item.id)}
              style={{
                background:active?t.accentBg:"transparent",
                color:active?t.accent:t.sub,fontWeight:active?700:400,
                borderRadius:10,width:"100%",
                justifyContent:collapsed?"center":"flex-start",
                padding:collapsed?10:"9px 10px",fontSize:13,marginBottom:1,
                display:"flex",alignItems:"center",gap:8,border:"none",cursor:"pointer"
              }}>
              <Icon size={16} style={{flexShrink:0}}/>
              {!collapsed&&<span style={{flex:1,textAlign:"left"}}>{item.labelFull}</span>}
              {!collapsed&&active&&<div style={{background:t.accent,borderRadius:99,width:5,height:5}}/>}
            </button>
          );
        })}
        {!collapsed&&<>
          <p style={{color:t.muted,fontSize:10,fontWeight:600,letterSpacing:"0.1em",
            textTransform:"uppercase",padding:"10px 8px 2px"}}>Boutiques</p>
          {stores.map(s=>{
            const c=s.customColor||BRANDS[s.brand].primary;
            return (
              <div key={s.id} onClick={()=>onStoreClick(s.id)}
                style={{display:"flex",alignItems:"center",gap:7,
                  padding:"5px 8px",borderRadius:8,cursor:"pointer"}}
                className="hover:opacity-70 transition">
                <span style={{fontSize:12}}>{s.emoji}</span>
                <span style={{color:t.sub,fontSize:11,flex:1,
                  overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</span>
                <div style={{background:c,width:6,height:6,borderRadius:"50%",flexShrink:0}}/>
              </div>
            );
          })}
        </>}
      </nav>
      <div style={{padding:6,borderTop:`1px solid ${t.border}`,display:"flex",flexDirection:"column",gap:4}}>
        {!collapsed && (
          <button onClick={onAI}
            style={{background:`${t.accent}22`,color:t.accent,borderRadius:10,width:"100%",
              padding:"9px 10px",fontSize:12,fontWeight:700,
              display:"flex",alignItems:"center",gap:7,
              border:`1px solid ${t.accent}44`,cursor:"pointer"}}>
            <Sparkles size={14} style={{flexShrink:0}}/> Générer Légende IA
          </button>
        )}
        {collapsed && (
          <button onClick={onAI}
            style={{background:t.hover,color:t.accent,borderRadius:10,width:"100%",
              padding:10,display:"flex",alignItems:"center",justifyContent:"center",
              border:"none",cursor:"pointer"}}>
            <Sparkles size={15}/>
          </button>
        )}
        <button onClick={onSettings}
          style={{background:t.hover,color:t.sub,borderRadius:10,width:"100%",
            justifyContent:collapsed?"center":"flex-start",
            padding:collapsed?10:"9px 10px",fontSize:13,
            display:"flex",alignItems:"center",gap:8,border:"none",cursor:"pointer"}}>
          <Settings size={16} style={{flexShrink:0}}/>
          {!collapsed&&"Studio Personnalisation"}
        </button>
      </div>
    </aside>
  );
}

// ─── BOTTOM NAV MOBILE ───────────────────────────────────────
function BottomNav({view, setView, onSettings, onAI, t, font}) {
  return (
    <div style={{
      position:"fixed",bottom:0,left:0,right:0,zIndex:30,
      background:t.bottomNav||t.sidebar,borderTop:`1px solid ${t.border}`,
      display:"flex",alignItems:"center",height:62,
      boxShadow:"0 -4px 20px rgba(0,0,0,0.08)",fontFamily:font.body
    }}>
      {NAV.map(item=>{
        const Icon=item.icon; const active=view===item.id;
        return (
          <button key={item.id} onClick={()=>setView(item.id)}
            style={{flex:1,height:"100%",border:"none",cursor:"pointer",
              background:"transparent",display:"flex",flexDirection:"column",
              alignItems:"center",justifyContent:"center",gap:3,
              color:active?t.accent:t.muted}}>
            <div style={{background:active?t.accentBg:"transparent",
              borderRadius:12,padding:"4px 14px",transition:"background 0.15s"}}>
              <Icon size={19} strokeWidth={active?2.5:1.8}/>
            </div>
            <span style={{fontSize:10,fontWeight:active?700:400}}>{item.label}</span>
          </button>
        );
      })}
      <button onClick={onAI}
        style={{flex:1,height:"100%",border:"none",cursor:"pointer",
          background:"transparent",display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",gap:3,color:t.accent}}>
        <div style={{background:t.accentBg,borderRadius:12,padding:"4px 14px"}}>
          <Sparkles size={19} strokeWidth={1.8}/>
        </div>
        <span style={{fontSize:10,fontWeight:600}}>IA</span>
      </button>
      <button onClick={onSettings}
        style={{flex:1,height:"100%",border:"none",cursor:"pointer",
          background:"transparent",display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",gap:3,color:t.muted}}>
        <div style={{borderRadius:12,padding:"4px 14px"}}>
          <Settings size={19} strokeWidth={1.8}/>
        </div>
        <span style={{fontSize:10}}>Studio</span>
      </button>
    </div>
  );
}

// ─── HUB VIEW ────────────────────────────────────────────────
function HubView({stores, t, font, posts, isMobile, onStoreClick}) {
  const p = isMobile?14:24;
  const pubTotal=posts.filter(p=>p.status==="publie").length;
  const wDone=stores.reduce((a,s)=>a+s.weeklyDone,0);
  const wTarget=stores.reduce((a,s)=>a+s.weeklyTarget,0);
  const gDone=stores.reduce((a,s)=>a+s.goals.done,0);
  const gTotal=stores.reduce((a,s)=>a+s.goals.monthly,0);

  return (
    <div style={{padding:p,fontFamily:font.body}}>
      <div style={{marginBottom:isMobile?14:22}}>
        <h1 style={{color:t.text,fontWeight:900,fontSize:isMobile?20:26,fontFamily:font.heading}}>
          🏪 Hub Multi-Boutiques
        </h1>
        <p style={{color:t.sub,fontSize:isMobile?12:14,marginTop:4}}>
          Vue d'ensemble · Lundi 8 juin 2026 · Clique sur une boutique pour l'explorer
        </p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)",
        gap:isMobile?10:12,marginBottom:isMobile?14:22}}>
        {[
          {emoji:"🚀",val:pubTotal,             label:"Posts publiés",     color:"#6366F1"},
          {emoji:"📅",val:`${wDone}/${wTarget}`, label:"Posts semaine",     color:"#D97706"},
          {emoji:"🎯",val:`${gDone}/${gTotal}`,  label:"Objectifs du mois", color:"#059669"},
          {emoji:"🏪",val:6,                    label:"Boutiques actives",  color:"#DB2777"},
        ].map(k=>(
          <div key={k.label} style={{background:t.card,border:`1px solid ${t.border}`,
            borderRadius:isMobile?16:20,boxShadow:t.shadow,padding:isMobile?12:16}}>
            <div style={{fontSize:isMobile?22:26,marginBottom:6}}>{k.emoji}</div>
            <div style={{color:k.color,fontWeight:900,fontSize:isMobile?20:24,lineHeight:1,fontFamily:font.heading}}>{k.val}</div>
            <div style={{color:t.muted,fontSize:10,marginTop:3}}>{k.label}</div>
          </div>
        ))}
      </div>

      <KeyDatesWidget t={t} font={font} isMobile={isMobile}/>

      <div style={{display:"grid",
        gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(280px,1fr))",gap:isMobile?12:16}}>
        {stores.map((s,i)=>(
          <div key={s.id} className="stagger" style={{animationDelay:`${i*0.06}s`}}>
            <StoreCard store={s} t={t} font={font} posts={posts}
              isMobile={isMobile} onClick={()=>onStoreClick(s.id)}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoreCard({store, t, font, posts, isMobile, onClick}) {
  const color=store.customColor||BRANDS[store.brand].primary;
  const light=BRANDS[store.brand].light;
  const pct=Math.round((store.goals.done/store.goals.monthly)*100);
  const sPosts=posts.filter(p=>p.storeId===store.id);
  const pub=sPosts.filter(p=>p.status==="publie").length;
  const inProg=sPosts.filter(p=>["idee","redaction","pret"].includes(p.status)).length;
  const weekOK=store.weeklyDone>=store.weeklyTarget;
  return (
    <div onClick={onClick} className="clickable"
      style={{background:t.card,border:`1px solid ${t.border}`,
        borderRadius:isMobile?18:22,boxShadow:t.shadow,borderTop:`3px solid ${color}`,
        fontFamily:font.body,padding:isMobile?14:20,
        display:"flex",flexDirection:"column",gap:isMobile?10:14,
        transition:"box-shadow 0.22s ease,transform 0.18s cubic-bezier(0.34,1.56,0.64,1)",cursor:"pointer"}}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=t.shadowHover;e.currentTarget.style.transform="translateY(-4px)";}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow=t.shadow;e.currentTarget.style.transform="translateY(0)";}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <div>
          <span style={{fontSize:isMobile?26:30}}>{store.emoji}</span>
          <h3 style={{color:t.text,fontWeight:800,fontSize:isMobile?13:15,marginTop:3,
            lineHeight:1.2,fontFamily:font.heading}}>{store.name}</h3>
          <span style={{background:light,color:color,fontSize:9,fontWeight:700,
            letterSpacing:"0.06em",textTransform:"uppercase",
            display:"inline-block",padding:"2px 8px",borderRadius:99,marginTop:3}}>
            {BRANDS[store.brand].name}
          </span>
        </div>
        <div style={{background:light,borderRadius:14,padding:"8px 12px",textAlign:"center",flexShrink:0}}>
          <div style={{color,fontWeight:900,fontSize:isMobile?20:22,lineHeight:1,fontFamily:font.heading}}>{pct}%</div>
          <div style={{color,fontSize:9,opacity:0.65}}>du mois</div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{color:t.sub,fontSize:11}}>Objectifs mensuels</span>
            <span style={{color:t.text,fontSize:11,fontWeight:700}}>{store.goals.done}/{store.goals.monthly}</span>
          </div>
          <Bar val={store.goals.done} max={store.goals.monthly} color={color}/>
        </div>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{color:t.sub,fontSize:11}}>Posts cette semaine</span>
            <span style={{color:weekOK?"#059669":t.text,fontSize:11,fontWeight:700}}>{store.weeklyDone}/{store.weeklyTarget}</span>
          </div>
          <Bar val={store.weeklyDone} max={store.weeklyTarget} color={weekOK?"#10B981":color}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
        {[
          {label:"Publiés",val:pub,emoji:"🚀",ok:false},
          {label:"En cours",val:inProg,emoji:"✏️",ok:false},
          {label:weekOK?"OK ✓":"Restants",val:weekOK?"✓":`${store.weeklyTarget-store.weeklyDone}`,emoji:"🎯",ok:weekOK},
        ].map(stat=>(
          <div key={stat.label} style={{background:stat.ok?light:t.cardInner||t.hover,
            borderRadius:12,padding:"8px 6px",textAlign:"center"}}>
            <div style={{fontSize:16,marginBottom:2}}>{stat.emoji}</div>
            <div style={{color:stat.ok?"#059669":t.text,fontWeight:800,fontSize:13}}>{stat.val}</div>
            <div style={{color:t.muted,fontSize:8}}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:6,
        background:t.accentBg,borderRadius:10,padding:"7px 12px",marginTop:2}}>
        <span style={{color:t.accent,fontSize:11,fontWeight:600,flex:1}}>
          👆 Ouvrir le hub dédié
        </span>
        <ChevronRight size={14} style={{color:t.accent}}/>
      </div>
    </div>
  );
}

// ─── STORE HUB (page dédiée par boutique) ────────────────────
function StoreHub({store, t, font, posts, isMobile, storeDetails, setStoreDetails, onBack}) {
  const color=store.customColor||BRANDS[store.brand].primary;
  const light=BRANDS[store.brand].light;
  const details=storeDetails[store.id];
  const [tab, setTab]=useState("feed");
  const [editLink, setEditLink]=useState(null);
  const [editGridCell, setEditGridCell]=useState(null);
  const p=isMobile?14:24;

  const updDetail=(patch)=>setStoreDetails(prev=>({...prev,[store.id]:{...prev[store.id],...patch}}));
  const updGridItem=(id,patch)=>updDetail({gridItems:details.gridItems.map(c=>c.id===id?{...c,...patch}:c)});
  const updWeeklyPost=(id,patch)=>updDetail({weeklyPosts:details.weeklyPosts.map(wp=>wp.id===id?{...wp,...patch}:wp)});
  const updSocialLink=(pid,url)=>updDetail({socialLinks:{...details.socialLinks,[pid]:url}});

  const storePosts=posts.filter(p=>p.storeId===store.id&&p.status==="publie")
    .sort((a,b)=>b.date.localeCompare(a.date));

  const tabs=[
    {id:"feed",   label:isMobile?"📜":"📜 Feed récent"     },
    {id:"media",  label:isMobile?"🖼️":"🖼️ Médiathèque"   },
    {id:"grid",   label:isMobile?"📸":"📸 Grille Insta"    },
    {id:"plan",   label:isMobile?"💬":"💬 Projections"     },
    {id:"week",   label:isMobile?"📅":"📅 Ma semaine"      },
    {id:"links",  label:isMobile?"🔗":"🔗 Liens rapides"   },
    {id:"info",   label:isMobile?"🏪":"🏪 Infos boutique"  },
  ];

  return (
    <div style={{fontFamily:font.body,minHeight:"100%"}}>
      {/* Header boutique */}
      <div style={{background:t.card,borderBottom:`1px solid ${t.border}`,
        padding:isMobile?"14px 14px 0":"20px 24px 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <button onClick={onBack}
            style={{background:t.hover,color:t.sub,borderRadius:10,padding:"6px 12px",
              border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:13}}>
            <ArrowLeft size={15}/> {!isMobile&&"Retour"}
          </button>
          <span style={{fontSize:isMobile?28:36}}>{store.emoji}</span>
          <div>
            <h1 style={{color:t.text,fontWeight:900,fontSize:isMobile?18:24,
              fontFamily:font.heading,lineHeight:1.1}}>{store.name}</h1>
            <span style={{background:light,color,fontSize:10,fontWeight:700,
              letterSpacing:"0.06em",textTransform:"uppercase",
              display:"inline-block",padding:"2px 8px",borderRadius:99,marginTop:2}}>
              {BRANDS[store.brand].name}
            </span>
          </div>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",gap:isMobile?2:4,overflowX:"auto",
          WebkitOverflowScrolling:"touch",paddingBottom:0}}>
          {tabs.map(tb=>(
            <button key={tb.id} onClick={()=>setTab(tb.id)}
              style={{
                color:tab===tb.id?color:t.sub,fontWeight:tab===tb.id?700:400,
                background:"transparent",padding:isMobile?"8px 10px":"10px 16px",
                fontSize:isMobile?12:13,cursor:"pointer",border:"none",
                borderBottom:`2.5px solid ${tab===tb.id?color:"transparent"}`,
                whiteSpace:"nowrap",transition:"color 0.15s",
                fontFamily:font.body
              }}>
              {tb.label}
            </button>
          ))}
        </div>
      </div>

      <div key={tab} className="anim-tab" style={{padding:p}}>

        {/* ── FEED RÉCENT ── */}
        {tab==="feed"&&(
          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <h2 style={{color:t.text,fontWeight:800,fontSize:16,fontFamily:font.heading}}>
                📜 Historique des publications
              </h2>
              <span style={{color:t.muted,fontSize:12}}>{storePosts.length} publiés</span>
            </div>
            {storePosts.length===0&&(
              <div style={{border:`2px dashed ${t.border}`,borderRadius:16,padding:32,
                textAlign:"center",color:t.muted,fontSize:14}}>
                Aucune publication pour cette boutique pour l'instant ✨
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {storePosts.map((post,i)=>{
                const pl=PLATFORMS.find(x=>x.id===post.platform)||PLATFORMS[0];
                return (
                  <div key={post.id} style={{background:t.card,border:`1px solid ${t.border}`,
                    borderRadius:14,borderLeft:`3px solid ${color}`,padding:14,
                    display:"flex",alignItems:"center",gap:12}}>
                    <div style={{background:light,borderRadius:10,width:38,height:38,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      flexShrink:0,fontSize:20}}>{pl.emoji}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{color:t.text,fontWeight:600,fontSize:13,
                        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{post.title}</p>
                      <p style={{color:t.sub,fontSize:11,marginTop:2}}>
                        {pl.label} · {new Date(post.date).toLocaleDateString("fr-FR",{day:"numeric",month:"long"})}
                      </p>
                    </div>
                    <StatusPill sid={post.status}/>
                  </div>
                );
              })}
            </div>
            {storePosts.length>0&&(
              <div style={{background:t.accentBg,border:`1px solid ${t.border}`,
                borderRadius:14,padding:12,marginTop:12,textAlign:"center"}}>
                <p style={{color:t.accent,fontSize:12,fontWeight:600}}>
                  💡 Astuce : vérifie que tu n'as pas fait le même sujet 2 fois d'affilée !
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── GRILLE INSTAGRAM ── */}
        {tab==="grid"&&(
          <div>
            <div style={{marginBottom:16}}>
              <h2 style={{color:t.text,fontWeight:800,fontSize:16,fontFamily:font.heading}}>
                📸 Projecteur de Contenu — Grille Insta
              </h2>
              <p style={{color:t.sub,fontSize:12,marginTop:4}}>
                Visualise ton feed avant de publier. Clique sur une case pour éditer.
              </p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4,
              maxWidth:400,margin:"0 auto 16px"}}>
              {details.gridItems.map(cell=>{
                const cellColor=cell.hasContent?color:`${t.border}`;
                const s=STATUSES.find(x=>x.id===cell.status)||STATUSES[0];
                return (
                  <div key={cell.id} onClick={()=>setEditGridCell(cell.id===editGridCell?null:cell.id)}
                    style={{
                      background:cell.hasContent?`${color}22`:t.hover,
                      border:`2px solid ${editGridCell===cell.id?color:cell.hasContent?`${color}55`:t.border}`,
                      borderRadius:10,aspectRatio:"1",cursor:"pointer",
                      display:"flex",flexDirection:"column",alignItems:"center",
                      justifyContent:"center",gap:4,padding:6,
                      transition:"all 0.2s",position:"relative"
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.03)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";}}>
                    {cell.hasContent?(
                      <>
                        <span style={{fontSize:18}}>{PLATFORMS.find(x=>x.id===cell.platform)?.emoji||"📸"}</span>
                        <p style={{color:t.text,fontSize:9,fontWeight:600,textAlign:"center",
                          overflow:"hidden",textOverflow:"ellipsis",
                          display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",
                          lineHeight:1.3,width:"100%"}}>
                          {cell.title}
                        </p>
                        <span style={{background:s.bg,color:s.color,fontSize:8,fontWeight:700,
                          borderRadius:99,padding:"1px 5px"}}>{s.emoji} {s.label}</span>
                      </>
                    ):(
                      <Plus size={18} style={{color:t.muted,opacity:0.5}}/>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Éditeur de cellule */}
            {editGridCell&&(()=>{
              const cell=details.gridItems.find(c=>c.id===editGridCell);
              if(!cell) return null;
              return (
                <div style={{background:t.card,border:`2px solid ${color}`,
                  borderRadius:18,padding:16,display:"flex",flexDirection:"column",gap:12}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <p style={{color:t.text,fontWeight:700,fontSize:14}}>Éditer la case #{editGridCell}</p>
                    <button onClick={()=>setEditGridCell(null)}
                      style={{background:t.hover,color:t.muted,borderRadius:8,padding:6,border:"none",cursor:"pointer"}}>
                      <X size={14}/>
                    </button>
                  </div>
                  <input value={cell.title} onChange={e=>updGridItem(cell.id,{title:e.target.value,hasContent:true})}
                    placeholder="Titre / idée du post..."
                    style={{background:t.inputBg||t.hover,color:t.text,border:`1px solid ${t.border}`,
                      borderRadius:10,padding:"9px 12px",fontSize:13,outline:"none",fontFamily:font.body}}/>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {PLATFORMS.slice(0,5).map(pl=>(
                      <button key={pl.id} onClick={()=>updGridItem(cell.id,{platform:pl.id})}
                        style={{background:cell.platform===pl.id?`${color}22`:t.hover,
                          border:`1.5px solid ${cell.platform===pl.id?color:t.border}`,
                          borderRadius:9,padding:"5px 10px",fontSize:12,cursor:"pointer",fontWeight:600,
                          color:cell.platform===pl.id?color:t.sub}}>
                        {pl.emoji} {pl.label}
                      </button>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {STATUSES.map(s=>(
                      <button key={s.id} onClick={()=>updGridItem(cell.id,{status:s.id})}
                        style={{background:cell.status===s.id?s.bg:t.hover,
                          color:cell.status===s.id?s.color:t.muted,
                          fontSize:11,fontWeight:600,borderRadius:9,padding:"5px 10px",
                          cursor:"pointer",border:`1.5px solid ${cell.status===s.id?s.color:"transparent"}`}}>
                        {s.emoji} {s.label}
                      </button>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>updGridItem(cell.id,{hasContent:true})}
                      style={{background:color,color:"#fff",borderRadius:10,padding:"8px 14px",
                        fontSize:12,fontWeight:700,border:"none",cursor:"pointer"}}>
                      ✓ Confirmer
                    </button>
                    <button onClick={()=>updGridItem(cell.id,{hasContent:false,title:""})}
                      style={{background:t.hover,color:t.muted,borderRadius:10,padding:"8px 12px",
                        fontSize:12,border:"none",cursor:"pointer"}}>
                      🗑 Vider
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ── PROJECTIONS / NOTES STRATÉGIQUES ── */}
        {tab==="plan"&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <h2 style={{color:t.text,fontWeight:800,fontSize:16,fontFamily:font.heading}}>
              💬 Boîte à Projections — Stratégie {store.name}
            </h2>
            <p style={{color:t.sub,fontSize:12}}>
              Ton brouillon stratégique privé. Notes tes idées, directions et objectifs pour cette boutique.
            </p>
            <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:18,overflow:"hidden"}}>
              <div style={{background:`${color}15`,padding:"10px 14px",borderBottom:`1px solid ${t.border}`,
                display:"flex",alignItems:"center",gap:8}}>
                <Edit3 size={14} style={{color}}/>
                <span style={{color,fontWeight:700,fontSize:12}}>Notes stratégiques · {store.name}</span>
              </div>
              <textarea
                value={details.projections}
                onChange={e=>updDetail({projections:e.target.value})}
                rows={isMobile?8:10}
                placeholder="Tape ici ta stratégie du mois, tes idées, tes projections..."
                style={{width:"100%",background:"transparent",color:t.text,border:"none",
                  resize:"vertical",fontSize:13,lineHeight:1.7,
                  padding:"14px",outline:"none",fontFamily:font.body,
                  boxSizing:"border-box"}}/>
            </div>
            <div style={{background:t.accentBg,borderRadius:14,padding:14}}>
              <p style={{color:t.accent,fontWeight:700,fontSize:13,marginBottom:6}}>💡 Idées de projections :</p>
              {[
                "Quelle offre je veux mettre en avant ce mois-ci ?",
                "Quel sujet TikTok est en tendance cette semaine ?",
                "Y a-t-il un événement local à exploiter ?",
                "Quel post a le mieux fonctionné le mois dernier ?",
              ].map((q,i)=>(
                <p key={i} style={{color:t.sub,fontSize:12,marginBottom:3}}>→ {q}</p>
              ))}
            </div>
          </div>
        )}

        {/* ── SEMAINE : POSTS + LÉGENDES ── */}
        {tab==="week"&&(
          <div>
            <div style={{marginBottom:16}}>
              <h2 style={{color:t.text,fontWeight:800,fontSize:16,fontFamily:font.heading}}>
                📅 Calendrier Localisé — Semaine du 9 juin
              </h2>
              <p style={{color:t.sub,fontSize:12,marginTop:4}}>
                Tes 5 posts de la semaine avec légendes prêtes à copier-coller.
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {details.weeklyPosts.map(wp=>{
                const pl=PLATFORMS.find(x=>x.id===wp.platform)||PLATFORMS[0];
                return (
                  <div key={wp.id} style={{background:t.card,border:`1px solid ${t.border}`,
                    borderRadius:18,overflow:"hidden",
                    borderLeft:`3px solid ${wp.done?color:t.border}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,
                      padding:"11px 14px",background:wp.done?`${color}10`:t.cardInner||t.hover}}>
                      <button onClick={()=>updWeeklyPost(wp.id,{done:!wp.done})}
                        style={{color:wp.done?"#10B981":t.muted,background:"transparent",border:"none",cursor:"pointer",flexShrink:0}}>
                        {wp.done?<CheckCircle size={18}/>:<Circle size={18}/>}
                      </button>
                      <span style={{fontSize:18}}>{pl.emoji}</span>
                      <div style={{flex:1}}>
                        <p style={{color:t.text,fontWeight:700,fontSize:13}}>{wp.day}</p>
                        <p style={{color:t.sub,fontSize:11}}>{wp.title}</p>
                      </div>
                      <span style={{background:light,color,fontSize:10,fontWeight:700,
                        borderRadius:99,padding:"2px 8px",flexShrink:0}}>
                        {pl.label}
                      </span>
                    </div>
                    <div style={{padding:"10px 14px 12px"}}>
                      <div style={{display:"flex",alignItems:"flex-start",
                        justifyContent:"space-between",gap:8,marginBottom:6}}>
                        <p style={{color:t.sub,fontSize:11,fontWeight:600}}>Légende / Caption :</p>
                        <CopyBtn text={wp.caption} t={t}/>
                      </div>
                      <textarea value={wp.caption}
                        onChange={e=>updWeeklyPost(wp.id,{caption:e.target.value})}
                        rows={isMobile?4:3}
                        style={{width:"100%",background:t.inputBg||t.hover,color:t.text,
                          border:`1px solid ${t.border}`,borderRadius:12,
                          resize:"vertical",fontSize:12,lineHeight:1.65,
                          padding:"10px 12px",outline:"none",fontFamily:font.body,
                          boxSizing:"border-box"}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── LIENS RAPIDES ── */}
        {tab==="links"&&(
          <div>
            <div style={{marginBottom:16}}>
              <h2 style={{color:t.text,fontWeight:800,fontSize:16,fontFamily:font.heading}}>
                🔗 Accès Rapides — Réseaux & Fiches
              </h2>
              <p style={{color:t.sub,fontSize:12,marginTop:4}}>
                Clique sur un bouton pour ouvrir directement le compte de cette boutique.
              </p>
            </div>
            {/* Boutons réseaux */}
            <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(4,1fr)",gap:10,marginBottom:20}}>
              {PLATFORMS.map(pl=>{
                const url=details.socialLinks[pl.id];
                return (
                  <div key={pl.id} style={{display:"flex",flexDirection:"column",gap:6}}>
                    <a href={url||"#"} target={url?"_blank":"_self"}
                      rel="noopener noreferrer"
                      style={{
                        background:url?`${pl.color}18`:t.hover,
                        border:`1.5px solid ${url?pl.color:t.border}`,
                        color:url?pl.color:t.muted,
                        borderRadius:14,padding:"11px 10px",
                        display:"flex",flexDirection:"column",alignItems:"center",gap:5,
                        textDecoration:"none",cursor:url?"pointer":"not-allowed",
                        transition:"all 0.15s",opacity:url?1:0.6
                      }}
                      onClick={e=>{if(!url)e.preventDefault(); else {setEditLink(editLink===pl.id?null:pl.id);}}}
                      onMouseEnter={e=>{if(url){e.currentTarget.style.transform="translateY(-2px)";}}}
                      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}>
                      <span style={{fontSize:22}}>{pl.emoji}</span>
                      <span style={{fontSize:11,fontWeight:600}}>{pl.label}</span>
                      {url&&<ExternalLink size={10} style={{opacity:0.6}}/>}
                    </a>
                    <button onClick={()=>setEditLink(editLink===pl.id?null:pl.id)}
                      style={{background:t.hover,color:t.sub,borderRadius:8,padding:"4px",
                        border:"none",cursor:"pointer",fontSize:10,display:"flex",
                        alignItems:"center",justifyContent:"center",gap:3}}>
                      <Edit3 size={10}/> {url?"Modifier":"+ Ajouter URL"}
                    </button>
                    {editLink===pl.id&&(
                      <input value={url}
                        onChange={e=>updSocialLink(pl.id,e.target.value)}
                        placeholder="https://..."
                        autoFocus
                        onBlur={()=>setEditLink(null)}
                        style={{background:t.inputBg||t.hover,color:t.text,
                          border:`1px solid ${pl.color}`,borderRadius:8,
                          padding:"6px 10px",fontSize:11,outline:"none",
                          fontFamily:"monospace"}}/>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Identifiants cachés */}
            <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:18,overflow:"hidden"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                padding:"12px 14px",background:t.cardInner||t.hover,
                cursor:"pointer"}}
                onClick={()=>updDetail({showCreds:!details.showCreds})}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  {details.showCreds?<EyeOff size={15} style={{color:t.sub}}/>:<Eye size={15} style={{color:t.sub}}/>}
                  <span style={{color:t.text,fontWeight:600,fontSize:13}}>Infos & Identifiants confidentiels</span>
                </div>
                <span style={{color:t.muted,fontSize:11}}>{details.showCreds?"Masquer":"Afficher"}</span>
              </div>
              {details.showCreds&&(
                <div style={{padding:14}}>
                  <p style={{color:t.muted,fontSize:11,marginBottom:8}}>
                    Zone privée — Stocke ici les infos de connexion ou notes sensibles.
                  </p>
                  <textarea value={details.credentials}
                    onChange={e=>updDetail({credentials:e.target.value})}
                    rows={4}
                    placeholder="Ex: Login Instagram: @nom_boutique / MDP: ... &#10;Accès GMB: email@..."
                    style={{width:"100%",background:t.inputBg||t.hover,color:t.text,
                      border:`1px solid ${t.border}`,borderRadius:12,
                      resize:"vertical",fontSize:12,lineHeight:1.6,
                      padding:"10px 12px",outline:"none",fontFamily:font.body,
                      boxSizing:"border-box"}}/>
                </div>
              )}
            </div>
          </div>
        )}

        {tab==="media"&&(
          <MediaLibrary det={details} upd={updDetail} color={color} light={light} t={t} font={font} isMobile={isMobile} store={store}/>
        )}

        {tab==="info"&&(
          <InfoTab det={details} upd={updDetail} color={color} t={t} font={font} isMobile={isMobile}/>
        )}

      </div>
    </div>
  );
}

// ── MÉDIATHÈQUE ───────────────────────────────────────────────
function MediaLibrary({det, upd, color, light, t, font, isMobile, store}) {
  const [filterTag, setFilterTag] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState({emoji:"📱",title:"",tags:[],status:"neuf"});
  const [copied, setCopied] = useState(null);

  const filtered = det.mediaItems.filter(m=>{
    if (filterTag!=="all" && !m.tags.includes(filterTag)) return false;
    if (filterStatus!=="all" && m.status!==filterStatus) return false;
    return true;
  });

  const updMedia = (id,patch) => upd({mediaItems:det.mediaItems.map(m=>m.id===id?{...m,...patch}:m)});
  const deleteMedia = (id) => upd({mediaItems:det.mediaItems.filter(m=>m.id!==id)});

  const addMedia = () => {
    if (!newItem.title.trim()) return;
    const item = {...newItem, id:det.nextMediaId, date:new Date().toISOString().split("T")[0]};
    upd({mediaItems:[...det.mediaItems, item], nextMediaId:det.nextMediaId+1});
    setNewItem({emoji:"📱",title:"",tags:[],status:"neuf"});
    setAdding(false);
  };

  const reuse = (item) => {
    navigator.clipboard.writeText(item.title).catch(()=>{});
    updMedia(item.id, {status:"utilise"});
    setCopied(item.id);
    setTimeout(()=>setCopied(null), 1800);
  };

  const r = 12;
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:8}}>
        <div>
          <h2 style={{color:t.text,fontWeight:800,fontSize:15,fontFamily:font.heading}}>🖼️ Médiathèque — {store.name}</h2>
          <p style={{color:t.sub,fontSize:12,marginTop:3}}>
            {det.mediaItems.length} visuels · {det.mediaItems.filter(m=>m.status==="neuf").length} non utilisés
          </p>
        </div>
        <button onClick={()=>setAdding(true)}
          style={{background:color,color:"#fff",borderRadius:r,padding:"8px 14px",fontSize:12,fontWeight:700,border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
          <Plus size={13}/> Ajouter
        </button>
      </div>

      {/* Filtres statuts */}
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
        {[{id:"all",label:"Tous",emoji:""},...MEDIA_STATUSES].map(s=>(
          <button key={s.id} onClick={()=>setFilterStatus(s.id)}
            style={{background:filterStatus===s.id?t.accentBg:t.hover,color:filterStatus===s.id?t.accent:t.muted,border:`1.5px solid ${filterStatus===s.id?t.accent:"transparent"}`,borderRadius:99,padding:"4px 10px",fontSize:11,fontWeight:600,cursor:"pointer"}}>
            {s.emoji} {s.label||"Tous"}
          </button>
        ))}
      </div>

      {/* Filtres tags */}
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
        <button onClick={()=>setFilterTag("all")}
          style={{background:filterTag==="all"?`${color}20`:t.hover,color:filterTag==="all"?color:t.muted,border:`1px solid ${filterTag==="all"?color+"55":t.border}`,borderRadius:99,padding:"3px 10px",fontSize:10,fontWeight:600,cursor:"pointer"}}>
          # Tous
        </button>
        {MEDIA_TAGS.map(tag=>(
          <button key={tag} onClick={()=>setFilterTag(filterTag===tag?"all":tag)}
            style={{background:filterTag===tag?`${color}20`:t.hover,color:filterTag===tag?color:t.muted,border:`1px solid ${filterTag===tag?color+"55":t.border}`,borderRadius:99,padding:"3px 10px",fontSize:10,fontWeight:600,cursor:"pointer"}}>
            {tag}
          </button>
        ))}
      </div>

      {/* Formulaire ajout */}
      {adding&&(
        <div style={{background:t.card,border:`2px solid ${color}`,borderRadius:r+4,padding:16,marginBottom:14,display:"flex",flexDirection:"column",gap:12}}>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <span style={{fontSize:24}}>{newItem.emoji}</span>
            <input value={newItem.title} onChange={e=>setNewItem(p=>({...p,title:e.target.value}))}
              placeholder="Titre / description du visuel..."
              style={{background:t.inputBg||t.hover,color:t.text,border:`1px solid ${t.border}`,borderRadius:r,flex:1,fontSize:13,padding:"8px 12px",outline:"none",fontFamily:font.body}}/>
          </div>
          <div>
            <p style={{color:t.sub,fontSize:11,marginBottom:5}}>Emoji placeholder</p>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              {["📱","📸","🎥","👥","🏪","🔧","🔥","✨","📦","🌟","💰","🎉","☀️","🌴","💔","⭐"].map(e=>(
                <button key={e} onClick={()=>setNewItem(p=>({...p,emoji:e}))}
                  style={{fontSize:18,background:newItem.emoji===e?t.accentBg:"transparent",borderRadius:8,padding:"2px 4px",cursor:"pointer",border:`1px solid ${newItem.emoji===e?t.accent:"transparent"}`}}>{e}</button>
              ))}
            </div>
          </div>
          <div>
            <p style={{color:t.sub,fontSize:11,marginBottom:5}}>Tags</p>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {MEDIA_TAGS.map(tag=>(
                <button key={tag} onClick={()=>setNewItem(p=>({...p,tags:p.tags.includes(tag)?p.tags.filter(t=>t!==tag):[...p.tags,tag]}))}
                  style={{background:newItem.tags.includes(tag)?`${color}20`:t.hover,color:newItem.tags.includes(tag)?color:t.muted,border:`1px solid ${newItem.tags.includes(tag)?color+"55":t.border}`,borderRadius:99,padding:"3px 9px",fontSize:10,fontWeight:600,cursor:"pointer"}}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            {MEDIA_STATUSES.map(s=>(
              <button key={s.id} onClick={()=>setNewItem(p=>({...p,status:s.id}))}
                style={{flex:1,background:newItem.status===s.id?t.accentBg:t.hover,color:newItem.status===s.id?t.accent:t.muted,border:`1.5px solid ${newItem.status===s.id?t.accent:"transparent"}`,borderRadius:r,padding:"7px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={addMedia} style={{background:color,color:"#fff",borderRadius:r,padding:"8px 16px",fontSize:13,fontWeight:700,border:"none",cursor:"pointer",flex:1}}>✓ Ajouter</button>
            <button onClick={()=>setAdding(false)} style={{background:t.hover,color:t.sub,borderRadius:r,padding:"8px 12px",border:"none",cursor:"pointer"}}><X size={14}/></button>
          </div>
        </div>
      )}

      {filtered.length===0 && !adding && (
        <div style={{border:`2px dashed ${t.border}`,borderRadius:r+4,padding:32,textAlign:"center",color:t.muted,fontSize:13}}>Aucun visuel pour ce filtre ✨</div>
      )}

      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(auto-fill,minmax(195px,1fr))",gap:10}}>
        {filtered.map(item=>{
          const ms = MEDIA_STATUSES.find(s=>s.id===item.status)||MEDIA_STATUSES[0];
          return (
            <div key={item.id} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:r+4,overflow:"hidden",display:"flex",flexDirection:"column"}}>
              <div style={{background:`${color}18`,aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,position:"relative"}}>
                {item.emoji}
                <div style={{position:"absolute",top:6,right:6,background:"rgba(0,0,0,0.5)",borderRadius:99,padding:"2px 7px",display:"flex",alignItems:"center",gap:3}}>
                  <span style={{fontSize:9}}>{ms.emoji}</span>
                  <span style={{color:"#fff",fontSize:9,fontWeight:700}}>{ms.label}</span>
                </div>
              </div>
              <div style={{padding:10,flex:1,display:"flex",flexDirection:"column",gap:5}}>
                <p style={{color:t.text,fontWeight:600,fontSize:11,lineHeight:1.3}}>{item.title}</p>
                <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                  {item.tags.map(tag=>(
                    <span key={tag} style={{background:`${color}15`,color,fontSize:8,fontWeight:700,borderRadius:99,padding:"1px 5px"}}>{tag}</span>
                  ))}
                </div>
                <p style={{color:t.muted,fontSize:9}}>{new Date(item.date).toLocaleDateString("fr-FR",{day:"numeric",month:"short"})}</p>
                <div style={{display:"flex",gap:4,marginTop:2}}>
                  <button onClick={()=>reuse(item)}
                    style={{background:copied===item.id?"#D1FAE5":color,color:copied===item.id?"#059669":"#fff",borderRadius:r,padding:"5px 8px",fontSize:9,fontWeight:700,border:"none",cursor:"pointer",flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:3}}>
                    {copied===item.id?<><Check size={9}/> Copié!</>:<><Zap size={9}/> Réutiliser</>}
                  </button>
                  <button onClick={()=>updMedia(item.id,{status:item.status==="neuf"?"utilise":"neuf"})}
                    style={{background:t.hover,color:t.muted,borderRadius:r,padding:"5px 7px",border:"none",cursor:"pointer",fontSize:11}} title="Changer le statut">
                    {item.status==="neuf"?"🟡":"🟢"}
                  </button>
                  <button onClick={()=>deleteMedia(item.id)}
                    style={{background:"#FEF2F2",color:"#EF4444",borderRadius:r,padding:"5px 7px",border:"none",cursor:"pointer"}} title="Supprimer">
                    <Trash2 size={10}/>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── INFOS BOUTIQUE (Contacts + Stocks) ────────────────────────
function InfoTab({det, upd, color, t, font, isMobile}) {
  const c = det.contacts;
  const updC = (patch) => upd({contacts:{...det.contacts,...patch}});
  const updStock = (id,patch) => upd({adStock:det.adStock.map(s=>s.id===id?{...s,...patch}:s)});
  const r = 12;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {/* CONTACTS */}
      <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:r+4,overflow:"hidden"}}>
        <div style={{background:`${color}10`,padding:"11px 14px",borderBottom:`1px solid ${t.border}`,display:"flex",alignItems:"center",gap:8}}>
          <Phone size={13} style={{color}}/><span style={{color,fontWeight:700,fontSize:12}}>📞 Responsable & Contacts</span>
        </div>
        <div style={{padding:14,display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:10}}>
          {[
            {k:"manager", label:"👤 Responsable",    ph:"Prénom Nom"},
            {k:"phone",   label:"📞 Téléphone",       ph:"06 XX XX XX XX"},
            {k:"email",   label:"📧 Email",           ph:"boutique@enseigne.fr"},
            {k:"address", label:"📍 Adresse complète",ph:"Rue, Code postal, Ville"},
          ].map(field=>(
            <div key={field.k}>
              <p style={{color:t.sub,fontSize:11,marginBottom:4}}>{field.label}</p>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <input value={c[field.k]||""} onChange={e=>updC({[field.k]:e.target.value})}
                  placeholder={field.ph}
                  style={{background:t.inputBg||t.hover,color:t.text,border:`1px solid ${t.border}`,borderRadius:r,flex:1,fontSize:12,padding:"8px 10px",outline:"none",fontFamily:font.body}}/>
                <button onClick={()=>navigator.clipboard.writeText(c[field.k]||"").catch(()=>{})}
                  style={{background:t.hover,color:t.muted,borderRadius:r,padding:"8px",border:"none",cursor:"pointer",flexShrink:0}}
                  title="Copier">
                  <Copy size={11}/>
                </button>
              </div>
            </div>
          ))}
          <div style={{gridColumn:isMobile?"1":"span 2"}}>
            <p style={{color:t.sub,fontSize:11,marginBottom:4}}><Clock size={10} style={{display:"inline",marginRight:3}}/>Horaires</p>
            <input value={c.hours||""} onChange={e=>updC({hours:e.target.value})}
              placeholder="Lun-Sam : 9h30-19h00, Dim : Fermé"
              style={{background:t.inputBg||t.hover,color:t.text,border:`1px solid ${t.border}`,borderRadius:r,width:"100%",fontSize:12,padding:"8px 10px",outline:"none",fontFamily:font.body,boxSizing:"border-box"}}/>
          </div>
        </div>
      </div>

      {/* STOCKS PUB */}
      <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:r+4,overflow:"hidden"}}>
        <div style={{background:`${color}10`,padding:"11px 14px",borderBottom:`1px solid ${t.border}`,display:"flex",alignItems:"center",gap:8}}>
          <Package size={13} style={{color}}/><span style={{color,fontWeight:700,fontSize:12}}>📦 Stocks Publicitaires</span>
        </div>
        <div style={{padding:14,display:"flex",flexDirection:"column",gap:8}}>
          {det.adStock.map(item=>{
            const low = item.qty<=item.alert;
            return (
              <div key={item.id} style={{background:low?"#FEF2F2":t.hover,borderRadius:r,padding:"10px 12px",display:"flex",alignItems:"center",gap:10,border:`1px solid ${low?"#FECACA":t.border}`}}>
                {low&&<AlertTriangle size={13} style={{color:"#EF4444",flexShrink:0}}/>}
                <span style={{color:t.text,fontSize:13,fontWeight:600,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.item}</span>
                <div style={{display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
                  <button onClick={()=>updStock(item.id,{qty:Math.max(0,item.qty-1)})}
                    style={{background:t.card,color:t.muted,border:`1px solid ${t.border}`,borderRadius:6,width:24,height:24,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                  <span style={{color:low?"#EF4444":t.text,fontWeight:800,fontSize:14,minWidth:30,textAlign:"center"}}>{item.qty}</span>
                  <button onClick={()=>updStock(item.id,{qty:item.qty+1})}
                    style={{background:t.card,color:t.muted,border:`1px solid ${t.border}`,borderRadius:6,width:24,height:24,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  <span style={{color:t.muted,fontSize:11}}>{item.unit}</span>
                </div>
                {low&&<span style={{background:"#FEE2E2",color:"#DC2626",fontSize:9,fontWeight:700,borderRadius:99,padding:"2px 6px",whiteSpace:"nowrap"}}>A renouveler</span>}
              </div>
            );
          })}
          <button onClick={()=>{
            const newId=(det.adStock.length?Math.max(...det.adStock.map(s=>s.id)):0)+1;
            upd({adStock:[...det.adStock,{id:newId,item:"Nouveau support",qty:0,alert:10,unit:"pcs"}]});
          }} style={{background:t.hover,color:t.sub,borderRadius:r,padding:"9px",border:`1.5px dashed ${t.border}`,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
            <Plus size={13}/> Ajouter un support
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CALENDAR VIEW ───────────────────────────────────────────
function CalendarView({t, font, objectives, setObjectives, isMobile}) {
  const TODAY=new Date(2026,5,8);
  const [cur,setCur]=useState(new Date(2026,5,1));
  const [selDay,setSelDay]=useState(8);
  const [expandM,setExpandM]=useState(null);
  const [expandW,setExpandW]=useState({});
  const [adding,setAdding]=useState(false);
  const [newTitle,setNewTitle]=useState("");
  const [newEmoji,setNewEmoji]=useState("🎯");
  const [showCal,setShowCal]=useState(true);

  const yr=cur.getFullYear(),mo=cur.getMonth();
  const MONTHS=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  const DAYS=["Lu","Ma","Me","Je","Ve","Sa","Di"];
  const first=(new Date(yr,mo,1).getDay()+6)%7;
  const total=new Date(yr,mo+1,0).getDate();
  const cells=[...Array(first).fill(null),...Array.from({length:total},(_,i)=>i+1)];

  const toggleM=id=>setObjectives(p=>p.map(o=>o.id===id?{...o,done:!o.done}:o));
  const toggleW=(mid,wid)=>setObjectives(p=>p.map(o=>o.id===mid?{...o,weekly:o.weekly.map(w=>w.id===wid?{...w,done:!w.done}:w)}:o));
  const toggleD=(mid,wid,did)=>setObjectives(p=>p.map(o=>o.id===mid?{...o,weekly:o.weekly.map(w=>w.id===wid?{...w,daily:w.daily.map(d=>d.id===did?{...d,done:!d.done}:d)}:w)}:o));
  const addObj=()=>{if(!newTitle.trim())return;setObjectives(p=>[...p,{id:Date.now(),title:newTitle,emoji:newEmoji,progress:0,done:false,weekly:[]}]);setNewTitle("");setAdding(false);};

  const p=isMobile?14:24;

  const CalBlock=()=>(
    <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:isMobile?18:22,boxShadow:t.shadow,padding:isMobile?14:20}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <button onClick={()=>setCur(new Date(yr,mo-1,1))}
          style={{background:t.hover,color:t.sub,borderRadius:10,padding:7,border:"none",cursor:"pointer"}}>
          <ChevronLeft size={15}/>
        </button>
        <h3 style={{color:t.text,fontWeight:800,fontSize:14,fontFamily:font.heading}}>{MONTHS[mo]} {yr}</h3>
        <button onClick={()=>setCur(new Date(yr,mo+1,1))}
          style={{background:t.hover,color:t.sub,borderRadius:10,padding:7,border:"none",cursor:"pointer"}}>
          <ChevronRight size={15}/>
        </button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:4}}>
        {DAYS.map(d=><div key={d} style={{color:t.muted,fontSize:10,fontWeight:700,textAlign:"center",padding:"2px 0"}}>{d}</div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
        {cells.map((day,i)=>{
          if(!day) return <div key={`e${i}`}/>;
          const isToday=day===TODAY.getDate()&&mo===TODAY.getMonth()&&yr===TODAY.getFullYear();
          const isSel=day===selDay&&!isToday;
          return (
            <button key={day} onClick={()=>setSelDay(day)}
              style={{
                background:isToday?t.accent:isSel?t.accentBg:"transparent",
                color:isToday?"#fff":isSel?t.accent:t.text,
                fontWeight:isToday||isSel?700:400,
                borderRadius:9,fontSize:11,
                border:`1px solid ${isSel&&!isToday?t.accent:"transparent"}`,
                aspectRatio:"1",cursor:"pointer",width:"100%",
                display:"flex",alignItems:"center",justifyContent:"center",minHeight:28
              }}>
              {day}
            </button>
          );
        })}
      </div>
      <div style={{background:t.hover,borderRadius:12,marginTop:12,padding:10}}>
        <p style={{color:t.text,fontWeight:600,fontSize:11}}>
          📌 {DAYS[(new Date(yr,mo,selDay).getDay()+6)%7]} {selDay} {MONTHS[mo]}
        </p>
      </div>
    </div>
  );

  const ObjList=()=>(
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <h2 style={{color:t.text,fontWeight:800,fontSize:15,fontFamily:font.heading}}>Objectifs du mois 🎯</h2>
        <button onClick={()=>setAdding(true)}
          style={{background:t.accent,color:"#fff",borderRadius:11,fontSize:12,fontWeight:700,
            padding:"7px 13px",display:"flex",alignItems:"center",gap:5,border:"none",cursor:"pointer"}}>
          <Plus size={13}/> Ajouter
        </button>
      </div>
      {adding&&(
        <div style={{background:t.card,border:`2px solid ${t.accent}`,borderRadius:16,padding:14,
          display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{fontSize:20}}>{newEmoji}</span>
            <input value={newTitle} onChange={e=>setNewTitle(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&addObj()}
              placeholder="Titre de l'objectif..."
              style={{background:t.inputBg||t.hover,color:t.text,border:`1px solid ${t.border}`,
                outline:"none",borderRadius:10,flex:1,fontSize:13,padding:"8px 12px",fontFamily:font.body}}/>
          </div>
          <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
            {["🎯","📱","📍","🎵","📧","💡","🏆","⭐","🔥","🌟"].map(e=>(
              <button key={e} onClick={()=>setNewEmoji(e)}
                style={{fontSize:17,background:newEmoji===e?t.accentBg:"transparent",
                  borderRadius:7,padding:"2px 3px",cursor:"pointer",
                  border:`1px solid ${newEmoji===e?t.accent:"transparent"}`}}>{e}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={addObj}
              style={{background:t.accent,color:"#fff",borderRadius:9,padding:"7px 15px",
                fontSize:12,fontWeight:700,border:"none",cursor:"pointer"}}>Ajouter</button>
            <button onClick={()=>setAdding(false)}
              style={{background:t.hover,color:t.sub,borderRadius:9,padding:"7px 10px",border:"none",cursor:"pointer"}}>
              <X size={13}/>
            </button>
          </div>
        </div>
      )}
      {objectives.map(obj=>{
        const wDone=obj.weekly.filter(w=>w.done).length;
        const isExp=expandM===obj.id;
        return (
          <div key={obj.id} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:16,overflow:"hidden",boxShadow:t.shadow}}>
            <div onClick={()=>setExpandM(isExp?null:obj.id)}
              style={{display:"flex",alignItems:"center",gap:10,padding:isMobile?12:14,cursor:"pointer"}}>
              <button onClick={e=>{e.stopPropagation();toggleM(obj.id);}}
                style={{color:obj.done?"#10B981":t.muted,flexShrink:0,background:"transparent",border:"none",cursor:"pointer"}}>
                {obj.done?<CheckCircle size={18}/>:<Circle size={18}/>}
              </button>
              <span style={{fontSize:18,flexShrink:0}}>{obj.emoji}</span>
              <div style={{flex:1,minWidth:0}}>
                <p style={{color:obj.done?t.muted:t.text,fontWeight:600,fontSize:12,
                  textDecoration:obj.done?"line-through":"none",
                  overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{obj.title}</p>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:5}}>
                  <Bar val={obj.progress} max={100} color={t.accent} h={4}/>
                  <span style={{color:t.muted,fontSize:10,whiteSpace:"nowrap"}}>{obj.progress}%</span>
                </div>
              </div>
              <span style={{color:t.muted,fontSize:10,whiteSpace:"nowrap",flexShrink:0}}>{wDone}/{obj.weekly.length}</span>
              {isExp?<ChevronUp size={13} style={{color:t.muted,flexShrink:0}}/>:<ChevronDown size={13} style={{color:t.muted,flexShrink:0}}/>}
            </div>
            {isExp&&obj.weekly.map(w=>{
              const isWExp=expandW[w.id];
              return (
                <div key={w.id} style={{borderTop:`1px solid ${t.border}`}}>
                  <div onClick={()=>setExpandW(p=>({...p,[w.id]:!isWExp}))}
                    style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",
                      background:t.cardInner||t.hover,cursor:"pointer"}}>
                    <div style={{width:18}}/>
                    <button onClick={e=>{e.stopPropagation();toggleW(obj.id,w.id);}}
                      style={{color:w.done?"#10B981":t.muted,background:"transparent",border:"none",cursor:"pointer"}}>
                      {w.done?<CheckCircle size={15}/>:<Circle size={15}/>}
                    </button>
                    <p style={{color:w.done?t.muted:t.text,fontSize:12,flex:1,textDecoration:w.done?"line-through":"none"}}>
                      📆 {w.title}
                    </p>
                    {w.daily.length>0&&(isWExp?<ChevronUp size={12} style={{color:t.muted}}/>:<ChevronDown size={12} style={{color:t.muted}}/>)}
                  </div>
                  {isWExp&&w.daily.map(d=>(
                    <div key={d.id} style={{borderTop:`1px solid ${t.border}`,background:t.card,
                      display:"flex",alignItems:"center",gap:10,padding:"7px 12px"}}>
                      <div style={{width:34}}/>
                      <button onClick={()=>toggleD(obj.id,w.id,d.id)}
                        style={{color:d.done?"#10B981":t.muted,background:"transparent",border:"none",cursor:"pointer"}}>
                        {d.done?<CheckCircle size={13}/>:<Circle size={13}/>}
                      </button>
                      <p style={{color:d.done?t.muted:t.text,fontSize:11,textDecoration:d.done?"line-through":"none"}}>{d.title}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{padding:p,fontFamily:font.body}}>
      <div style={{marginBottom:isMobile?14:22}}>
        <h1 style={{color:t.text,fontWeight:900,fontSize:isMobile?20:26,fontFamily:font.heading}}>📅 Temps & Objectifs</h1>
        <p style={{color:t.sub,fontSize:isMobile?12:14,marginTop:4}}>Objectifs mensuels ▸ hebdomadaires ▸ quotidiens</p>
      </div>
      {isMobile&&(
        <div style={{display:"flex",gap:4,marginBottom:14,background:t.hover,borderRadius:14,padding:4}}>
          {[["cal","📅 Calendrier"],["obj","🎯 Objectifs"]].map(([k,lbl])=>(
            <button key={k} onClick={()=>setShowCal(k==="cal")}
              style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:13,fontWeight:700,
                background:showCal===(k==="cal")?t.card:"transparent",
                color:showCal===(k==="cal")?t.accent:t.sub,
                border:"none",cursor:"pointer",boxShadow:showCal===(k==="cal")?t.shadow:"none"}}>{lbl}</button>
          ))}
        </div>
      )}
      {isMobile?(
        <>{showCal?<CalBlock/>:<ObjList/>}</>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"2fr 3fr",gap:20}}>
          <CalBlock/><ObjList/>
        </div>
      )}
    </div>
  );
}

// ─── SOCIAL VIEW ─────────────────────────────────────────────
function SocialView({stores, posts, setPosts, t, font, isMobile}) {
  const [fStore,setFStore]=useState("all");
  const [fPlatform,setFPlatform]=useState("all");
  const [addModal,setAddModal]=useState(false);
  const [np,setNp]=useState({storeId:1,platform:"ig",status:"idee",title:""});
  const [dragId,setDragId]=useState(null);
  const [dragOver,setDragOver]=useState(null);

  const filtered=useMemo(()=>posts.filter(p=>{
    if(fStore!=="all"&&p.storeId!==parseInt(fStore))return false;
    if(fPlatform!=="all"&&p.platform!==fPlatform)return false;
    return true;
  }),[posts,fStore,fPlatform]);

  const byStatus=useMemo(()=>{
    const g={};
    STATUSES.forEach(s=>{g[s.id]=filtered.filter(p=>p.status===s.id);});
    return g;
  },[filtered]);

  const del=id=>setPosts(p=>p.filter(x=>x.id!==id));
  const setSt=(id,st)=>setPosts(p=>p.map(x=>x.id===id?{...x,status:st}:x));
  const add=()=>{
    if(!np.title.trim())return;
    const store=stores.find(s=>s.id===np.storeId);
    setPosts(p=>[...p,{...np,id:Date.now(),brand:store?.brand||"coriolis",note:"",date:"2026-06-08"}]);
    setNp({storeId:1,platform:"ig",status:"idee",title:""});
    setAddModal(false);
  };
  const sel={background:t.card,color:t.text,border:`1px solid ${t.border}`,
    borderRadius:10,padding:"8px 10px",fontSize:13,outline:"none",fontFamily:font.body};
  const pa=isMobile?14:24;

  return (
    <div style={{padding:pa,fontFamily:font.body}}>
      <div style={{display:"flex",alignItems:isMobile?"flex-start":"center",
        justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:isMobile?14:18}}>
        <div>
          <h1 style={{color:t.text,fontWeight:900,fontSize:isMobile?20:26,fontFamily:font.heading}}>📱 Social Planner</h1>
          <p style={{color:t.sub,fontSize:isMobile?12:14,marginTop:3}}>Planifie et suis tes contenus sur tous les réseaux</p>
        </div>
        <button onClick={()=>setAddModal(true)}
          style={{background:t.accent,color:"#fff",borderRadius:12,fontWeight:700,
            boxShadow:t.shadow,padding:"10px 16px",fontSize:13,
            display:"flex",alignItems:"center",gap:7,border:"none",cursor:"pointer"}}>
          <Plus size={15}/> Nouveau
        </button>
      </div>
      {/* Tracker 5 posts */}
      <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:isMobile?16:20,
        boxShadow:t.shadow,padding:isMobile?12:18,marginBottom:isMobile?14:16}}>
        <h3 style={{color:t.text,fontWeight:800,fontSize:13,marginBottom:12,fontFamily:font.heading}}>
          🎯 Objectif : 5 posts/semaine/boutique
        </h3>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(6,1fr)",gap:8}}>
          {stores.map(store=>{
            const c=store.customColor||BRANDS[store.brand].primary;
            const ok=store.weeklyDone>=store.weeklyTarget;
            return (
              <div key={store.id} style={{background:t.cardInner||t.hover,borderRadius:14,padding:10}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:16}}>{store.emoji}</span>
                  <span style={{color:ok?"#059669":t.text,fontWeight:800,fontSize:13}}>{store.weeklyDone}/{store.weeklyTarget}</span>
                </div>
                <Bar val={store.weeklyDone} max={store.weeklyTarget} color={ok?"#10B981":c} h={4}/>
                <p style={{color:t.muted,fontSize:9,marginTop:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                  {store.name.split(" ").pop()}
                </p>
                {ok&&<p style={{color:"#059669",fontSize:8,fontWeight:800,marginTop:1}}>✓ Objectif !</p>}
              </div>
            );
          })}
        </div>
      </div>
      {/* Filtres */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:isMobile?12:14}}>
        <select value={fStore} onChange={e=>setFStore(e.target.value)} style={{...sel,flex:isMobile?"1":undefined}}>
          <option value="all">🏪 Toutes boutiques</option>
          {stores.map(s=><option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
        </select>
        <select value={fPlatform} onChange={e=>setFPlatform(e.target.value)} style={{...sel,flex:isMobile?"1":undefined}}>
          <option value="all">📱 Tous réseaux</option>
          {PLATFORMS.map(pl=><option key={pl.id} value={pl.id}>{pl.emoji} {pl.label}</option>)}
        </select>
        <span style={{color:t.muted,fontSize:12}}>{filtered.length} contenus</span>
      </div>
      {/* Kanban */}
      <p style={{color:t.muted,fontSize:11,marginBottom:8}}>💡 Astuce : glisse-dépose une carte d'une colonne à l'autre pour changer son statut</p>
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:16,WebkitOverflowScrolling:"touch"}}>
        {STATUSES.map(status=>(
          <div key={status.id} style={{flexShrink:0,width:isMobile?170:205}}
            onDragOver={e=>{e.preventDefault();setDragOver(status.id);}}
            onDragLeave={()=>setDragOver(o=>o===status.id?null:o)}
            onDrop={e=>{e.preventDefault();if(dragId!=null)setSt(dragId,status.id);setDragId(null);setDragOver(null);}}>
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:10}}>
              <span style={{background:status.bg,color:status.color,borderRadius:9,
                padding:"2px 9px",fontSize:11,fontWeight:700}}>
                {status.emoji} {status.label}
              </span>
              <span style={{color:t.muted,fontSize:11}}>({byStatus[status.id]?.length||0})</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7,minHeight:60,
              background:dragOver===status.id?`${status.color}14`:"transparent",
              border:dragOver===status.id?`2px dashed ${status.color}`:"2px dashed transparent",
              borderRadius:14,padding:dragOver===status.id?6:0,transition:"all 0.18s"}}>
              {byStatus[status.id]?.map(post=>{
                const store=stores.find(s=>s.id===post.storeId);
                const color=store?(store.customColor||BRANDS[store.brand].primary):"#6B7280";
                const pl=PLATFORMS.find(p=>p.id===post.platform)||PLATFORMS[0];
                return (
                  <div key={post.id}
                    draggable
                    onDragStart={()=>setDragId(post.id)}
                    onDragEnd={()=>{setDragId(null);setDragOver(null);}}
                    style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,
                      borderLeft:`3px solid ${color}`,padding:10,
                      display:"flex",flexDirection:"column",gap:6,
                      cursor:"grab",
                      opacity:dragId===post.id?0.4:1,
                      transform:dragId===post.id?"scale(0.96)":"scale(1)",
                      transition:"opacity 0.15s,transform 0.15s,box-shadow 0.2s"}}
                    className="group"
                    onMouseEnter={e=>{e.currentTarget.style.boxShadow=t.shadow;}}
                    onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:4}}>
                      <p style={{color:t.text,fontSize:12,fontWeight:600,flex:1,lineHeight:1.3}}>{post.title}</p>
                      <button onClick={()=>del(post.id)}
                        style={{color:"#EF4444",opacity:0,padding:3,flexShrink:0,
                          transition:"opacity 0.2s",background:"transparent",border:"none",cursor:"pointer"}}
                        className="group-hover:opacity-100">
                        <Trash2 size={12}/>
                      </button>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{display:"flex",alignItems:"center",gap:5}}>
                        <span style={{fontSize:14}}>{pl.emoji}</span>
                        {store&&<span style={{color,fontSize:10,fontWeight:700,
                          overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:64}}>
                          {store.emoji} {store.name.split(" ").pop()}
                        </span>}
                      </div>
                      <StatusPill sid={post.status}/>
                    </div>
                    <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                      {STATUSES.map(s=>(
                        <button key={s.id} onClick={()=>setSt(post.id,s.id)} title={s.label}
                          style={{background:post.status===s.id?s.bg:t.hover,fontSize:12,borderRadius:6,
                            padding:"2px 5px",cursor:"pointer",
                            border:`1px solid ${post.status===s.id?s.color+"55":"transparent"}`,transition:"all 0.15s"}}>
                          {s.emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              {(!byStatus[status.id]||byStatus[status.id].length===0)&&(
                <div style={{border:`2px dashed ${t.border}`,borderRadius:12,
                  color:t.muted,padding:16,textAlign:"center",fontSize:12}}>
                  {dragOver===status.id?"Lâche ici ! 👇":"Rien ici ✨"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Modal ajout */}
      {addModal&&(
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}}>
          <div className="anim-pop" style={{
            background:t.card,borderRadius:isMobile?"24px 24px 0 0":"24px",
            width:isMobile?"100%":"min(92vw,420px)",boxShadow:t.shadowHover||t.shadow,
            padding:isMobile?"20px 16px 32px":"24px",
            fontFamily:font.body,display:"flex",flexDirection:"column",gap:14
          }}>
            {isMobile&&<div style={{width:36,height:4,background:t.border,borderRadius:99,margin:"0 auto -4px"}}/>}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <h3 style={{color:t.text,fontWeight:800,fontSize:17,fontFamily:font.heading}}>✨ Nouveau contenu</h3>
              <button onClick={()=>setAddModal(false)}
                style={{background:t.hover,color:t.muted,borderRadius:10,padding:8,border:"none",cursor:"pointer"}}>
                <X size={16}/>
              </button>
            </div>
            <input value={np.title} onChange={e=>setNp(p=>({...p,title:e.target.value}))}
              placeholder="Titre du post / idée..."
              style={{background:t.inputBg||t.hover,color:t.text,border:`1px solid ${t.border}`,
                borderRadius:12,width:"100%",padding:"11px 14px",fontSize:14,
                outline:"none",fontFamily:font.body,boxSizing:"border-box"}}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div>
                <p style={{color:t.sub,fontSize:11,marginBottom:4}}>Boutique</p>
                <select value={np.storeId} onChange={e=>setNp(p=>({...p,storeId:parseInt(e.target.value)}))}
                  style={{...sel,width:"100%"}}>
                  {stores.map(s=><option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
                </select>
              </div>
              <div>
                <p style={{color:t.sub,fontSize:11,marginBottom:4}}>Réseau</p>
                <select value={np.platform} onChange={e=>setNp(p=>({...p,platform:e.target.value}))}
                  style={{...sel,width:"100%"}}>
                  {PLATFORMS.map(pl=><option key={pl.id} value={pl.id}>{pl.emoji} {pl.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <p style={{color:t.sub,fontSize:11,marginBottom:7}}>Statut initial</p>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {STATUSES.map(s=>(
                  <button key={s.id} onClick={()=>setNp(p=>({...p,status:s.id}))}
                    style={{background:np.status===s.id?s.bg:t.hover,color:np.status===s.id?s.color:t.muted,
                      fontSize:12,fontWeight:600,borderRadius:9,padding:"6px 10px",cursor:"pointer",
                      border:`1.5px solid ${np.status===s.id?s.color:"transparent"}`,transition:"all 0.15s"}}>
                    {s.emoji} {s.label}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={add}
              style={{background:t.accent,color:"#fff",width:"100%",borderRadius:14,
                fontWeight:700,fontSize:15,padding:13,border:"none",cursor:"pointer"}}
              className="hover:opacity-80 transition">
              ✨ Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── BOÎTE À OUTILS (Routine + Budget + Swipe) ─────────────────
function ToolsView({t, font, isMobile, stores, routine, setRoutine, budgets, setBudgets, swipes, setSwipes, audit, setAudit, posts}) {
  const p = isMobile?14:24;
  const r = 14;
  const [newSwipe, setNewSwipe] = useState("");
  const [newTask, setNewTask] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [addBudget, setAddBudget] = useState(false);
  const [nb, setNb] = useState({label:"",store:stores[0]?.name||"",total:100,spent:0});
  const [bilanOpen, setBilanOpen] = useState(false);
  const [best, setBest] = useState(stores[0]?.name||"");

  const doneCount = routine.filter(r=>r.done).length;
  const cycleAudit = (id, ch) => {
    const order = ["todo","wip","done"];
    setAudit(prev=>prev.map(a=>{
      if(a.id!==id) return a;
      const cur = order.indexOf(a[ch]);
      return {...a, [ch]: order[(cur+1)%3]};
    }));
  };

  const copySwipe = (s) => {
    navigator.clipboard.writeText(s.text).catch(()=>{});
    setCopiedId(s.id); setTimeout(()=>setCopiedId(null),1600);
  };

  return (
    <div style={{padding:p,fontFamily:font.body}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:isMobile?14:22}}>
        <div>
          <h1 style={{color:t.text,fontWeight:900,fontSize:isMobile?20:26,fontFamily:font.heading}}>🧰 Boîte à Outils</h1>
          <p style={{color:t.sub,fontSize:isMobile?12:14,marginTop:4}}>Routine · Budgets · Swipe file · Audit pages · Bilan</p>
        </div>
        <button onClick={()=>setBilanOpen(true)}
          style={{background:t.accent,color:"#fff",borderRadius:r,padding:"11px 18px",fontSize:14,fontWeight:800,border:"none",cursor:"pointer",boxShadow:t.shadow,display:"flex",alignItems:"center",gap:8}}>
          📊 Rapport en 1 clic
        </button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?14:18}}>

        {/* ROUTINE MATIN */}
        <div className="anim-pop" style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:r+6,boxShadow:t.shadow,padding:isMobile?16:20}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <h2 style={{color:t.text,fontWeight:800,fontSize:15,fontFamily:font.heading}}>☀️ Routine du Matin</h2>
            <span style={{background:doneCount===routine.length?"#D1FAE5":t.hover,color:doneCount===routine.length?"#059669":t.muted,fontSize:11,fontWeight:700,borderRadius:99,padding:"3px 10px"}}>
              {doneCount}/{routine.length}
            </span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {routine.length===0 && (
              <p style={{color:t.muted,fontSize:12,textAlign:"center",padding:"10px 0"}}>Aucune tâche. Ajoute ta première ci-dessous 👇</p>
            )}
            {routine.map(item=>(
              <div key={item.id} style={{display:"flex",alignItems:"center",gap:6}}>
                <button onClick={()=>setRoutine(prev=>prev.map(x=>x.id===item.id?{...x,done:!x.done}:x))}
                  style={{flex:1,background:item.done?t.accentBg:t.hover,border:`1px solid ${item.done?t.accent+"55":t.border}`,borderRadius:r,padding:"11px 14px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",textAlign:"left"}}>
                  {item.done?<CheckCircle size={18} style={{color:t.accent,flexShrink:0}}/>:<Circle size={18} style={{color:t.muted,flexShrink:0}}/>}
                  <span style={{color:item.done?t.muted:t.text,fontSize:13,fontWeight:500,textDecoration:item.done?"line-through":"none"}}>{item.label}</span>
                </button>
                <button onClick={()=>setRoutine(prev=>prev.filter(x=>x.id!==item.id))}
                  style={{background:"transparent",color:t.muted,border:"none",cursor:"pointer",padding:4,flexShrink:0}}><Trash2 size={14}/></button>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <input value={newTask} onChange={e=>setNewTask(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&newTask.trim()){setRoutine(prev=>[...prev,{id:Date.now(),label:newTask.trim(),done:false}]);setNewTask("");}}}
              placeholder="Ajouter une tâche du matin..."
              style={{background:t.inputBg||t.hover,color:t.text,border:`1px solid ${t.border}`,borderRadius:r,flex:1,fontSize:13,padding:"9px 12px",outline:"none",fontFamily:font.body}}/>
            <button onClick={()=>{if(newTask.trim()){setRoutine(prev=>[...prev,{id:Date.now(),label:newTask.trim(),done:false}]);setNewTask("");}}}
              style={{background:t.accent,color:"#fff",borderRadius:r,padding:"9px 13px",border:"none",cursor:"pointer"}}><Plus size={15}/></button>
          </div>
          {routine.length>0 && (
            <button onClick={()=>setRoutine(prev=>prev.map(x=>({...x,done:false})))}
              style={{marginTop:10,width:"100%",background:t.hover,color:t.sub,borderRadius:r,padding:"9px",border:"none",cursor:"pointer",fontSize:12,fontWeight:600}}>
              ↺ Réinitialiser pour demain
            </button>
          )}
        </div>

        {/* BUDGETS PUB */}
        <div className="anim-pop" style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:r+6,boxShadow:t.shadow,padding:isMobile?16:20}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <h2 style={{color:t.text,fontWeight:800,fontSize:15,fontFamily:font.heading}}>💰 Budgets Publicitaires</h2>
            <button onClick={()=>setAddBudget(!addBudget)} style={{background:t.accent,color:"#fff",borderRadius:r,padding:"6px 12px",fontSize:12,fontWeight:700,border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
              <Plus size={13}/> Ajouter
            </button>
          </div>
          {addBudget && (
            <div style={{background:t.hover,borderRadius:r,padding:12,marginBottom:12,display:"flex",flexDirection:"column",gap:8}}>
              <input value={nb.label} onChange={e=>setNb(p=>({...p,label:e.target.value}))} placeholder="Nom campagne..."
                style={{background:t.card,color:t.text,border:`1px solid ${t.border}`,borderRadius:9,fontSize:13,padding:"8px 10px",outline:"none",fontFamily:font.body}}/>
              <select value={nb.store} onChange={e=>setNb(p=>({...p,store:e.target.value}))}
                style={{background:t.card,color:t.text,border:`1px solid ${t.border}`,borderRadius:9,fontSize:13,padding:"8px 10px",outline:"none",fontFamily:font.body}}>
                {stores.map(s=><option key={s.id} value={s.name}>{s.emoji} {s.name}</option>)}
              </select>
              <div style={{display:"flex",gap:8}}>
                <input type="number" value={nb.total} onChange={e=>setNb(p=>({...p,total:parseInt(e.target.value)||0}))} placeholder="Budget €"
                  style={{background:t.card,color:t.text,border:`1px solid ${t.border}`,borderRadius:9,fontSize:13,padding:"8px 10px",outline:"none",flex:1,fontFamily:font.body}}/>
                <button onClick={()=>{if(nb.label.trim()){setBudgets(prev=>[...prev,{...nb,id:Date.now()}]);setNb({label:"",store:stores[0]?.name||"",total:100,spent:0});setAddBudget(false);}}}
                  style={{background:t.accent,color:"#fff",borderRadius:9,padding:"8px 14px",fontSize:13,fontWeight:700,border:"none",cursor:"pointer"}}>OK</button>
              </div>
            </div>
          )}
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {budgets.map(b=>{
              const rest = b.total-b.spent;
              const pct = b.total>0?Math.min(100,Math.round((b.spent/b.total)*100)):0;
              const over = rest<=0;
              const low = rest>0 && rest<=b.total*0.2;
              return (
                <div key={b.id} style={{background:t.hover,borderRadius:r,padding:12}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:8}}>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{color:t.text,fontWeight:700,fontSize:13}}>{b.label}</p>
                      <p style={{color:t.muted,fontSize:10}}>{b.store}</p>
                    </div>
                    <button onClick={()=>setBudgets(prev=>prev.filter(x=>x.id!==b.id))} style={{background:"transparent",color:t.muted,border:"none",cursor:"pointer",padding:2}}><Trash2 size={13}/></button>
                  </div>
                  <Bar val={b.spent} max={b.total} color={over?"#EF4444":low?"#D97706":t.accent} h={8}/>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:7}}>
                    <span style={{color:t.sub,fontSize:11}}>Dépensé : <b style={{color:t.text}}>{b.spent}€</b> / {b.total}€</span>
                    <span style={{color:over?"#EF4444":low?"#D97706":"#059669",fontSize:12,fontWeight:800}}>
                      {over?"⚠️ Épuisé":`Reste ${rest}€`}
                    </span>
                  </div>
                  <div style={{display:"flex",gap:6,marginTop:8}}>
                    {[10,20,50].map(v=>(
                      <button key={v} onClick={()=>setBudgets(prev=>prev.map(x=>x.id===b.id?{...x,spent:Math.min(x.total,x.spent+v)}:x))}
                        style={{flex:1,background:t.card,color:t.sub,border:`1px solid ${t.border}`,borderRadius:8,padding:"5px",fontSize:11,fontWeight:600,cursor:"pointer"}}>
                        +{v}€
                      </button>
                    ))}
                    <button onClick={()=>setBudgets(prev=>prev.map(x=>x.id===b.id?{...x,spent:0}:x))}
                      style={{background:t.card,color:t.muted,border:`1px solid ${t.border}`,borderRadius:8,padding:"5px 9px",fontSize:11,cursor:"pointer"}}>↺</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SWIPE FILE */}
        <div className="anim-pop" style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:r+6,boxShadow:t.shadow,padding:isMobile?16:20,gridColumn:isMobile?"1":"span 2"}}>
          <h2 style={{color:t.text,fontWeight:800,fontSize:15,fontFamily:font.heading,marginBottom:6}}>💬 Swipe File — Phrases d'Accroche</h2>
          <p style={{color:t.sub,fontSize:12,marginBottom:14}}>Pioche une formule magique quand tu as une panne d'inspi. Clique pour copier.</p>
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            <input value={newSwipe} onChange={e=>setNewSwipe(e.target.value)} placeholder="Ajouter ta propre accroche..."
              onKeyDown={e=>{if(e.key==="Enter"&&newSwipe.trim()){setSwipes(prev=>[...prev,{id:Date.now(),text:newSwipe.trim()}]);setNewSwipe("");}}}
              style={{background:t.inputBg||t.hover,color:t.text,border:`1px solid ${t.border}`,borderRadius:r,flex:1,fontSize:13,padding:"10px 14px",outline:"none",fontFamily:font.body}}/>
            <button onClick={()=>{if(newSwipe.trim()){setSwipes(prev=>[...prev,{id:Date.now(),text:newSwipe.trim()}]);setNewSwipe("");}}}
              style={{background:t.accent,color:"#fff",borderRadius:r,padding:"10px 16px",fontSize:13,fontWeight:700,border:"none",cursor:"pointer"}}>
              <Plus size={15}/>
            </button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:8}}>
            {swipes.map(s=>(
              <div key={s.id} className="clickable" onClick={()=>copySwipe(s)}
                style={{background:copiedId===s.id?"#D1FAE5":t.hover,border:`1px solid ${copiedId===s.id?"#6EE7B7":t.border}`,borderRadius:r,padding:"11px 14px",display:"flex",alignItems:"center",gap:10}}>
                <span style={{flex:1,color:copiedId===s.id?"#059669":t.text,fontSize:13,lineHeight:1.4}}>{s.text}</span>
                {copiedId===s.id
                  ? <Check size={15} style={{color:"#059669",flexShrink:0}}/>
                  : <Copy size={14} style={{color:t.muted,flexShrink:0}}/>}
                <button onClick={e=>{e.stopPropagation();setSwipes(prev=>prev.filter(x=>x.id!==s.id));}}
                  style={{background:"transparent",color:t.muted,border:"none",cursor:"pointer",padding:2,flexShrink:0}}><Trash2 size={13}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* AUDIT TRACKER */}
        <div className="anim-pop" style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:r+6,boxShadow:t.shadow,padding:isMobile?16:20,gridColumn:isMobile?"1":"span 2"}}>
          <h2 style={{color:t.text,fontWeight:800,fontSize:15,fontFamily:font.heading,marginBottom:6}}>🧹 Audit des Pages Sociales</h2>
          <p style={{color:t.sub,fontSize:12,marginBottom:14}}>Suivi du nettoyage GMB / Facebook / Instagram. Clique sur un statut pour le changer.</p>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr 1fr 1fr",gap:6,padding:"0 4px"}}>
              <span style={{color:t.muted,fontSize:10,fontWeight:700,textTransform:"uppercase"}}>Boutique</span>
              <span style={{color:t.muted,fontSize:10,fontWeight:700,textAlign:"center"}}>GMB 📍</span>
              <span style={{color:t.muted,fontSize:10,fontWeight:700,textAlign:"center"}}>FB 📘</span>
              <span style={{color:t.muted,fontSize:10,fontWeight:700,textAlign:"center"}}>Insta 📸</span>
            </div>
            {audit.map(a=>(
              <div key={a.id} style={{display:"grid",gridTemplateColumns:"1.6fr 1fr 1fr 1fr",gap:6,alignItems:"center",background:t.hover,borderRadius:r,padding:"8px 10px"}}>
                <span style={{color:t.text,fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.name}</span>
                {["gmb","fb","insta"].map(ch=>{
                  const st = AUDIT_STATES.find(s=>s.id===a[ch])||AUDIT_STATES[0];
                  return (
                    <button key={ch} onClick={()=>cycleAudit(a.id,ch)}
                      style={{background:st.bg,color:st.color,borderRadius:8,padding:"5px 4px",fontSize:10,fontWeight:700,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:3}}>
                      {st.emoji} {st.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODALE BILAN */}
      {bilanOpen && (() => {
        const totalPub = posts.filter(x=>x.status==="publie").length;
        const cleanCount = audit.reduce((acc,a)=>acc+["gmb","fb","insta"].filter(ch=>a[ch]==="done").length,0);
        const totalCh = audit.length*3;
        const cleanPct = Math.round((cleanCount/totalCh)*100);
        const wDone = stores.reduce((acc,s)=>acc+s.weeklyDone,0);
        const gmbCreated = audit.filter(a=>a.gmb==="done").length;
        const bilanText = `📊 BILAN COM — ${new Date().toLocaleDateString("fr-FR",{month:"long",year:"numeric"})}\n\n✅ ${totalPub} posts publiés sur le réseau\n📍 ${gmbCreated}/${audit.length} fiches GMB propres\n🧹 ${cleanPct}% des pages sociales nettoyées (${cleanCount}/${totalCh})\n📅 ${wDone} posts programmés cette semaine\n🏆 Collaborateur du mois : ${best}`;
        return (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" style={{background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",animation:"fadeIn 0.25s ease"}}>
            <div className="anim-pop" style={{background:t.card,borderRadius:isMobile?"24px 24px 0 0":"24px",width:isMobile?"100%":"min(94vw,460px)",boxShadow:t.shadowHover||t.shadow,padding:isMobile?"20px 16px 30px":"28px",fontFamily:font.body,display:"flex",flexDirection:"column",gap:16,maxHeight:isMobile?"92vh":"88vh",overflowY:"auto"}}>
              {isMobile&&<div style={{width:40,height:4,background:t.border,borderRadius:99,margin:"0 auto -8px"}}/>}
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
                <h2 style={{color:t.text,fontWeight:800,fontSize:18,fontFamily:font.heading}}>📊 Bilan Flash du Mois</h2>
                <button onClick={()=>setBilanOpen(false)} style={{background:t.hover,color:t.muted,borderRadius:10,padding:8,border:"none",cursor:"pointer"}}><X size={16}/></button>
              </div>

              {/* Carte bilan jolie */}
              <div style={{background:`linear-gradient(135deg, ${t.accent}, ${t.accent}bb)`,borderRadius:20,padding:22,color:"#fff"}}>
                <p style={{fontSize:12,opacity:0.85,fontWeight:600}}>RÉCAP COMMUNICATION</p>
                <p style={{fontSize:20,fontWeight:900,fontFamily:font.heading,marginBottom:16,textTransform:"capitalize"}}>{new Date().toLocaleDateString("fr-FR",{month:"long",year:"numeric"})}</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  {[
                    {v:totalPub, l:"posts publiés", e:"🚀"},
                    {v:`${gmbCreated}/${audit.length}`, l:"fiches GMB propres", e:"📍"},
                    {v:`${cleanPct}%`, l:"pages nettoyées", e:"🧹"},
                    {v:wDone, l:"posts cette semaine", e:"📅"},
                  ].map((k,i)=>(
                    <div key={i} style={{background:"rgba(255,255,255,0.15)",borderRadius:14,padding:"12px 14px"}}>
                      <div style={{fontSize:20}}>{k.e}</div>
                      <div style={{fontSize:22,fontWeight:900,fontFamily:font.heading,lineHeight:1.1,marginTop:4}}>{k.v}</div>
                      <div style={{fontSize:10,opacity:0.85}}>{k.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:"rgba(255,255,255,0.18)",borderRadius:14,padding:"12px 14px",marginTop:12,display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:24}}>🏆</span>
                  <div><p style={{fontSize:10,opacity:0.85}}>Collaborateur du mois</p><p style={{fontSize:15,fontWeight:800}}>{best}</p></div>
                </div>
              </div>

              {/* Choix du collaborateur */}
              <div>
                <p style={{color:t.sub,fontSize:12,marginBottom:6}}>🏆 Meilleur collaborateur (challenge du mois)</p>
                <select value={best} onChange={e=>setBest(e.target.value)}
                  style={{background:t.inputBg||t.hover,color:t.text,border:`1px solid ${t.border}`,borderRadius:r,padding:"10px 12px",fontSize:13,outline:"none",fontFamily:font.body,width:"100%"}}>
                  {stores.map(s=><option key={s.id} value={s.name}>{s.emoji} {s.name}</option>)}
                </select>
              </div>

              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>navigator.clipboard.writeText(bilanText).catch(()=>{})}
                  style={{flex:1,background:t.accent,color:"#fff",borderRadius:r,padding:"12px",fontSize:13,fontWeight:700,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                  <Copy size={14}/> Copier le texte
                </button>
                <button onClick={()=>{
                  const blob = new Blob([bilanText],{type:"text/plain;charset=utf-8"});
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href=url; a.download="bilan-com.txt"; a.click();
                  URL.revokeObjectURL(url);
                }}
                  style={{background:t.hover,color:t.sub,borderRadius:r,padding:"12px 16px",fontSize:13,fontWeight:700,border:"none",cursor:"pointer"}}>
                  ⬇️ Exporter
                </button>
              </div>
              <p style={{color:t.muted,fontSize:11,textAlign:"center"}}>💡 Astuce : fais une capture d'écran de la carte pour l'envoyer à ton boss — effet Wahou garanti !</p>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────
export default function App() {
  const isMobile=useIsMobile();
  const [view,setView]=useState("hub");
  const [themeId,setThemeId]=useState("cotton_candy");
  const [fontId,setFontId]=useState("dm_sans");
  const [studioOpen,setStudio]=useState(false);
  const [aiOpen,setAi]=useState(false);
  const [collapsed,setCollapsed]=useState(false);
  const [currentStore,setCurrentStore]=useState(null);
  const [stores,setStores]=useState(INIT_STORES);
  const [posts,setPosts]=useState(INIT_POSTS);
  const [objectives,setObjectives]=useState(INIT_OBJ);
  const [storeDetails,setStoreDetails]=useState(()=>mkStoreDetails(INIT_STORES));
  const [customBg,setCustomBg]=useState(null);
  const [customCards,setCustomCards]=useState(null);
  const [diy,setDiy]=useState({bg:null,text:null,accent:null,radius:14,glass:1.0,grad:false,grad1:"#FDF2F8",grad2:"#EDE7FB"});
  const [savedThemes,setSavedThemes]=useState([]);
  const [routine,setRoutine]=useState(INIT_ROUTINE);
  const [budgets,setBudgets]=useState(INIT_BUDGETS);
  const [swipes,setSwipes]=useState(INIT_SWIPES);
  const [audit,setAudit]=useState(INIT_AUDIT);

  // Chargement Google Fonts (20 polices)
  useEffect(()=>{
    const link=document.createElement("link");
    link.rel="stylesheet";
    link.href=GF_URL;
    document.head.appendChild(link);
    return ()=>{try{document.head.removeChild(link);}catch(e){}};
  },[]);

  // ── SAUVEGARDE FIREBASE ──
  const loadedRef = useRef(false);
  // 1) Au démarrage : on charge les données sauvegardées
  useEffect(()=>{
    (async()=>{
      const data = await loadData();
      if (data) {
        if (data.stores) setStores(data.stores);
        if (data.posts) setPosts(data.posts);
        if (data.objectives) setObjectives(data.objectives);
        if (data.storeDetails) setStoreDetails(data.storeDetails);
        if (data.routine) setRoutine(data.routine);
        if (data.budgets) setBudgets(data.budgets);
        if (data.swipes) setSwipes(data.swipes);
        if (data.audit) setAudit(data.audit);
        if (data.savedThemes) setSavedThemes(data.savedThemes);
        if (data.themeId) setThemeId(data.themeId);
        if (data.fontId) setFontId(data.fontId);
        if (data.diy) setDiy(data.diy);
        if (data.customBg !== undefined) setCustomBg(data.customBg);
        if (data.customCards !== undefined) setCustomCards(data.customCards);
      }
      loadedRef.current = true;
    })();
  },[]);
  // 2) À chaque changement : on sauvegarde (après une petite pause)
  useEffect(()=>{
    if (!loadedRef.current) return;
    const id = setTimeout(()=>{
      saveData({ stores, posts, objectives, storeDetails, routine, budgets,
        swipes, audit, savedThemes, themeId, fontId, diy,
        customBg: customBg||null, customCards: customCards||null });
    }, 800);
    return ()=>clearTimeout(id);
  },[stores, posts, objectives, storeDetails, routine, budgets, swipes, audit,
     savedThemes, themeId, fontId, diy, customBg, customCards]);

  const base=THEMES[themeId];
  const diyBg = diy.grad ? `linear-gradient(135deg, ${diy.grad1}, ${diy.grad2})` : diy.bg;
  const t={...base,
    app: diyBg||customBg||base.app,
    card: customCards||base.card,
    text: diy.text||base.text,
    accent: diy.accent||base.accent,
  };
  const font = ALL_FONTS[fontId] || ALL_FONTS.dm_sans;

  const handleStoreClick=(id)=>{
    setCurrentStore(id);
    if(isMobile) setView("hub");
  };
  const handleSetView=(v)=>{setView(v);setCurrentStore(null);};

  const selectedStore=stores.find(s=>s.id===currentStore);

  return (
    <div style={{background:t.app,minHeight:"100vh",fontFamily:font.body,display:"flex",
      flexDirection:isMobile?"column":"row"}}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideInRight { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:translateX(0); } }
        @keyframes popIn { 0% { opacity:0; transform:scale(0.92); } 60% { transform:scale(1.02); } 100% { opacity:1; transform:scale(1); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        .anim-view { animation: fadeInUp 0.4s cubic-bezier(0.22,1,0.36,1); }
        .anim-store { animation: slideInRight 0.38s cubic-bezier(0.22,1,0.36,1); }
        .anim-tab { animation: fadeIn 0.28s ease; }
        .anim-pop { animation: popIn 0.32s cubic-bezier(0.34,1.56,0.64,1); }
        .stagger { animation: fadeInUp 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        /* Clic sur TOUS les boutons = petit rebond */
        button { transition: transform 0.12s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, background 0.2s ease, opacity 0.2s ease; }
        button:active { transform: scale(0.93); }
        /* Cartes cliquables */
        .clickable { transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease; cursor:pointer; }
        .clickable:active { transform: scale(0.97); }
      `}</style>
      {!isMobile&&(
        <Sidebar view={view} setView={handleSetView} t={t} font={font}
          onSettings={()=>setStudio(true)} onAI={()=>setAi(true)}
          stores={stores} collapsed={collapsed} setCollapsed={setCollapsed}
          onStoreClick={handleStoreClick}/>
      )}
      <main style={{flex:1,overflowY:"auto",maxHeight:isMobile?"calc(100vh - 62px)":"100vh",
        paddingBottom:isMobile?10:0}}>
        {selectedStore?(
          <div key={"store-"+currentStore} className="anim-store">
            <StoreHub store={selectedStore} t={t} font={font} posts={posts}
              isMobile={isMobile} storeDetails={storeDetails}
              setStoreDetails={setStoreDetails} onBack={()=>setCurrentStore(null)}/>
          </div>
        ):(
          <div key={view} className="anim-view">
            {view==="hub"&&<HubView stores={stores} t={t} font={font} posts={posts}
              isMobile={isMobile} onStoreClick={handleStoreClick}/>}
            {view==="calendar"&&<CalendarView t={t} font={font} objectives={objectives}
              setObjectives={setObjectives} isMobile={isMobile}/>}
            {view==="social"&&<SocialView stores={stores} posts={posts}
              setPosts={setPosts} t={t} font={font} isMobile={isMobile}/>}
            {view==="tools"&&<ToolsView t={t} font={font} isMobile={isMobile} stores={stores}
              routine={routine} setRoutine={setRoutine}
              budgets={budgets} setBudgets={setBudgets}
              swipes={swipes} setSwipes={setSwipes}
              audit={audit} setAudit={setAudit} posts={posts}/>}
          </div>
        )}
      </main>
      {isMobile&&(
        <BottomNav view={view} setView={handleSetView}
          onSettings={()=>setStudio(true)} onAI={()=>setAi(true)} t={t} font={font}/>
      )}
      {studioOpen&&(
        <ThemeStudio onClose={()=>setStudio(false)}
          themeId={themeId} setThemeId={setThemeId}
          fontId={fontId} setFontId={setFontId}
          customBg={customBg} setCustomBg={setCustomBg}
          customCards={customCards} setCustomCards={setCustomCards}
          diy={diy} setDiy={setDiy}
          savedThemes={savedThemes} setSavedThemes={setSavedThemes}
          stores={stores} setStores={setStores}
          t={t} font={font} isMobile={isMobile}/>
      )}
      {aiOpen&&(
        <CaptionGenerator stores={stores} t={t} font={font}
          isMobile={isMobile} onClose={()=>setAi(false)}/>
      )}
    </div>
  );
}
