# Student Attendance Management System (SAMS)

A modern web-based attendance management system that leverages QR code technology and geolocation verification to streamline student attendance tracking for educational institutions.

## Project Overview

SAMS is a comprehensive attendance management solution designed to digitize and automate the traditional attendance process. The system provides role-based access control for administrators and students, enabling efficient attendance tracking through QR code scanning and real-time location verification.

**Note:** This is a prototype project developed as part of a 2nd-year college mini project and is not a completed production-ready system.

## Team

- **Developer:** Hariharanpugazh, [@AjayChaki2004](https://github.com/ajaychaki2004)

## Architecture

The system follows a modern full-stack architecture:

- **Frontend:** React.js with Tailwind CSS
- **Backend:** Django REST Framework
- **Database:** MongoDB (using Djongo ORM)
- **Deployment:** Vercel (Frontend) + Render (Backend)

## Core Features

### Authentication & Authorization
- User registration and login system
- Role-based access control (Admin/Student)
- Secure session management

### QR Code System
- Dynamic QR code generation with expiration times
- Location-embedded QR codes with geofencing
- Real-time QR code validation

### Geolocation Verification
- GPS-based location tracking
- Radius-based attendance validation
- Distance calculation using Haversine formula

### Administrative Dashboard
- Student management (Add/View students)
- Attendance monitoring and reports
- QR code generation for classes
- Calendar-based date selection

### Student Dashboard
- Personal attendance history
- QR code scanner functionality
- Real-time location display
- Attendance statistics

## Technology Stack

### Frontend
- **React 18.3.1** - User interface framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **HTML5 QR Code Scanner** - QR code scanning functionality
- **React Feather** - Icon library
- **React DatePicker** - Date selection component

### Backend
- **Django 4.1.13** - Web framework
- **Django REST Framework** - API development
- **Djongo** - Django-MongoDB integration
- **PyMongo** - MongoDB driver
- **QRCode** - QR code generation
- **Haversine** - Distance calculation
- **Geopy** - Geocoding and distance calculations

### Database
- **MongoDB** - Document-based NoSQL database
- **Collections:** Users, Students, Attendance, QR_Codes

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- MongoDB account/instance

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure database settings in `Backend/settings.py`

5. Run the development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/accounts/register/` - User registration
- `POST /api/accounts/login/` - User login

### Student Management
- `POST /api/accounts/addstudent/` - Add new student
- `GET /api/accounts/getstudents/` - Retrieve all students

### Attendance
- `GET /api/accounts/attendance/` - Get attendance records
- `POST /api/accounts/entry/` - Mark attendance

### QR Code Operations
- `POST /api/accounts/api/generate_qr/` - Generate QR code
- `POST /api/accounts/api/validate_attendance/` - Validate attendance

## Project Structure

```
SAMS/
├── Backend/
│   ├── Backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── accounts/
│   │   ├── models.py
│   │   ├── user_views.py
│   │   ├── student_views.py
│   │   ├── qr_views.py
│   │   ├── attendance_views.py
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
└── README.md
```

## Key Components

### QR Code Generation
- Location-based QR codes with embedded GPS coordinates
- Time-based expiration mechanism
- Base64 encoded data transmission

### Geolocation Validation
- Real-time GPS coordinate capture
- Configurable radius-based validation (default: 100 meters)
- Distance calculation for attendance verification

### User Roles
- **Admin:** Full system access, student management, QR generation
- **Student:** Attendance marking, personal dashboard, QR scanning

## Security Features

- CORS configuration for secure cross-origin requests
- CSRF protection for form submissions
- Input validation and sanitization
- Session-based authentication

## Current Limitations

As this is a prototype project for academic purposes:
- Face detection feature is partially implemented
- Limited production security measures
- Basic error handling and validation
- No comprehensive testing suite
- Limited scalability optimizations

## Future Enhancements

- Face recognition integration for enhanced security
- Mobile application development
- Advanced analytics and reporting
- Bulk student import functionality
- Email/SMS notifications
- Attendance export features

## Contributing

This project is part of academic coursework. For educational purposes and learning contributions, please feel free to fork and experiment.

## License

This project is created for educational purposes as part of college curriculum.

## Acknowledgments

- College faculty for guidance and support
- Open-source libraries and frameworks used in development
- Academic institution for providing the learning platform
