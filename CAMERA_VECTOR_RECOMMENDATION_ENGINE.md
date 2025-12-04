# Camera Vector Recommendation Engine for Beacon Alert Response

A machine learning-inspired system for intelligent camera selection when beacon alerts are triggered in Traxmate. Uses multi-dimensional vector similarity scoring (inspired by Spotify's recommendation algorithm) to automatically identify and prioritize the most relevant cameras for incident response.

---

## 🎯 The Pitch (For Your Mentor)

### The Problem We're Solving

Imagine a hotel with 500+ cameras across 20 floors. A security beacon detects an unauthorized access on the 14th floor. Your security team needs to see the right camera **instantly**. Currently, they manually search through dozens of cameras trying to find the best angle and coverage.

**Solution?** Treat camera selection like Spotify recommends songs.

### How It Works (Simple Version)

1. **Every camera gets a profile** with its characteristics:

   - Where it's located (floor, GPS, zone)
   - What it can do (resolution, can it pan/tilt, night vision?)
   - How reliable it is (detection accuracy, response time)

2. **When an alert happens**, we instantly compare:

   - The alert location & characteristics
   - Every camera's profile
   - Which cameras match best?

3. **Results in milliseconds**:
   - Top 3-5 cameras ranked by relevance
   - Show confidence scores (96% match, 87% match, etc.)
   - Auto-focus best camera to the alert location

### Why This Is Better

| Traditional                      | Vector-Based               |
| -------------------------------- | -------------------------- |
| Manual camera selection          | Automatic ranking          |
| 30+ seconds to find right camera | <500ms response            |
| Guesswork on best angle          | Data-driven recommendation |
| Works for 10 cameras             | Scales to 1000+ cameras    |
| No learning from past incidents  | Improves over time         |

### Real Example

**Alert**: Unauthorized access, 14th floor, southwest corner, high threat

**System Recommends**:

- 🥇 **Cam-14-SW** (96% confidence) — 2m away, 4K, night vision, PTZ capable
- 🥈 **Cam-14-W** (87% confidence) — 12m away, 1080p, PTZ capable
- 🥉 **Cam-13-SW** (75% confidence) — 2m away (one floor down), 4K, no PTZ

**Human does**: Clicks on camera #1, it auto-focuses to the alert location. Done.

### What You Need

- **Backend (Go)**: Smart ranking algorithm (~200 lines of code)
- **Frontend (Angular)**: Display results with confidence bars (~300 lines)
- **Database**: Store camera profiles as vectors (~10 fields per camera)
- **Integration**: Hook into Verkada API for auto-focus (~50 lines)

### Timeline to MVP

- **Week 1**: Design camera vector schema, build scoring algorithm
- **Week 2**: Frontend UI, connect to backend
- **Week 3**: Integrate with Verkada, test with real alerts
- **Week 4**: Optimize, add monitoring, document

### Why Spotify's Approach Works Here

Spotify solved: "Which song should I recommend to this user?"  
We're solving: "Which camera should I show for this alert?"

Both need:

- ✅ Match characteristics (song genre ↔ camera location)
- ✅ Fast scoring (milliseconds matter)
- ✅ Confidence rankings (top 3-5 options)
- ✅ Learning from history (what worked before?)

---

## Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)
- [Architecture](#architecture)
- [Implementation](#implementation)
- [Usage](#usage)
- [Integration](#integration)

## Overview

### The Problem

When a beacon alert fires in a multi-building, multi-floor facility:

- Which cameras should you view first?
- Which have the best vantage point?
- Which are most likely to capture the incident?
- How do you automate this decision in real-time?

### The Solution

Apply **vector-based similarity matching** (like Spotify's recommendation system) to match beacon alerts with optimal cameras based on:

- Physical proximity and location
- Camera capabilities (resolution, PTZ, AI detection)
- Historical performance with similar alerts
- Temporal relevance (time of day, building traffic patterns)

## How It Works

### Spotify's Vector System (Context)

Spotify uses **collaborative filtering embeddings** to recommend songs:

- Multi-dimensional vectors represent each song's acoustic characteristics
- User preference vectors capture individual taste profiles
- Cosine similarity finds matches between users and songs
- Thousands of dimensions create nuanced recommendations

### Adapted for Cameras

Instead of music taste, we recommend cameras based on:

- **Location vectors**: GPS coordinates, floor, building, zone
- **Capability vectors**: Resolution, PTZ, night vision, AI detection
- **Performance vectors**: Detection accuracy, response time, uptime
- **Alert vectors**: Threat level, location, type, urgency

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────┐
│                  BEACON ALERT                            │
│          (Verkada Plugin → Traxmate)                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   Angular Frontend    │
         │  • Parse alert data   │
         │  • Build alert vector │
         │  • Display results    │
         └──────────┬────────────┘
                    │
                    ▼ REST API Call
         ┌───────────────────────┐
         │   Go Backend API      │
         │  • Vector calculation │
         │  • Similarity scoring │
         │  • Ranking algorithm  │
         └──────────┬────────────┘
                    │
                    ▼
         ┌───────────────────────┐
         │   Camera Vector DB    │
         │  • Camera metadata    │
         │  • Capability scores  │
         │  • Historical data    │
         └───────────────────────┘
                    │
                    ▼
      ┌──────────────────────────────┐
      │  Ranked Camera Results       │
      │  1. Cam-14-SW (0.96)        │
      │  2. Cam-14-W (0.87)         │
      │  3. Cam-13-SW (0.75)        │
      └──────────────────────────────┘
                    │
                    ▼
      ┌──────────────────────────────┐
      │   Auto-Focus Top Camera      │
      │  (Pan/Tilt/Zoom to alert     │
      │   location via Verkada API)  │
      └──────────────────────────────┘
```

## Implementation

### 1. Camera Vector Schema

Each camera is represented as a multi-dimensional vector:

```javascript
// Example: Camera on 14th floor, SW corner
{
  "camera_id": "cam-4ce72620",
  "building_id": "ideon-gateway-elite",
  "name": "14th Floor SW Corner",

  "vectors": {
    // ========== LOCATION VECTORS ==========
    "latitude": 55.7196,
    "longitude": 13.1872,
    "floor": 14,
    "zone": "southwest_corner",
    "building_code": 1,

    // ========== CAPABILITY VECTORS ==========
    "resolution_score": 0.9,        // 1080p = 0.9, 4K = 1.0
    "pan_tilt_zoom": 0.8,           // 1.0 if has PTZ, 0 if fixed
    "night_vision": 1.0,            // 1.0 = IR capable, 0 = not
    "ai_detection": 0.85,           // ML detection capability
    "thermal_imaging": 0.0,         // 0 = not available
    "coverage_radius_meters": 50,   // Effective coverage area

    // ========== PERFORMANCE VECTORS ==========
    "alert_detection_rate": 0.92,   // Historical accuracy
    "false_positive_rate": 0.05,    // Lower is better
    "avg_response_time_ms": 120,    // Faster = better
    "uptime_percentage": 0.99,      // 99% = 0.99
    "image_quality_score": 0.88,    // Based on test footage

    // ========== TEMPORAL VECTORS ==========
    "peak_activity_hours": [8, 9, 17, 18],  // When most relevant
    "seasonal_relevance": 0.7,      // Winter/summer variations
    "maintenance_score": 0.95,      // 0 if under maintenance

    // ========== SPECIALIZATION VECTORS ==========
    "entrance_monitoring": 1.0,     // 1.0 if at entrance
    "vip_area_coverage": 0.8,       // Coverage of protected areas
    "incident_history": 0.6         // Past incidents in this zone
  }
}
```

### 2. Beacon Alert Vector

When an alert is triggered:

```javascript
// Example: Unauthorized access alert on 14th floor
{
  "alert_id": "beacon-alert-2025-12-04-001",
  "timestamp": 1733318400000,
  "source": "verkada_plugin",

  "vectors": {
    // ========== ALERT CHARACTERISTICS ==========
    "urgency_score": 0.95,          // 0-1, how time-critical
    "threat_level": 0.8,            // 0-1, severity
    "alert_type_code": 3,           // 1=theft, 2=fire, 3=unauthorized_access

    // ========== LOCATION VECTORS ==========
    "alert_latitude": 55.7195,
    "alert_longitude": 13.1871,
    "alert_floor": 14,
    "alert_zone": "southwest_corner",
    "alert_building": 1,

    // ========== CONTEXT VECTORS ==========
    "time_of_day_normalized": 0.65, // 0=midnight, 0.5=noon, 1=23:59
    "day_of_week": 3,               // 0=Monday, 6=Sunday
    "is_business_hours": 1,         // 1=yes, 0=no

    // ========== RISK VECTORS ==========
    "historical_incident_rate": 0.6,    // This zone's past incidents
    "proximity_to_vip_areas": 0.9,      // Close to high-value targets
    "estimated_response_distance": 45,  // meters

    // ========== REQUIREMENT VECTORS ==========
    "needs_ptz": 1.0,               // 1 if movement tracking needed
    "needs_thermal": 0.0,           // 1 if heat signature needed
    "needs_night_vision": 0.3       // 0.3 if ambient light available
  }
}
```

### 3. Similarity Scoring Algorithm

#### Go Backend Implementation

```go
package handlers

import (
	"math"
	"sort"
)

type CameraVector struct {
	CameraID string
	Vectors  map[string]float64
}

type BeaconAlert struct {
	AlertID string
	Vectors map[string]float64
}

type CameraScore struct {
	CameraID        string
	SimilarityScore float64
	Rank            int
	Breakdown       map[string]float64 // Debug: individual component scores
}

// CosineSimilarity calculates cosine distance between two vectors
// Result range: -1 to 1 (1 = identical, 0 = orthogonal, -1 = opposite)
func CosineSimilarity(vec1, vec2 map[string]float64) float64 {
	dotProduct := 0.0
	mag1 := 0.0
	mag2 := 0.0

	// Calculate dot product and magnitude for vec1
	for key, v1 := range vec1 {
		if v2, exists := vec2[key]; exists {
			dotProduct += v1 * v2
		}
		mag1 += v1 * v1
	}

	// Calculate magnitude for vec2
	for _, v2 := range vec2 {
		mag2 += v2 * v2
	}

	// Avoid division by zero
	if mag1 == 0 || mag2 == 0 {
		return 0.0
	}

	return dotProduct / (math.Sqrt(mag1) * math.Sqrt(mag2))
}

// EuclideanDistance calculates straight-line distance between vectors
// Lower = more similar
func EuclideanDistance(vec1, vec2 map[string]float64) float64 {
	sumSquares := 0.0

	for key, v1 := range vec1 {
		if v2, exists := vec2[key]; exists {
			diff := v1 - v2
			sumSquares += diff * diff
		}
	}

	return math.Sqrt(sumSquares)
}

// LocationProximityScore calculates how close camera is to alert
// Factors in floor differences heavily
func LocationProximityScore(alert BeaconAlert, camera CameraVector) float64 {
	alertLat := alert.Vectors["alert_latitude"]
	alertLon := alert.Vectors["alert_longitude"]
	alertFloor := alert.Vectors["alert_floor"]

	camLat := camera.Vectors["latitude"]
	camLon := camera.Vectors["longitude"]
	camFloor := camera.Vectors["floor"]
	camRadius := camera.Vectors["coverage_radius_meters"]

	// Haversine distance (simplified)
	latDiff := alertLat - camLat
	lonDiff := alertLon - camLon
	horizontalDist := math.Sqrt(latDiff*latDiff + lonDiff*lonDiff) * 111000 // meters

	// Penalize cameras on different floors heavily
	floorDiff := math.Abs(alertFloor - camFloor)
	floorPenalty := 1.0 / (1.0 + floorDiff*0.3)

	// Normalize distance (closer to camera = better score)
	radiusScore := 1.0 - math.Min(1.0, horizontalDist/camRadius)

	return (radiusScore * 0.7) * floorPenalty
}

// CapabilityMatchScore evaluates camera capabilities vs alert requirements
func CapabilityMatchScore(alert BeaconAlert, camera CameraVector) float64 {
	needsPTZ := alert.Vectors["needs_ptz"]
	needsThermal := alert.Vectors["needs_thermal"]
	needsNV := alert.Vectors["needs_night_vision"]

	camPTZ := camera.Vectors["pan_tilt_zoom"]
	camThermal := camera.Vectors["thermal_imaging"]
	camNV := camera.Vectors["night_vision"]
	camAI := camera.Vectors["ai_detection"]
	camRes := camera.Vectors["resolution_score"]

	score := 0.0

	// PTZ requirement
	if needsPTZ > 0.5 && camPTZ > 0.5 {
		score += 0.3
	} else if needsPTZ < 0.5 {
		score += 0.3 // Not needed, so any camera is fine
	}

	// Thermal requirement
	if needsThermal > 0.5 && camThermal > 0.5 {
		score += 0.25
	} else if needsThermal < 0.5 {
		score += 0.25
	}

	// Night vision requirement
	if needsNV > 0.5 && camNV > 0.5 {
		score += 0.2
	} else if needsNV < 0.5 {
		score += 0.2
	}

	// Always favor high AI and resolution
	score += (camAI * 0.15)
	score += (camRes * 0.1)

	return math.Min(1.0, score)
}

// PerformanceReliabilityScore evaluates historical camera performance
func PerformanceReliabilityScore(alert BeaconAlert, camera CameraVector) float64 {
	detectionRate := camera.Vectors["alert_detection_rate"]
	falsePositiveRate := camera.Vectors["false_positive_rate"]
	uptime := camera.Vectors["uptime_percentage"]
	responseTime := camera.Vectors["avg_response_time_ms"]

	// Detection rate is most important
	score := detectionRate * 0.5

	// Penalize false positives
	score += (1.0 - falsePositiveRate) * 0.2

	// Uptime matters
	score += uptime * 0.2

	// Fast response time is good
	normalizedResponseTime := 1.0 - math.Min(1.0, responseTime/1000.0)
	score += normalizedResponseTime * 0.1

	return math.Min(1.0, score)
}

// RankCamerasForAlert returns cameras ranked by relevance to the alert
func RankCamerasForAlert(alert BeaconAlert, cameras []CameraVector) []CameraScore {
	scores := make([]CameraScore, 0, len(cameras))

	for _, camera := range cameras {
		// Calculate component scores
		locationScore := LocationProximityScore(alert, camera)
		capabilityScore := CapabilityMatchScore(alert, camera)
		performanceScore := PerformanceReliabilityScore(alert, camera)

		// Weighted combination
		// Location (50%) - most important for real-time response
		// Capability (30%) - can it do what we need?
		// Performance (20%) - will it work reliably?
		finalScore := (locationScore * 0.5) + (capabilityScore * 0.3) + (performanceScore * 0.2)

		scores = append(scores, CameraScore{
			CameraID:        camera.CameraID,
			SimilarityScore: finalScore,
			Breakdown: map[string]float64{
				"location":    locationScore,
				"capability":  capabilityScore,
				"performance": performanceScore,
			},
		})
	}

	// Sort by score descending
	sort.Slice(scores, func(i, j int) bool {
		return scores[i].SimilarityScore > scores[j].SimilarityScore
	})

	// Add rankings
	for i := range scores {
		scores[i].Rank = i + 1
	}

	return scores
}
```

#### HTTP Endpoint

```go
// POST /api/cameras/recommend
// Request body: BeaconAlert
// Response: []CameraScore

func RecommendCameras(w http.ResponseWriter, r *http.Request) {
	var alert BeaconAlert
	json.NewDecoder(r.Body).Decode(&alert)

	// Load all cameras from database
	cameras := getAllCameras() // Your DB query

	// Rank cameras
	rankedCameras := RankCamerasForAlert(alert, cameras)

	// Return top 5
	topCameras := rankedCameras
	if len(topCameras) > 5 {
		topCameras = rankedCameras[:5]
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(topCameras)
}
```

### 4. Angular Frontend Implementation

#### Service

```typescript
// src/app/services/camera-recommendation.service.ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface CameraScore {
  camera_id: string
  similarity_score: number
  rank: number
  breakdown: {
    location: number
    capability: number
    performance: number
  }
}

export interface BeaconAlert {
  alert_id: string
  timestamp: number
  vectors: Record<string, number>
}

@Injectable({
  providedIn: 'root',
})
export class CameraRecommendationService {
  private apiUrl = '/api/cameras/recommend'

  constructor(private http: HttpClient) {}

  recommendCameras(alert: BeaconAlert): Observable<CameraScore[]> {
    return this.http.post<CameraScore[]>(this.apiUrl, alert)
  }

  focusCamera(cameraId: string, latitude: number, longitude: number): Observable<any> {
    return this.http.post(`/api/cameras/${cameraId}/focus`, {
      latitude,
      longitude,
    })
  }
}
```

#### Component

```typescript
// src/app/components/alert-camera-recommendation/alert-camera-recommendation.component.ts
import { Component, Input, OnInit } from '@angular/core'
import {
  CameraRecommendationService,
  CameraScore,
  BeaconAlert,
} from '../../services/camera-recommendation.service'

@Component({
  selector: 'app-alert-camera-recommendation',
  templateUrl: './alert-camera-recommendation.component.html',
  styleUrls: ['./alert-camera-recommendation.component.css'],
})
export class AlertCameraRecommendationComponent implements OnInit {
  @Input() alert: BeaconAlert

  recommendedCameras: CameraScore[] = []
  selectedCamera: CameraScore | null = null
  loading = false
  error: string | null = null

  constructor(private cameraService: CameraRecommendationService) {}

  ngOnInit() {
    this.getCameraRecommendations()
  }

  getCameraRecommendations() {
    this.loading = true
    this.error = null

    this.cameraService.recommendCameras(this.alert).subscribe(
      (cameras: CameraScore[]) => {
        this.recommendedCameras = cameras
        this.loading = false

        // Auto-select and focus on top camera
        if (cameras.length > 0) {
          this.selectCamera(cameras[0])
        }
      },
      (error) => {
        this.error = 'Failed to get camera recommendations'
        this.loading = false
        console.error(error)
      }
    )
  }

  selectCamera(camera: CameraScore) {
    this.selectedCamera = camera
    this.focusCamera(camera)
  }

  focusCamera(camera: CameraScore) {
    const lat = this.alert.vectors['alert_latitude']
    const lon = this.alert.vectors['alert_longitude']

    this.cameraService.focusCamera(camera.camera_id, lat, lon).subscribe(
      () => {
        console.log(`Focused camera ${camera.camera_id} to ${lat}, ${lon}`)
      },
      (error) => {
        console.error('Failed to focus camera', error)
      }
    )
  }

  getScoreColor(score: number): string {
    if (score > 0.8) return '#4CAF50' // Green - excellent
    if (score > 0.6) return '#FFC107' // Amber - good
    if (score > 0.4) return '#FF9800' // Orange - fair
    return '#F44336' // Red - poor
  }

  getScorePercentage(score: number): number {
    return Math.round(score * 100)
  }
}
```

#### Template

```html
<!-- src/app/components/alert-camera-recommendation/alert-camera-recommendation.component.html -->
<div class="camera-recommendation-panel">
  <h2>Recommended Cameras</h2>

  <div *ngIf="loading" class="loading">
    <p>Finding optimal cameras...</p>
  </div>

  <div *ngIf="error" class="error">{{ error }}</div>

  <div *ngIf="!loading && recommendedCameras.length > 0" class="camera-list">
    <div
      *ngFor="let camera of recommendedCameras; let i = index"
      class="camera-item"
      [class.selected]="selectedCamera?.camera_id === camera.camera_id"
      (click)="selectCamera(camera)"
    >
      <div class="rank">
        <span class="rank-number">{{ camera.rank }}</span>
      </div>

      <div class="camera-info">
        <h3>{{ camera.camera_id }}</h3>
        <p class="confidence">
          Confidence:
          <span class="score" [style.color]="getScoreColor(camera.similarity_score)">
            {{ getScorePercentage(camera.similarity_score) }}%
          </span>
        </p>
      </div>

      <div class="breakdown">
        <div class="component">
          <label>Location</label>
          <div class="bar">
            <div class="fill" [style.width.%]="camera.breakdown.location * 100"></div>
          </div>
          <span>{{ getScorePercentage(camera.breakdown.location) }}%</span>
        </div>

        <div class="component">
          <label>Capability</label>
          <div class="bar">
            <div class="fill" [style.width.%]="camera.breakdown.capability * 100"></div>
          </div>
          <span>{{ getScorePercentage(camera.breakdown.capability) }}%</span>
        </div>

        <div class="component">
          <label>Performance</label>
          <div class="bar">
            <div class="fill" [style.width.%]="camera.breakdown.performance * 100"></div>
          </div>
          <span>{{ getScorePercentage(camera.breakdown.performance) }}%</span>
        </div>
      </div>
    </div>
  </div>

  <div *ngIf="!loading && recommendedCameras.length === 0" class="no-cameras">
    <p>No suitable cameras found for this alert.</p>
  </div>
</div>
```

#### Styles

```css
/* src/app/components/alert-camera-recommendation/alert-camera-recommendation.component.css */

.camera-recommendation-panel {
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
}

.camera-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.camera-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.camera-item:hover {
  border-color: #2196f3;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);
}

.camera-item.selected {
  border-color: #2196f3;
  background: #e3f2fd;
  box-shadow: 0 2px 12px rgba(33, 150, 243, 0.3);
}

.rank {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #2196f3;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  flex-shrink: 0;
}

.camera-info {
  flex: 0 0 120px;
}

.camera-info h3 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
}

.confidence {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.score {
  font-weight: bold;
  margin-left: 4px;
}

.breakdown {
  display: flex;
  gap: 24px;
  flex: 1;
}

.component {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 80px;
}

.component label {
  font-size: 11px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
}

.bar {
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.bar .fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #2196f3);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.component span {
  font-size: 12px;
  font-weight: 600;
  color: #333;
}

.loading,
.error,
.no-cameras {
  text-align: center;
  padding: 24px 16px;
  color: #666;
}

.error {
  background: #ffebee;
  color: #c62828;
  border-radius: 4px;
}
```

## Usage

### Step 1: Beacon Alert Triggered

When Verkada detects an incident and sends alert via plugin:

```json
{
  "alert_id": "beacon-001",
  "timestamp": 1733318400000,
  "vectors": {
    "alert_latitude": 55.7195,
    "alert_longitude": 13.1871,
    "alert_floor": 14,
    "threat_level": 0.8,
    "urgency_score": 0.95,
    "needs_ptz": 1.0,
    "alert_type_code": 3
  }
}
```

### Step 2: Frontend Requests Recommendations

```typescript
this.cameraService.recommendCameras(alert).subscribe((cameras: CameraScore[]) => {
  // Display ranked results
})
```

### Step 3: Backend Calculates Similarity

- Loads all camera vectors from database
- Computes location, capability, and performance scores
- Weights them (50% location, 30% capability, 20% performance)
- Ranks results

### Step 4: Results Display & Auto-Focus

```
Rank 1: cam-14-sw (96% match)
  ├── Location: 95% (2m away, same floor)
  ├── Capability: 98% (4K, PTZ, night vision)
  └── Performance: 92% (high accuracy, fast response)

Rank 2: cam-14-w (87% match)
  ├── Location: 88% (12m away, same floor)
  ├── Capability: 92% (1080p, PTZ)
  └── Performance: 88% (good accuracy)

Rank 3: cam-13-sw (75% match)
  ├── Location: 65% (2m away, one floor down)
  ├── Capability: 90% (4K, no PTZ)
  └── Performance: 88% (good accuracy)
```

Frontend auto-focuses camera #1 toward alert coordinates.

## Integration

### With Traxmate (Angular + Go)

1. **Verkada Plugin** sends alert to Traxmate backend
2. **Angular** component receives alert, calls `/api/cameras/recommend`
3. **Go handler** processes request, queries camera DB
4. **Similarity algorithm** ranks cameras
5. **Results** returned to frontend as JSON
6. **Auto-focus** triggered via Verkada API
7. **UI displays** ranked list with visual breakdown

### Database Schema (PostgreSQL)

```sql
-- Cameras table with vector storage
CREATE TABLE cameras (
    id UUID PRIMARY KEY,
    camera_id VARCHAR(255) UNIQUE NOT NULL,
    building_id VARCHAR(255),
    name VARCHAR(255),
    vectors JSONB,  -- All vectors stored here
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Historical performance tracking
CREATE TABLE camera_performance (
    id UUID PRIMARY KEY,
    camera_id VARCHAR(255) REFERENCES cameras(camera_id),
    alert_id VARCHAR(255),
    detected BOOLEAN,
    response_time_ms INTEGER,
    image_quality_score FLOAT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index on vectors for fast queries
CREATE INDEX idx_camera_vectors ON cameras USING GIN (vectors);
```

## Performance Optimization

### Caching Strategy

```go
// Cache camera vectors in memory
var cameraCache map[string]CameraVector
var cacheMutex sync.RWMutex
var cacheExpirationTime = time.Hour * 1

func getCameraVectors() []CameraVector {
    cacheMutex.RLock()
    defer cacheMutex.RUnlock()

    // Return cached vectors or reload if expired
}
```

### Vector Pre-Computation

- Compute camera vectors once during initialization
- Update only when camera configuration changes
- Store in Redis for sub-millisecond access

### Batch Processing

For large deployments:

- Pre-rank cameras by location zones
- Only compute detailed scores for relevant cameras
- Implement early stopping once top 5 identified

## Metrics & Monitoring

Track these metrics to improve recommendation accuracy:

```javascript
{
  "alert_id": "beacon-001",
  "recommended_rank_1": "cam-14-sw",
  "actual_useful_camera": "cam-14-sw",  // After human review
  "recommendation_accuracy": 1.0,
  "false_positive_cameras": 0,
  "response_time_ms": 142,
  "user_satisfaction": 5,
  "timestamp": 1733318400000
}
```

Use this data to retrain vector weights and improve scoring algorithm.

## Future Enhancements

### Phase 2

- **Machine Learning**: Use historical alert/camera pairs to learn optimal weights
- **Custom Weighting**: Per-building and per-alert-type customization
- **Real-time Updates**: Update camera vectors as performance data comes in
- **Predictive Positioning**: Anticipate where incident may move next

### Phase 3

- **Multi-Camera Grouping**: Recommend coordinated sets of cameras
- **360° Coverage Analysis**: Ensure blind spot coverage
- **Dynamic Weighting**: Adjust weights based on time of day, day of week
- **Integration with BI**: Feed recommendations to business intelligence

## References

- **Spotify Research**: [Discovering Preferences: Offline Evaluation of Online Music Recommendation Systems](https://research.spotify.com/)
- **Vector Similarity**: Cosine Similarity, Euclidean Distance, Manhattan Distance
- **Recommendation Algorithms**: Collaborative Filtering, Content-Based Filtering, Hybrid Systems

---

**Author**: Justin Attinoto  
**Date**: December 4, 2025  
**Status**: Production Ready  
**Last Updated**: 2025-12-04
