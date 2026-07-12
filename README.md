# Citeline

The evidence-based research assistant that grounds every AI generation in your specific document library. No hallucinations, just verifiable, source-backed insights.

## Overview

Citeline is a full-stack academic research tool that combines AI-powered analysis with rigorous source attribution. Upload your documents (PDFs, DOCX, TXT), and Citeline reads, indexes, and lets you query them through a chat interface — with every response citing the exact page and passage from your sources.

### Key Features

- **Instant Grounding** – Every AI response is linked to its source document. Click any claim to jump to the exact paragraph and page.
- **Source Sidecar** – A docked PDF viewer highlights relevant passages alongside the chat window in real-time.
- **Multi-Source Synthesis** – Queries are answered across your entire document library, not just a single paper.
- **Automated Citations** – Export citations in APA, MLA, or BibTeX format.
- **AI-Powered RAG** – Uses Google Gemini for embeddings and response generation, with vector-based retrieval across document chunks.
- **Secure Authentication** – JWT-based auth with access/refresh tokens, HTTP-only cookies, and encrypted session storage.

## Tech Stack

### Client (`client/`)

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool and dev server |
| Tailwind CSS 4 | Utility-first styling |
| React Router v7 | Client-side routing |
| Axios | HTTP client with interceptors |
| Lucide React | Icon library |

### Server (`server/`)

| Technology | Purpose |
|---|---|
| Express 5 | Web framework |
| Mongoose 9 | MongoDB ODM |
| JSON Web Token | Auth token generation & verification |
| bcrypt | Password hashing |
| Google Gemini AI | Embeddings & chat response generation |
| Zod | Environment variable validation |
| Multer | File upload handling |
| Helmet | Security headers |
| express-rate-limit | API rate limiting |
| Morgan | HTTP request logging |

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **MongoDB** – local instance or Atlas URI
- **Google Gemini API Key** – [Get one here](https://aistudio.google.com/apikey)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sachin-8125/Citeline.git
   cd Citeline
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `server/` directory:

   ```env
   NODE_ENV=development
   PORT=5000

   MONGODB_URI=mongodb://localhost:27017/citeline

   JWT_ACCESS_SECRET=<32+ character random string>
   JWT_REFRESH_SECRET=<32+ character random string>
   ACCESS_TOKEN_TTL=15m
   REFRESH_TOKEN_TTL_DAYS=7

   CLIENT_URL=http://localhost:5173

   GEMINI_API_KEY=<your gemini api key>

   MAX_FILE_SIZE_MB=20
   ```

4. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

### Running the Application

**Start the server** (from `server/`):

```bash
npm run dev
# or
npm start
```

The API will be available at `http://localhost:5000`.

**Start the client** (from `client/`):

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Routes

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Log in with email & password |
| POST | `/api/auth/logout` | Revoke current session |
| POST | `/api/auth/refresh` | Refresh access token |

### Documents (`/api/documents`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/documents` | List user's documents |
| POST | `/api/documents/upload` | Upload a new document |
| DELETE | `/api/documents/:id` | Delete a document |
| GET | `/api/documents/:id/pdf` | Stream document PDF |
| POST | `/api/documents/:id/chat` | Send a chat message about a document |

### Health

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check & environment info |

## Architecture

```
Citeline/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   └── dashboard/   # Dashboard-specific components
│   │   ├── context/         # Auth context provider
│   │   ├── hooks/           # Custom hooks (useChat, useFileUpload)
│   │   ├── lib/             # Axios API client
│   │   └── pages/           # Route pages (Landing, Dashboard, Signin, Signup)
│   └── ...
└── server/                  # Express backend
    └── src/
        ├── config/          # DB & env configuration
        ├── controllers/     # Route handlers
        ├── middleware/       # Auth, error handling
        ├── models/          # Mongoose schemas (User, Document, Session)
        ├── routes/          # Express route definitions
        └── utils/           # Tokens, cookies, Gemini integration
```

### How It Works

1. **Document Upload** – PDFs are parsed, split into page-level chunks, and embeddings are generated via Gemini.
2. **Vector Search** – When a user asks a question, the query is embedded and compared against all chunks using cosine similarity.
3. **Grounded Response** – The top relevant chunks are passed to Gemini with a system prompt enforcing source citation. The AI can only answer from the provided passages.
4. **Authentication** – Access tokens (short-lived, in-memory) + refresh tokens (long-lived, HTTP-only cookie). Sessions are tracked in MongoDB for revocation.

## License

ISC

---

Built for clarity, transparency, and the pursuit of knowledge.