// imageHandlers.ts

export const leftImageHandler = (
  currentIndex: number,
  contentArray: Array<{ imgUrl: string; heading: string; para: string }>
) => {
  const prevIndex = (currentIndex - 1 + contentArray.length) % contentArray.length;
  return {
    imgSrc: contentArray[prevIndex].imgUrl,
    heading: contentArray[prevIndex].heading,
    para: contentArray[prevIndex].para,
  };
};

export const rightImageHandler = (
  currentIndex: number,
  contentArray: Array<{ imgUrl: string; heading: string; para: string }>
) => {
  const nextIndex = (currentIndex + 1) % contentArray.length;
  return {
    imgSrc: contentArray[nextIndex].imgUrl,
    heading: contentArray[nextIndex].heading,
    para: contentArray[nextIndex].para,
  };
};
