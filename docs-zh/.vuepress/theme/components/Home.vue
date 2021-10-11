<template>
  <main class="home">
    <div class="home-container theme-default-content">
      <Content class="intro" />
      <div class="grid">
        <div
          v-for="(category, i) in manualSidebar"
          :key="i"
          v-bind:class="{
            category: true,
            meta: category.title === 'Community' || category.title === 'Project'
          }"
        >
          <h2>
            <RouterLink :to="category.path" class="title">
              {{ category.title }}
            </RouterLink>
          </h2>
          <p v-for="(item, j) in category.children" :key="j">
            <RouterLink v-if="!isExternal(item.path)" :to="item.path">
              {{ item.title }}
            </RouterLink>
            <a v-else :href="item.path" target="_blank">
              {{ item.title }}
              <OutboundLink />
            </a>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { isExternal } from '@parent-theme/util/'

export default {
  name: 'Home',
  data: function () {
    return {
      manualSidebar: [
        {
          title: '入门',
          path: '/get-started',
          children: [
            {
              title: 'Filecoin 是什么?',
              path: '/about-filecoin/what-is-filecoin'
            },
            {
              title: '如何使用 Filecoin',
              path: '/about-filecoin/how-filecoin-works'
            },
            {
              title: 'Filecoin 网络',
              path: '/about-filecoin/networks'
            },
            {
              title: 'Lotus 安装和设置',
              path: '/get-started/lotus/installation'
            },
            {
              title: 'Lotus 钱包',
              path: '/get-started/lotus/send-and-receive-fil'
            },
            {
              title: 'Filecoin FAQ',
              path: '/about-filecoin/faq'
            },
            {
              title: '相关名词解释',
              path: '/reference/glossary'
            }
          ]
        },
        {
          title: '存储',
          path: '/store',
          children: [
            {
              title: '存储和检索',
              path: '/get-started/store-and-retrieve'
            },
            {
              title: 'Slingshot competition',
              path: 'http://slingshot.filecoin.io/'
            },
            {
              title: '用 Slate 存储数据',
              path: '/store/slate'
            },
            {
              title: '用 Lotus 存储数据',
              path: '/store/lotus/store-data'
            },
            {
              title: '非常大的文件',
              path: '/store/lotus/very-large-files'
            },
            {
              title: '检索数据',
              path: '/store/lotus/retrieve-data'
            },
            {
              title: '通过IPFS导入数据',
              path: '/store/lotus/import-data-from-ipfs'
            }
          ]
        },
        {
          title: '挖矿',
          path: '/mine',
          children: [
            {
              title: '采矿如何运作',
              path: '/mine/how-mining-works'
            },
            {
              title: '硬件要求',
              path: '/mine/hardware-requirements'
            },
            {
              title: '采矿架构',
              path: '/mine/mining-architectures'
            },
            {
              title: 'Lotus Miner 入门',
              path: '/mine/lotus'
            },
            {
              title: 'Lotus Miner 设置',
              path: '/mine/lotus/miner-setup'
            },
            {
              title: '配置参考',
              path: '/mine/lotus/miner-configuration'
            },
            { title: 'Seal workers', path: '/mine/lotus/seal-workers' }
          ]
        },
        {
          title: '部署',
          path: '/build',
          children: [
            {
              title: '使用 Textile Buckets 部署',
              path: '/build/textile-buckets'
            },
            {
              title: '使用 Hosted Powergate 部署',
              path: '/build/hosted-powergate'
            },
            {
              title: '使用 Glif Nodes 部署',
              path: '/build/hosted-lotus'
            },
            {
              title: 'Filecoin 支持的固定服务',
              path: '/build/filecoin-pinning-services'
            },
            {
              title: 'Lotus API',
              path: '/reference/lotus-api'
            },
            {
              title: '实例应用',
              path: '/build/examples'
            },
            {
              title: 'Filecoin 社区资源',
              path:
                'https://github.com/filecoin-project/docs/wiki#community-resources'
            },
            {
              title: '协议规范',
              path: 'https://github.com/filecoin-project/specs'
            }
          ]
        },
        {
          title: '社区',
          path: '/community',
          children: [
            {
              title: '贡献的方式',
              path: '/community/contribute/ways-to-contribute'
            },
            {
              title: '聊天和讨论论坛',
              path: '/community/chat-and-discussion-forums'
            },
            {
              title: '社交媒体',
              path: '/community/social-media/social-media'
            },
            {
              title: '文档: 语法、格式和样式',
              path: '/community/contribute/grammar-formatting-and-style'
            },
            {
              title: '文档: 写作指南',
              path: '/community/contribute/writing-guide'
            },
            {
              title: '文档: 贡献教程',
              path: '/community/contribute/contribution-tutorial'
            }
          ]
        },
        {
          title: '项目',
          path: '/project',
          children: [
            {
              title: '安全 issues',
              path:
                'https://github.com/filecoin-project/community/blob/master/SECURITY.md'
            },
            {
              title: 'Filecoin 改进计划',
              path:
                'https://github.com/filecoin-project/FIPs'
            },
            {
              title: '研究',
              path: 'https://research.filecoin.io/'
            },
            {
              title: '项目相关',
              path: '/project/related-projects'
            },
            {
              title: '行为准则',
              path:
                'https://github.com/filecoin-project/community/blob/master/CODE_OF_CONDUCT.md'
            }
          ]
        }
      ]
    }
  },
  methods: {
    isExternal
  }
}
</script>

<style lang="stylus">
.home .header-anchor {
  display: none;
}
</style>

<style lang="stylus" scoped>
@media (min-width: $MQNarrow) {
  .home {$contentClass}:not(.custom) {
      background: no-repeat url("/images/main-page-background.png");
      background-position: right 3rem;
      background-size: 280px 336px;
  }
}
.home {$contentClass}:not(.custom) > h1:first-child {
    font-weight: normal;
    margin: 0 0 3rem;
}
.home {
    .intro {
	max-width: 500px;
	margin-top: 3rem;
    }
    .grid {
	margin-top: 4rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-flow: row dense;
	grid-auto-rows: auto;
	grid-gap: 32px;
    }
    .category {
	background: linear-gradient(-50deg, #effcf5, #e2f6f7);
	padding: 1em;
    }
    .category.meta {
	background: linear-gradient(-50deg, #dbe7f4, #e9dbf4);
    }
    .category h2 {
	font-weight: normal;
	font-size: 1.4rem;
	border-bottom: none;
	margin: 0 0 0.5rem;
    }
    .category p {
	margin: 0;
    }
    .category a {
	font-weight: normal;
    }
    .category.meta a {
	color: #5c456e;
    }

    .category a.title {
	color: black;
    }

    @media (max-width: $MQNarrow) {
	.grid {
	    grid-template-columns: 1fr;
	    /* grid-auto-rows: minmax(16rem, max-content); */
	    grid-auto-rows: auto;

	}
	.category {
	    grid-column: auto !important;
	    grid-row: auto !important;
	}

	.intro {
	  margin-top: 0;
	}
    }
}
</style>
