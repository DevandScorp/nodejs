const fs = require('fs');

const stream = new fs.ReadStream('./text.txt');

stream.on('readable', () => {
  const data = stream.read();
  if (data)console.log(data.toString());
});

stream.on('end', () => {
  console.log('The end');
});
