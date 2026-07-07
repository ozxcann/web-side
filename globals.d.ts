// Lets TypeScript understand side-effect CSS imports (e.g. `import "./globals.css"`).
// Next.js handles these at build time, but the editor's TS server needs the
// declaration to avoid a "Cannot find module" error.
declare module "*.css";
