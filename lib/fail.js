module.exports = function(message) {
  if (message) console.error(message);
  process.exit(1);
};
