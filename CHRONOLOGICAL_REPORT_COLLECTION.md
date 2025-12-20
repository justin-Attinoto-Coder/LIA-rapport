# LIA Rapport - Chronological Collection

**Compiled**: December 20, 2025  
**Purpose**: Complete chronological reference for home computer writing

---

# TABLE OF CONTENTS

1. [Week 1: November 18-22, 2025](#week-1-november-18-22-2025)
2. [December 4, 2025 - ThingsBoard Integration](#december-4-2025---thingsboard-integration)
3. [December 11, 2025 - Verkada Integration](#december-11-2025---verkada-integration)
4. [December 18, 2025 - T1000-A Tracker Integration](#december-18-2025---t1000-a-tracker-integration)
5. [LIA Progress Summary (Dec 1-7)](#lia-progress-summary-dec-1-7)

---

# Week 1: November 18-22, 2025

## Veckosammanfattning

Min första vecka på Traxmate! Fokuserade på Verkada Helix API-integration för larmsystem med komplett implementation från grunden till produktionsklar lösning.

## Veckans Huvudsakliga Prestationer

### ✅ Fullständig API-Integration

- Implementerade säker autentisering med Verkada Helix API
- Byggde robust session token management system
- Validerade alla API-endpoints (POST/GET) med 100% framgångsgrad

### ✅ Event Management System

- Analyserade Verkada event type schema (8 officiella attribut)
- Implementerade komplett event posting med alla required fields
- Skapade 5 produktionsklara test events med full data integrity

### ✅ Enhanced Alert System

- Utvecklade rich notification system med prioritetsindikatorer (🚨⚠️)
- Integrerade direkta kameralänkar i alert descriptions
- Byggde action-oriented messaging för emergency response

### ✅ Modern Angular Frontend

- Skapade Angular 19 applikation med SSR och standalone components
- Implementerade state-of-the-art glassmorphism UI design
- Byggde 7 comprehensive demo scenarios för olika alert severity levels
- Säkerställde WCAG AAA accessibility compliance

## Teknisk Stack

**Backend:**

- Python för Verkada API-integration
- Requests library för HTTP/HTTPS kommunikation
- Environment-based configuration (.env)

**Frontend:**

- Angular 19 (standalone components)
- TypeScript 5.6
- RxJS för reactive state management

## Daglig Uppdelning

### MÅNDAG 18 NOVEMBER - Onboarding Day

- Introduktion till Traxmate och teamet
- Fick åtkomst till Verkada staging miljö
- Setup av utvecklingsmiljö (VS Code, Python, Angular)
- Första möte med mentor Rikard
- Genomgång av projektmål och förväntningar

### TISDAG 19 NOVEMBER - API Foundation

- Studerade Verkada Helix API dokumentation
- Implementerade autentisering och token management
- Skapade första API test calls
- Konfigurerade environment variables (.env)
- Testade GET/POST endpoints

### ONSDAG 20 NOVEMBER - Event Implementation

- Analyserade Verkada event schema
- Implementerade komplett event posting
- Skapade test events för olika scenarios
- Debuggade API responses
- Validerade data integrity

### TORSDAG 21 NOVEMBER - Enhanced Alerts Frontend

- Började Angular 19 frontend projekt
- Implementerade glassmorphism UI design
- Skapade alert komponenter
- Integrerade kameralänkar
- Byggde 7 demo scenarios

### FREDAG 22 NOVEMBER - Frontend Completion

- Finaliserade UI/UX design
- Testade full integration (backend → frontend)
- Dokumenterade hela systemet
- Demonstrerade lösningen för teamet
- Veckoavslutning med Rikard

## Key Learnings Week 1

- API authentication och session management
- Event-driven architecture
- Angular 19 nya features (standalone components)
- Glassmorphism design principles
- Professional git workflow
- Verkada platform capabilities

---

# December 4, 2025 - ThingsBoard Integration

## Project Overview

Successful configuration and development of a ThingsBoard Community Edition dashboard for IoT telemetry monitoring and device attribute management, specifically for a camera device deployed at the Ideon Gateway Elite Hotel in Lund, Sweden.

## Objectives Accomplished

### 1. Device Configuration & Telemetry Setup

- **Device Created**: Camera device (ID: `4ce72620-d0f4-11f0-a569-cb7f67a3c839`)
- **Location**: Southwest corner, 14th floor, Ideon Gateway Elite Hotel, Lund, Sweden
- **GPS Coordinates**: Latitude 55.7196, Longitude 13.1872
- **Telemetry Data**: Real-time temperature monitoring with successful data transmission

### 2. Dashboard & Widget Development

#### Value Card Widget

- **Purpose**: Display real-time temperature readings with visual feedback
- **Configuration**:
  - Temperature data key (timeseries type)
  - Dynamic color gradient (blue to red based on temperature range -60°C to +60°C)
  - Large value font (52px) for easy readability
  - Thermometer icon with color-coded display
  - Real-time updates (1-second interval)
  - Last update timestamp display
  - Units: °C with 0 decimal places

#### Entities Table Widget

- **Purpose**: Display device overview with key attributes in tabular format
- **Enhancements**:
  - Added `hardwareId` column (attribute type)
  - Added `Received Time` column (timestamp display)
  - Added `name` column for device identification
  - Sortable and filterable columns
  - Real-time data refresh

### 3. Device Attributes Management

#### Location & Building Attributes

| Attribute   | Type    | Value                     |
| ----------- | ------- | ------------------------- |
| `latitude`  | Double  | 55.7196                   |
| `longitude` | Double  | 13.1872                   |
| `building`  | String  | Ideon Gateway Elite Hotel |
| `city`      | String  | Lund                      |
| `country`   | String  | Sweden                    |
| `floor`     | Integer | 14                        |
| `location`  | String  | Southwest corner          |

#### Existing Device Attributes

- `hardwareId` - Device hardware identifier
- `temperature` - Current temperature telemetry
- `rawRequest` - Raw request data logging
- `active` - Device active status
- `lastActivityTime` - Last recorded activity timestamp
- `createdTime` - Device creation timestamp
- `name` - Device friendly name
- `type` - Device type classification
- `label` - Device label for UI display

### 4. Widget JSON Configuration

#### Key Technical Implementations

**Data Keys Structure**:

```json
{
  "name": "temperature",
  "type": "timeseries",
  "label": "Temperature"
}
```

**Dynamic Color Functions**:

```javascript
var temperature = value
if (typeof temperature !== undefined) {
  var percent = ((temperature + 60) / 120) * 100
  return tinycolor.mix('blue', 'red', percent).toHexString()
}
return 'blue'
```

**Time Window Configuration**:

- Real-time mode: 1-second interval updates, 60-second window
- Historical mode: Configurable time ranges
- Aggregation: AVG type with 25,000 data point limit

### 5. Technical Achievements

- Mastered ThingsBoard widget configuration
- Learned JSON-based dashboard development
- Implemented dynamic color transformation logic
- Configured real-time data visualization
- Managed device attributes and telemetry data
- Created professional IoT dashboard layout

---

# December 11, 2025 - Verkada Integration

**Date**: December 13, 2025  
**Project**: Verkada Live Feed + Tracker Button Alarm in Traxmate/ThingsBoard

## Summary

Created a complete integration that displays Verkada live camera feeds in ThingsBoard dashboards and triggers alarms when a physical tracker button is pressed. When the alarm fires, users can click directly to the live camera feed for instant visual verification.

### Key Features

- ✅ Verkada live camera feed embedded in ThingsBoard dashboard
- ✅ Rule chain detects tracker button press (SOS event)
- ✅ Auto-creates critical alarm with clickable camera link
- ✅ Works with real T1000-A tracker hardware
- ✅ No VPN or RTSP configuration required
- ✅ Sub-90 second response time from button press to alarm

## Architecture Overview

```
T1000-A Tracker → LoRaWAN → ThingsBoard API
                           ↓
                    Rule Chain Processing
                           ↓
                  Create Alarm + Save Data
                           ↓
                  Dashboard Display
                  (Live Feed + Alarms)
                           ↓
              Click Camera Link → Verkada Feed
```

## Component Details

### 1. Verkada Live Feed Widget

**Widget Type**: HTML Card
**Purpose**: Embed live camera feed directly in dashboard

**Implementation**:

```html
<iframe
  src="https://v2.vc.verkada.com/embed/v2/share/<SHARE_ID>"
  width="100%"
  height="500px"
  frameborder="0"
  allowfullscreen
></iframe>
```

**Key Benefits**:

- No VPN required
- No RTSP configuration
- Works across all devices
- Sub-2 second latency
- Built-in Verkada controls (zoom, timeline)

### 2. T1000-A Tracker Configuration

**Device Details**:

- Model: SenseCAP T1000-A/B LoRaWAN Tracker
- DevEUI: 2CF7F1C05300045F
- Communication: LoRaWAN → HTTP POST to ThingsBoard
- Button: Double-press triggers SOS event

**SOS Event Detection**:

```javascript
// In telemetry payload
{
  "sos_event": 1,           // Indicates button pressed
  "event_status": 4,        // Event code 4 = SOS
  "latitude": 55.7196,
  "longitude": 13.1872,
  "battery": 85
}
```

### 3. ThingsBoard Rule Chain

**Rule Flow**:

1. **Input Node** - Receives telemetry from tracker
2. **Filter Script** - Detects SOS event
3. **Create Alarm Node** - Generates critical alarm
4. **Save Timeseries Node** - Stores event data

**Filter Script Logic**:

```javascript
if (msg.sos_event === 1 || msg.event_status === 4) {
  return true // Proceed to create alarm
}
return false // Ignore normal telemetry
```

**Alarm Configuration**:

- Type: "Button Pressed"
- Severity: CRITICAL
- Details include: timestamp, location, battery level, camera link
- Propagate to relations: true (shows on dashboard)

### 4. Dashboard Integration

**Alarms Table Widget**:

- Displays all active alarms
- Shows timestamp, severity, details
- Clickable camera links embedded in alarm details
- Real-time updates

**Camera Link Format**:

```
Camera Link: https://online.v3.staging.traxmate.io/dashboards/d481ecc0-d0e8-11f0-a569-cb7f67a3c839
```

## Testing & Validation

### Test Procedure:

1. Double-press button on T1000-A tracker
2. Wait 30-90 seconds for LoRaWAN transmission
3. Verify alarm appears in dashboard
4. Click camera link to view live feed
5. Confirm location and context

### Results:

- ✅ 100% alarm generation rate
- ✅ Average response time: 65 seconds
- ✅ Camera link works on all devices
- ✅ GPS coordinates accurate to 15m
- ✅ Battery data included in alarm

## Technical Learnings

### 1. LoRaWAN Communication

- Understanding LoRaWAN message structure
- Handling telemetry transformation
- Managing device tokens and authentication

### 2. ThingsBoard Rule Chains

- Creating custom filter scripts
- Alarm node configuration
- Data propagation to dashboards

### 3. Verkada Integration

- Using embed links for live feeds
- Share link generation and permissions
- iframe security and compatibility

### 4. IoT Event Processing

- Real-time event detection
- Multi-source data correlation (GPS + camera)
- Response time optimization

## Production Deployment Notes

**Current Status**: Staging environment tested and verified
**Next Steps for Production**:

1. Move to production ThingsBoard instance
2. Update device registration to live environment
3. Configure production Verkada share links
4. Set up user permissions and alarm notifications
5. Document standard operating procedures

## Key Innovations

- **Camera URL Integration**: Direct links in alarms reduce response time by 93%
- **Multi-Modal Context**: Combines location data with visual verification
- **Zero-Config Camera**: No VPN or RTSP setup required
- **Universal Access**: Works on desktop, mobile, tablet

---

# December 18, 2025 - T1000-A Tracker Integration

**Date**: December 18, 2025  
**Author**: Justin Lee Attinoto  
**Project**: Real-Time Security Tracker Integration with Live Camera Feed  
**Status**: ✅ Complete - Production Ready

## Overview

Successfully integrated a real SenseCAP T1000-A LoRaWAN tracker with ThingsBoard and Verkada camera system. When the tracker's SOS button is pressed, the system automatically creates an alarm with full context (location, battery, temperature) and provides clickable links to view the Verkada live camera feed.

## Major Discoveries & Accomplishments

### 1. Identified Correct Real T1000-A Tracker

After resolving confusion with multiple test devices, confirmed the production tracker:

```json
{
  "DevEUI": "2CF7F1C05300045F",
  "ThingsBoardId": "3b1d69a1-cfb2-403b-a879-fc40c0016dc4",
  "HardwareId": "00-16-C0-01-F0-01-E1-3A",
  "Model": "SenseCAP T1000-A/B",
  "Status": "Active and Responding"
}
```

**Key Learning**: Multiple test devices were causing confusion. Verified against physical hardware serial numbers and LED indicators.

### 2. Decoded SOS Alarm Trigger Mechanism

Breakthrough discovery on how the T1000-A sends SOS events:

```json
{
  "measurementId": "4200",
  "measurementValue": [],
  "explanation": "This is the Event Status field"
}
```

**Event Status Codes**:

- `[]` (empty) = Normal heartbeat/telemetry
- `[4]` (present with value 4) = **SOS Event Triggered**
- `[1]` = Free fall detected
- `[2]` = Shock detected
- `[4]` = SOS button pressed (our use case)

**Implementation**:

```javascript
// Detection script in rule chain
if (msg.measurementId === '4200' && msg.measurementValue && msg.measurementValue.length > 0) {
  msg.buttonPressed = true // Triggers alarm
  msg.sosEventCode = msg.measurementValue[0]
}
return true
```

### 3. Telemetry & Server Attributes Maximized

#### Telemetry Extraction (from T1000-A payload)

```javascript
{
  "battery": 85,           // Battery percentage (0-100)
  "temperature": 22.5,     // Ambient temperature (°C)
  "light": 450,            // Light level (lux)
  "latitude": 55.7196,     // GPS coordinates
  "longitude": 13.1872,
  "accuracy": 15,          // GPS accuracy in meters
  "address": "Lund, Sweden", // Reverse geocode
  "buttonPressed": true    // SOS event indicator
}
```

#### Server Attributes Added

```javascript
{
  // Camera & Dashboard Links
  "cameraDashboardUrl": "https://online.v3.staging.traxmate.io/dashboards/d481ecc0-d0e8-11f0-a569-cb7f67a3c839",
  "deviceMapUrl": "https://online.v3.staging.traxmate.io/devices/3b1d69a1-cfb2-403b-a879-fc40c0016dc4",

  // Location Context
  "building": "Ideon Gateway Elite Hotel",
  "buildingId": "ideon-gateway-elite",
  "floorIndex": 14,

  // Hardware Info
  "hardwareId": "00-16-C0-01-F0-01-E1-3A",
  "deviceModel": "SenseCAP T1000-A"
}
```

### 4. Rule Chain Optimization

**Comprehensive Processing Flow**:

1. **Input** - Receive raw LoRaWAN data
2. **Transform** - Extract telemetry + detect SOS
3. **Filter** - Check for button press event
4. **Enrich** - Add server attributes (camera URLs)
5. **Create Alarm** - Generate detailed alarm with context
6. **Save** - Store telemetry to database
7. **Notify** - (Future: email/SMS notifications)

**Alarm Details Template**:

```
🚨 EMERGENCY: Button Pressed

Location: Ideon Gateway Elite Hotel, Floor 14
Coordinates: 55.7196, 13.1872
Battery: 85%
Temperature: 22.5°C

📹 View Camera: [Click Here]
🗺️ View Map: [Click Here]

Timestamp: 2025-12-18 14:32:45
```

### 5. Dashboard Enhancements

**Multiple Widget Integration**:

- Live camera feed (iframe embed)
- Real-time alarms table
- Device location map
- Telemetry charts (battery, temperature)
- Device status indicators

**User Experience Improvements**:

- One-click access to camera from alarm
- Color-coded severity indicators
- Real-time updates (no refresh needed)
- Mobile-responsive design
- Timestamp localization

## Testing Results

### Test Scenarios Completed:

1. ✅ Button press detection (100% success rate)
2. ✅ GPS coordinate accuracy (±15m)
3. ✅ Alarm generation speed (avg 65 seconds)
4. ✅ Camera link functionality (all devices)
5. ✅ Battery reporting accuracy
6. ✅ Temperature sensor validation
7. ✅ Multi-device handling (no conflicts)

### Performance Metrics:

- **End-to-End Response**: 65 seconds avg (button → alarm visible)
- **GPS Accuracy**: 15 meters
- **Battery Life**: 6+ months (estimated)
- **Data Transmission**: 100% success rate
- **Dashboard Load Time**: < 2 seconds

## Technical Stack Summary

**Hardware**:

- SenseCAP T1000-A LoRaWAN tracker
- Verkada security cameras

**Backend**:

- ThingsBoard Community Edition
- LoRaWAN network server
- HTTP REST APIs

**Integration Points**:

- LoRaWAN → ThingsBoard telemetry
- ThingsBoard → Verkada (embed links)
- Rule chains for event processing
- Dashboard widgets for visualization

## Key Innovations

1. **Multi-Source Context**: Combines tracker data (location, battery) with camera feed
2. **Zero-Latency Camera Access**: Direct embed links (no VPN/RTSP)
3. **Comprehensive Telemetry**: Extracts all available sensor data
4. **Smart Event Detection**: Distinguishes SOS from normal telemetry
5. **User-Friendly Alarms**: Includes all necessary context for response

## Production Readiness Checklist

- ✅ Device identified and configured
- ✅ SOS event detection working
- ✅ Alarm creation automated
- ✅ Camera links functional
- ✅ Dashboard widgets deployed
- ✅ Testing completed successfully
- ✅ Documentation created
- ⏳ User training (pending)
- ⏳ Production deployment (pending)

## Lessons Learned

1. **Device Identification**: Always verify hardware IDs against physical labels
2. **Event Structure**: LoRaWAN payloads vary by manufacturer; check docs carefully
3. **ThingsBoard Attributes**: Use server attributes for static data (URLs, building info)
4. **Telemetry vs Attributes**: Telemetry for time-series data, attributes for metadata
5. **Testing Methodology**: Test all scenarios before production deployment
6. **Documentation**: Comprehensive docs save time during troubleshooting

## Next Steps

1. Deploy to production ThingsBoard instance
2. Configure production Verkada camera shares
3. Set up email/SMS notifications
4. Create user training materials
5. Establish monitoring and maintenance procedures
6. Document incident response workflows

---

# LIA Progress Summary (Dec 1-7)

## Daily Progress Summary

### Day 1: API Keys and Initial Setup (2025-12-01, Monday)

- Obtained Verkada API key and camera ID for integration
- Set up TraxMate staging environment access
- Configured device IDs and hardware IDs for testing
- Initial curl commands for telemetry posting

**Key Learnings**:

- Understanding API authentication with x-api-key headers
- Difference between staging and live environments
- Basic telemetry data structure for IoT devices

### Day 2: TraxMate Staging vs Live Environment (2025-12-02, Tuesday)

- Learned differences between v3 staging and live servers
- Configured device switching between environments
- Explored ThingsBoard device management
- Investigated device registration and telemetry routing

**Key Learnings**:

- Staging: test data, regular wipes, demo purposes
- Live: production data, customer-facing, no wipes
- URL differences: online.v3.staging.traxmate.io vs online.traxmate.io
- Device token works across both environments

### Day 3: Ubuntu System Optimization (2025-12-03, Wednesday)

- Implemented comprehensive power management
- Installed TLP, thermald, auto-cpufreq for battery life
- Configured CPU scaling governors (powersave/performance)
- Set up screen dimming and idle settings

**Key Learnings**:

- TLP for advanced power management
- auto-cpufreq for intelligent CPU scaling
- Battery life improvements: 3-4W idle, 7-9h usage
- Performance mode when plugged in, powersave on battery

### Day 4: Login Screen Customization (2025-12-04, Thursday)

- Modified GDM login screen to show custom wallpaper
- Resolved dbus-launch permission issues
- Set up username pre-selection
- Fixed Ubuntu 24.04 GDM configuration challenges

**Key Learnings**:

- GDM configuration in Ubuntu 24.04
- Wallpaper copying to system directories
- sudo -u gdm commands for display manager settings
- Troubleshooting display manager permissions

### Day 5: Docker and Development Tools Setup (2025-12-05, Friday)

- Installed Docker Desktop on Ubuntu
- Resolved snap vs apt package conflicts
- Set up Hoppscotch for API testing
- Configured Postman collections for TraxMate APIs

**Key Learnings**:

- Docker Desktop installation on Linux
- Difference between snap and .deb packages
- API testing tools: Hoppscotch, Postman
- Import/export of API collections

### Day 6: Beacon Device Integration (2025-12-06, Saturday)

- Configured P88L cellular beacon for staging
- Added staging webhook to Onomondo portal
- Set up dual reporting (live + staging)
- Tested motion detection and location telemetry

**Key Learnings**:

- Onomondo portal for cellular device management
- Webhook configuration for multi-environment reporting
- IMEI and hardware ID tracking
- Motion detection signal processing

### Day 7: Rule Chains and ThingsBoard Integration (2025-12-07, Sunday)

- Created ThingsBoard rule chains for alarm processing
- Implemented motion detection filters
- Set up REST API calls to Verkada
- Configured token generation and extraction scripts

**Key Learnings**:

- ThingsBoard rule chain architecture
- REST API call nodes in rule chains
- Token extraction from JSON responses
- Alarm creation and propagation

---

# NOTES FOR HOME COMPUTER WRITING

## What's Already Done (System Auto-Saves)

The LIA report system you built has:

- ✅ Frontend form pages for all sections
- ✅ Daily and weekly log pages
- ✅ PDF export functionality
- ✅ localStorage auto-save (browser-based)

## Why localStorage Might Be an Issue

- **localStorage** saves data only in the browser on the computer where you filled it out
- If you fill out forms in the dev container and then switch to your home computer, the data won't transfer
- localStorage doesn't sync across devices/browsers

## Recommended Workflow for Home Computer

### Option 1: Use This Chronological Document

1. Keep this file open while writing
2. Reference the dates and accomplishments
3. Type directly into your home computer's browser (localhost:3000)
4. The data will save to YOUR home computer's localStorage

### Option 2: Export from Dev Container First

1. Fill everything out in the dev container
2. Export to PDF before leaving
3. Use PDF as reference on home computer
4. Or: manually copy localStorage data

### Option 3: Add Backend Database (Future Enhancement)

- Replace localStorage with Go backend database
- Data would persist across devices
- Would require adding database endpoints

## What to Write (Reference Points)

### Section: Sammanfattning

- Week 1: Verkada API integration
- Dec 4: ThingsBoard dashboard creation
- Dec 11: Live camera feed integration
- Dec 18: T1000-A tracker SOS system

### Section: Inledning

- Started Nov 18, 2025 at Traxmate/Moacreto
- 6-month internship focused on IoT integration
- Expected to learn: API development, dashboard creation, LoRaWAN

### Section: LIA-företaget

- Company: Traxmate/Moacreto
- Location: Ideon Gateway Elite Hotel, Lund
- Focus: IoT tracking and security solutions
- Mentor: Rikard

### Section: Arbetsuppgifter

- Verkada API integration
- ThingsBoard dashboard development
- LoRaWAN device configuration
- Rule chain creation
- Frontend development (Angular 19)

### Section: Projekt

Main projects:

1. Verkada Helix API Integration (Week 1)
2. ThingsBoard Temperature Dashboard (Dec 4)
3. Camera + Tracker Alarm System (Dec 11)
4. T1000-A SOS Integration (Dec 18)

### Daily Logs (Daglig)

Reference each day in this document with:

- Date
- Tasks completed
- Technologies used
- Problems solved
- Learning outcomes

### Weekly Logs (Veckovis)

- Week 1: Nov 18-22 (Verkada foundation)
- Week 2-3: Dec 1-7 (ThingsBoard learning)
- Week 4: Dec 11-18 (Tracker integration)

---

**END OF CHRONOLOGICAL COLLECTION**

This document contains all your dated README files in chronological order for easy reference when writing your LIA report on your home computer.
