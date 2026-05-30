To deploy the backend:
1. Render: Connect the GitHub repo (fauhkoff/CaptionCraft-ai), set Root Directory to 'backend', Build Command to 'npm install', Start Command to 'npm start'.
2. Set AI_API_KEY environment variable in Render dashboard.
3. Frontend: Deploy to Vercel and set VITE_API_URL to the new Render backend URL.
