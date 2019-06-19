import ManagementRouter from './modules/management'
import OperationRouter from './modules/operation'
import SystemRouter from './modules/system'
import FinanceRouter from './modules/finance'
import TemplateRouter from './modules/template'
// import Report from './modules/report'
// import Promotion from './modules/promotion'
// import Currency from './modules/currency'
// import Feedback from './modules/feedback'
// import Reward from './modules/reward'
import Package from './modules/packages'

export default [
  OperationRouter,
  TemplateRouter,
  FinanceRouter,
  Package,
  ManagementRouter,
  SystemRouter,


  // Report,
  // Promotion,
  // Currency,
  // Reward,
  // Feedback,

]
