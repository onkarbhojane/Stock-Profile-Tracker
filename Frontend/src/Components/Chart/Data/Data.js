export const Data = Array.from({ length: 200 }, (_, index) => {
  const time = index;
  return {
    id: index + 1,
    time, 
    price: Math.floor(Math.random() * (1200 - 500 + 1)) + 100,
  };
});
