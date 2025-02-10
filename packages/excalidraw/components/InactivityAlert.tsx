import { useEffect, useRef } from "react";

export const InactivityAlert: React.FC<{ timeout?: number }> = ({ timeout = 30000 }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      alert("Você está inativo! Hora de voltar a desenhar!");
    }, timeout);
  };

  useEffect(() => {
    const handleActivity = () => resetTimer();

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("mousedown", handleActivity);
    document.addEventListener("keydown", handleActivity);

    resetTimer(); // Inicia o timer ao carregar

    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("mousedown", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeout]);

  return null;
};
