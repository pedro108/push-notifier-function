const Chance = require('chance');

const mockAJV = jest.fn();
const chance = new Chance();

mockAJV.mockValidator = jest.fn(() => true);

mockAJV.mockCompile = jest.fn(() => mockAJV.mockValidator);

mockAJV.mockErrorsText = jest.fn(() => chance.sentence());

mockAJV.mockImplementation(() => {
  return {
    compile: mockAJV.mockCompile,
    errorsText: mockAJV.mockErrorsText
  }
});

module.exports = mockAJV;
