# 🎯 LIA Rapport - Development & Customization Guide

## 🎨 Customizing Colors & Themes

### Gradient Colors

Edit `tailwind.config.ts` to change gradient colors:

```typescript
backgroundImage: {
  'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  // Add your own gradients here
}
```

### Section Colors

Each section has its own gradient. Edit in the respective page files:

- `sammanfattning` - Purple gradient
- `inledning` - Blue gradient
- `lia-foretag` - Green gradient
- etc.

## 📝 Adding New Report Sections

### Step 1: Create the Page

Create a new file: `src/app/[section-name]/page.tsx`

```typescript
'use client'

import SectionTemplate from '@/components/SectionTemplate'

export default function NewSectionPage() {
  const fields = [
    {
      label: 'Field Label',
      name: 'fieldName',
      type: 'textarea' as const,
      rows: 4,
      placeholder: 'Enter your text...',
    },
    // Add more fields
  ]

  return (
    <SectionTemplate
      title="Your Section Title"
      description="Description of this section"
      icon="book"
      storageKey="yourSectionKey"
      fields={fields}
      gradient="from-blue-500 to-cyan-500"
    />
  )
}
```

### Step 2: Add to Navigation

Edit `src/components/Navigation.tsx` and add your section to the `navItems` array:

```typescript
{ name: 'Your Section', href: '/your-section', icon: FaIcon }
```

### Step 3: Update PDF Export

Edit `src/app/export/page.tsx` to include your new section in the PDF generation.

## 🔧 Backend API Endpoints

The Go backend provides these REST endpoints:

### Sections

- `GET /api/sections/{id}` - Get a section
- `POST /api/sections/{id}` - Save a section

### Daily Logs

- `GET /api/logs/daily` - Get all daily logs
- `POST /api/logs/daily` - Save/update a daily log
- `DELETE /api/logs/daily/{id}` - Delete a daily log

### Weekly Logs

- `GET /api/logs/weekly` - Get all weekly logs
- `POST /api/logs/weekly` - Save/update a weekly log
- `DELETE /api/logs/weekly/{id}` - Delete a weekly log

### Health Check

- `GET /api/health` - Check if backend is running

## 💾 Data Storage

### Current Implementation (localStorage)

Data is stored in the browser's localStorage. This is:

- ✅ Simple and fast
- ✅ No server required
- ❌ Limited to single device
- ❌ Can be cleared by browser

### Switching to Backend Storage

To use the Go backend instead of localStorage:

1. Install `axios` or `fetch` wrapper
2. Replace localStorage calls with API calls:

```typescript
// Instead of:
localStorage.setItem('sammanfattning', JSON.stringify(data))

// Use:
await fetch('/api/sections/sammanfattning', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
})
```

## 🎯 Adding Image Upload

### Step 1: Install Dependencies

```bash
npm install react-dropzone
```

### Step 2: Create Upload Component

```typescript
'use client'

import { useDropzone } from 'react-dropzone'

export default function ImageUpload() {
  const onDrop = (acceptedFiles: File[]) => {
    // Handle file upload
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag images here or click to select</p>
    </div>
  )
}
```

### Step 3: Update Backend

Add file upload endpoint in `backend/main.go`:

```go
api.HandleFunc("/upload", uploadImageHandler).Methods("POST")
```

## 📱 Progressive Web App (PWA)

To make this installable as a mobile app:

### Step 1: Install next-pwa

```bash
npm install next-pwa
```

### Step 2: Configure

Create `next.config.js`:

```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  // existing config
})
```

### Step 3: Add Manifest

Create `public/manifest.json`

## 🔐 Adding Authentication

For multi-user support:

### Step 1: Choose Auth Provider

- NextAuth.js (recommended)
- Clerk
- Supabase Auth

### Step 2: Install NextAuth

```bash
npm install next-auth
```

### Step 3: Configure

Create `src/app/api/auth/[...nextauth]/route.ts`

### Step 4: Protect Routes

Wrap pages with authentication checks

## 🌐 Deployment Options

### Vercel (Frontend)

```bash
npm run build
vercel deploy
```

### Heroku (Backend)

Create `Procfile`:

```
web: cd backend && go run main.go
```

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 🧪 Testing

### Add Jest for Testing

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Example Test

```typescript
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

test('renders homepage', () => {
  render(<Home />)
  expect(screen.getByText('LIA Rapport')).toBeInTheDocument()
})
```

## 🎨 Advanced Styling

### Adding Custom Fonts

Edit `src/app/layout.tsx`:

```typescript
import { Inter, Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})
```

### Dark Mode Support

Install theme provider:

```bash
npm install next-themes
```

## 📊 Analytics

### Add Vercel Analytics

```bash
npm install @vercel/analytics
```

In `src/app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🔍 SEO Optimization

Add metadata to pages:

```typescript
export const metadata = {
  title: 'LIA Rapport - Section Name',
  description: 'Document your internship journey',
  keywords: ['lia', 'internship', 'frontend', 'developer'],
}
```

## 🐛 Debugging Tips

### Frontend Issues

1. Check browser console (F12)
2. Verify data in localStorage (Application tab)
3. Check network requests
4. Use React DevTools

### Backend Issues

1. Check terminal output
2. Verify port 8080 is available
3. Check `backend/data/` directory
4. Test endpoints with Postman

## 📈 Performance Optimization

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image'

;<Image src="/assets/photo.jpg" width={400} height={400} alt="Photo" />
```

### Code Splitting

Next.js does this automatically, but you can also use dynamic imports:

```typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./Component'))
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Go Documentation](https://go.dev/doc/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 🤝 Contributing

To contribute improvements:

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter issues:

1. Check the README first
2. Look for similar issues in documentation
3. Ask your LIA supervisor
4. Consult with classmates

---

**Happy Coding! 🚀**

_Remember: The best way to learn is by doing. Don't be afraid to experiment and customize this system to fit your needs!_
