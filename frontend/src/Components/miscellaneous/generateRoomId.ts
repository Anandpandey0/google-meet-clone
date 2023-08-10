export const generateRandom = () => {
    const segmentLength = 3;
    const totalLength = 9;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
  
    for (let i = 0; i < totalLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
  
    const segments = [];
    for (let i = 0; i < totalLength; i += segmentLength) {
      segments.push(randomString.substr(i, segmentLength));
    }
  
    return segments.join('-');
  };
  