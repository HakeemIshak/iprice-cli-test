const { readFile, readFileSync } = require('fs');
const { Printer } = require('../class/Printer')

// Test UpperCase command
test('--upper command should return UPPERCASE string', () => {
  expect(new Printer('--upper', 'Am i uppercase string').result).toMatch('AM I UPPERCASE STRING');
});

// Test Random command
test('--random command should return alternate between upper/lowercawe string', () => {
  expect(new Printer('--random', 'Am i uppercase string').result).toMatch('aM I UpPeRcAsE StRiNg');
});

// Test CSV command
test("--csv command should return 'CSV created!' and generate comma seperated csv based on value", async () => {
  expect(new Printer('--csv', 'Am i uppercase string').result).toMatch('CSV created!');
  readFile('./output.csv', 'utf8', (_err, data) => {
    expect(data).toMatch('A,m, ,i, ,u,p,p,e,r,c,a,s,e, ,s,t,r,i,n,g');
  })
});


