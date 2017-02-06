var goLang = require('./go-lang');

function detectCommand(args) {
  var command = args[0];

  // Default
  if (!command) return 'go';

  // Alias
  if (args[0] === 'alias') return 'alias';

  // Go lang
  if (command.match(/^a-z$/i) && goLang.findBinary()) {
    return 'go';
  }

  // Github
  if (command.match(/^[-a-z\d]+\/[-_a-z\d]+$/i)) {
    return 'github';
  }

  // Default
  return 'go';
}

module.exports = detectCommand;
