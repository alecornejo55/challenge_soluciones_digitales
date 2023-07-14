export const patchCliente = async (id, body) => {
  try {
    const url = `http://localhost:5000/api/clientes/${id}`;
    const resp = await fetch(url, {
      method: 'PATCH',
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
      message: `Error el editar al cliente: ${error.message}`,
    }
  }
}