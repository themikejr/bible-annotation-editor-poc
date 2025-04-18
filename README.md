# Bible Text Editor

**_A messy Proof of Concept_**

A React-based Bible text editor with annotation capabilities built on TipTap.

## Features

- Mark text as warnings, instructions, or questions
- Inline annotation badges
- Text highlighting for annotations
- Click on badges to select annotated text spans
- Bubble menu for quick annotations
- Bible text importing with verse number detection
- Clean, modern UI

## Installation

```bash
# Clone repository
git clone [your-repo-url]
cd bible-editor

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

1. Select text by highlighting it
2. Use the annotation buttons to mark as Warning, Instruction, or Question
3. Click any badge to select its content for editing/clearing
4. Import Bible text using the Import button

## Structure

- **BibleEditor.jsx** - Main editor component with TipTap integration
- **BibleTextImporter.jsx** - Text import functionality
- **BibleParser.js** - Utility for parsing Bible text with verse numbers
- **App.css** - Styling for the application

## Technologies

- React
- TipTap
- Vite
