
export default {
  getAll: (state) => state.jobs,
  getOne: state => (jobId) => state.jobs.find((job) => job.id == jobId),
}
