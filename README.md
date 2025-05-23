# 📝 Notion-C – Minimal Notion Clone

This is a basic Notion-style application where users can create and manage multiple documents.  
It includes full **CRUD functionality** with a **clean and intuitive UI**.

---

## 🚀 Features

- Create, update, and delete documents  
- Beautiful and minimal UI  
- Firebase for data storage  
- Clerk for authentication  
- Liveblocks for real-time collaboration

---

## 📦 Installation

Follow these steps to get the project running locally.

### 1. Clone the repository

```bash
git clone https://github.com/yashurade27/notion-c.git
cd notion-c

2. Install dependencies

Make sure you have Node.js and npm installed.

npm install

3. Setup environment variables

Create a .env.local file in the root of the project and add the following:

# Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
LIVEBLOCKS_PRIVATE_KEY=

⚠️ Make sure to fill in the values from your Firebase, Clerk, and Liveblocks accounts.
4. Run the development server

npm run dev

Then open http://localhost:3000 to see your app.
🧱 Tech Stack

    Next.js

    Firebase

    Clerk

    Liveblocks

    Tailwind CSS

🛠️ Contribution

Feel free to fork the repo, open issues, or submit pull requests!
