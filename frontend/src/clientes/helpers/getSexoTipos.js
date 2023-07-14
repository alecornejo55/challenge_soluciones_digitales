export const getSexoTipos = async () => {
  try {
    const url = `http://localhost:5000/api/sexo-tipos`;
    const resp = await fetch( url );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}