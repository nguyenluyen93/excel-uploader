// ************************************
// Theme

export const colors = {
  gray: {
    100: '#F7FAFC',
    200: '#EDF2F7',
    300: '#E2E8F0',
    400: '#CBD5E0',
    500: '#A0AEC0',
    600: '#718096',
    700: '#4A5568',
    800: '#2D3748',
    900: '#1A202C',
  },
  indigo: {
    100: '#ebf4ff',
    200: '#c3dafe',
    300: '#a3bffa',
    400: '#7f9cf5',
    500: '#667eea',
    600: '#5a67d8',
    700: '#4c51bf',
    800: '#434190',
    900: '#3c366b',
  },
  pink: {
    100: '#fff5f7',
    200: '#fed7e2',
    300: '#fbb6ce',
    400: '#f687b3',
    500: '#ed64a6',
    600: '#d53f8c',
    700: '#b83280',
    800: '#97266d',
    900: '#702459',
  },
  teal: {
    100: '#e6fffa',
    200: '#b2f5ea',
    300: '#81e6d9',
    400: '#4fd1c5',
    500: '#38b2ac',
    600: '#319795',
    700: '#2c7a7b',
    800: '#285e61',
    900: '#234e52',
  },
  orange: {
    100: '#FFFAF0',
    200: '#FEEBC8',
    300: '#FBD38D',
    400: '#F6AD55',
    500: '#ED8936',
    600: '#DD6B20',
    700: '#C05621',
    800: '#9C4221',
    900: '#7B341E',
  },
}

// ************************************
// Uploader Context

export const initialSheet = {
  kind: null,
  data: [],
  valid: true,
  errors: {},
  reviewErrors: {},
}

export const sheetKinds = {
  containers: 'containers',
}

export const initialDataGrid = {
  api: null,
  columnApi: null,
  pinned: false,
  selectedRowId: null,
}

export const initialMasterData = {
  fetching: false,
  fetched: false,
  error: null,
  data: {
    contIsoMaps: [],
    sites: [],
    vesselInfos: [],
    existsConts: [],
  },
}

export const initialUploader = {
  loading: false,
  error: null,
}
