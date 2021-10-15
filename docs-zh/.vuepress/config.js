// .vuepress/config.js
const DEPLOY_DOMAIN = 'https://docs.filecoin.io'
const pageSuffix = '/'

module.exports = {
  base: '/',
  head: require('./head'),
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Filecoin Docs',
      description: 'Filecoin Documentation'
    }
  },
  markdown: {
    pageSuffix,
    extendMarkdown: md => {
      md.set({
        breaks: true
      })
      md.use(require('markdown-it-video'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-task-lists'))
      md.use(require('markdown-it-deflist'))
    }
  },
  themeConfig: {
    algolia: {
      apiKey: '6c3d7635474cdcd0a0aaf8ca397a4c44',
      indexName: 'filecoin'
    },
    betaTestFormUrl:
      'https://docs.google.com/forms/d/1LVaD1B2uyW6Ff0jfU_iQ5mCeyQcHfyQO6BDD99XAgK0/viewform',
    defaultImage: '/images/social-card.png',
    author: {
      name: 'Filecoin Team',
      twitter: '@filecoin'
    },
    keywords:
      'Filecoin, crypto, mining, blockchain, IPFS, dweb, protocol, libp2p, ipld, multiformats, bitswap, decentralized web, InterPlanetary File System, dapp, documentation, docs, Protocol Labs',
    domain: DEPLOY_DOMAIN,
    docsRepo: 'filecoin-project/filecoin-docs',
    docsDir: 'docs',
    docsBranch: 'master',
    feedbackWidget: {
      docsRepoIssue: 'filecoin-project/filecoin-docs'
    },
    editLinks: false,
    nextLinks: true,
    prevLinks: true,
    logo: '/images/filecoin-symbol-color.svg',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        nav: require('./nav/en'),
        sidebar: {
            '/networks/': [
                '/networks/network-performance',
            ],
          '/get-started/': [
            {
              title: '存储和检索',
              path: '/get-started/store-and-retrieve/',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                ['/get-started/store-and-retrieve/', '在此开始'],
                ['/get-started/store-and-retrieve/set-up', '安装'],
                ['/get-started/store-and-retrieve/store-data', '存储数据'],
                ['/get-started/store-and-retrieve/retrieve-data', '检索数据']
              ]
            },
            {
              title: 'Lotus',
              path: '/get-started/lotus/',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                ['lotus/running-in-the-cloud', '在云端运行'],
                ['lotus/installation', '本地安装'],
                ['lotus/switch-networks', 'Lotus 切换网络'],
                ['lotus/chain', 'Lotus 链管理'],
                ['lotus/send-and-receive-fil', 'Lotus 发送和接收 FIL'],
                ['lotus/multisig', '多重签名钱包'],
                ['lotus/ledger', 'Ledger 钱包支持'],
                ['lotus/upgrades', 'Lotus 升级'],
                ['lotus/tips-running-in-china', 'Lotus 在中国运行的小贴士'],
                ['lotus/backup-and-restore', '备份与还原'],
                ['lotus/configuration-and-advanced-usage', 'Lotus 配置和进阶用法'],
                ['lotus/troubleshooting', 'Lotus 节点故障排除']
              ]
            },
            'explore-the-network',
            [
              'https://proto.school/verifying-storage-on-filecoin/',
              'Protoschool 教程'
            ],
          ],

          '/store/': [
            ['http://slingshot.filecoin.io/', 'Slingshot competition'],
            'slate',
            'starling',
            {
              title: 'LOTUS',
              path: '/store/lotus/',
              sidebarDepth: 2,
              children: [
                ['lotus/store-data', '存储数据'],
                ['lotus/very-large-files', '非常大的文件'],
                ['lotus/retrieve-data', '检索数据'],
                ['lotus/import-data-from-ipfs', '通过IPFS导入数据'],
                ['lotus/store-troubleshooting', '节点故障排除']
              ]
            },
            'filecoin-plus',
            'estuary',
          ],

          '/mine/': [
            'how-mining-works',
            'hardware-requirements',
            'mining-architectures',
            //'storage-sector-lifecycle',
            ['mining-rewards', '挖矿奖励'],
            ['slashing', '惩罚'],
            {
              title: 'LOTUS MINER',
              path: '/mine/lotus/',
              sidebarDepth: 2,
              collapsable: false,
              children: [
                ['lotus/miner-setup', 'Miner 设置'],
                ['lotus/miner-configuration', '配置参考'],
                ['lotus/miner-upgrades', '升级'],
                ['lotus/miner-lifecycle', '生命周期'],
                ['lotus/manage-storage-deals', '管理存储交易'],
                ['lotus/manage-retrieval-deals', '管理检索交易'],
                ['lotus/dynamic-retrieval-pricing', '动态检索定价'],
                ['lotus/custom-storage-layout', '自定义存储布局'],
                ['lotus/sector-pledging', '扇区质押'],
                ['lotus/disputer', '争论者'],
                ['lotus/connectivity', '连接性'],
                ['lotus/miner-addresses', 'Miner 地址'],
                //'lotus/fees-control-and-limits',
                ['lotus/message-pool', '消息池'],
                ['lotus/seal-workers', 'Seal workers'],
                ['lotus/split-markets-miners', '拆分主要 Miner 和 Market流程'],
                ['lotus/dagstore', '关于 dagstore'],
                ['lotus/benchmarks', '基准测试'],
                ['lotus/backup-and-restore', '备份和恢复'],
                ['lotus/gpus', '自定义 GPU'],
                //'lotus/disaster-recovery',
                ['lotus/tips-running-in-china', '在中国运行的小窍门'],
                ['lotus/miner-troubleshooting', '故障排除']
              ]
            }
          ],

          '/build/': [
            'get-started',
            'textile-buckets',
            'hosted-powergate',
            'hosted-lotus',
            'powergate',
            'estuary',
            {
              title: 'Lotus',
              path: '/build/lotus/',
              sidebarDepth: 2,
              collapsable: true,
              children: [
                ['lotus/lotus-lite', 'Lite 节点'],
                ['lotus/enable-remote-api-access', '启用远程 API 访问'],
                ['lotus/api-tokens', 'API tokens'],
                ['lotus/api-client-libraries', 'API 客户端库'],
                ['lotus/go-json-rpc', '将Go与JSON-RPC API结合使用'],
                ['lotus/payment-channels', '付款渠道'],
                ['lotus/troubleshooting', 'API故障排除']
              ]
            },
            'filecoin-pinning-services',
            'signing-libraries',
            ['local-devnet', 'Local devnet']
          ],

          '/reference/': [
            'glossary',
            ['https://github.com/filecoin-project/specs', 'Specification'],
            ['lotus-api', 'Lotus API']
          ],

          '/': [
            '/about-filecoin/what-is-filecoin',
            '/about-filecoin/how-filecoin-works',
            '/about-filecoin/why-filecoin',
            '/about-filecoin/ipfs-and-filecoin',
            '/about-filecoin/filecoin-compared-to',
            '/about-filecoin/managing-assets',
            '/about-filecoin/faq',
            {
              title: 'Filecoin 项目',
              path: '/project/',
              children: [
                [
                  'https://app.instagantt.com/shared/s/1152992274307505/latest',
                  '产品路线图'
                ],
                ['https://research.filecoin.io/', '研究'],
                '/project/related-projects',
                [
                  'https://github.com/filecoin-project/community/blob/master/CODE_OF_CONDUCT.md',
                  '行为准则'
                ],
                [
                  'https://github.com/filecoin-project/community/blob/master/SECURITY.md',
                  '安全性问题'
                ]
              ]
            },

            {
              title: '社区',
              path: '/community/',
              children: [
                {
                  title: '加入社区',
                  sidebarDepth: 2,
                  collapsable: false,
                  children: [
                    '/community/contribute/ways-to-contribute',
                    '/community/chat-and-discussion-forums',
                    ['https://proto.school/#/events', 'ProtoSchool 研究会'],
                    '/community/social-media/social-media'
                  ]
                },
                {
                  title: '编写文档',
                  sidebarDepth: 1,
                  collapsable: false,
                  children: [
                    '/community/contribute/grammar-formatting-and-style',
                    '/community/contribute/writing-guide',
                    '/community/contribute/contribution-tutorial'
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/active-header-links',
      {
        sidebarLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor',
        headerTopOffset: 120
      }
    ],
    '@vuepress/plugin-last-updated',
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: pageSuffix,
        indexSuffix: pageSuffix,
        notFoundPath: '/404/'
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-148766289-2'
      }
    ],
    ['vuepress-plugin-code-copy', { align: 'bottom', color: '#fff' }],
    [
      'vuepress-plugin-medium-zoom',
      {
        selector: '.theme-default-content img',
        delay: 500,
        options: {
          margin: 20,
          background: 'rgba(255,255,255,0.8)',
          scrollOffset: 0
        }
      }
    ],
    [
      'vuepress-plugin-seo',
      {
        siteTitle: ($page, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: ($page, $site) =>
          $page.frontmatter.author || $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
        twitterCard: _ => 'summary_large_image',
        type: $page =>
          ['articles', 'posts', 'blog'].some(folder =>
            $page.regularPath.startsWith('/' + folder)
          )
            ? 'article'
            : 'website',
        url: ($page, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) =>
          $page.frontmatter.image
            ? ($site.themeConfig.domain || '') + $page.frontmatter.image
            : ($site.themeConfig.domain || '') + $site.themeConfig.defaultImage,
        publishedAt: $page =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        customMeta: (add, context) => {
          const { $site, image } = context
          add(
            'twitter:site',
            ($site.themeConfig.author && $site.themeConfig.author.twitter) || ''
          )
          add('image', image)
          add('keywords', $site.themeConfig.keywords)
        }
      }
    ],
    [
      'vuepress-plugin-sitemap',
      {
        hostname: DEPLOY_DOMAIN
      }
    ],
    [
      'vuepress-plugin-robots',
      {
        host: DEPLOY_DOMAIN
      }
    ],
    [
      'vuepress-plugin-canonical',
      {
        // add <link rel="canonical" header (https://tools.ietf.org/html/rfc6596)
        // to deduplicate SEO across all copies loaded from various public gateways
        baseURL: DEPLOY_DOMAIN
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'callout',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'left',
        defaultTitle: ''
      }
    ],
    'vuepress-plugin-check-md',
    'vuepress-plugin-chunkload-redirect',
    'vuepress-plugin-ipfs',
    'vuepress-plugin-tabs'
  ],
  extraWatchFiles: ['.vuepress/nav/en.js']
}
