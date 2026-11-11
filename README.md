# Personal Portfolio

A responsive personal portfolio website built with plain HTML, CSS and JavaScript, deployed on Vercel.

**Live site:** _add your Vercel URL here after deploying_

## Sections

1. **Home** – name, professional introduction and tagline
2. **About Me** – personal introduction and educational background
3. **Skills** – technical and programming skills
4. **Projects** – completed projects and activities
5. **Achievements** – certificates, awards and seminars
6. **Contact Me** – email and professional links

## Built with

- HTML5, CSS3, JavaScript (no frameworks, no build step)
- Google Fonts (Bangers, Comic Neue)
- Comic-book visual style: ink outlines, halftone dots, speech bubbles and panel layouts
- Two themes: full-colour comic and a black-and-white comic dark mode (toggle in the top bar, remembered between visits)

## Project structure

```
index.html          page markup
css/styles.css      styles, animations, responsive layout
js/content.js       all personal content (edit this file to update the site)
js/main.js          rendering, navigation and interactions
assets/             images, favicon, resume
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New → Project** and import the `personal-portfolio` repository.
3. Leave Framework Preset as **Other** and the build settings empty.
4. Click **Deploy**, then open the generated URL and test every link.
