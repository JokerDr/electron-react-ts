

const { say } = require('cfonts');
const chalk = require('chalk');

const greeting = () => {
  const cols = process.stdout.columns
  let text = '';
  if (cols > 104) text = 'electron-react'
  else if (cols > 76) text = 'electron-|react'
  else text = false

  if (text) {
    say(text, {
      colors: ['yellow'],
      font: 'simple3d',
      space: false
    })
  } else {
    console.log(chalk.yellow.bold('\n  electron-react'))
  }
  console.log(chalk.yellow('\n  author: 袁庆龙 \n',));
  console.log(chalk.yellow('  github: https://github.com/JokerDr/electron-react-ts \n\n'))
  console.log(chalk.blue('  getting ready...') + '\n')
}

module.exports = {
  greeting
}
