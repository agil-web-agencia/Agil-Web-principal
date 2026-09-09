export async function onRequestPost(context) {
  try {
    // 1. Lee la variable de entorno de forma segura desde el servidor de Cloudflare Pages
    const apiKey = context.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: {
            message: "La variable de entorno GEMINI_API_KEY no está configurada en Cloudflare Pages."
          }
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // 2. Recibe los datos enviados desde el frontend
    const body = await context.request.json().catch(() => ({}));
    const prompt = body.prompt;

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return new Response(
        JSON.stringify({
          error: {
            message: "El parámetro 'prompt' es requerido."
          }
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // 3. Consulta a la API de Gemini desde Cloudflare (ocultando la clave al usuario)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // 4. Devuelve el resultado al frontend
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: {
          message: error.message || "Error interno al procesar la solicitud."
        }
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
