# LIA Progress README - TraxMate Internship

## Overview

This README documents the daily progress and learnings from my LIA (Learning in Work) internship at Moacreto/TraxMate, focusing on IoT integration, API development, and system optimization. The content is based on programming sessions and troubleshooting with Grok AI.

## Daily Progress Summary

### Day 1: API Keys and Initial Setup (2025-12-01, Monday)

- Obtained Verkada API key and camera ID for integration
- Set up TraxMate staging environment access
- Configured device IDs and hardware IDs for testing
- Initial curl commands for telemetry posting

**Key Learnings:**

- Understanding API authentication with x-api-key headers
- Difference between staging and live environments
- Basic telemetry data structure for IoT devices

### Day 2: TraxMate Staging vs Live Environment (2025-12-02, Tuesday)

- Learned differences between v3 staging and live servers
- Configured device switching between environments
- Explored ThingsBoard device management
- Investigated device registration and telemetry routing

**Key Learnings:**

- Staging: test data, regular wipes, demo purposes
- Live: production data, customer-facing, no wipes
- URL differences: online.v3.staging.traxmate.io vs online.traxmate.io
- Device token works across both environments

### Day 3: Ubuntu System Optimization (2025-12-03, Wednesday)

- Implemented comprehensive power management
- Installed TLP, thermald, auto-cpufreq for battery life
- Configured CPU scaling governors (powersave/performance)
- Set up screen dimming and idle settings

**Key Learnings:**

- TLP for advanced power management
- auto-cpufreq for intelligent CPU scaling
- Battery life improvements: 3-4W idle, 7-9h usage
- Performance mode when plugged in, powersave on battery

### Day 4: Login Screen Customization (2025-12-04, Thursday)

- Modified GDM login screen to show custom wallpaper
- Resolved dbus-launch permission issues
- Set up username pre-selection
- Fixed Ubuntu 24.04 GDM configuration challenges

**Key Learnings:**

- GDM configuration in Ubuntu 24.04
- Wallpaper copying to system directories
- sudo -u gdm commands for display manager settings
- Troubleshooting display manager permissions

### Day 5: Docker and Development Tools Setup (2025-12-05, Friday)

- Installed Docker Desktop on Ubuntu
- Resolved snap vs apt package conflicts
- Set up Hoppscotch for API testing
- Configured Postman collections for TraxMate APIs

**Key Learnings:**

- Docker Desktop installation on Linux
- Difference between snap and .deb packages
- API testing tools: Hoppscotch, Postman
- Import/export of API collections

### Day 6: Beacon Device Integration (2025-12-06, Saturday)

- Configured P88L cellular beacon for staging
- Added staging webhook to Onomondo portal
- Set up dual reporting (live + staging)
- Tested motion detection and location telemetry

**Key Learnings:**

- Onomondo portal for cellular device management
- Webhook configuration for multi-environment reporting
- IMEI and hardware ID tracking
- Motion detection signal processing

### Day 7: Rule Chains and ThingsBoard Integration (2025-12-07, Sunday)

- Created ThingsBoard rule chains for alarm processing
- Implemented motion detection filters
- Set up REST API calls to Verkada
- Configured token generation and extraction scripts

**Key Learnings:**

- ThingsBoard rule chain architecture
- JavaScript transformers for message processing
- REST API call nodes in IoT platforms
- Error handling in rule chains

### Day 8: Verkada Helix API Integration (2025-12-08, Monday)

- Generated Verkada API tokens
- Created Helix event posts for motion alerts
- Configured camera PTZ movements
- Set up automated ticket creation

**Key Learnings:**

- Verkada API authentication flow
- Helix event structure and required fields
- Camera control via API (PTZ, presets)
- Event type UIDs and camera IDs

### Day 9: Advanced API Calls and Automation (2025-12-09, Tuesday)

- Built curl templates for repeatable testing
- Implemented timestamp and dynamic data insertion
- Created Postman collections for staging demos
- Automated token refresh and API calls

**Key Learnings:**

- Dynamic data in API payloads (timestamps, IDs)
- Template creation for consistent testing
- API rate limiting and error handling
- Automation scripts for demo scenarios

### Day 10: System Monitoring and Performance Tuning (2025-12-10, Wednesday)

- Installed system monitoring extensions (Vitals)
- Configured CPU temperature display
- Optimized Chrome for low power consumption
- Set up permanent performance monitoring

**Key Learnings:**

- GNOME extensions for system monitoring
- CPU temperature monitoring and safe ranges
- Browser GPU acceleration impact on battery
- Performance vs power consumption trade-offs

### Day 11: Verkada Camera & Traxmate Alarm Integration (2025-12-11, Thursday)

- Integrated Verkada live streams into Traxmate dashboard
- Set up button-press alarms from trackers with end-to-end testing
- Achieved one-click alarm-to-video access functionality
- Troubleshot RTSP access issues and switched to embed solutions
- Created custom Verkada Live Camera widget with HTML/CSS/JS
- Built alarm rule chain for button press detection
- Implemented clickable camera links in alarms table
- Tested full flow with curl commands

**Key Learnings:**

- RTSP vs embed approaches for camera integration
- ThingsBoard dashboard widget creation and iframe embedding
- Rule chain design for IoT alarm triggering
- Server attributes and cell functions for dynamic links
- VPN and network troubleshooting for private IPs
- End-to-end testing with telemetry simulation

**Detailed Progress:**

**RTSP Troubleshooting:**

- Explored RTSP streams for Verkada cameras via VPN
- Tested VLC RTSP simulation with camera URLs
- Identified VPN requirement for private IP access (985411b5ed954c8f041388d40033411f.1.prod2.verkada-lan.com)
- Performed nslookup/ping tests that failed due to network restrictions

**Embed Solution:**

- Switched to Verkada public embeds to bypass VPN/RTSP issues
- Generated embed code from Verkada share links
- Created "Verkada Live Camera" widget with iframe integration
- Added UI elements: pulsing LIVE dot, gradient styling
- Hardcoded embed URL for reliable loading

**Alarm Rule Chain:**

- Built "Justin's Verkada Alarm Forwarder" chain
- Flow: Input → Filter Script (buttonPressed=true) → Create Alarm → Save Timeseries
- Alarm type: "Button Pressed" (CRITICAL severity)
- Added server attribute "cameraDashboardUrl" for dynamic links

**Dashboard Integration:**

- Dashboard URL: https://online.v3.staging.traxmate.io/dashboards/d481ecc0-d0e8-11f0-a569-cb7f67a3c839
- Alarms Table with cell function for clickable "View Live Camera" links
- Tested with curl POST: {"buttonPressed": true} to device 4ce72620-d0f4-11f0-a569-cb7f67a3c839

**Challenges & Solutions:**

- Schema not rendering: Resolved with hardcoded URL in HTML
- No links in Alarms Table: Fixed with server attribute + cell HTML link
- VPN/RTSP access issues: Solved by using public embeds
- Widget errors (NG0904, sanitizeUrl): Overcame with direct iframe implementation

**Final Flow:**

- Button pressed → Telemetry sent to ThingsBoard
- Rule chain triggers alarm creation
- Dashboard displays alarm with "View Live Camera" link
- Click link → Opens live Verkada feed in new tab

**Code Snippets:**

```bash
# Test curl for button press alarm
curl -X POST https://online.v3.staging.traxmate.io/api/v1/2DspqSM6YTfrEbhQHKFp/telemetry \
  -H "Content-Type: application/json" \
  -d '{"buttonPressed": true}'
```

```html
<!-- Verkada Live Camera Widget -->
<iframe
  src="https://vauth.prod2.verkada.com/__v/combain/embed/html/9bc8ce4e-8a30-4c4b-8102-5155f1c84022/"
  width="100%"
  height="400px"
  frameborder="0"
>
</iframe>
<style>
  .live-dot {
    animation: pulse 2s infinite;
  }
</style>
```

**Next Steps:**

- Integrate real beacon hardware
- Add Clear Alarm node to rule chain
- Implement multi-camera scaling
- Prepare demo presentation

**Time Spent:** ~8 hours
**Status:** Demo-ready integration achieved

### Day 12: Verkada API Automation and Helix Events (2025-12-12, Friday)

- Created comprehensive curl templates for Helix event posting
- Implemented dynamic alert IDs and timestamps
- Configured camera PTZ control via API
- Set up automated ticket creation with detailed descriptions

**Key Learnings:**

- Verkada Helix API payload structure
- Dynamic data insertion in curl commands
- Camera preset control and PTZ movements
- Incident reporting with location and severity details

**Example Helix Event:**

```bash
curl -X POST https://api.eu.verkada.com/cameras/v1/video_tagging/event?org_id=8cc98425-d212-4525-8767-29e173bf186c \
  -H "content-type: application/json" \
  -H "x-verkada-auth: YOUR_API_KEY" \
  -d '{
    "attributes": {
      "alarm_type": "Motion detected",
      "alert_id": "YOUR_ALERT_ID",
      "description": "Incident: Motion detected at Scheelevägen 27, Lund. Action: Verify via camera footage. Contact: Security at +123-456-7890.",
      "device_id": "1fcdbf1a-5d1a-45e5-9695-586998e4b289",
      "location": "Scheelevägen 27, Lund",
      "severity": "Critical",
      "timestamp": "2025-12-08T12:00:00Z",
      "zone": "14th Floor"
    },
    "event_type_uid": "2947e8a5-59e0-4a84-9d83-5d605a4569e4",
    "camera_id": "YOUR_CAMERA_ID",
    "time_ms": 1765198450558
  }'
```

## Technologies Mastered

- **APIs:** Verkada Helix, TraxMate Telemetry, Onomondo
- **Tools:** ThingsBoard, Postman, Hoppscotch, Docker
- **Systems:** Ubuntu 24.04, GDM, TLP power management
- **Languages:** Bash scripting, JSON API payloads
- **Concepts:** IoT device management, API authentication, rule-based automation

## Challenges Overcome

- Ubuntu 24.04 GDM configuration complexities
- API token expiration and refresh mechanisms
- Docker installation conflicts
- Power management optimization for development laptop
- Multi-environment device reporting

## Key Achievements

- Successful TraxMate-Verkada integration demo
- Automated motion detection to camera PTZ workflow
- Optimized development environment for 9+ hour battery life
- Comprehensive API testing and documentation
- Rule chain automation for IoT events

## Lärandemål (Learning Objectives) Progress

- **API Integration:** Advanced proficiency
- **System Administration:** Ubuntu optimization expert
- **IoT Development:** Device management and telemetry
- **Automation:** Rule chains and API workflows
- **Documentation:** Detailed technical logging

## Next Steps

- Implement vector-based location lookup for enhanced alerts
- Expand rule chains for additional alarm types
- Optimize API call efficiency and error handling
- Document complete integration workflow
- Prepare demo presentation for stakeholders

## Resources Used

- Verkada API Documentation
- TraxMate Developer Portal
- ThingsBoard Rule Chain Guides
- Ubuntu Power Management Documentation
- Grok AI for troubleshooting and guidance

---

_This README is updated regularly to reflect current LIA progress and learnings._
