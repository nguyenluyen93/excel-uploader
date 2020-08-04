import { assign, find } from 'lodash'

function resolveJobItems(job = [], jobStatus = []) {
  return job.map(item => assign(item, find(jobStatus, { Uuid: item.id })))
}

export { resolveJobItems as default }
