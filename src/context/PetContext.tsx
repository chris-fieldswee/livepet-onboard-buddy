import { createContext, useContext, useState, ReactNode } from 'react';

// Mock data for pets
const mockPets = [
  {
    id: "1",
    name: "Max",
    species: "Dog",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    name: "Luna",
    species: "Cat",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=100&h=100&fit=crop",
  },
];

type Pet = typeof mockPets[0];

interface PetContextType {
  pets: Pet[];
  activePet: Pet;
  setActivePet: (pet: Pet) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: ReactNode }) => {
  const [pets] = useState(mockPets);
  const [activePet, setActivePetState] = useState(mockPets[0]);

  const setActivePet = (pet: Pet) => {
    setActivePetState(pet);
  };

  return (
    <PetContext.Provider value={{ pets, activePet, setActivePet }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePet must be used within a PetProvider');
  }
  return context;
};
