# Måndag 18 November 2025 - Första Dagen på Traxmate

## 🌅 Onboarding & Initial Setup

### Morgon (08:30 - 12:00)

#### Ankomst och Introduktion

- **08:30** - Anlände till Traxmate kontor
- Mötte Rikard (COO) som välkomnade mig
- Fick rundtur på kontoret och introduktion till teamet
- Kaffe och kakor (trevlig välkomnande atmosfär! ☕🍪)

#### Arbetsplats Setup

- Fick tilldelad arbetsdator och skärmar
- Uppsatt utvecklingsmiljö:
  - VS Code installerat med extensions (Python, Angular, ESLint)
  - Git konfigurerat med företagets repository access
  - Python 3.11 environment setup
  - Node.js och npm installerat för Angular development

#### Projektgenomgång

Rikard förklarade Traxmate-Verkada integration projektet:

- **Mål**: Integrera Traxmates larmsystem med Verkada Helix API
- **Syfte**: Skicka alarm events från Traxmate till Verkada Security platform
- **Scope**: Full-stack implementation (Python backend + Angular frontend)
- **Timeline**: LIA-period fokuserar på detta projekt

---

### Eftermiddag (13:00 - 17:00)

#### Objective 1.1: Environment Setup

Började med projektets första objective - sätta upp miljön för API-arbete.

**Uppgifter genomförda:**

1. **Skapade projektmapp struktur:**

   ```
   traxmate-verkada/
   ├── api_integration/
   ├── frontend/
   ├── docs/
   └── tests/
   ```

2. **Konfigurerade `.env` fil:**

   - La till Verkada API credentials (fick från Rikard)
   - Satte upp API base URL för EU region
   - Konfigurerade organization ID

3. **Installerade Python dependencies:**

   ```bash
   pip install requests python-dotenv
   ```

4. **Verifierade miljövariabler:**
   - Testade att `.env` laddas korrekt
   - Validerade att credentials är maskerade i logs

---

## 📚 Lärdomar

### Tekniskt

- Lärde mig Verkada's API struktur (Helix platform)
- Förstod skillnaden mellan EU och US API endpoints
- Praktisk erfarenhet av environment-based configuration

### Professionellt

- Fick insikt i hur onboarding går till på riktiga företag
- Lärde mig Traxmates arbetskultur (öppen, samarbetsinriktad)
- Förstod vikten av tydlig projektdokumentation från dag 1

---

## 🎯 Koppling till Lärandemål

**LM4 - Professional Development Workflow:**

- Följde strukturerad onboarding process
- Skapade organiserad projektstruktur från start
- Etablerade version control och development environment

**LM2 - API Integration:**

- Började förstå Verkada API architecture
- Lärde mig om API authentication med API keys
- Förberedde miljö för RESTful API consumption

---

## 💭 Reflektion

Första dagen var både spännande och lite nervös! Teamet på Traxmate är väldigt välkomnande vilket gjorde det lättare att känna sig hemma. Projektet verkar utmanande men lagom för min nivå - jag får applicera både backend (Python API) och frontend (Angular) kunskaper.

Rikard var tydlig med förväntningar och gav bra context kring varför projektet är viktigt för företaget. Det känns motiverande att arbeta på något som faktiskt kommer användas i produktion.

**Utmaningar:**

- Mycket ny information att ta in första dagen
- Verkada's API documentation är omfattande
- Behöver bli bekväm med företagets kod-standards

**Förberedelser för imorgon:**

- Läsa igenom Verkada Helix API documentation
- Planera Objective 1.2 (API Authentication)
- Förbereda test cases för API connectivity

---

## ⏰ Tidrapport

| Aktivitet                  | Tid      |
| -------------------------- | -------- |
| Onboarding & introduktion  | 2h       |
| Arbetsplats setup          | 1.5h     |
| Environment configuration  | 2h       |
| Dokumentation & reflektion | 1h       |
| **Total**                  | **6.5h** |

---

_Dokumenterat: 18 November 2025, 17:30_  
_Status: Objective 1.1 ✅ Completerad_
