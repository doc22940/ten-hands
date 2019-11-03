interface AllowedTerminalOptions {
  fontFamily?: string;
}

interface IConfig {
  port: string | number;
  enableTerminalTheme: boolean;
  terminalOptions?: AllowedTerminalOptions;
}
