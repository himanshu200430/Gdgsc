#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const environment = args[0];

if (!environment || !['development', 'production'].includes(environment)) {
    console.log('Usage: node switch-env.js [development|production]');
    console.log('Example: node switch-env.js production');
    process.exit(1);
}

// Update backend .env
const backendEnvPath = path.join(__dirname, 'backend', '.env');
let backendEnv = fs.readFileSync(backendEnvPath, 'utf8');
backendEnv = backendEnv.replace(/NODE_ENV=.*/g, `NODE_ENV=${environment}`);
fs.writeFileSync(backendEnvPath, backendEnv);

// Update frontend .env
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
let frontendEnv = fs.readFileSync(frontendEnvPath, 'utf8');
frontendEnv = frontendEnv.replace(/REACT_APP_ENV=.*/g, `REACT_APP_ENV=${environment}`);
fs.writeFileSync(frontendEnvPath, frontendEnv);

console.log(`✅ Switched to ${environment} environment`);
console.log(`Backend: NODE_ENV=${environment}`);
console.log(`Frontend: REACT_APP_ENV=${environment}`);

if (environment === 'production') {
    console.log('\n📝 Don\'t forget to:');
    console.log('1. Update PROD_FRONTEND_URL in backend/.env with your actual frontend domain');
    console.log('2. Set up Discord OAuth credentials if needed');
    console.log('3. Update Google OAuth callback URLs in Google Console');
}