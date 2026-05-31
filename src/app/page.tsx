"use client";
import Descascador from "@/components/Descascador";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const initialTime = useRef(Date.now());

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 42200);
  }, [])

  return loading ? (
    <div className="flex items-center h-screen w-full justify-center">
      <div className="flex flex-col items-center w-full">
        <p>Carregando... (<ElapsedTimer initialTimeRef={initialTime} />)</p>
        <div className="mt-2.5 h-3 w-3/4 overflow-hidden rounded-full border-2 border-ink bg-[#F0E6D6]">
          <i className="animate-mocked-42 block h-full w-[40%] bg-[repeating-linear-gradient(45deg,var(--color-carrot),var(--color-carrot)_8px,var(--color-carrotdeep)_8px,var(--color-carrotdeep)_16px)]" />
        </div>
      </div>
    </div>
  ) : (
    <Descascador />
  );
}

function ElapsedTimer({
  initialTimeRef,
}: {
  initialTimeRef: React.RefObject<number>,
}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Inicializa o intervalo de 1 segundo (1000ms)
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - initialTimeRef.current) / 1000));
    }, 100);

    // FUNÇÃO DE LIMPEZA (Crucial para evitar vazamento de memória)
    return () => clearInterval(interval);
  }, []);

  // Função auxiliar para formatar o tempo no padrão MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return <span>{formatTime(seconds)}</span>;
}
