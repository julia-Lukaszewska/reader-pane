//------------------------------------------------------------------  
//---- CORS configuration (branch-based origin filtering)                 
//------------------------------------------------------------------  

const BRANCH = process.env.BRANCH || 'dev';

const ORIGIN_MAP = {
  dev: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ],
  main: [
    'https://reader-pane-main.vercel.app',
  ],
  build: [
    'https://reader-pane.vercel.app',
  ],
};

//------------------------------------------------------------------  
//---- Allowed origins for current branch                              
//------------------------------------------------------------------  
export const allowedOrigins = ORIGIN_MAP[BRANCH];

//------------------------------------------------------------------  
//---- CORS options for Express (used in app.use(cors(...)))            
//------------------------------------------------------------------  
export const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.some((o) => origin.startsWith(o))) {
      return cb(null, true);
    }
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
allowedHeaders: ['Content-Type', 'Authorization', 'Range'], 
  exposedHeaders: ['Accept-Ranges', 'Content-Range'],       
};
