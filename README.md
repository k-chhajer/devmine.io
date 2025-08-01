# Devmine.io

An LLM-powered platform that scrapes Reddit & X (Twitter) to extract authentic user experiences, pain points, and product suggestions. Build what people actually want.

## 🚀 Features

- **Real User Experience Mining**: Extract genuine user problems from social media
- **LLM-Powered Analysis**: Intelligent pattern recognition and opportunity detection
- **Niche Opportunity Detection**: Find inspiration from open source projects and ideas
- **Instant Opportunity Alerts**: Get notified about fresh ideas not many are aware of

## 🛠️ Tech Stack

- **Frontend**: React.js with modern CSS animations
- **Backend**: Django REST API (simplified for development)
- **Database**: None (prints emails to terminal for now)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/k-chhajer/devmine.io.git
   cd devmine.io
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up backend**
   ```bash
   cd backend
   python -m venv venv
   
   # Activate virtual environment
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   
   # Install Python dependencies
   pip install -r ../requirements.txt
   ```

## 🏃‍♂️ Running the Project

### Start Frontend
```bash
# From the root directory
npm start
```
Frontend will be available at: http://localhost:3000

### Start Backend
```bash
# From the backend directory (with venv activated)
cd backend
python manage.py runserver
```
Backend API will be available at: http://localhost:8000

## 📡 API Endpoints

- **`POST /api/waitlist/join/`** - Join waitlist (prints email to terminal)
- **`GET /api/waitlist/stats/`** - Get backend status

## 🎨 Project Structure

```
devmine.io/
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── App.js             # Main app component
│   └── index.css          # Global styles
├── backend/               # Django backend
│   ├── trendscout/        # Django project settings
│   ├── waitlist/          # Waitlist app
│   └── venv/              # Python virtual environment
├── public/                # Static files
└── package.json           # Frontend dependencies
```

## 🔧 Development

### Frontend Development
- Built with React.js
- Modern CSS with animations and glassmorphism effects
- Responsive design for mobile and desktop
- Auto-scrolling components and smooth transitions

### Backend Development
- Django REST Framework
- Simplified for development (no database)
- CORS enabled for frontend communication
- Prints waitlist emails to terminal

## 🚀 Deployment

### Frontend
```bash
npm run build
```

### Backend
The backend is currently simplified for development. For production:
- Add proper database configuration
- Set up environment variables
- Configure proper authentication
- Add the core LLM scraping functionality

## 📝 Environment Variables

Create a `.env` file in the backend directory:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support, email: [your-email@example.com]

---

**Built with ❤️ for developers who want to build what people actually need.**