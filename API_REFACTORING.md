# API Configuration Refactoring

This document outlines the changes made to centralize API URL management in the TexPortApp React Native application.

## Changes Made

### 1. Created Centralized API Configuration
- **File**: `config/apiConfig.js`
- **Purpose**: Central location to manage all API endpoints
- **Content**: Exports base API URL and common endpoints

### 2. Updated Authentication Screens
The following files were updated to use the centralized API configuration:

#### LoginScreen.js
- **Location**: `src/screens/auth/LoginScreen.js`
- **Changes**: 
  - Added import: `import { API } from '../../config/apiConfig';`
  - Updated fetch call from `'http://10.131.152.6:8000/api/login'` to `` `${API}login` ``

#### RegisterScreen.js
- **Location**: `src/screens/auth/RegisterScreen.js`
- **Changes**:
  - Added import: `import { API } from '../../config/apiConfig';`
  - Updated fetch call from `'http://10.131.152.6:8000/api/signup'` to `` `${API}signup` ``

## Benefits

1. **Single Source of Truth**: All API URLs are managed from one location
2. **Easy Environment Management**: Change the base URL in one place to switch between development, staging, and production
3. **Maintainability**: Adding new endpoints or updating existing ones is much easier
4. **Consistency**: Ensures all API calls follow the same URL structure

## Usage

To add new API endpoints, simply update the `config/apiConfig.js` file:

```javascript
export const API = "http://10.131.152.6:8000/api/";

// Use in components like this:
import { API } from '../config/apiConfig';

const response = await fetch(`${API}newEndpoint`, {
  // request options
});
```

## Files Affected

1. `config/apiConfig.js` (new file)
2. `src/screens/auth/LoginScreen.js`
3. `src/screens/auth/RegisterScreen.js`

All hardcoded API URLs have been successfully replaced with the centralized configuration.
