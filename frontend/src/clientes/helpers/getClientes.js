export const getClientes = async () => {
  try {
    const url = `http://localhost:5000/api/clientes`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
