export const fetchCalls = async () => {
  const res = await fetch(
    "https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr"
  );
  return res.json();
};