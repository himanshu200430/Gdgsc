const axios = require('axios');

const API_URL = 'http://localhost:5000';

async function testSignup() {
    console.log('Testing signup endpoint...\n');
    
    // Test 1: Check if server is running
    try {
        const response = await axios.get(`${API_URL}/api/auth/logout`);
        console.log('✅ Server is running');
    } catch (error) {
        console.error('❌ Server is not running or not accessible');
        console.error('Error:', error.message);
        console.error('\n💡 Make sure to start the server first:');
        console.error('   cd backend && npm start');
        return;
    }
    
    // Test 2: Try to signup with test data
    const testUser = {
        username: `testuser_${Date.now()}`,
        email: `test_${Date.now()}@example.com`,
        password: 'password123'
    };
    
    console.log('\nAttempting signup with:', {
        username: testUser.username,
        email: testUser.email,
        password: '***'
    });
    
    try {
        const response = await axios.post(`${API_URL}/api/auth/signup`, testUser);
        console.log('\n✅ Signup successful!');
        console.log('Response:', {
            message: response.data.message,
            user: response.data.user,
            hasToken: !!response.data.token
        });
    } catch (error) {
        console.error('\n❌ Signup failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Error message:', error.response.data.message);
            console.error('Full error:', error.response.data);
        } else if (error.request) {
            console.error('No response received from server');
            console.error('Request error:', error.message);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testSignup();