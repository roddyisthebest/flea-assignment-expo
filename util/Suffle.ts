export const suffle = (
  dataProps: { viewCount: number; auctionId: number }[],
  rand: number
) => {
  const copyData = [...dataProps];
  for (let index = dataProps.length - 1; index > 0; index--) {
    const randomPosition = Math.floor(rand * (index + 1));
    const temporary = copyData[index];
    copyData[index] = copyData[randomPosition];
    copyData[randomPosition] = temporary;
  }
  return copyData;
};
