export interface ChatResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message?: string;
    code?: number;
  };
}

/**
 * Envía un prompt al endpoint backend seguro de Cloudflare Pages (/api/chat).
 * La clave de la API (GEMINI_API_KEY) se mantiene oculta en el servidor.
 */
export async function enviarMensaje(texto: string): Promise<string> {
  if (!texto.trim()) {
    throw new Error('El mensaje no puede estar vacío');
  }

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: texto })
  });

  if (!res.ok) {
    let errorMessage = `Error HTTP ${res.status}`;
    try {
      const errorData = await res.json();
      if (errorData?.error?.message) {
        errorMessage = errorData.error.message;
      }
    } catch {
      // Ignorar si el body no es JSON
    }
    throw new Error(errorMessage);
  }

  const respuesta: ChatResponse = await res.json();

  if (respuesta.error?.message) {
    throw new Error(respuesta.error.message);
  }

  const text = respuesta.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('No se recibió una respuesta válida de la IA');
  }

  return text;
}
