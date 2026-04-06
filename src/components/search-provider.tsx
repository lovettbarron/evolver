'use client';

import { createContext, useContext } from 'react';
import type { SearchableSession, SearchablePatch } from '@/lib/search';

interface SearchData {
  sessions: SearchableSession[];
  patches: SearchablePatch[];
}

const SearchDataContext = createContext<SearchData>({ sessions: [], patches: [] });

export function SearchProvider({
  children,
  sessions,
  patches,
}: {
  children: React.ReactNode;
  sessions: SearchableSession[];
  patches: SearchablePatch[];
}) {
  return (
    <SearchDataContext.Provider value={{ sessions, patches }}>
      {children}
    </SearchDataContext.Provider>
  );
}

export function useSearchData() {
  return useContext(SearchDataContext);
}
