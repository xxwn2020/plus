import { admin, Resource } from './http'

const tags = new Resource('/site/tags', admin)
const categories = new Resource('/site/tags/tag_categories', admin)

/* 标签相关 */
export default {
  ...tags.map({
    tagList: 'list',
    tagDel: 'del',
    tagSave: 'save'
  }),
  tagCategories: () => (
    admin.get('/site/tags/categories', {
      validateStatus: s => (s === 200)
    })
  ),
  ...categories.map({
    list: 'list',
    del: 'del',
    save: 'save'
  })
}
