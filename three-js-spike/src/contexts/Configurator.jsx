import { createContext, useContext, useState } from "react";

const ConfiguratorContext = createContext();

export const ConfiguratorProvider = ({ children }) => {
  const [doors, setDoorCount] = useState(1);
  const [doorsColor, setDoorCountColor] = useState("#777777");
  const [windowCount, setwindowCount] = useState(1);
  return (
    <ConfiguratorContext.Provider
      value={{
        doors,
        setDoorCount,
        doorsColor,
        setDoorCountColor,
        windowCount,
        setwindowCount,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  return useContext(ConfiguratorContext);
};
