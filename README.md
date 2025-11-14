# 🎓 LIA Rapport - Professional Internship Report System

![LIA Rapport Banner](./assets/banner.png)

A state-of-the-art, modern web application for tracking and documenting your 6-month LIA (Learning in Work) internship as a Frontend Developer. Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Go** backend.

## ✨ Features

### 🎨 Beautiful & Modern UI
- **Gradient color schemes** throughout the application
- **Responsive design** with mobile-friendly hamburger navigation
- **Smooth animations** using Framer Motion
- **Card-based layouts** with hover effects and shadows
- **Professional typography** and spacing

### 📝 Complete Report Sections
- **Sammanfattning** (Summary)
- **Inledning** (Introduction)
- **LIA-företaget** (Company Information)
- **Arbetsuppgifter** (Work Tasks)
- **Projekt** (Projects)
- **Måluppfyllelse** (Goal Achievement)
- **Diskussion & Slutsats** (Discussion & Conclusion)
- **Egen utveckling** (Personal Development)

### 📅 Logging System
- **Daily Logs** - Document daily activities, learnings, and challenges
- **Weekly Logs** - Weekly summaries and planning
- **Auto-save functionality** with localStorage
- **Edit and delete capabilities**

### 📄 PDF Export
- Generate professional PDF reports
- Includes all sections and log summaries
- One-click export functionality

### 🔧 Tech Stack

#### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Icons** - Beautiful icon library
- **jsPDF** - PDF generation

#### Backend
- **Go** - High-performance REST API
- **Gorilla Mux** - HTTP router
- **JSON file storage** - Simple data persistence

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Go** (v1.21 or higher)

### Installation

1. **Clone or navigate to the project directory:**
```bash
cd "c:\Workspace\LIA-paket\LIA-rapport"
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Install Go backend dependencies:**
```bash
cd backend
go mod download
cd ..
```

### Running the Application

#### Option 1: Run Frontend and Backend Together (Recommended)

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run backend
```

#### Option 2: Run Separately

**Frontend only:**
```bash
npm run dev
```

**Backend only:**
```bash
cd backend
go run main.go
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080

## 📁 Project Structure

```
lia-rapport/
├── backend/                 # Go backend server
│   ├── main.go             # Main server file
│   ├── go.mod              # Go dependencies
│   └── data/               # JSON data storage (auto-created)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Home page
│   │   ├── layout.tsx      # Root layout
│   │   ├── globals.css     # Global styles
│   │   ├── sammanfattning/ # Summary section
│   │   ├── inledning/      # Introduction section
│   │   ├── lia-foretag/    # Company section
│   │   ├── arbetsuppgifter/ # Work tasks section
│   │   ├── projekt/        # Projects section
│   │   ├── maluppfyllelse/ # Goals section
│   │   ├── diskussion-slutsats/ # Discussion section
│   │   ├── egen-utveckling/ # Development section
│   │   ├── loggar/         # Logging sections
│   │   │   ├── daglig/     # Daily logs
│   │   │   └── veckovis/   # Weekly logs
│   │   └── export/         # PDF export page
│   └── components/         # Reusable components
│       ├── Navigation.tsx  # Navigation component
│       └── SectionTemplate.tsx # Template for sections
├── package.json            # Frontend dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind config
├── next.config.js          # Next.js config
└── README.md               # This file
```

## 📖 How to Use

### 1. **Fill in Report Sections**
Navigate through each section using the menu and fill in your information:
- Use the form fields to document your experiences
- Click "Spara" to save each section
- Data is stored locally in your browser

### 2. **Daily Logging**
- Go to **Dagliga Loggar**
- Add daily entries with tasks, reflections, learnings, and challenges
- Edit or delete entries as needed

### 3. **Weekly Summaries**
- Go to **Veckologgar**
- Create weekly summaries of your progress
- Plan for upcoming weeks

### 4. **Export Your Report**
- Once you've completed all sections (preferably after week 10+)
- Go to **Exportera Rapport**
- Click "Generera PDF-Rapport"
- Your complete report will download as `LIA-Rapport.pdf`

## 🎨 Design Features

### Color Gradients
The application uses beautiful gradient color schemes:
- **Purple-Indigo** - Primary gradient
- **Pink-Rose** - Secondary gradient
- **Blue-Cyan** - Success gradient
- **Yellow-Orange** - Warm gradient

### Responsive Navigation
- **Desktop:** Full horizontal menu with dropdown
- **Mobile:** Hamburger menu with smooth animations
- **Sticky header** stays visible while scrolling

### Card Components
All content sections use card-based layouts with:
- Gradient backgrounds with transparency
- Hover effects (lift and shadow)
- Smooth transitions
- Border accents matching section themes

## 🔒 Data Storage

### Frontend (Browser)
- Uses **localStorage** for client-side data persistence
- Data persists across browser sessions
- Easy to back up by exporting to PDF

### Backend (Optional)
- Go server provides REST API endpoints
- Stores data in JSON files in `backend/data/`
- Can be used for multi-device sync (requires implementation)

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start Next.js dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run backend  # Start Go backend server
```

### Adding New Sections

1. Create a new page in `src/app/[section-name]/page.tsx`
2. Use `SectionTemplate` component for consistency
3. Add navigation link in `src/components/Navigation.tsx`
4. Define form fields in the page component

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🎯 Best Practices for Your LIA Report

1. **Daily Logging:** Try to log something every day, even if brief
2. **Weekly Reviews:** Set aside time each Friday to summarize the week
3. **Screenshots:** Take screenshots of your work to include in logs
4. **Reflection:** Focus on what you learned, not just what you did
5. **Be Specific:** Use concrete examples and technologies
6. **Regular Backups:** Export PDF periodically as backup

## 🎓 For Educators/Supervisors

This system helps students:
- Document their learning journey systematically
- Reflect on daily and weekly progress
- Connect practical work to course objectives
- Produce professional reports effortlessly

## 📄 License

This project is created for educational purposes as part of the LIA program.

## 🤝 Support

For questions about the LIA program or this report system, contact your LIA coordinator or supervisor.

## 🌟 Tips for Success

- **Start Early:** Begin documenting from day one
- **Be Consistent:** Regular updates are easier than catching up
- **Be Honest:** Include challenges as well as successes
- **Seek Feedback:** Share drafts with your supervisor
- **Proofread:** Review your report before final export

## 🚀 Future Enhancements

Potential features for future versions:
- Image upload for daily logs
- Cloud synchronization
- Multi-language support
- Export to Word/Markdown
- Analytics dashboard
- Collaboration features

---

**Good luck with your LIA! 🎉**

*This system was designed to make documenting your internship journey both easy and enjoyable. Focus on learning and growing – the report will write itself!*
