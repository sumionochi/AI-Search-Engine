# Real-Time AI-Powered Search Engine

This project is a real-time AI search engine that uses modern web technologies like Next.js, Supabase, and Tiptap Editor. The application allows users to send queries and receive AI-generated responses in real-time. It features smooth content updates, source links, and follow-up suggestions, ensuring an interactive and engaging user experience.

## Features

- **Real-Time Chat**: Users can send queries and receive responses in real-time.
- **AI-Powered Responses**: Uses OpenAI's GPT models to generate responses.
- **Supabase Integration**: Real-time updates and database management.
- **Rich Text Editing**: Utilizes Tiptap Editor for rich text display.
- **Follow-Up Suggestions**: Provides follow-up questions to keep the conversation going.
- **Source Links**: Displays sources with links to external content.
- **Smooth Content Updates**: Ensures content updates without flickering or duplication.

## Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **Supabase**: Backend as a Service (BaaS) providing real-time capabilities and database management.
- **OpenAI**: AI models for generating responses.
- **Tiptap Editor**: Rich text editor for displaying content.
- **React**: JavaScript library for building user interfaces.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Supabase account
- OpenAI API key

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add your Supabase and OpenAI credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
   ```

### Running the Application

1. **Start the development server:**

   ```sh
   npm run dev
   ```

   or

   ```sh
   yarn dev
   ```

2. **Open your browser:**

   Navigate to `http://localhost:3000` to see the application in action.

## Project Structure

```
.
├── components
│   ├── InputArea.tsx
│   ├── MessageHandler.tsx
│   └── TipTapEditor.tsx
├── lib
│   ├── supa.ts
│   └── openai.ts
├── pages
│   ├── api
│   │   └── search.ts
│   └── index.tsx
├── public
│   └── favicon.ico
├── styles
│   └── globals.css
├── .env.local
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Usage

- **Send a Query**: Type your query in the input box and press enter or click the send button.
- **Receive Responses**: AI-generated responses will appear in real-time.
- **Follow-Up Questions**: Click on follow-up questions to continue the conversation.
- **Source Links**: Click on the source links to open them in a new tab.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [OpenAI](https://www.openai.com/)
- [Supabase](https://supabase.io/)
- [Tiptap Editor](https://tiptap.dev/)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)

## Video Demo

Watch the video demo [here](https://www.youtube.com/watch?v=k2W3Lf6Rohk).
