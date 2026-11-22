/**
 * SafePath AI — Simulated Disaster Intelligence Dataset
 * 
 * IMPORTANT: These records represent clearly labelled synthetic/simulated 
 * incident data for development, testing, and UI demonstration purposes.
 * Real incidents are not represented.
 */

export const SIMULATION_METADATA = {
  isSimulated: true,
  dataVersion: '1.0.0-synthetic',
  generatedFor: 'SafePath AI Prototype Development',
  lastRefreshed: '2026-11-22T17:20:00Z',
}

// 1. Regional Disaster Risk Summary
export const REGIONAL_RISK_SUMMARY = {
  activeIncidents: 14,
  highRiskZones: 4,
  verifiedReports: 11,
  openShelters: 8,
  totalShelterCapacity: 2450,
  currentShelterOccupancy: 890,
  blockedRoadSegments: 6,
}

// 2. Simulated Incidents (Used across Command Center, Map, and Incident Feeds)
export const SIMULATED_INCIDENTS = [
  {
    id: 'INC-2026-081',
    type: 'Flood',
    title: 'Yamuna Floodplain Water Inundation',
    locationName: 'East Delhi, Ring Road Sector',
    coordinates: [28.6289, 77.2482],
    severity: 'High', // Low, Moderate, High, Critical
    status: 'Active', // Active, Investigating, Resolved
    reportedAt: '12 mins ago',
    timestamp: '2026-11-22T17:08:00Z',
    affectedEstimate: 340,
    verification: {
      status: 'Verified', // Unverified, Pending, Verified, Rejected
      confidenceScore: 0.94,
      truthEngineSignals: {
        satelliteCorroboration: true,
        geoProximityReports: 6,
        imageDamageConfidence: 0.92,
        weatherAnomalyMatch: true,
      },
    },
    description: 'Rapid water accumulation overflowing embankments. Service lanes submerged under 2.5 ft water.',
    visualEvidenceUrl: null,
  },
  {
    id: 'INC-2026-082',
    type: 'Urban Fire',
    title: 'Commercial Sector Substation Blaze',
    locationName: 'MIDC Industrial Area, Mumbai',
    coordinates: [19.1176, 72.8797],
    severity: 'Critical',
    status: 'Active',
    reportedAt: '24 mins ago',
    timestamp: '2026-11-22T16:56:00Z',
    affectedEstimate: 120,
    verification: {
      status: 'Verified',
      confidenceScore: 0.97,
      truthEngineSignals: {
        satelliteCorroboration: true, // FIRMS Thermal Hotspot hit
        geoProximityReports: 12,
        imageDamageConfidence: 0.98,
        weatherAnomalyMatch: false,
      },
    },
    description: 'High thermal radiation detected. Plumes of black smoke visible within a 3km radius. Evacuation perimeter established.',
    visualEvidenceUrl: null,
  },
  {
    id: 'INC-2026-083',
    type: 'Landslide',
    title: 'Debris Flow & Highway Blockage',
    locationName: 'NH-58 Mountain Pass, Rishikesh-Devprayag',
    coordinates: [30.1258, 78.3615],
    severity: 'Critical',
    status: 'Active',
    reportedAt: '48 mins ago',
    timestamp: '2026-11-22T16:32:00Z',
    affectedEstimate: 85,
    verification: {
      status: 'Verified',
      confidenceScore: 0.88,
      truthEngineSignals: {
        satelliteCorroboration: false,
        geoProximityReports: 4,
        imageDamageConfidence: 0.91,
        weatherAnomalyMatch: true, // IMERG Heavy Rain trigger
      },
    },
    description: 'Over 200 tons of rock and soil obstruction. Complete road severance. 3 stranded transport vehicles reported.',
    visualEvidenceUrl: null,
  },
  {
    id: 'INC-2026-084',
    type: 'Waterlogging',
    title: 'Subway Arterial Underpass Flooding',
    locationName: 'Velachery Main Road, Chennai',
    coordinates: [12.9815, 80.218],
    severity: 'Moderate',
    status: 'Investigating',
    reportedAt: '1 hr ago',
    timestamp: '2026-11-22T16:20:00Z',
    affectedEstimate: 50,
    verification: {
      status: 'Pending',
      confidenceScore: 0.65,
      truthEngineSignals: {
        satelliteCorroboration: false,
        geoProximityReports: 2,
        imageDamageConfidence: 0.68,
        weatherAnomalyMatch: true,
      },
    },
    description: 'Drainage overflow impeding traffic. Light vehicles unable to pass.',
    visualEvidenceUrl: null,
  },
  {
    id: 'INC-2026-085',
    type: 'Wildfire',
    title: 'Ridge Forest Fire Front',
    locationName: 'Satpura Forest Range, MP',
    coordinates: [22.4582, 78.4312],
    severity: 'Moderate',
    status: 'Active',
    reportedAt: '2 hrs ago',
    timestamp: '2026-11-22T15:15:00Z',
    affectedEstimate: 15,
    verification: {
      status: 'Verified',
      confidenceScore: 0.91,
      truthEngineSignals: {
        satelliteCorroboration: true, // FIRMS VIIRS detection
        geoProximityReports: 1,
        imageDamageConfidence: null,
        weatherAnomalyMatch: false,
      },
    },
    description: 'Dry brush fire advancing southeast. Forest rangers notified.',
    visualEvidenceUrl: null,
  },
  {
    id: 'INC-2026-086',
    type: 'Building Collapse Risk',
    title: 'Structural Wall Fracture Following Tremors',
    locationName: 'Old Market Zone, Guwahati',
    coordinates: [26.1856, 91.7495],
    severity: 'Low',
    status: 'Investigating',
    reportedAt: '3 hrs ago',
    timestamp: '2026-11-22T14:10:00Z',
    affectedEstimate: 28,
    verification: {
      status: 'Unverified',
      confidenceScore: 0.42,
      truthEngineSignals: {
        satelliteCorroboration: false,
        geoProximityReports: 1,
        imageDamageConfidence: 0.45,
        weatherAnomalyMatch: false,
      },
    },
    description: 'Single citizen report claiming exterior fissure on old 3-storey masonry building.',
    visualEvidenceUrl: null,
  },
]

// 3. Simulated Shelters
export const SIMULATED_SHELTERS = [
  {
    id: 'SHL-01',
    name: 'Govt Model Secondary School Relief Center',
    city: 'New Delhi',
    coordinates: [28.6385, 77.2341],
    totalCapacity: 500,
    currentOccupants: 210,
    operationalStatus: 'Open', // Open, Full, Inactive
    amenities: ['Medical Station', 'Clean Water', 'Backup Power', 'Food Supplies'],
    contact: '+91 11 2345 6789',
    safeZoneBufferKm: 4.2,
  },
  {
    id: 'SHL-02',
    name: 'East District Indoor Sports Complex',
    city: 'New Delhi',
    coordinates: [28.6189, 77.2891],
    totalCapacity: 800,
    currentOccupants: 480,
    operationalStatus: 'Open',
    amenities: ['Helipad Access', 'Medical Staff', 'Bedding', 'Power'],
    contact: '+91 11 2345 6790',
    safeZoneBufferKm: 6.0,
  },
  {
    id: 'SHL-03',
    name: 'Bandra Community Emergency Hall',
    city: 'Mumbai',
    coordinates: [19.0596, 72.8295],
    totalCapacity: 350,
    currentOccupants: 120,
    operationalStatus: 'Open',
    amenities: ['Clean Water', 'First Aid', 'Sanitation'],
    contact: '+91 22 2642 1100',
    safeZoneBufferKm: 3.5,
  },
  {
    id: 'SHL-04',
    name: 'Chennai Port Trust Disaster Transit Camp',
    city: 'Chennai',
    coordinates: [13.0982, 80.2921],
    totalCapacity: 600,
    currentOccupants: 80,
    operationalStatus: 'Open',
    amenities: ['Ambulance Station', 'Food Kitchen', 'Clean Water'],
    contact: '+91 44 2536 2200',
    safeZoneBufferKm: 5.1,
  },
]

// 4. Simulated Road Hazards / Blocked Segments
export const SIMULATED_ROAD_HAZARDS = [
  {
    id: 'RD-HAZ-01',
    roadName: 'Yamuna Marg Lower Bypass',
    coordinates: [28.6315, 77.2512],
    hazardType: 'Deep Flooding (Water > 80cm)',
    impassable: true,
    speedReductionPercent: 100,
    reportedAt: '25m ago',
  },
  {
    id: 'RD-HAZ-02',
    roadName: 'NH-58 Devprayag Corridor km 42',
    coordinates: [30.1311, 78.3689],
    hazardType: 'Mass Rockslide / Road Cut',
    impassable: true,
    speedReductionPercent: 100,
    reportedAt: '50m ago',
  },
  {
    id: 'RD-HAZ-03',
    roadName: 'Andheri-Kurla Link Road Junction',
    coordinates: [19.1082, 72.8821],
    hazardType: 'Heavy Smoke & Emergency Perimeter',
    impassable: false,
    speedReductionPercent: 60,
    reportedAt: '15m ago',
  },
]
