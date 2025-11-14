# 🔧 Troubleshooting Guide

Common issues and solutions for LIA Rapport application.

## Installation Issues

### Node.js not found

**Problem:** `command not found: node` or `'node' is not recognized`

**Solution:**

1. Download Node.js from https://nodejs.org/
2. Install with default options
3. Restart terminal/command prompt
4. Verify: `node --version`

### npm install fails

**Problem:** Errors during `npm install`

**Solutions:**

1. **Delete node_modules and try again:**

   ```bash
   rm -rf node_modules
   npm install
   ```

2. **Clear npm cache:**

   ```bash
   npm cache clean --force
   npm install
   ```

3. **Check Node.js version:**
   ```bash
   node --version  # Should be v18 or higher
   ```

### Go not installed

**Problem:** Backend won't start

**Solution:**

- The app works without Go using localStorage
- To use backend: Download Go from https://go.dev/dl/
- Not required for basic functionality

## Runtime Issues

### Port 3000 already in use

**Problem:** `Port 3000 is already in use`

**Solutions:**

1. **Kill the process:**

   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -ti:3000 | xargs kill -9
   ```

2. **Use different port:**
   ```bash
   PORT=3001 npm run dev
   ```

### Port 8080 already in use (Backend)

**Problem:** Backend fails to start

**Solution:**

1. Change port in `backend/main.go`:

   ```go
   log.Fatal(http.ListenAndServe(":8081", corsHandler(router)))
   ```

2. Update `next.config.js`:
   ```javascript
   destination: 'http://localhost:8081/api/:path*',
   ```

### Page not loading

**Problem:** Blank page or loading forever

**Solutions:**

1. **Check browser console (F12)**

   - Look for error messages
   - Check network tab for failed requests

2. **Verify servers are running:**

   ```bash
   # Frontend should show: ready - started server on 0.0.0.0:3000
   # Backend should show: LIA Rapport Backend Server starting on :8080
   ```

3. **Clear browser cache:**
   - Ctrl+Shift+Delete (Windows/Linux)
   - Cmd+Shift+Delete (Mac)
   - Clear cache and reload

### TypeScript errors

**Problem:** Red squiggly lines in VS Code

**Solutions:**

1. **Install dependencies first:**

   ```bash
   npm install
   ```

2. **Restart VS Code**

3. **These errors don't prevent the app from running**
   - They appear because dependencies aren't installed yet
   - Will disappear after `npm install`

## Data Issues

### Data not saving

**Problem:** Changes don't persist after refresh

**Solutions:**

1. **Check browser localStorage:**

   - F12 > Application tab > Local Storage
   - Verify data is being saved

2. **Incognito/Private mode issue:**

   - localStorage may not work in private browsing
   - Use normal browser window

3. **Check console for errors:**
   - F12 > Console tab
   - Look for storage errors

### Data lost

**Problem:** Previously saved data disappeared

**Solutions:**

1. **Check if localStorage was cleared:**

   - Browser cache/history clear might have removed it
   - Check trash/recycle bin for exported PDFs

2. **Export PDF as backup regularly:**

   - Go to Export page
   - Generate PDF monthly

3. **Use backend storage (optional):**
   - Start Go backend
   - Data will be saved to files

### Can't export PDF

**Problem:** PDF generation fails

**Solutions:**

1. **Check browser console for errors**

2. **Try different browser:**

   - Chrome (recommended)
   - Firefox
   - Edge

3. **Ensure popup blocker is off:**

   - PDF download might be blocked

4. **Check if data exists:**
   - At least some sections should have data

## Backend Issues

### Backend won't start

**Problem:** `go run main.go` fails

**Solutions:**

1. **Install dependencies:**

   ```bash
   cd backend
   go mod download
   ```

2. **Check Go version:**

   ```bash
   go version  # Should be 1.21+
   ```

3. **Check port availability:**
   - Port 8080 must be free
   - See "Port already in use" section above

### CORS errors

**Problem:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solutions:**

1. **Ensure backend is running**

2. **Check backend URL in next.config.js:**

   ```javascript
   destination: 'http://localhost:8080/api/:path*',
   ```

3. **Frontend and backend must use same localhost**

## UI Issues

### Layout broken

**Problem:** UI looks wrong or messy

**Solutions:**

1. **Clear browser cache**

2. **Check if Tailwind CSS is working:**

   - View page source
   - Styles should be in `<style>` tags

3. **Rebuild:**
   ```bash
   rm -rf .next
   npm run dev
   ```

### Icons not showing

**Problem:** Boxes instead of icons

**Solutions:**

1. **Install dependencies:**

   ```bash
   npm install react-icons
   ```

2. **Restart dev server:**
   ```bash
   # Stop with Ctrl+C
   npm run dev
   ```

### Animations not working

**Problem:** No smooth transitions

**Solutions:**

1. **Install Framer Motion:**

   ```bash
   npm install framer-motion
   ```

2. **Check if JavaScript is enabled in browser**

### Mobile menu not working

**Problem:** Hamburger menu doesn't open

**Solutions:**

1. **Check browser console for errors**

2. **Try different screen size:**

   - Menu appears on small screens (<1024px)
   - Use browser dev tools to test

3. **Refresh page**

## Performance Issues

### App running slow

**Problem:** Laggy interface

**Solutions:**

1. **Clear localStorage if too much data:**

   - F12 > Application > Local Storage
   - Delete old entries

2. **Export and clear old logs:**

   - Export PDF first
   - Delete very old daily logs

3. **Use production build:**
   ```bash
   npm run build
   npm start
   ```

### Build fails

**Problem:** `npm run build` errors

**Solutions:**

1. **Fix TypeScript errors first:**

   - Check terminal output
   - Fix reported errors

2. **Clean build:**

   ```bash
   rm -rf .next
   npm run build
   ```

3. **Update dependencies:**
   ```bash
   npm update
   ```

## Browser-Specific Issues

### Safari Issues

- localStorage might be limited
- Try Chrome or Firefox instead

### Internet Explorer

- **Not supported**
- Use Edge, Chrome, or Firefox

### Mobile Browsers

- Should work on modern mobile browsers
- Best experience on Chrome Mobile

## Getting Help

### Before Asking for Help

1. ✅ Check this troubleshooting guide
2. ✅ Read error messages carefully
3. ✅ Check browser console (F12)
4. ✅ Verify all dependencies are installed
5. ✅ Try restarting servers

### Information to Provide

When asking for help, include:

- Operating system (Windows, Mac, Linux)
- Node.js version (`node --version`)
- Error message (full text or screenshot)
- What you were trying to do
- What you've already tried

### Resources

- README.md - Main documentation
- DEVELOPMENT.md - Advanced topics
- PROJECT_SUMMARY.md - Overview
- https://nextjs.org/docs - Next.js docs
- https://tailwindcss.com/docs - Tailwind docs

## Common Error Messages

### "Cannot find module"

**Fix:** `npm install`

### "Port already in use"

**Fix:** Kill process on that port or use different port

### "localStorage is not defined"

**Fix:** Use browser (not server-side code)

### "Failed to compile"

**Fix:** Check TypeScript errors in terminal

### "Network error"

**Fix:** Start backend server

## Still Having Issues?

1. **Try the nuclear option:**

   ```bash
   # Delete everything and start fresh
   rm -rf node_modules .next
   npm install
   npm run dev
   ```

2. **Check file permissions:**

   - Ensure you can read/write in project directory

3. **Antivirus/Firewall:**

   - May block localhost connections
   - Add exception for ports 3000 and 8080

4. **Update everything:**
   ```bash
   npm install -g npm@latest
   npm update
   ```

## Prevention Tips

To avoid issues:

- ✅ Keep Node.js updated
- ✅ Run `npm install` after pulling changes
- ✅ Export PDF backups regularly
- ✅ Don't edit node_modules
- ✅ Use version control (git)
- ✅ Test changes before committing

---

**Most issues can be fixed by:**

1. Restarting the dev server
2. Clearing cache
3. Running `npm install` again
4. Reading error messages carefully

**Good luck! 🍀**
