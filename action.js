const Jira = require('./common/net/Jira')
module.exports = class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    const issueId = this.argv.issue || this.config.issue || null
    const { comment } = this.argv
    var issueIds = issueId.split(',');

    for(var i = 0; i < issueIds.length; i++) {
      console.log(`Adding comment to ${issueIds[i]}: \n${comment}`)
      await this.Jira.addComment(issueIds[i], { body: comment })
    }

    return {}
  }
}
