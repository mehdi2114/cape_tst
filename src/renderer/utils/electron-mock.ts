// Mock Electron API for web browser
if (typeof window !== 'undefined' && !window.electron) {
  (window as any).electron = {
    readFile: async (path: string) => {
      const data = localStorage.getItem('cape_' + path);
      if (!data) throw new Error('File not found');
      return data;
    },
    writeFile: async (path: string, data: string) => {
      localStorage.setItem('cape_' + path, data);
    }
  };
}

export {};
