import { ReactNode, useState, createContext } from "react"

const CURRENT_HOUSEHOLD_ID_SETTING = 'CURRENT_HOUSEHOLD_ID_SETTING';

/* --- Settings context --- */
interface SettingsContextValues {
  currentHouseholdId: string | null,
  setCurrentHouseholdId: (id: string) => string
}

export const SettingsContext = createContext<SettingsContextValues>(undefined!);

export function SettingsProvider(props: {children: ReactNode}) {
  
    const [currentHouseholdId, _setCurrentHouseholdId] = useState<string | null>(localStorage.getItem(CURRENT_HOUSEHOLD_ID_SETTING));

    const setCurrentHouseholdId = (id: string): string => {
        _setCurrentHouseholdId(id);
        localStorage.setItem(CURRENT_HOUSEHOLD_ID_SETTING, id);
        return id;
    };

    return (
      <SettingsContext.Provider value={{currentHouseholdId, setCurrentHouseholdId}}>
        {props.children}
      </SettingsContext.Provider>
    );
  }