Components folder structure (Atomic Design):

- atoms: smallest UI building blocks (Button, Input)
- molecules: composed components (FormField, Card)
- organisms: complex components (Header, Footer)
- layout: layout-specific components (Grid, Container)
- ui: design-system primitives (Icon, ThemeProvider)

Add an `index.ts` barrel in each folder to re-export components.