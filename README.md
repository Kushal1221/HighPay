# HighPay

HighPay is a GPS distance based toll payment gateway, where user can pay toll price based on the distance travelled through our website.

## Features

- **Real-Time GPS Tracking**: Monitor locations with high precision in real-time.
- **Geofencing**: Create virtual boundaries and receive data when boundaries are crossed.
- **Distance**: Distance is calculated using here api based on it price is calculated.
- **User Management**: Manage multiple users and their trip data.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Distance Calculation**: HereAPI
- **Hosting**: AWS Lightsail (for server deployment)
- **Other Tools**: Traccar Server for location tracking

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed or a cloud instance set up
- AWS Lightsail account for hosting

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/highpay.git
    cd highpay
    ```

2. Install dependencies for the backend:
    ```bash
    cd webApp
    cd server
    npm install
    ```

3. Install dependencies for the frontend:
    ```bash
    cd webApp
    cd client
    npm install
    ```

4. Configure environment variables:
    - Create a `.env` file in the backend directory with the following:
      ```env
      MONGO_URI=your-mongodb-uri
      JWT_SECRET=your-secret-key
      TRACCAR_URL=your-traccar-server-url
      ```

5. Start the backend server:
    ```bash
    cd webApp
    cd server
    npm start
    ```

6. Start the frontend server:
    ```bash
    cd webApp
    cd client
    npm start
    ```

## Usage

1. Open the frontend in your browser (default URL: `http://localhost:3000`).
2. Create an account or log in.
3. Add devices for GPS tracking.
4. Create geofences and web alerts.
5. Monitor real-time location and geofence activity.

## Future Enhancements

- Integration with SMS and email notifications.
- Advanced analytics for geofencing events.
- Mobile application for easier tracking on the go.
- Multi-language support.

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add feature-name"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Create a pull request.
