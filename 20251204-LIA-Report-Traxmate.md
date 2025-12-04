# 20251204 LIA Report - Traxmate ThingsBoard Integration

## Project Overview

This report documents the successful configuration and development of a ThingsBoard Community Edition dashboard for IoT telemetry monitoring and device attribute management, specifically for a camera device deployed at the Ideon Gateway Elite Hotel in Lund, Sweden.

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

Successfully configured the following attributes for comprehensive device metadata:

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

**Data Keys Structure** - Implemented multi-type data keys:

```json
{
  "name": "temperature",
  "type": "timeseries",
  "label": "Temperature"
}
```

**Dynamic Color Functions** - Created color transformation logic:

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

### 5. Data Integration Methods

#### REST API Integration

- Successfully tested telemetry endpoints with curl commands
- Demonstrated temperature data transmission to ThingsBoard backend
- API endpoint: `https://online.v3.staging.traxmate.io/api/v1/{deviceToken}/telemetry`
- Sample payload: `{"temperature": 50}`

#### Attribute Management

- **UI Method**: Step-by-step attribute addition via ThingsBoard dashboard
- **REST API Method**: Bulk attribute creation with proper type specification
- **Rule Chain Method**: Script transformation nodes for attribute enrichment

### 6. Troubleshooting & Solutions

#### Widget Configuration Issues

- **Issue**: Widget errors during initial setup
- **Resolution**: Corrected dataKeys array structure and type specifications
- **Outcome**: Widgets rendering correctly with proper data binding

#### Attribute Display

- **Challenge**: Displaying custom attributes (hardwareId, timestamp) in tables
- **Solution**: Modified entities_table.json to include attribute-type data keys
- **Result**: All desired attributes now visible in dashboard tables

## Technical Stack

- **Platform**: ThingsBoard Community Edition
- **Device**: IoT Camera with temperature sensor
- **Data Format**: JSON telemetry and attributes
- **Widgets**: Value Card, Entities Table
- **Integration**: REST API, MQTT-compatible protocols
- **Configuration**: JSON-based widget and dashboard setup

## File Artifacts

### Widget Configuration Files

1. **value_card.json** - Temperature display widget with dynamic styling
2. **entities_table.json** - Device overview table with attribute columns

### Data Files

- Temperature telemetry (real-time stream)
- Device attributes (location, hardware, status metadata)

## API Integration Examples

### Telemetry Transmission

```bash
curl -X POST https://online.v3.staging.traxmate.io/api/v1/{deviceToken}/telemetry \
  -H "Content-Type: application/json" \
  -d '{"temperature": 50}'
```

### Attribute Management (Bulk Add)

```bash
curl -X POST https://online.v3.staging.traxmate.io/api/v1/{deviceToken}/attributes \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 55.7196,
    "longitude": 13.1872,
    "building": "Ideon Gateway Elite Hotel",
    "city": "Lund",
    "country": "Sweden",
    "floor": 14,
    "location": "Southwest corner"
  }'
```

## Dashboard Features

### Real-Time Monitoring

- Live temperature updates with 1-second refresh interval
- Graphical representation with color-coded thresholds
- Last update timestamp for data freshness indication

### Device Inventory

- Comprehensive device table with key metadata
- Sortable columns (name, hardwareId, timestamp)
- Filterable by device attributes
- Location information display

### Extensibility

- Rule chains configured for attribute enrichment
- Support for additional data keys and widget types
- API-ready for mobile/external system integration

## Future Enhancement Opportunities

1. **Advanced Visualization**: Add map widgets for GPS coordinate display
2. **Alarm Management**: Configure temperature threshold alarms
3. **Analytics**: Implement historical temperature trending and analytics
4. **Device Provisioning**: Bulk device creation and attribute management
5. **Mobile Integration**: Dashboard accessibility on mobile devices
6. **Custom Rules**: Advanced rule chains for data processing and automation

## Conclusion

Successfully configured a fully functional ThingsBoard IoT monitoring dashboard with:

- ✅ Real-time temperature telemetry from deployed camera device
- ✅ Custom attribute management with location metadata
- ✅ Multiple widget types displaying complementary data
- ✅ REST API integration for data transmission
- ✅ JSON-based widget configuration with dynamic styling
- ✅ Comprehensive device metadata organization

The system is production-ready for real-time IoT device monitoring and can be extended with additional sensors, rules, and analytics capabilities.

---

**Report Date**: December 4, 2025  
**Platform**: ThingsBoard Community Edition  
**Device Location**: Ideon Gateway Elite Hotel, Lund, Sweden (14th Floor, Southwest Corner)  
**Project Status**: Active & Operational
