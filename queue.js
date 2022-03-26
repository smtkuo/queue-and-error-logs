class Queue {
  constructor() { 
    this.log = {success:0, error:0, errorLog:[]}
    this.settings = {}
    this.f = {}
    this.items = []
    this.iterations = 0
    this.started = false
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async additem(item) {
    if (typeof item == 'undefined') throw new Error('There is nothing to add to the queue.')
    return this.items.push(item)
  }

  async shift() {
    return this.items.shift()
  }

  async start(settings={}) {
    this.settings = settings
    this.started = true

    while (this.started == true) {
      this.tick(settings)
      if(this.settings.delay) await this.sleep(this.settings.delay)
    }
  }

  async tick(settings) {
    if (typeof this.items[0] == 'undefined') return

    const run = this.items[0]
    if (this.f[run.callback] == 'undefined' || run.object == 'undefined'){
      return
    }

    try{ 
      if(this.settings.showMessage) console.log("Run: "+run.callback);
      this.f[run.callback](run.object) 
      ++this.log["success"]
    }catch(e){ 
      ++this.log["error"]
      if(this.settings.errorLog) this.log.errorLog.unshift(e)
      if(this.settings.showMessage) console.log(e)
      if(this.settings.errorLogLimit){
        if(this.log.errorLog.length>this.settings.errorLogLimit) this.log.errorLog.pop()
      }
      if(this.settings.showLogs) console.log(this.log)
    }

    this.items.shift()
    this.iterations++
  }

  async getLog(){
    return this.log;
  }

  async clear() {
    this.items = []
    this.iterations = 0;
  }

  async stop() {
    return this.started = false
  }

  async first() {
    return this.items[0]
  }

  async resetItems(Items) {
    this.items = Items
  }

  async addCallback(key, f) {
    if (typeof key == 'undefined' || typeof f == 'undefined') throw new Error('There is nothing to add to the function.')
    this.f[key] = f
  }

}

module.exports = Queue