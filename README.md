# Bible Text Editor

**_A messy Proof of Concept_**

A React-based Bible text editor with annotation capabilities and discourse analysis built on TipTap.

## Features

### Bible Annotation

- Mark text as warnings, instructions, or questions
- Inline annotation badges with explanatory tooltips
- Text highlighting for annotations
- Click on badges to select annotated text spans
- Bubble menu for quick annotations
- Bible text importing with verse number detection
- Clean, modern UI

### Discourse Analysis

- Model discourse flow with nested sections
- Add semantic labels to discourse components (premise, claim, evidence, etc.)
- Visualize rhetorical structure through nested hierarchies
- Combined use of annotations within discourse sections

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

### Bible Editor

1. Select text by highlighting it
2. Use the annotation buttons to mark as Warning, Instruction, or Question
3. Hover over badges to see detailed explanations of each annotation type
4. Click any badge to select its content for editing/clearing
5. Import Bible text using the Import button
6. Customize badge explanations using the description settings

### Discourse Editor

1. Use the "Add Top-Level Section" buttons to create new discourse sections
2. Select a section and use "Add Nested Section" to create a sub-section
3. Apply semantic types (Premise, Claim, Evidence, etc.) to sections
4. Create hierarchical structures to represent discourse relationships

## Structure

### Core Components

- **BibleEditor.jsx** - Main editor component with TipTap integration
- **BibleTextImporter.jsx** - Text import functionality
- **BibleParser.js** - Utility for parsing Bible text with verse numbers
- **App.css** - Styling for the application

### Discourse Components

- **DiscourseEditor.jsx** - Editor for discourse flow analysis
- **DiscourseSection.js** - Custom TipTap node for discourse sections
- **DiscourseSectionView.jsx** - React component for rendering sections

### Enhancement Components

- **DescriptionSettings.jsx** - Component for customizing badge descriptions

## Technologies

- React
- TipTap
- Vite
