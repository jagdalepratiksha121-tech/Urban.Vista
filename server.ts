/**
 * City Life — Backend Server
 * Express + Vite middleware with secure Gemini AI City Companion endpoints,
 * community reporting, weather telemetry, and routing logic.
 */

import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI if key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI();
}

/* ==========================================================================
   IN-MEMORY BACKEND STORAGE (Community Reports & City Live Data)
   ========================================================================== */
interface ReportItem {
  id: string;
  coords: { x: number; y: number };
  category: string;
  severity: string;
  description: string;
  hasPhoto: boolean;
  hasAudio: boolean;
  matchesCount: number;
  timestamp: string;
  status: 'Pending Review' | 'Community Supported' | 'Verified by Trusted Source' | 'Resolved';
  upvotes: number;
  authorHandle: string;
}

let communityReports: ReportItem[] = [
  {
    id: 'rep-1',
    coords: { x: 49, y: 55 },
    category: 'Road Hazard',
    severity: 'High',
    description: 'Deep unbarricaded road trench and water accumulation near Swargate ST depot exit; causes two-wheeler skids.',
    hasPhoto: true,
    hasAudio: false,
    matchesCount: 3,
    timestamp: '25m ago',
    status: 'Verified by Trusted Source',
    upvotes: 14,
    authorHandle: 'pune_walker_88'
  },
  {
    id: 'rep-2',
    coords: { x: 41, y: 27 },
    category: 'Safety & Lighting',
    severity: 'Medium',
    description: 'Streetlights non-functional along 250m stretch under Shivajinagar railway underpass after 8 PM.',
    hasPhoto: false,
    hasAudio: true,
    matchesCount: 2,
    timestamp: '45m ago',
    status: 'Community Supported',
    upvotes: 9,
    authorHandle: 'deccan_rider'
  },
  {
    id: 'rep-3',
    coords: { x: 67, y: 43 },
    category: 'Traffic Bottleneck',
    severity: 'Low',
    description: 'Double-row parking outside commercial arcade choking left turn towards East Street in Camp.',
    hasPhoto: false,
    hasAudio: false,
    matchesCount: 1,
    timestamp: '1h ago',
    status: 'Pending Review',
    upvotes: 3,
    authorHandle: 'camp_local'
  }
];

/* ==========================================================================
   API ROUTES
   ========================================================================== */

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'City Life API',
    aiEnabled: Boolean(aiClient),
    timestamp: new Date().toISOString()
  });
});

// 2. City Weather Telemetry & Alerts
app.get('/api/weather', (_req: Request, res: Response) => {
  res.json({
    city: 'Pune',
    temperatureC: 28,
    condition: 'Partly Cloudy',
    humidityPercent: 68,
    precipitationChance: 35,
    uvIndex: 5,
    airQuality: { aqi: 74, status: 'Moderate', pm25: 23 },
    advisory: {
      active: true,
      headline: 'Monsoon Underpass Precautionary Advisory',
      description: 'Periodic shower spells expected in Shivajinagar & Swargate basins. Keep rain gear accessible; low-lying underpasses may experience intermittent water accumulation.',
      source: 'Regional Meteorological Centre & Civic Disaster Management',
      updatedAt: '12m ago'
    }
  });
});

// 3. Community Reports List
app.get('/api/reports', (_req: Request, res: Response) => {
  res.json({ reports: communityReports });
});

// 4. Create Community Report with Proximity Deduplication & Anti-Spam
app.post('/api/reports', (req: Request, res: Response) => {
  const { coords, category, severity, description, hasPhoto, hasAudio } = req.body;

  if (!description || typeof description !== 'string' || description.trim().length < 5) {
    return res.status(400).json({ error: 'Valid description of at least 5 characters is required.' });
  }

  const pinCoords = coords || { x: 45, y: 35 };

  // Calculate distance in SVG grid units (threshold ~8.0 units ≈ 500m)
  const existingIndex = communityReports.findIndex(r => {
    if (r.category !== category) return false;
    const dist = Math.hypot(r.coords.x - pinCoords.x, r.coords.y - pinCoords.y);
    return dist <= 8.5;
  });

  if (existingIndex !== -1) {
    // Proximity merge into existing report
    const existing = communityReports[existingIndex];
    existing.matchesCount += 1;
    existing.upvotes += 1;
    if (hasPhoto) existing.hasPhoto = true;
    if (hasAudio) existing.hasAudio = true;
    if (existing.matchesCount >= 3) {
      existing.status = 'Verified by Trusted Source';
    } else if (existing.matchesCount >= 2) {
      existing.status = 'Community Supported';
    }
    existing.description += ` [Update: ${description.trim()}]`;

    return res.json({
      merged: true,
      message: 'Merged with existing nearby report. Confidence score upgraded.',
      report: existing
    });
  }

  // Create new report
  const newReport: ReportItem = {
    id: `rep-${Date.now()}`,
    coords: pinCoords,
    category: category || 'Road Hazard',
    severity: severity || 'Medium',
    description: description.trim(),
    hasPhoto: Boolean(hasPhoto),
    hasAudio: Boolean(hasAudio),
    matchesCount: 1,
    timestamp: 'Just now',
    status: hasPhoto ? 'Community Supported' : 'Pending Review',
    upvotes: 1,
    authorHandle: `citizen_${Math.floor(1000 + Math.random() * 9000)}`
  };

  communityReports.unshift(newReport);
  return res.status(201).json({ merged: false, report: newReport });
});

// 5. Upvote / Confirm Report
app.post('/api/reports/:id/verify', (req: Request, res: Response) => {
  const report = communityReports.find(r => r.id === req.params.id);
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  report.upvotes += 1;
  report.matchesCount += 1;
  if (report.matchesCount >= 3) {
    report.status = 'Verified by Trusted Source';
  } else if (report.matchesCount >= 2) {
    report.status = 'Community Supported';
  }

  res.json({ report });
});

// 6. AI City Companion Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message text is required.' });
  }

  // System instruction for City Companion
  const systemInstruction = `You are "City Companion", an intelligent, knowledgeable, urban-exploration AI guide for City Life (focusing on Pune, Maharashtra).
Your core identity:
- Tagline: "Stop Surviving the City. Start Living It."
- Helpful, culturally authentic, discerning, street-smart, and safety-conscious.
- Guide users to authentic places: Shaniwar Wada, Aga Khan Palace, Pataleshwar Cave, Sinhagad Fort, Vaishali on FC Road, Kayani Bakery in Camp, Bedekar Misal in Narayan Peth, German Bakery in Koregaon Park, Vetal Tekdi, Saras Baug, Osho Teerth Park, Hotel Shreyas, etc.
- ALWAYS respect budget, accessibility (wheelchair friendly spots like Aga Khan Palace, Ritz Carlton, Pataleshwar upper precinct), weather (indoor rainy safe venues like museums, Irani cafes, covered palaces), and safety.
- NEVER invent fake opening hours, fabricated businesses, or false safety guarantees.
- Emphasize that no route or place can be guaranteed 100% safe, but informed decisions (avoiding unlit underpasses at night, staying in populated corridors) make exploration safer.
- Keep responses engaging, structured, and concise (under 200 words), highlighting 2-3 specific locations with estimated costs in ₹.`;

  // If Gemini API is available on server, call gemini-3.8-flash
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          ...conversationHistory.map((m: any) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.6,
          maxOutputTokens: 600
        }
      });

      return res.json({
        reply: response.text || "Here's what I recommend based on verified Pune city data.",
        source: 'gemini-3.8-flash'
      });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      // Fall through to smart contextual engine
    }
  }

  // Smart Contextual Engine Fallback
  const q = message.toLowerCase();
  let fallbackReply = '';

  if (q.includes('heritage') || q.includes('history') || q.includes('walk') || q.includes('fort')) {
    fallbackReply = `🏛️ **Curated Pune Heritage Walk**:
1. **Shaniwar Wada** (₹50) — The 18th-century Peshwa capital with the historic Delhi Darwaza teak gates.
2. **Pataleshwar Rock-Cut Cave Temple** (Free) — 8th-century Rashtrakuta basalt cavern right on JM Road. Cool, underground, and peaceful.
3. **Aga Khan Palace** (₹25, Kalyani Nagar) — Italian arches and lush gardens where Mahatma Gandhi and Kasturba Gandhi were memorialized. Completely wheelchair accessible!

💡 *Total spend*: Under ₹100. Best enjoyed in the morning (08:30 AM – 11:30 AM).`;
  } else if (q.includes('500') || q.includes('cheap') || q.includes('affordable') || q.includes('budget') || q.includes('eat')) {
    fallbackReply = `🍛 **Top Pune Exploration Under ₹500**:
1. **Bedekar Tea Stall** (Narayan Peth) — Authentic Puneri misal with fresh pav and signature kat broth (~₹110).
2. **Vaishali on FC Road** — Grab iconic Sev Potato Dahi Puri (SPDP) & filter coffee under the buzzing open-air canopy (~₹220).
3. **Kayani Bakery** (East Street, Camp) — A box of fresh Shrewsbury butter biscuits (~₹150).

✨ *Total*: ~₹480 for a full day of legendary Puneri flavors.`;
  } else if (q.includes('wheelchair') || q.includes('accessible') || q.includes('elderly')) {
    fallbackReply = `♿ **Wheelchair & Step-Free Accessible Spots in Pune**:
1. **Aga Khan Palace** — Wide paved garden ramps, step-free access to Gandhi memorials, spacious shaded walkways.
2. **Osho Teerth Zen Park** (Koregaon Park) — Flat, smooth stone walking paths along bamboo groves and calm streams.
3. **The Ritz-Carlton & KP Cafes** — Full ADA-compliant elevators, accessible restrooms, and valet assistance.

⚠️ *Note*: Historical hill forts like Sinhagad feature steep stone steps and unpaved terrain; prioritize city palace gardens for elderly or wheelchair companions.`;
  } else if (q.includes('solo') || q.includes('safe') || q.includes('night') || q.includes('women')) {
    fallbackReply = `🛡️ **Solo Explorer & Evening Safety Tips**:
- **High-Comfort Corridors**: FC Road (Fergusson College Rd) and JM Road remain brightly lit, lively with student crowds and family diners until 11:00 PM.
- **Koregaon Park (North Main Rd)**: Great cafe culture, active foot traffic, safe transport links.
- **Areas to Avoid Late Night Alone**: Unlit Mutha riverside stretches, Shivajinagar railway underpass after 9 PM, and isolated Katraj Ghat descents.
- **Emergency Resources**: Pune Police SOS (112) and Women's Helpline (1091) are integrated into City Life's emergency drawer.`;
  } else {
    fallbackReply = `🌆 **Welcome to City Life!** Here are 3 versatile ideas for exploring Pune today:
- **For Culture**: Shaniwar Wada & Lal Mahal in the historic Peths (entry ₹20-50).
- **For Relaxation**: Sunset at Vetal Tekdi (free, 2,600ft panoramic view) or serene bamboo walks in Osho Teerth Park (₹70).
- **For Food**: Iconic SPDP and filter coffee at Vaishali on FC Road.

Tell me your budget, travel time, or vibe, and I'll generate a personalized itinerary!`;
  }

  res.json({
    reply: fallbackReply,
    source: 'contextual-city-engine'
  });
});

/* ==========================================================================
   VITE DEV MIDDLEWARE / STATIC ASSETS SERVING
   ========================================================================== */
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[City Life] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
