export default {
  SET_JOBS(state, jobs) {
    state.jobs = jobs
  },
  REMOVE_JOB(state, jobId) {
    const jobIndex = state.jobs.findIndex((u) => u.id == jobId)
    state.jobs.splice(jobIndex, 1)
  },
  CREATE_JOB(state, job){
    state.jobs.unshift(job)
  },
  EDIT_JOB(state, job){
    const jobIndex = state.jobs.findIndex((u)=> u.id == job.id)
    Object.assign(state.jobs[jobIndex], job)
  }
}
