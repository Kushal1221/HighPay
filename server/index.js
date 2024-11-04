const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/traccar')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Define a schema for combined geofence entry and exit events
const geofenceLogSchema = new mongoose.Schema({
    deviceId: Number,
    geofenceId: Number,
    entry: {
        latitude: Number,
        longitude: Number,
        timestamp: Date
    },
    exit: {
        latitude: Number,
        longitude: Number,
        timestamp: Date
    }
});

// Create a model from the schema
const GeofenceLog = mongoose.model('GeofenceLog', geofenceLogSchema);

const app = express();
app.use(bodyParser.json());

// Temporary storage to keep track of the latest entry events
const latestEntries = {};

// Endpoint to receive geofence notifications from Traccar
app.post('/geofence', async (req, res) => {
    try {
        const { deviceId, event, geofenceId, latitude, longitude, timestamp } = req.body;

        if (event === 'geofenceEnter') {
            // Store entry event data temporarily for this device
            latestEntries[deviceId] = {
                latitude,
                longitude,
                timestamp: new Date(timestamp)
            };
            console.log(`Entry recorded for device ${deviceId}`);
            res.status(200).json({ message: 'Geofence entry recorded' });

        } else if (event === 'geofenceExit') {
            // Check if an entry exists for this device
            const entryData = latestEntries[deviceId];
            
            if (!entryData) {
                // If no entry data, exit event cannot be paired, return an error
                return res.status(400).json({ message: 'No entry event found for this device' });
            }

            // Save both entry and exit in a single document
            const geofenceLog = new GeofenceLog({
                deviceId,
                geofenceId,
                entry: entryData,
                exit: {
                    latitude,
                    longitude,
                    timestamp: new Date(timestamp)
                }
            });

            await geofenceLog.save();

            // Clear the entry data after saving
            delete latestEntries[deviceId];

            console.log(`Entry/Exit log saved for device ${deviceId}`);
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
