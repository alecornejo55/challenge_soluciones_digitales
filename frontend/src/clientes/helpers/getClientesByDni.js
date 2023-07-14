export const getClientesByDni = async (dni) => {
  try {
    const url = `http://localhost:5000/api/clientes/dni/${dni}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
