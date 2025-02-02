import create from 'zustand';
import { TontineData } from '@/types/tontine';

interface TontineState {
  tontines: TontineData[];
  loading: boolean;
  fetchTontines: () => Promise<void>;
  addTontine: (tontine: TontineData) => Promise<void>;
  addMember: (tontineId: string, memberId: string) => Promise<void>;
}

export const useTontineStore = create<TontineState>((set) => ({
  tontines: [],
  loading: false,
  fetchTontines: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/tontines');
      const data = await response.json();
      set({ tontines: data, loading: false });
    } catch (error) {
      console.error('Erreur lors du chargement des tontines:', error);
      set({ loading: false });
    }
  },
  addTontine: async (tontine) => {
    set({ loading: true });
    try {
      const response = await fetch('/api/tontines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tontine)
      });
      const data = await response.json();
      set(state => ({ tontines: [...state.tontines, data], loading: false }));
    } catch (error) {
      console.error('Erreur lors de la création de la tontine:', error);
      set({ loading: false });
    }
  },
  addMember: async (tontineId, memberId) => {
    set({ loading: true });
    try {
      const response = await fetch(`/api/tontines/${tontineId}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ memberId })
      });
      const data = await response.json();
      set(state => ({
        tontines: state.tontines.map(tontine =>
          tontine.id === tontineId ? data : tontine
        ),
        loading: false
      }));
    } catch (error) {
      console.error('Erreur lors de l\'ajout du membre:', error);
      set({ loading: false });
    }
  }
}));
