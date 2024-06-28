import React from "react";

function useMediaQuery({ name, query, onActive }) {
  const mediaQuery = React.useMemo(() => window.matchMedia(query), [query]);

  React.useEffect(() => {
    const handleChange = (event) => {
      if (event.matches) {
        onActive(name);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    handleChange({ matches: mediaQuery.matches });

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [mediaQuery, name, onActive]);

  return;
}

export { useMediaQuery };
