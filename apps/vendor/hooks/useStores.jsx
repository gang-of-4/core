import { useContext } from 'react';
import { StoresContext } from '@/contexts/StoresContext';

export const useStores = () => useContext(StoresContext);
