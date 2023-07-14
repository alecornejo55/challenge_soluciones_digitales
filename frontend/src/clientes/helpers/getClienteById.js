export const getClienteById = async (id) => {
  try {
    const url = `http://localhost:5000/api/clientes/${id}`;
    const resp = await fetch( url );
    const data = await resp.json();
    return !resp.ok ? undefined : data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}