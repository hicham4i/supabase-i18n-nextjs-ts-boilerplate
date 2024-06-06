# Supabase i18n Next.js TypeScript Boilerplate

This project is a boilerplate for building applications with Next.js, Supabase, and TypeScript. It includes internationalization (i18n) support, light/dark theme and is set up with best practices to get you started quickly.

## Features

- **Next.js**: The React framework for production.
- **Supabase**: An open-source Firebase alternative.
- **TypeScript**: Static type checking for robust and maintainable code.
- **i18n**: Internationalization support using `next-i18next`.
- **next-themes**: For the dark theme.

## Getting Started

### Prerequisites

- Node.js (>= 12.0.0)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hicham4i/supabase-i18n-nextjs-ts-boilerplate.git
   cd supabase-i18n-nextjs-ts-boilerplate
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Configuration

1. Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

2. Configure i18n settings in `next-i18next.config.js` and `i18n.js`.

### Running the Development Server

    ```bash
    npm run dev
    # or
    yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

    ```bash
    npm run build
    npm run start
    # or
    yarn build
    yarn start
    ```

### Linting and Formatting

    ```bash
    npm run lint
    npm run format
    # or
    yarn lint
    yarn format
    ```

## Project Structure

- `pages/`: Contains the application's pages.
- `components/`: Reusable React components.
- `utils/`: Helper functions and utilities.
- `public/`: Static assets like images and fonts.
- `styles/`: Global styles and CSS modules.
- `locales/`: i18n locales files.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [next-i18next](https://github.com/isaachinman/next-i18next)
