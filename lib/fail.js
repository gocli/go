module.exports = function(message) {
  if (message) console.error('go(err):', message);
  process.exit(1);
};
