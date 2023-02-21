const randomNum = (min: number, max: number, rand: number) => {
  var randNum = Math.floor(rand * (max - min + 1)) + min;
  return randNum;
};

export const suffle = (
  dataProps: { viewCount: number; auctionId: number }[],
  rand: number
) => {
  const copyData = [...dataProps];
  const returnData = [];

  while (true) {
    if (copyData.length === 0) {
      break;
    }
    const num = randomNum(0, copyData.length - 1, rand);
    const obj = copyData[num];
    returnData.push(obj);
    copyData.splice(num, 1);
  }

  return returnData;
};
