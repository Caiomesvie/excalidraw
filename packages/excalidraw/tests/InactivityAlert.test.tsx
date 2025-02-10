
import React from "react";
import { render } from "@testing-library/react";
import { InactivityAlert } from "../components/InactivityAlert";

jest.useFakeTimers(); // Simula timers do JavaScript
const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {}); // Intercepta o alert

describe("InactivityAlert", () => {
  beforeEach(() => {
    jest.clearAllTimers();
    alertMock.mockClear();
  });

  test("Deve exibir um alerta após 30 segundos de inatividade", () => {
    render(<InactivityAlert timeout={30000} />);

    jest.advanceTimersByTime(30000); // Simula 30s

    expect(alertMock).toHaveBeenCalledWith("Você está inativo! Hora de voltar a desenhar!");
  });

  test("Deve resetar o timer ao detectar atividade", () => {
    render(<InactivityAlert timeout={30000} />);

    jest.advanceTimersByTime(15000); // Passa 15s
    document.dispatchEvent(new Event("mousemove")); // Simula atividade
    jest.advanceTimersByTime(20000); // Passa mais 20s (total 35s desde o início)

    expect(alertMock).not.toHaveBeenCalled(); // O alerta NÃO deve ter sido chamado
  });
});
