declare module "tailwindcss" {
    interface Config {
      darkMode: string | string[];
      content: string[];
      theme: {
        extend: Record<string, unknown>;
        container: {
          center: boolean;
          padding: string;
          screens: Record<string, string>;
        };
      };
      plugins: unknown[];
    }
    const config: Config;
    export = config;
  }