/// <reference types="@cloudflare/workers-types" />

declare global {
  interface TurnstileRenderOptions {
    sitekey: string;
    theme?: "light" | "dark" | "auto";
    callback?: (token: string) => void;
    "error-callback"?: () => void;
    "expired-callback"?: () => void;
  }

  interface TurnstileInstance {
    render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
    getResponse: (widgetId?: string) => string | undefined;
    reset: (widgetId?: string) => void;
    remove: (widgetId?: string) => void;
  }

  interface Window {
    turnstile?: TurnstileInstance;
    onTurnstileLoad?: () => void;
  }
}

export {};
