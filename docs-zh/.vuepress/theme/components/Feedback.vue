<template>
  <div class="feedback">
    <h3>{{ titleTxt }}</h3>
    <div v-if="!voteSubmitted" class="feedback-actions">
      <button
        class="btn btn-primary"
        :title="yesTxt"
        v-on:click="sendFeedback(evtYes)"
      >
        {{ yesTxt }}
      </button>
      <button
        class="btn btn-primary"
        :title="noTxt"
        v-on:click="sendFeedback(evtNo)"
      >
        {{ noTxt }}
      </button>
    </div>
    <div v-if="voteSubmitted" class="feedback-result">
      <p>{{ thanksTxt }}</p>
    </div>
    <div v-if="editOrIssueLinks" class="feedback-edit-or-issue">
      <EditOrIssue />
    </div>
  </div>
</template>

<script>
import EditOrIssue from './EditOrIssue.vue'

export default {
  data: function() {
    return {
      voteSubmitted: false,
      currentPath: this.$route.path
    }
  },
  methods: {
    sendFeedback: function(evtType) {
      this.voteSubmitted = true

      // bail if ga is not enabled
      if (!window.ga) return

      window.ga('send', 'event', {
        eventCategory: evtType,
        eventAction: 'click',
        eventLabel: this.currentPath
      })
    }
  },
  watch: {
    '$route.path': function(path) {
      this.voteSubmitted = false
      this.currentPath = path
    }
  },
  props: {
    titleTxt: {
      type: String,
      default: '这些信息有用吗？'
    },
    thanksTxt: {
      type: String,
      default: '谢谢你的反馈。'
    },
    evtYes: {
      type: String,
      default: '是'
    },
    evtNo: {
      type: String,
      default: '否'
    },
    yesTxt: {
      type: String,
      default: '是'
    },
    noTxt: {
      type: String,
      default: '否'
    },
    editOrIssueLinks: {
      type: Boolean,
      default: true
    }
  },
  components: {
    EditOrIssue
  }
}
</script>

<style lang="stylus" scoped>
@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.feedback-edit-or-issue {
  padding: 1em 0;
}

.feedback {
  &-result {
    animation: fadein 0.5s;
    min-height: 38px;
    display: flex;
    align-items: center;

    * {
      margin: 0;
    }
  }
}

.feedback-actions {
  display: flex;
  justify-content: center;

  button {
    flex: 1;
  }
}

@media (min-width: $MQMobile) {
  .illustration {
    width: 40%;
    float: right;
  }

  .feedback-actions {
    display: block;
  }
}
</style>
