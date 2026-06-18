This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project file structure

Below is the full project layout (generated). Use this as a guide when moving files into the new `src` layout.

```
vibe/
	AGENTS.md
	CLAUDE.md
	eslint.config.mjs
	next-env.d.ts
	next.config.ts
	package.json
	postcss.config.mjs
	README.md
	tsconfig.json
	app/
		globals.css
		layout.tsx
		page.tsx
	public/
		assets/
	src/
		components/
			atoms/
				__examples__/
			molecules/
			organisms/
			layout/
			ui/
			index.ts
			README.md
			atoms/README.md
		constants/
			README.md
		features/
			auth/
			dashboard/
			README.md
		hooks/
			README.md
		lib/
			api/
			analytics/
			README.md
		services/
			api/
			payment/
			README.md
		store/
		styles/
			tokens/
				README.md
		types/
			README.md
		utils/
			index.ts
```

Notes:
- Keep feature slices under `src/features` and reuse UI via `src/components`.
- Add barrel `index.ts` files in subfolders to simplify imports.
- Consider adding `paths` aliases in `tsconfig.json` for `@/components`, `@/lib`, etc.

