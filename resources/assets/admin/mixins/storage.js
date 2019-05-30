import axios from 'axios'
import md5 from 'js-md5'
import File from '@/api/file'

export default {
  data: () => ({
    uploading: false,
    percentage: 0,
    mutilpleUploading: false,
    mutilplePercentage: 0,
    node: null,
    nodes: []
  }),
  computed: {
    url () {
      const { node = null } = this
      return node ? File.url(node) : ''
    },
    urls () {
      const { nodes = [] } = this
      let urls = []
      nodes.map(node => {
        urls.push({ url: File.url(node.node), name: node.name })
      })
      return urls
    }
  },
  methods: {
    beforeRemoveMutipleDelete ({ name = '' }) {
      return this.$confirm(`确定移除 ${name}？`)
    },
    handleMutipleDelete ({ name = '' }) {
      this.nodes.splice(this.nodes.findIndex(node => (node.name === name)), 1)
    },
    async uploadMultiple ({ file }) {
      const { data: task } = await this.createTask(file)
      const { headers, method, uri, node } = task
      this.mutilpleUploading = true
      const instance = axios.create()
      instance.defaults.timeout = 100000
      instance.defaults.onUploadProgress = ({ loaded, total }) => {
        this.mutilplePercentage = parseInt((loaded / total).toFixed(2) * 100)
      }
      instance.defaults.validateStatus = s => [200, 201, 203, 204].includes(s)
      instance.request({
        method: method.toLowerCase(),
        url: uri,
        headers,
        data: file
      }).then(() => {
        this.$set(this, 'percentage', 0)
        this.nodes.push({ node, name: file.name })
      }).catch(this.showApiError).finally(() => {
        this.mutilpleUploading = false
      })
    },
    /**
     * 视频上传
     * 覆盖upload组件的默认上传事件
     */
    async upload ({ file, callback = null, url = false, column }) {
      const { data: task } = await this.createTask(file)
      const { headers, method, uri, node } = task
      this.uploading = true
      const instance = axios.create()
      instance.defaults.timeout = 100000
      instance.defaults.onUploadProgress = ({ loaded, total }) => {
        this.percentage = parseInt((loaded / total).toFixed(2) * 100)
      }
      instance.defaults.validateStatus = s => [200, 201, 203, 204].includes(s)
      instance.request({
        method: method.toLowerCase(),
        url: uri,
        headers,
        data: file
      }).then(() => {
        if (typeof callback === 'function') {
          callback(url ? File.url(node) : node, column)
        } else {
          this.$set(this, 'percentage', 0)
          this.$set(this, 'node', node)
        }
      }).catch(this.showApiError).finally(() => {
        this.uploading = false
      })
    },
    /**
     * 获取文件md5
     * @param file
     * @returns {Promise<any>}
     */
    hashFile (file) {
      return new Promise(resolve => {
        let reader = new window.FileReader()
        reader.onload = event => resolve(md5(event.target.result))
        reader.readAsArrayBuffer(file)
      })
    },
    /**
     * 服务器创建上传任务
     * @param file
     * @returns {Promise<any>}
     */
    async createTask (file) {
      const result = await this.$api.storage.save(
        {
          filename: file.name,
          size: file.size,
          mime_type: file.type,
          storage: {
            channel: 'public'
          },
          hash: await this.hashFile(file)
        }
      )

      return result
    }
  }
}
