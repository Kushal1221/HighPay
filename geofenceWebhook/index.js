require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoUri = process.env.MONGODB_URI;
const hereApiKey = process.env.DISTANCE_API_KEY;

// Connect to MongoDB
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Helper function to convert a Date object to IST and split date/time
function convertToIST(date) {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const istDate = new Date(date.getTime() + istOffset);

    // Extract individual date components
    const day = String(istDate.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = String(istDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = istDate.getFullYear();

    // Format the date as dd-mm-yyyy
    const formattedDate = `${day}-${month}-${year}`;

    const timePart = istDate.toISOString().split('T')[1].split('.')[0]; // Extract time (HH:mm:ss)

    return { date: formattedDate, time: timePart };
}


// Helper function to calculate distance using HERE API
async function calculateDistance(entryCoordinates, exitCoordinates) {
    const origin = `${entryCoordinates.latitude},${entryCoordinates.longitude}`;
    const destination = `${exitCoordinates.latitude},${exitCoordinates.longitude}`;

    try {
        const response = await axios.get('https://router.hereapi.com/v8/routes', {
            params: {
                apiKey: hereApiKey,
                origin,
                destination,
                return: 'summary',
                routingMode: 'fast',
                transportMode: 'car' 
            }
        });

        const distance = response.data.routes[0].sections[0].summary.length; // Distance in meters
        return distance;
    } catch (error) {
        console.error('Error fetching distance from HERE API:', error);
        return null; // Return null if error occurs
    }
}

// Define schema for geofence log
const geofenceLogSchema = new mongoose.Schema({
    deviceId: Number,
    geofenceId: Number,
    entry: {
        latitude: Number,
        longitude: Number,
        timestamp: Date,
        date: String,
        time: String
    },
    exit: {
        latitude: Number,
        longitude: Number,
        timestamp: Date,
        date: String,
        time: String
    },
    distance: Number,
    price: Number 
});

// Create a model from the schema
const GeofenceLog = mongoose.model('GeofenceLog', geofenceLogSchema);

const app = express();
app.use(bodyParser.json());

// Temporary storage for latest entry events
const latestEntries = {};

// Endpoint to receive geofence notifications from Traccar
app.post('/geofence', async (req, res) => {
    try {
        const { event, position, device, geofence } = req.body;

        const { type } = event;
        const { id: deviceId } = device;
        const { id: geofenceId } = geofence;

        const latitude = position.latitude;
        const longitude = position.longitude;
        const timestamp = new Date();

        // Convert timestamp to IST and separate date/time
        const { date, time } = convertToIST(timestamp);

        if (type === 'geofenceEnter') {
            // Store entry event data temporarily for this device
            latestEntries[deviceId] = {
                latitude,
                longitude,
                timestamp,
                date,
                time
            };
            console.log(`Entry recorded for device ${deviceId}`);
            res.status(200).json({ message: 'Geofence entry recorded' });

        } else if (type === 'geofenceExit') {
            // Check if an entry exists for this device
            const entryData = latestEntries[deviceId];

            if (!entryData) {
                // If no entry data, exit event cannot be paired, return an error
                return res.status(400).json({ message: 'No entry event found for this device' });
            }

            // Calculate distance between entry and exit locations using HERE API
            let distance = await calculateDistance(entryData, { latitude, longitude });
            distance = distance/1000;

            if (distance === null) {
                return res.status(500).json({ message: 'Failed to calculate distance' });
            }

            const price = parseFloat((distance * 1.05).toFixed(2));

            // Save both entry and exit in a single document with distance
            const geofenceLog = new GeofenceLog({
                deviceId,
                geofenceId,
                entry: entryData,
                exit: {
                    latitude,
                    longitude,
                    timestamp,
                    date,
                    time
                },
                distance,
                price
            });

            await geofenceLog.save();

            // Clear the entry data after saving
            delete latestEntries[deviceId];

            console.log(`Entry/Exit log saved for device ${deviceId} with distance: ${distance} km and price: ${price}`);
            res.status(200).json({ message: 'Geofence entry/exit event logged successfully' });

        } else {
            res.status(400).json({ message: 'Invalid event type' });
        }
    } catch (error) {
        console.error('Error handling geofence event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
