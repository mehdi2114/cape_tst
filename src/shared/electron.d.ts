export interface ElectronAPI {
  readFile: (filePath: string) => Promise<string>;
  writeFile: (filePath: string, data: string) => Promise<void>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
