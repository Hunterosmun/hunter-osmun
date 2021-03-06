import About from './about'
import Sample from './sample'
import Main from './main'
import ConwaysGame from './conways-game/index'
import ConwaysRules from './conways-game/conways-rules'
import ToDo from './to-do'
import Cube from './cube'
import TicTac from './tictac/index'
import TicTacRules from './tictac/rules'

export default [
  { path: '/', component: Main },
  { path: '/about', component: About },
  { path: '/sample', component: Sample },
  { path: '/conways/rules', component: ConwaysRules },
  { path: '/conways', component: ConwaysGame },
  { path: '/todo', component: ToDo },
  { path: '/loadcube', component: Cube },
  { path: '/tictactoetactoe', component: TicTac },
  { path: '/tictactoetactoe/rules', component: TicTacRules }
]
