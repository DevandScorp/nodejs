const fs = require('fs');

fs.readFile('./text.txt', (err, data) => {
  console.log(__filename);
  console.log();
  if (err) {
    console.error(err);
  } else {
    console.log(data.toString());// внутри еще можно указать кодировку
  }
});
