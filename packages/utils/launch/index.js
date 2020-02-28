const { cyan, green, blue, white, yellow } = require('chalk')

const { log } = console

function line() {
  log(
    '----------------------------------------------------------------------------'
  )
}

/*


                               _______   __    __  _______  
                              |       \ |  \  |  \|       \ 
 ______ ____   __    __       | $$$$$$$\| $$  | $$| $$$$$$$\
|      \    \ |  \  |  \      | $$__/ $$| $$  | $$| $$__/ $$
| $$$$$$\$$$$\| $$  | $$      | $$    $$| $$  | $$| $$    $$
| $$ | $$ | $$| $$  | $$      | $$$$$$$ | $$  | $$| $$$$$$$\
| $$ | $$ | $$| $$__/ $$      | $$      | $$__/ $$| $$__/ $$
| $$ | $$ | $$ \$$    $$      | $$       \$$    $$| $$    $$
 \$$  \$$  \$$ _\$$$$$$$       \$$        \$$$$$$  \$$$$$$$ 
              |  \__| $$                                    
               \$$    $$                                    
                \$$$$$$                                     


*/


function ascii() {
  log(`${' '.repeat(16)}${yellow('                             _______   __    __  _______  ')}`)
  log(`${' '.repeat(15)}${yellow('                              |       \\ |  \\  |  \\|       \\ ')}`)
  log(`${' '.repeat(15)}${yellow(' ______ ____   __    __       | $$$$$$$\\| $$  | $$| $$$$$$$\\')}`)
  log(`${' '.repeat(15)}${yellow('|      \\    \\ |  \\  |  \\      | $$__/ $$| $$  | $$| $$__/ $$')}`)
  log(`${' '.repeat(10)}${yellow('     | $$$$$$\\$$$$\\| $$  | $$      | $$    $$| $$  | $$| $$    $$')}`)
  log(`${' '.repeat(10)}${yellow('     | $$ | $$ | $$| $$  | $$      | $$$$$$$ | $$  | $$| $$$$$$$\\')}`)
  log(`${' '.repeat(10)}${yellow('     | $$ | $$ | $$| $$__/ $$      | $$      | $$__/ $$| $$__/ $$')}`)
  log(`${' '.repeat(10)}${yellow('     | $$ | $$ | $$\\ $$   $$       | $$      \\ $$    $$| $$    $$')}`)
  log(`${' '.repeat(10)}${yellow('     \\ $$ \\ $$ \\ $$_\\ $$$$$$$      \\ $$       \\ $$$$$$ \\ $$$$$$$ ')}`)
  log(`${' '.repeat(10)}${yellow('                  |  \\__| $$')}`)
  log(`${' '.repeat(10)}${yellow('                   \\ $$   $$')}`)
  log(`${' '.repeat(10)}${yellow('                    \\ $$$$$$')}`)
}

function info(data) {
  let debug = false
  if (
    process.execArgv.includes('--debug') ||
    process.execArgv.includes('--inspect')
  ) {
    debug = true
  }
  const { ENV, PORT, HOST, IP, VERSION, NAME } = data

  log(` ⌛  ${green(new Date())}`)
  log(` ${blue('Name           : ')} ${cyan(`⟁  ${NAME}`)}`)
  log(` ${blue('Environment    : ')} ${cyan(`⚒  ${ENV}`)}`)
  if (debug) log(` ${blue('Debugger       : ')} ${cyan('⚑  True')}`)
  if (PORT) log(` ${blue('Port           : ')} ${cyan(`⚙  ${PORT}`)}`)
  if (HOST) log(` ${blue('Host           : ')} ${cyan(`⌦  ${HOST}`)}`)
  if (IP) log(` ${blue('IP             : ')} ${cyan(`@  ${IP}`)}`)
  log(` ${blue('Version        : ')} ${cyan(`⊜  ${VERSION}`)}`)
  log(` ${blue('Executer User  : ')} ${cyan(`♙  ${process.env.LOGNAME}`)}`)
  log(` ${white(`✂ To stop ${NAME}, press <CTRL> + C at any time`)}`)
}

function init(data) {
  ascii()
  line()
  info(data)
  line()
}

module.exports = init
