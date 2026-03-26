// src/modules/rateLimit.js

// Rate Limiting and DDoS Protection Tests

// Request Throttling
let requestCount = 0;
const requestLimit = 100; // maximum requests allowed
const timeWindow = 60000; // 1 minute time window
let currentTime = Date.now();

function throttleRequests() {
    const now = Date.now();
    if (now - currentTime > timeWindow) {
        requestCount = 0; // reset count after time window
        currentTime = now;
    }
    requestCount++;
    if (requestCount > requestLimit) { 
        console.log('Too many requests. Please try again later.');
        return false;
    }
    return true;
}

// IP-Based Rate Limiting
let ipRequestCounts = {};
const ipRequestLimit = 5; // maximum requests per IP

function limitRequestsByIP(ip) {
    if (!ipRequestCounts[ip]) {
        ipRequestCounts[ip] = { count: 0, lastRequestTime: Date.now() };
    }
    const now = Date.now();
    if (now - ipRequestCounts[ip].lastRequestTime > timeWindow) {
        ipRequestCounts[ip].count = 0; // reset count after time window
    }
    ipRequestCounts[ip].count++;
    ipRequestCounts[ip].lastRequestTime = now;
    if (ipRequestCounts[ip].count > ipRequestLimit) {
        console.log(`IP ${ip} is rate limited.`);
        return false;
    }
    return true;
}

// Adaptive Rate Limiting
let adaptiveRequestLimit = 10; // initial request limit
setInterval(() => {
    // Logic to adjust limit based on network load
    if (requestCount > requestLimit) {
        adaptiveRequestLimit = Math.max(1, adaptiveRequestLimit - 1);
    } else {
        adaptiveRequestLimit += 1;
    }
}, 60000); // adjust limit every 1 minute

function adaptiveLimitRequests(ip) {
    const limit = adaptiveRequestLimit;
    if (!limitRequestsByIP(ip)) {
        return false; // denied
    }
    return true; // allowed
}

module.exports = { throttleRequests, limitRequestsByIP, adaptiveLimitRequests };