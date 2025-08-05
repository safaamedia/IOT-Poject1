# 🌡️ IoT Weather Dashboard

A comprehensive full-stack IoT weather monitoring application that provides real-time temperature and humidity data visualization with advanced analytics and machine learning capabilities.

> 🚀 A production-ready weather monitoring system designed for IoT enthusiasts and developers.

## 📱 Application Screenshots

### Home Dashboard
![Home Dashboard](snippets/home%20(1).png)
*The main dashboard showcasing current weather conditions with a 5-day forecast and real-time temperature, humidity, and air quality metrics.*

### User Authentication
![Login Page](snippets/home%20(2).png)
*Secure authentication system with multiple login options including social media integration.*

### Temperature Analytics
![Temperature Dashboard](snippets/home%20(3).png)
*Detailed temperature monitoring with historical trends and real-time sensor readings.*

### Humidity Monitoring
![Humidity Chart](snippets/home%20(4).png)
*Advanced humidity tracking with weekly statistics and trend analysis.*

---

## 🎯 Project Overview

This IoT weather monitoring system demonstrates:

- **Real-time Data Collection**: Continuous temperature and humidity monitoring from IoT sensors
- **Advanced Analytics**: Historical data analysis with trend visualization
- **Machine Learning Integration**: Predictive weather modeling using TensorFlow/Keras
- **Modern Web Interface**: Responsive React-based dashboard with beautiful UI
- **Secure Authentication**: JWT-based authentication with role-based access control
- **RESTful API**: Clean and documented backend services
- **Data Persistence**: SQLite database for reliable data storage

## 🔧 Key Features

### 📊 Dashboard & Visualization
- **Real-time Weather Monitoring**: Live temperature, humidity, and air quality readings
- **Interactive Charts**: Historical data visualization with Chart.js integration
- **5-Day Forecast**: Weather predictions with detailed daily breakdowns
- **Responsive Design**: Mobile-first approach with beautiful glassmorphism UI

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based user authentication
- **Protected Routes**: Role-based access control for sensitive data
- **Session Management**: Automatic token refresh and secure logout

### 🌐 IoT Integration
- **Sensor Data Collection**: Real-time data from weather APIs
- **Data Validation**: Input sanitization and error handling
- **Scalable Architecture**: Modular design for easy sensor integration

---

## 🛠️ Technology Stack

### Backend
- **Python 3.10+** - Core backend language
- **Flask** - Lightweight web framework
- **SQLite** - Database for data persistence
- **TensorFlow/Keras** - Machine learning models
- **JWT** - Authentication tokens
- **RESTful APIs** - Clean API architecture

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Chart.js** - Data visualization
- **CSS3** - Advanced styling with glassmorphism
- **Responsive Design** - Mobile-optimized interface

### DevOps & Tools
- **Docker** - Containerization
- **Git** - Version control
- **ESLint** - Code quality
- **PostCSS** - CSS processing

---

## 🌐 Data Sources

The application integrates with multiple weather data providers:

- **[Open-Meteo API](https://open-meteo.com/en/docs)** - Primary weather data source
- **Custom IoT Sensors** - Real-time temperature and humidity readings
- **Historical Weather Data** - Training data for ML models

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10 or higher
- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/safaamedia/IOT-Poject1.git
   cd IOT-Project
   ```

2. **Backend Setup**
   ```bash
   # Create virtual environment
   python -m venv iot-env
   
   # Activate environment (Windows)
   iot-env\Scripts\activate
   
   # Install dependencies
   cd backend
   pip install -r requirements.txt
   
   # Create environment file
   echo PORT=5000 > .env
   echo DATABASE_PATH=database/temperature.db >> .env
   echo DEBUG=True >> .env
   
   # Start backend server
   python app.py
   ```

3. **Frontend Setup**
   ```bash
   # Navigate to frontend directory
   cd frontend
   
   # Install dependencies
   npm install
   
   # Create environment file
   echo VITE_API_URL=https://api.open-meteo.com/v1/forecast > .env.local
   echo VITE_API_BASE_URL=http://localhost:5000 >> .env.local
   
   # Start development server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 📡 API Endpoints

### Weather Data
- `GET /data/latest` - Get current temperature with trend analysis
- `GET /data/history` - Retrieve historical temperature data
- `GET /data/humidity` - Get humidity readings and statistics

### Authentication
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `POST /auth/logout` - Secure logout
- `GET /auth/profile` - Get user profile

### Machine Learning
- `GET /predict/temperature` - Get temperature predictions
- `POST /model/train` - Trigger model retraining

---

## 🏗️ Project Structure

```
IOT-Project/
├── backend/                 # Python Flask backend
│   ├── app.py              # Main application entry
│   ├── auth.py             # Authentication logic
│   ├── models.py           # Database models
│   ├── nn.py               # Neural network implementation
│   ├── requirements.txt    # Python dependencies
│   ├── database/           # SQLite database
│   ├── model/              # ML models and training data
│   └── services/           # External API services
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── services/       # API service layer
│   │   └── contexts/       # React contexts
│   ├── public/             # Static assets
│   └── package.json        # Node.js dependencies
├── data/                   # Data files and exports
├── docs/                   # Documentation
└── README.md              # Project documentation
```

---

## 🔮 Advanced Features

### Machine Learning Integration
- **Temperature Prediction Model**: Neural network trained on historical weather data
- **Anomaly Detection**: Automatic identification of unusual weather patterns
- **Data Analytics**: Statistical analysis of weather trends

### Real-time Capabilities
- **Live Data Updates**: Automatic refresh of weather information
- **WebSocket Support**: Real-time data streaming (planned)
- **Push Notifications**: Weather alerts and warnings

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive data sanitization
- **CORS Protection**: Cross-origin request security
- **Environment Variables**: Secure configuration management

---

## 🤝 Contributing

We welcome contributions to improve the IoT Weather Dashboard! Here's how you can help:

### Development Workflow
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Code Quality Standards
- Follow PEP 8 for Python code
- Use ESLint configuration for JavaScript
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed

### Areas for Contribution
- 🐛 Bug fixes and improvements
- 📱 Mobile responsiveness enhancements
- 🤖 Machine learning model optimization
- 🔐 Security improvements
- 📊 New chart types and visualizations
- 🌐 Additional weather data sources

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Open-Meteo** for providing free weather data API
- **React Community** for excellent documentation and resources
- **Flask Team** for the lightweight and powerful web framework
- **Chart.js** for beautiful data visualization capabilities

---

## 📞 Support

If you encounter any issues or have questions:

1. **Check the [Issues](https://github.com/safaamedia/IOT-Poject1/issues)** for existing solutions
2. **Create a new issue** with detailed information
3. **Join our discussions** in the repository discussions section

---

<div align="center">
  <p>Made with ❤️ for the IoT and weather monitoring community</p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>
