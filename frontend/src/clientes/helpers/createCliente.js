
export const createCliente = async (body) => {
  try {
    const url = `http://localhost:5000/api/clientes`;
    const resp = await fetch(url, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    return {
      success: resp.ok,
      message: data.message,
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Error el crear cliente: ${error.message}`,
    }
  }
}