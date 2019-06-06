import {admin, Resource} from './http'

const feedBack = new Resource('/conversations', admin)

export default {
    ...feedBack.map({
      list: 'list',
      del: 'del'
    })
}
