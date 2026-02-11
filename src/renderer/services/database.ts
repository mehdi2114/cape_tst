import type { Case, Database } from '@/types';

const DB_KEY = 'cape_database';

class DatabaseService {
  private async readDB(): Promise<Database> {
    try {
      // Try Electron first, fallback to localStorage
      if (window.electron) {
        const data = await window.electron.readFile('data/database.json');
        return JSON.parse(data);
      } else {
        const data = localStorage.getItem(DB_KEY);
        return data ? JSON.parse(data) : this.getDefaultDB();
      }
    } catch {
      return this.getDefaultDB();
    }
  }

  private async writeDB(db: Database): Promise<void> {
    try {
      if (window.electron) {
        await window.electron.writeFile('data/database.json', JSON.stringify(db, null, 2));
      } else {
        localStorage.setItem(DB_KEY, JSON.stringify(db, null, 2));
      }
    } catch (error) {
      console.error('Failed to write database:', error);
    }
  }

  private getDefaultDB(): Database {
    return {
      cases: [],
      users: [],
      settings: {}
    };
  }

  async getAllCases(): Promise<Case[]> {
    const db = await this.readDB();
    return db.cases;
  }

  async addCase(caseData: Omit<Case, 'id' | 'createdAt'>): Promise<Case> {
    const db = await this.readDB();
    const newCase: Case = {
      ...caseData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    db.cases.push(newCase);
    await this.writeDB(db);
    return newCase;
  }

  async getCasesByDateRange(startDate: string, endDate: string): Promise<Case[]> {
    const cases = await this.getAllCases();
    return cases.filter(c => c.date >= startDate && c.date <= endDate);
  }

  async searchCases(query: string): Promise<Case[]> {
    const cases = await this.getAllCases();
    const lowerQuery = query.toLowerCase();
    return cases.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) ||
      c.notes.toLowerCase().includes(lowerQuery)
    );
  }
}

export const db = new DatabaseService();
