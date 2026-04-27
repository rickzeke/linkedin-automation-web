/* ============================================
   LinkReach Pro — app.js
   AI-Powered LinkedIn/Maimai Marketing Tool
   ============================================ */

// ──────────────────────────────────────────────
// State & Constants
// ──────────────────────────────────────────────

const STATE = {
  currentTab: 'generator',
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  selectedDate: null,
  editingScheduleId: null,
  currentPlatform: 'linkedin',
  currentTone: 'professional',
  generatedContent: null,
  dailyUsage: 0,
  maxDailyUsage: 5,
  selectedCategory: 'all',
};

const CONTENT_TEMPLATES = {
  thought: {
    linkedin: [
      `💡 **{tone_adj}行业洞察：{industry}的未来趋势**

在{industry}领域深耕{experience}年，我观察到三个关键变化正在重塑行业格局：

1️⃣ **{trend1}** — {explanation1}
2️⃣ **{trend2}** — {explanation2}  
3️⃣ **{trend3}** — {explanation3}

这些趋势不仅仅改变了我们的工作方式，更重要的是它们在重新定义{industry}的价值主张。

作为{position}，我认为现在正是拥抱变化的最佳时机。那些能够快速适应新范式的企业和个人，将在下一轮竞争中占据绝对优势。

你所在的行业发生了什么变化？欢迎在评论区分享你的观察 👇`,
    ],
    maimai: [
      `💡 **做了{experience}年{industry}，想跟你分享3个真心话**

最近跟很多同行交流，发现大家面临的挑战其实很相似。今天不聊虚的，直接上干货：

1️⃣ 很多人问**{trend1}**到底是不是伪需求？我的答案是：{explanation1}
2️⃣ **{trend2}**听起来高大上，但落地要过三关：技术、人才、认知
3️⃣ 最容易被忽视的是**{trend3}**——{explanation2}

说实话，在这个行业越久，越觉得保持学习力比什么都重要。与其焦虑变化，不如拥抱变化。

各位{position}朋友们，你们今年最大的挑战是什么？来评论区聊聊 🤝`,
    ],
  },
  casestudy: {
    linkedin: [
      `📊 **Case Study: How We Achieved {metric}% Improvement in {industry}**

I'm excited to share a real case from our recent engagement:

**The Challenge:**
A leading {industry} company was struggling with {challenge}. Their existing approach was {problem}.

**Our Approach:**
We implemented a {solution_framework} that focused on:
• {step1}
• {step2}
• {step3}

**The Results:**
📈 {metric}% improvement in key metrics
⏱️ {timeframe}% reduction in turnaround time
💰 Significant cost savings

**Key Takeaway:**
The most impactful changes don't always require massive investments — sometimes it's about working smarter, not harder.

Want to explore how this could work for your {industry} business? Let's connect! 🤝`,
    ],
    maimai: [
      `📊 **案例复盘：{industry}行业{position}如何用{timeframe}个月实现{metric}%增长**

做{position}这些年，踩过坑也拿到过结果。今天完整复盘一个近期的实战案例：

**背景：**
一家{industry}企业面临{challenge}的困境

**破局思路：**
我们没有走传统路线，而是选择了{step1}作为突破口，然后{step2}，最后{step3}

**关键数据：**
✅ 核心指标提升{metric}%
✅ 周期缩短{timeframe}%
✅ 团队效能翻倍

**复盘心得：**
很多时候不是资源不够，而是思路没打开。

各位朋友有什么实操经验想分享的？评论区讨论一下 👇`,
    ],
  },
  tips: {
    linkedin: [
      `🔧 **{count} Game-Changing Tips for {position}s in {industry}**

After {experience} years in {industry}, here are the strategies that consistently deliver results:

1️⃣ **{tip1}**
{tip1_detail}

2️⃣ **{tip2}**
{tip2_detail}

3️⃣ **{tip3}**
{tip3_detail}

💡 **Bonus Tip:** {bonus_tip}

Which of these resonates most with your experience? I'd love to hear your thoughts below 👇`,
    ],
    maimai: [
      `🔧 **干了{experience}年{position}，分享{count}个避坑指南**

做{industry}这行，学费交了不少。今天掏心窝子分享{count}条实战经验：

1️⃣ **{tip1}**
说白了就是：{tip1_detail}

2️⃣ **{tip2}**
很多新手都会卡在这里：{tip2_detail}

3️⃣ **{tip3}**
这条值千金：{tip3_detail}  

💡 **压箱底的秘诀：** {bonus_tip}

各位同行还有什么独家经验？别藏着掖着，评论区见 🤝`,
    ],
  },
  story: {
    linkedin: [
      `📖 **My Journey: From {before} to {after} in {industry}**

{experience} years ago, I was {before_description}. Today, I'm fortunate to {after_description}.

The path wasn't linear, and I'm grateful for every challenge that shaped me:

**The Turning Point:**
{turning_point}

**What I Learned:**
✨ {lesson1}
✨ {lesson2}
✨ {lesson3}

To everyone on their own journey in {industry}: keep going. The lessons that feel hardest today become your greatest assets tomorrow.

What's been your biggest career turning point? Share your story 👇`,
    ],
    maimai: [
      `📖 **从{before}到{after}：我的{experience}年{industry}之路**

{experience}年前刚入行的时候，我是典型的{before_description}。现在回头看，感谢那个笨拙但坚持的自己。

**转折点：**
{turning_point}

**三个改变我职业生涯的认知：**
✨ {lesson1}
✨ {lesson2}
✨ {lesson3}

说这些不是凡尔赛，是想告诉还在路上的朋友：没有人一开始就什么都会，重要的是持续行动。

兄弟们，你们职场中最大的转折点是什么？来聊聊 💪`,
    ],
  },
  news: {
    linkedin: [
      `📰 **Breaking Down the Latest {industry} Developments**

The {industry} landscape just shifted with recent announcements around {topic}. Here's my analysis:

**What Happened:**
{event_description}

**Why It Matters for {position}s:**
1️⃣ {impact1}
2️⃣ {impact2}
3️⃣ {impact3}

**My Take:**
{opinion}

This is a space worth watching closely. What's your perspective on these developments?`,
    ],
    maimai: [
      `📰 **深度解读：{industry}行业最新动态，作为{position}你怎么看？**

最近关于{topic}的消息刷屏了，作为业内人，说说我的看法：

**事件要点：**
{event_description}

**对我们{position}的影响：**
1️⃣ {impact1}
2️⃣ {impact2}
3️⃣ {impact3}

**我的观点：**
{opinion}

不同意请轻喷 😂 评论区亮出你的观点`,
    ],
  },
  question: {
    linkedin: [
      `❓ **Question for the {industry} Community**

I've been thinking about {topic} lately, and I'd love to tap into the collective wisdom here:

🤔 {question_main}

{context}

I'm genuinely curious to hear different perspectives. Whether you're a seasoned {position} or just starting out, your insights are valuable.

Drop your thoughts in the comments — let's learn from each other! 👇`,
    ],
    maimai: [
      `❓ **真诚发问：在座各位{position}，{topic}你们怎么看？**

最近在做{context}的时候碰到一个纠结的问题：

🤔 {question_main}

我自己目前的想法是{opinion_context}，但说实话还在探索阶段。

各路大神，给点建议？评论区等你 👇`,
    ],
  },
  achievement: {
    linkedin: [
      `🏆 **Thrilled to Share: {achievement} in {industry}!**

I'm incredibly proud to announce that we've {achievement_description}!

This milestone represents:
• {months} months of hard work
• An amazing team that made it possible
• A shared commitment to {value}

**Grateful for:**
🙏 My team who went above and beyond
🙏 Our partners who believed in the vision
🙏 The {industry} community for the inspiration

Achievements are never solo efforts — they're built on the support of many.

To everyone pursuing ambitious goals in {industry}: keep pushing. Your breakthrough moment is coming. 💪`,
    ],
    maimai: [
      `🏆 **里程碑达成！分享一下{industry}行业的新突破**

做了{months}个月，终于拿下{achievement_description}！忍不住想跟大家分享这份喜悦 🎉

**几个关键数字：**
📊 {metric1}
📈 {metric2}
🎯 {metric3}

**最想感谢的：**
🙏 团队的小伙伴们，这段时间辛苦你们了
🙏 合作的客户，信任无价
🙏 一直在支持的家人和朋友

下一个目标已经在路上了。同行们，一起加油 💪

在{industry}做{position}的兄弟们，你们最近有什么好消息吗？`,
    ],
  },
};

const PLACEHOLDER_DATA = {
  industries: {
    tech: {
      name: '科技/互联网',
      trends: ['AI Agent应用爆发', '边缘计算规模化', '开源商业模式重构'],
      explanations: [
        'AI正在从辅助工具升级为自主决策引擎，这彻底改变了产品架构',
        '数据处理从云端下沉到终端，实时性和隐私保护成为新标准',
        '开源不再只是代码共享，而是生态协作的全新范式',
      ],
    },
    finance: {
      name: '金融/投资',
      trends: ['数字货币合规化', 'ESG投资主流化', '嵌入式金融服务'],
      explanations: [
        '监管框架日趋成熟，数字货币从概念走向实际应用场景',
        '环境社会治理不再只是口号，已经成为投资决策的核心指标',
        '金融产品正无缝融入各种消费场景，获客模式被彻底改变',
      ],
    },
    healthcare: {
      name: '医疗健康',
      trends: ['AI辅助诊断', '远程医疗常态化', '个性化精准医疗'],
      explanations: [
        '深度学习在影像诊断中的准确率已超过人类医生平均水平',
        '疫情加速了远程医疗立法，患者习惯已经不可逆转地改变',
        '基因测序成本下降使个体化治疗方案成为可能',
      ],
    },
    education: {
      name: '教育/培训',
      trends: ['AI个性化学习', '技能微证书兴起', '终身学习平台化'],
      explanations: [
        '自适应学习系统能根据每个学生的进度动态调整内容和难度',
        '传统的学历认证正在被技能的模块化认证体系所补充',
        '职业发展驱动的学习需求催生了新型平台经济',
      ],
    },
    manufacturing: {
      name: '制造业',
      trends: ['工业4.0落地加速', '数字孪生技术普及', '绿色制造转型'],
      explanations: [
        '智能工厂从试点走向规模化部署，ROI数据越来越清晰',
        '虚拟模型与现实产线实时同步，大幅降低试错成本',
        '碳中和目标推动制造流程全面升级换代',
      ],
    },
    retail: {
      name: '零售/电商',
      trends: ['社交电商融合', 'AI选品与定价', '全渠道体验升级'],
      explanations: [
        '内容和交易边界模糊，从种草到购买只需一个短视频',
        '算法驱动的选品策略让库存周转率有了数量级提升',
        '线上线下的数据打通让消费者获得无缝的购物体验',
      ],
    },
    consulting: {
      name: '咨询/服务',
      trends: ['AI增强咨询服务', '订阅制服务模式', '行业垂直化深耕'],
      explanations: [
        '基础分析工作被AI承接，顾问的价值向战略洞察迁移',
        '一次性项目交付正在被持续的陪伴式服务所取代',
        '通用型咨询竞争力下降，垂直行业的深度专业护城河更宽',
      ],
    },
    realestate: {
      name: '房地产',
      trends: ['智慧社区建设', '存量运营转型', 'ESG驱动价值重估'],
      explanations: [
        'IoT技术让社区管理和服务效率实现质的飞跃',
        '从开发逻辑转向运营逻辑，持有型资产的精细化运营成为新战场',
        '绿色建筑评级直接影响资产估值和市场流动性',
      ],
    },
  },
  tips: {
    tech: ['构建技术壁垒', '敏捷开发实践', 'C端产品到B端的迁移策略'],
    finance: ['风险管理框架', '客户信任建立', '数据驱动的投资决策'],
    healthcare: ['医患沟通优化', '医疗合规策略', '数字化患者旅程'],
    education: ['课程设计方法论', '学员激活策略', '学习效果的可视化评估'],
    manufacturing: ['精益生产优化', '供应链韧性建设', '质量文化的系统化构建'],
    retail: ['私域流量运营', '爆品打造逻辑', '复购率提升的核心公式'],
    consulting: ['问题诊断框架', '客户关系管理', '从方案到落地的转化秘籍'],
    realestate: ['项目定位四步法', '客户转化漏斗', '社区运营的长期主义'],
  },
  bonusTips: [
    '坚持输出比追求完美更重要，先完成再完美',
    '跟行业高手建立真正的连接，而不是无脑加好友',
    '数据不说谎，养成用数据说话的习惯',
  ],
  turningPoints: [
    '那是在一次关键项目中，我意识到旧的思维方式解决不了新问题，于是决定从零开始重塑自己的知识体系',
    '被拒绝的第47次，我没有放弃，反而在每次被拒中总结了客户的真实需求，最终找到了突破口',
    '市场突然转向，传统打法全部失效，我被迫跳出舒适圈，却因此发现了一片蓝海',
  ],
  lessons: [
    '专业能力决定下限，人际连接决定上限',
    '快是一种能力，慢是一种智慧 — 在正确的事情上保持耐心',
    '拥抱不确定性，而不是试图消除它',
    '真正的成长发生在你承认"我不懂"的那一刻',
    '影响他人的最好方式是先让自己变得更好',
  ],
  topics: ['组织变革', '新老员工融合', '跨部门协作', '远程工作效率', '客户体验升级'],
  questions: [
    '你们团队最有效的管理实践是什么？',
    '在资源有限的情况下，优先投入哪个方向？',
    'AI工具真的能提升一线的实际效率吗？',
    '如何平衡短期业绩压力和长期战略投入？',
  ],
  achievements: ['超额完成年度目标', '拿下了行业标杆客户', '团队规模扩大两倍', '获得行业权威奖项'],
  metricValues: ['35', '50', '80', '120', '200', '300'],
  timeFrames: ['6', '12', '18', '24'],
  challenges: ['客户增长停滞', '团队效率瓶颈', '市场竞争加剧', '数字化转型压力'],
  solutions: ['数据驱动决策', '敏捷迭代', '生态合作战略', '客户成功体系'],
  steps: ['重新定义目标用户画像', '建立关键指标体系', '引入跨部门协作机制', '打造标杆案例并复制', '构建反馈闭环快速迭代'],
  opinions: [
    '我认为这是一个结构性变化，而非短期波动。行业将在未来3-5年经历深层次重塑。',
    '谨慎乐观。技术方向是对的，但落地节奏需要更多耐心。',
    '机遇大于挑战。那些能够快速学习并适应的团队将获得超额回报。',
  ],
  context: [
    '我们团队最近在推进一个重要项目，涉及多个部门的协同',
    '在当前经济环境下，企业都在寻求降本增效的有效路径',
    '随着AI技术的快速发展，传统工作模式正在被重新定义',
  ],
};

// ──────────────────────────────────────────────
// Data Layer (localStorage)
// ──────────────────────────────────────────────

const DB = {
  _prefix: 'linkreach_',

  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(this._prefix + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },

  set(key, value) {
    try { localStorage.setItem(this._prefix + key, JSON.stringify(value)); } catch {}
  },

  getSchedules() { return this.get('schedules', []); },
  setSchedules(v) { this.set('schedules', v); },

  getLeads() { return this.get('leads', []); },
  setLeads(v) { this.set('leads', v); },

  getFavorites() { return this.get('favorites', []); },
  setFavorites(v) { this.set('favorites', v); },

  getDailyUsage() { return this.get('dailyUsage', { date: '', count: 0 }); },
  setDailyUsage(v) { this.set('dailyUsage', v); },

  getNextId(prefix) { return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); },
};

// ──────────────────────────────────────────────
// Toast System
// ──────────────────────────────────────────────

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ──────────────────────────────────────────────
// Navigation System
// ──────────────────────────────────────────────

function switchTab(tab) {
  STATE.currentTab = tab;

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tab);
  });

  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.toggle('active', section.id === `tab-${tab}`);
  });

  const titles = {
    generator: 'AI内容生成器',
    calendar: '排期日历',
    leads: '线索管理',
    analytics: '数据分析',
    templates: '模板库',
  };
  const crumbs = {
    generator: 'AI内容生成',
    calendar: '排期日历',
    leads: '线索管理',
    analytics: '数据分析',
    templates: '模板库',
  };
  document.getElementById('pageTitle').textContent = titles[tab] || 'AI内容生成器';
  document.getElementById('breadcrumbCurrent').textContent = crumbs[tab] || 'AI内容生成';

  if (tab === 'calendar') renderCalendar();
  if (tab === 'leads') renderKanban();
  if (tab === 'analytics') renderAnalytics();
  if (tab === 'templates') renderTemplates();
  if (tab === 'generator') updateUsageBadge();
}

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => switchTab(item.dataset.tab));
});

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('collapsed');
}

// ──────────────────────────────────────────────
// Daily Usage Tracking
// ──────────────────────────────────────────────

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function checkDailyUsage() {
  const usage = DB.getDailyUsage();
  const today = getToday();
  if (usage.date !== today) {
    STATE.dailyUsage = 0;
    DB.setDailyUsage({ date: today, count: 0 });
  } else {
    STATE.dailyUsage = usage.count;
  }
}

function incrementDailyUsage() {
  STATE.dailyUsage++;
  const today = getToday();
  DB.setDailyUsage({ date: today, count: STATE.dailyUsage });
}

function canGenerate() {
  return STATE.dailyUsage < STATE.maxDailyUsage;
}

function updateUsageBadge() {
  const badge = document.getElementById('usageBadge');
  if (badge) {
    const remaining = STATE.maxDailyUsage - STATE.dailyUsage;
    badge.textContent = `今日剩余: ${remaining}条`;
    badge.style.color = remaining <= 1 ? 'var(--danger)' : '';
  }
}

// ──────────────────────────────────────────────
// AI Content Generator
// ──────────────────────────────────────────────

// Platform toggle
document.querySelectorAll('.platform-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.platform-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    STATE.currentPlatform = this.dataset.platform;
  });
});

// Tone selector
document.querySelectorAll('.tone-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    STATE.currentTone = this.dataset.tone;
  });
});

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function fillTemplate(template, vars) {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return result;
}

function buildTemplateVars(industryKey, positionKey, contentType) {
  const ind = PLACEHOLDER_DATA.industries[industryKey];
  const tipsArr = (PLACEHOLDER_DATA.tips[industryKey] || PLACEHOLDER_DATA.tips.tech);

  const toneAdjMap = {
    professional: '深度',
    inspirational: '令人振奋的',
    casual: '接地气的',
    humorous: '有趣又有料的',
  };

  const experienceMap = {
    tech: '10', finance: '8', healthcare: '6', education: '5',
    manufacturing: '12', retail: '7', consulting: '8', realestate: '9',
  };

  const positionNames = {
    sales: '销售负责人', recruiter: '资深猎头', marketing: '市场总监',
    engineer: '技术负责人', executive: '创始人', consultant: '咨询顾问', product: '产品经理',
  };

  return {
    tone_adj: toneAdjMap[STATE.currentTone] || '深度',
    industry: ind ? ind.name : 'we work in',
    position: positionNames[positionKey] || 'professionals',
    experience: experienceMap[industryKey] || '8',
    trend1: ind ? ind.trends[0] : '',
    trend2: ind ? ind.trends[1] : '',
    trend3: ind ? ind.trends[2] : '',
    explanation1: ind ? ind.explanations[0] : '',
    explanation2: ind ? ind.explanations[1] : '',
    explanation3: ind ? ind.explanations[2] : '',
    metric: pick(PLACEHOLDER_DATA.metricValues),
    challenge: pick(PLACEHOLDER_DATA.challenges),
    problem: 'optimizing their workflows in traditional ways',
    solution_framework: pick(PLACEHOLDER_DATA.solutions),
    step1: PLACEHOLDER_DATA.steps[0],
    step2: PLACEHOLDER_DATA.steps[1],
    step3: PLACEHOLDER_DATA.steps[2],
    timeframe: pick(PLACEHOLDER_DATA.timeFrames),
    tip1: tipsArr[0],
    tip1_detail: PLACEHOLDER_DATA.steps[0],
    tip2: tipsArr[1],
    tip2_detail: PLACEHOLDER_DATA.steps[1],
    tip3: tipsArr[2],
    tip3_detail: PLACEHOLDER_DATA.steps[2],
    bonus_tip: pick(PLACEHOLDER_DATA.bonusTips),
    count: '3',
    before: 'junior',
    after: 'senior',
    before_description: '刚入行时什么都不懂，连行业术语都说不利索',
    after_description: 'lead a team building innovative solutions',
    turning_point: pick(PLACEHOLDER_DATA.turningPoints),
    lesson1: PLACEHOLDER_DATA.lessons[0],
    lesson2: PLACEHOLDER_DATA.lessons[1],
    lesson3: PLACEHOLDER_DATA.lessons[2],
    topic: pick(PLACEHOLDER_DATA.topics),
    event_description: '最新的行业报告显示AI技术在核心业务场景中的应用已经达到一个关键拐点',
    impact1: '业务模式和竞争格局将发生根本性转变',
    impact2: '人才需求和技能要求将快速迭代',
    impact3: '监管和合规框架需要重新评估',
    opinion: pick(PLACEHOLDER_DATA.opinions),
    question_main: pick(PLACEHOLDER_DATA.questions),
    context: pick(PLACEHOLDER_DATA.context),
    opinion_context: '先从小范围试点开始，拿到数据再逐步推广',
    achievement: pick(PLACEHOLDER_DATA.achievements),
    achievement_description: '团队突破了一个重要的技术瓶颈，实现了产品从概念到交付的完整闭环',
    months: pick(PLACEHOLDER_DATA.timeFrames),
    value: '推动行业发展的技术卓越',
    metric1: '核心指标提升200%',
    metric2: '客户满意度达到98%',
    metric3: '团队从5人增长到30人',
  };
}

function generateContent() {
  if (!canGenerate()) {
    showToast('今日生成次数已用完，请明天再来或升级至Pro版', 'error');
    return;
  }

  const industry = document.getElementById('industry').value;
  const position = document.getElementById('position').value;
  const contentType = document.getElementById('contentType').value;
  const keywords = document.getElementById('keywords').value.trim();

  if (!industry || !position) {
    showToast('请选择行业和职位后生成内容', 'error');
    return;
  }

  incrementDailyUsage();
  updateUsageBadge();

  const vars = buildTemplateVars(industry, position, contentType);
  const typeTemplates = CONTENT_TEMPLATES[contentType] || CONTENT_TEMPLATES.thought;
  const platforms = STATE.currentPlatform === 'both' ? ['linkedin', 'maimai'] : [STATE.currentPlatform];

  const generated = {};
  platforms.forEach(platform => {
    const templates = typeTemplates[platform] || typeTemplates.linkedin;
    const template = pick(templates);
    generated[platform] = fillTemplate(template, vars);
  });

  // Inject keywords
  if (keywords) {
    const keywordList = keywords.split(/[,，\s]+/).filter(Boolean);
    const hashtags = keywordList.map(k => `#${k}`);
    Object.keys(generated).forEach(platform => {
      generated[platform] += '\n\n' + hashtags.join(' ');
    });
  }

  STATE.generatedContent = generated;
  renderGeneratedContent(generated);
  showToast('内容生成成功！', 'success');
}

function renderGeneratedContent(generated) {
  const placeholder = document.getElementById('outputPlaceholder');
  const outputContent = document.getElementById('outputContent');
  const previews = document.getElementById('platformPreviews');
  const copyBtn = document.getElementById('copyBtn');
  const regenBtn = document.getElementById('regenerateBtn');
  const schedBtn = document.getElementById('scheduleBtn');
  const favBtn = document.getElementById('favBtn');

  placeholder.style.display = 'none';
  outputContent.style.display = 'flex';
  copyBtn.disabled = false;
  regenBtn.disabled = false;
  schedBtn.disabled = false;
  favBtn.disabled = false;

  previews.innerHTML = '';
  Object.entries(generated).forEach(([platform, content]) => {
    const div = document.createElement('div');
    div.className = `platform-preview ${platform === 'maimai' ? 'maimai' : ''}`;
    div.innerHTML = `
      <div class="preview-platform-badge">
        ${platform === 'linkedin' ? '🔗 LinkedIn' : '💼 脉脉'}
      </div>
      <div class="preview-content">${escapeHtml(content)}</div>
    `;
    previews.appendChild(div);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function clearGenerator() {
  document.getElementById('industry').value = '';
  document.getElementById('position').value = '';
  document.getElementById('contentType').value = 'thought';
  document.getElementById('keywords').value = '';

  const placeholder = document.getElementById('outputPlaceholder');
  const outputContent = document.getElementById('outputContent');
  placeholder.style.display = 'flex';
  outputContent.style.display = 'none';

  document.getElementById('copyBtn').disabled = true;
  document.getElementById('regenerateBtn').disabled = true;
  document.getElementById('scheduleBtn').disabled = true;
  document.getElementById('favBtn').disabled = true;

  STATE.generatedContent = null;
  showToast('已清空', 'info');
}

function copyContent() {
  if (!STATE.generatedContent) return;
  const text = Object.values(STATE.generatedContent).join('\n\n---\n\n');
  navigator.clipboard.writeText(text).then(() => {
    showToast('已复制到剪贴板！', 'success');
  }).catch(() => {
    showToast('复制失败，请手动选择文本', 'error');
  });
}

function regenerateContent() {
  const industry = document.getElementById('industry').value;
  const position = document.getElementById('position').value;
  if (!industry || !position) {
    showToast('请选择行业和职位', 'error');
    return;
  }
  if (!canGenerate()) {
    showToast('今日生成次数已用完', 'error');
    return;
  }
  incrementDailyUsage();
  updateUsageBadge();
  const contentType = document.getElementById('contentType').value;
  const vars = buildTemplateVars(industry, position, contentType);
  const typeTemplates = CONTENT_TEMPLATES[contentType] || CONTENT_TEMPLATES.thought;
  const platforms = STATE.currentPlatform === 'both' ? ['linkedin', 'maimai'] : [STATE.currentPlatform];
  const generated = {};
  platforms.forEach(platform => {
    const templates = typeTemplates[platform] || typeTemplates.linkedin;
    const template = pick(templates);
    generated[platform] = fillTemplate(template, vars);
  });
  STATE.generatedContent = generated;
  renderGeneratedContent(generated);
  showToast('内容已重新生成', 'success');
}

function scheduleContent() {
  if (!STATE.generatedContent) return;
  const modal = document.getElementById('scheduleModal');
  modal.classList.add('active');
  // Set default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('scheduleDateInput').value = tomorrow.toISOString().slice(0, 10);
  document.getElementById('schedulePlatformInput').value = STATE.currentPlatform;
}

function confirmSchedule() {
  const date = document.getElementById('scheduleDateInput').value;
  const platform = document.getElementById('schedulePlatformInput').value;
  if (!date) { showToast('请选择日期', 'error'); return; }
  const content = STATE.generatedContent ? (STATE.generatedContent[platform] || Object.values(STATE.generatedContent)[0]) : '';
  const schedules = DB.getSchedules();
  schedules.push({
    id: DB.getNextId('sch'),
    date,
    title: 'AI生成内容',
    content,
    platform,
    tags: [],
    createdAt: Date.now(),
  });
  DB.setSchedules(schedules);
  closeModals();
  renderCalendar();
  switchTab('calendar');
  showToast('已加入排期！', 'success');
}

function favoriteContent() {
  if (!STATE.generatedContent) return;
  const favorites = DB.getFavorites();
  const content = Object.values(STATE.generatedContent).join('\n\n');
  favorites.push({
    id: DB.getNextId('fav'),
    content,
    type: document.getElementById('contentType').value,
    date: getToday(),
  });
  // Keep only 20 most recent
  if (favorites.length > 20) favorites.splice(0, favorites.length - 20);
  DB.setFavorites(favorites);
  showToast('已加入收藏！⭐', 'success');
}

// ──────────────────────────────────────────────
// Content Calendar
// ──────────────────────────────────────────────

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;

  const year = STATE.currentYear;
  const month = STATE.currentMonth;

  document.getElementById('calendarMonthTitle').textContent = `${year}年${month + 1}月`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const schedules = DB.getSchedules();
  const schedulesByDate = {};
  schedules.forEach(s => {
    if (!schedulesByDate[s.date]) schedulesByDate[s.date] = [];
    schedulesByDate[s.date].push(s);
  });

  const today = getToday();
  const dayHeaders = ['日', '一', '二', '三', '四', '五', '六'];

  let html = '';
  dayHeaders.forEach(d => {
    html += `<div class="calendar-day-header">${d}</div>`;
  });

  const totalCells = firstDay + daysInMonth;
  const totalWeeks = Math.ceil(totalCells / 7);
  const totalCellsNeeded = totalWeeks * 7;

  for (let i = 0; i < totalCellsNeeded; i++) {
    let dayNum, dateStr, isOtherMonth;

    if (i < firstDay) {
      dayNum = daysInPrevMonth - firstDay + i + 1;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      isOtherMonth = true;
    } else if (i >= firstDay + daysInMonth) {
      dayNum = i - firstDay - daysInMonth + 1;
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      isOtherMonth = true;
    } else {
      dayNum = i - firstDay + 1;
      dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      isOtherMonth = false;
    }

    let classes = ['calendar-day'];
    if (isOtherMonth) classes.push('other-month');
    if (dateStr === today) classes.push('today');
    if (dateStr === STATE.selectedDate) classes.push('selected');

    const daySchedules = schedulesByDate[dateStr] || [];

    html += `<div class="${classes.join(' ')}" data-date="${dateStr}" onclick="selectDate('${dateStr}', ${isOtherMonth})">
      <div class="day-number">${dayNum}</div>
      <div class="day-posts">`;

    daySchedules.forEach(s => {
      html += `<div class="day-post-indicator ${s.platform}">${s.title.substring(0, 6)}</div>`;
    });

    html += `</div></div>`;
  }

  grid.innerHTML = html;
}

function selectDate(dateStr, isOtherMonth) {
  if (isOtherMonth) return;
  STATE.selectedDate = dateStr;
  renderCalendar();
  showScheduleDetail(dateStr);
}

function showScheduleDetail(dateStr) {
  document.getElementById('selectedDateTitle').textContent = dateStr;
  document.getElementById('scheduleForm').style.display = 'block';
  document.getElementById('deleteScheduleBtn').style.display = 'none';
  document.getElementById('scheduleTitle').value = '';
  document.getElementById('scheduleContent').value = '';
  document.getElementById('scheduleTags').value = '';
  STATE.editingScheduleId = null;

  const schedules = DB.getSchedules();
  const daySchedules = schedules.filter(s => s.date === dateStr);

  const listEl = document.getElementById('scheduledList');
  if (daySchedules.length === 0) {
    listEl.innerHTML = '<p class="empty-text">该日期暂无排期，请在下方添加</p>';
  } else {
    listEl.innerHTML = daySchedules.map(s => `
      <div class="scheduled-item" onclick="editSchedule('${s.id}')">
        <div class="scheduled-item-header">
          <span class="scheduled-item-title">${escapeHtml(s.title)}</span>
          <span class="scheduled-item-platform ${s.platform}">
            ${s.platform === 'linkedin' ? '🔗 LinkedIn' : s.platform === 'maimai' ? '💼 脉脉' : '🔀 双平台'}
          </span>
        </div>
        <div class="scheduled-item-preview">${escapeHtml(s.content.substring(0, 100))}</div>
        ${s.tags && s.tags.length ? `<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap">${s.tags.map(t => `<span class="hashtag">#${escapeHtml(t)}</span>`).join('')}</div>` : ''}
      </div>
    `).join('');
  }
}

function editSchedule(id) {
  const schedule = DB.getSchedules().find(s => s.id === id);
  if (!schedule) return;
  STATE.editingScheduleId = id;
  document.getElementById('scheduleTitle').value = schedule.title;
  document.getElementById('scheduleContent').value = schedule.content;
  document.getElementById('scheduleTags').value = (schedule.tags || []).join(', ');
  document.getElementById('schedulePlatform').value = schedule.platform;
  document.getElementById('deleteScheduleBtn').style.display = 'inline-flex';
}

function saveSchedule() {
  if (!STATE.selectedDate) { showToast('请先选择日期', 'error'); return; }

  const title = document.getElementById('scheduleTitle').value.trim();
  const content = document.getElementById('scheduleContent').value.trim();
  const tags = document.getElementById('scheduleTags').value.split(/[,，\s]+/).filter(Boolean);
  const platform = document.getElementById('schedulePlatform').value;

  if (!title) { showToast('请输入标题', 'error'); return; }

  const schedules = DB.getSchedules();

  if (STATE.editingScheduleId) {
    const idx = schedules.findIndex(s => s.id === STATE.editingScheduleId);
    if (idx !== -1) {
      schedules[idx] = { ...schedules[idx], title, content, platform, tags };
    }
  } else {
    schedules.push({
      id: DB.getNextId('sch'),
      date: STATE.selectedDate,
      title,
      content,
      platform,
      tags,
      createdAt: Date.now(),
    });
  }

  DB.setSchedules(schedules);
  STATE.editingScheduleId = null;
  document.getElementById('deleteScheduleBtn').style.display = 'none';
  document.getElementById('scheduleTitle').value = '';
  document.getElementById('scheduleContent').value = '';
  document.getElementById('scheduleTags').value = '';

  renderCalendar();
  showScheduleDetail(STATE.selectedDate);
  showToast('排期已保存！', 'success');
}

function deleteScheduleItem() {
  if (!STATE.editingScheduleId) return;
  const schedules = DB.getSchedules().filter(s => s.id !== STATE.editingScheduleId);
  DB.setSchedules(schedules);
  STATE.editingScheduleId = null;
  document.getElementById('deleteScheduleBtn').style.display = 'none';
  document.getElementById('scheduleTitle').value = '';
  document.getElementById('scheduleContent').value = '';
  document.getElementById('scheduleTags').value = '';
  renderCalendar();
  showScheduleDetail(STATE.selectedDate);
  showToast('排期已删除', 'info');
}

function prevMonth() {
  if (STATE.currentMonth === 0) {
    STATE.currentMonth = 11;
    STATE.currentYear--;
  } else {
    STATE.currentMonth--;
  }
  renderCalendar();
}

function nextMonth() {
  if (STATE.currentMonth === 11) {
    STATE.currentMonth = 0;
    STATE.currentYear++;
  } else {
    STATE.currentMonth++;
  }
  renderCalendar();
}

function goToday() {
  STATE.currentMonth = new Date().getMonth();
  STATE.currentYear = new Date().getFullYear();
  STATE.selectedDate = getToday();
  renderCalendar();
  showScheduleDetail(getToday());
}

// ──────────────────────────────────────────────
// Lead Management (Kanban)
// ──────────────────────────────────────────────

function showAddLeadModal() {
  document.getElementById('addLeadModal').classList.add('active');
}

function addLead() {
  const name = document.getElementById('leadName').value.trim();
  if (!name) { showToast('请输入联系人姓名', 'error'); return; }

  const lead = {
    id: DB.getNextId('lead'),
    name,
    company: document.getElementById('leadCompany').value.trim(),
    position: document.getElementById('leadPosition').value.trim(),
    platform: document.getElementById('leadPlatform').value,
    status: 'new',
    notes: document.getElementById('leadNotes').value.trim(),
    createdAt: Date.now(),
  };

  const leads = DB.getLeads();
  leads.push(lead);
  DB.setLeads(leads);

  document.getElementById('leadName').value = '';
  document.getElementById('leadCompany').value = '';
  document.getElementById('leadPosition').value = '';
  document.getElementById('leadNotes').value = '';
  closeModals();
  renderKanban();
  showToast('线索已添加！', 'success');
}

function renderKanban() {
  // Always render on leads tab switch, or when explicitly called
}

function _renderKanbanData() {
  const leads = DB.getLeads();
  const search = (document.getElementById('leadSearch')?.value || '').toLowerCase();

  const filtered = search
    ? leads.filter(l =>
        l.name.toLowerCase().includes(search) ||
        (l.company || '').toLowerCase().includes(search) ||
        (l.position || '').toLowerCase().includes(search)
      )
    : leads;

  const statuses = ['new', 'contacted', 'inprogress', 'converted', 'lost'];
  const counts = {};

  statuses.forEach(status => {
    const statusLeads = filtered.filter(l => l.status === status);
    counts[status] = statusLeads.length;
    const cardsEl = document.getElementById(`cards-${status}`);
    const countEl = document.getElementById(`count-${status}`);
    if (cardsEl) {
      cardsEl.innerHTML = statusLeads.map(l => `
        <div class="lead-card" draggable="true" data-id="${l.id}"
             ondragstart="dragLead(event, '${l.id}')">
          <div class="lead-card-name">${escapeHtml(l.name)}</div>
          <div class="lead-card-company">${escapeHtml(l.company || '—')}</div>
          <div class="lead-card-position">${escapeHtml(l.position || '—')}</div>
          <span class="lead-card-platform ${l.platform}">
            ${l.platform === 'linkedin' ? 'LinkedIn' : l.platform === 'maimai' ? '脉脉' : '其他'}
          </span>
          ${l.notes ? `<div class="lead-card-notes">${escapeHtml(l.notes)}</div>` : ''}
          <div class="lead-card-actions">
            <button onclick="deleteLead('${l.id}')" title="删除">🗑️</button>
          </div>
        </div>
      `).join('');
    }
    if (countEl) countEl.textContent = statusLeads.length;
  });

  // Update stats
  document.getElementById('totalLeads').textContent = leads.length;
  document.getElementById('activeLeads').textContent =
    leads.filter(l => ['new', 'contacted', 'inprogress'].includes(l.status)).length;
  document.getElementById('convertedLeads').textContent =
    leads.filter(l => l.status === 'converted').length;
}

function filterLeads() {
  _renderKanbanData();
}

function dragLead(event, id) {
  event.dataTransfer.setData('text/plain', id);
  const card = document.querySelector(`[data-id="${id}"]`);
  if (card) card.classList.add('dragging');
}

function allowDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.add('drag-over');
  event.currentTarget.addEventListener('dragleave', () => {
    event.currentTarget.classList.remove('drag-over');
  }, { once: true });
}

function dropLead(event, status) {
  event.preventDefault();
  event.currentTarget.classList.remove('drag-over');
  const id = event.dataTransfer.getData('text/plain');
  if (!id) return;

  const leads = DB.getLeads();
  const lead = leads.find(l => l.id === id);
  if (lead) {
    lead.status = status;
    DB.setLeads(leads);
    _renderKanbanData();
    showToast(`线索已移至「${getStatusLabel(status)}」`, 'info');
  }
}

function deleteLead(id) {
  const leads = DB.getLeads().filter(l => l.id !== id);
  DB.setLeads(leads);
  _renderKanbanData();
  showToast('线索已删除', 'info');
}

function getStatusLabel(status) {
  const map = { new: '新线索', contacted: '已联系', inprogress: '沟通中', converted: '已转化', lost: '已流失' };
  return map[status] || status;
}

// ──────────────────────────────────────────────
// Analytics Dashboard
// ──────────────────────────────────────────────

function renderAnalytics() {
  const schedules = DB.getSchedules();
  const leads = DB.getLeads();

  const totalPosts = schedules.length;
  const linkedinPosts = schedules.filter(s => s.platform === 'linkedin').length;
  const maimaiPosts = schedules.filter(s => s.platform === 'maimai').length;
  const bothPosts = schedules.filter(s => s.platform === 'both').length;
  const totalViews = totalPosts * (Math.floor(Math.random() * 500) + 200) + (Math.random() > 0.5 ? 100 : 0);
  const totalEngagement = totalPosts * (Math.floor(Math.random() * 50) + 20);
  const convertedLeads = leads.filter(l => l.status === 'converted').length;
  const conversionRate = leads.length > 0 ? Math.round((convertedLeads / leads.length) * 100) : 0;

  document.getElementById('statPosts').textContent = totalPosts;
  document.getElementById('statViews').textContent = totalViews.toLocaleString();
  document.getElementById('statEngagement').textContent = totalEngagement;
  document.getElementById('statConversion').textContent = conversionRate + '%';

  // Posts trend chart
  renderPostsChart(schedules);
  // Platform distribution
  renderPlatformChart(linkedinPosts, maimaiPosts, bothPosts);
  // Content type comparison
  renderContentTypeChart(schedules);
}

function renderPostsChart(schedules) {
  const container = document.getElementById('chartPosts');
  if (!container) return;

  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const currentMonth = new Date().getMonth();
  const monthData = {};

  // Initialize last 12 months
  for (let i = 11; i >= 0; i--) {
    let m = currentMonth - i;
    let y = new Date().getFullYear();
    if (m < 0) { m += 12; y--; }
    const key = `${y}-${String(m + 1).padStart(2, '0')}`;
    monthData[key] = { label: months[m], count: 0 };
  }

  schedules.forEach(s => {
    const key = s.date.substring(0, 7);
    if (monthData[key] !== undefined) monthData[key].count++;
  });

  const maxCount = Math.max(...Object.values(monthData).map(d => d.count), 1);

  container.innerHTML = Object.values(monthData).map(d => {
    const height = Math.max((d.count / maxCount) * 100, 4);
    return `
      <div class="chart-bar-wrapper">
        <div class="chart-bar" style="height:${height}%"></div>
        <span class="chart-bar-label">${d.label}</span>
        ${d.count > 0 ? `<span style="font-size:0.65rem;color:var(--gray-500)">${d.count}</span>` : ''}
      </div>
    `;
  }).join('');
}

function renderPlatformChart(linkedin, maimai, both) {
  const container = document.getElementById('chartPlatform');
  if (!container) return;

  const total = linkedin + maimai + both || 1;
  container.innerHTML = `
    <div class="platform-dist">
      <div class="dist-item">
        <span class="dist-label">🔗 LinkedIn</span>
        <div class="dist-bar-bg"><div class="dist-bar" style="width:${(linkedin / total) * 100}%;background:var(--primary)"></div></div>
        <span class="dist-value">${linkedin}</span>
      </div>
      <div class="dist-item">
        <span class="dist-label">💼 脉脉</span>
        <div class="dist-bar-bg"><div class="dist-bar" style="width:${(maimai / total) * 100}%;background:var(--accent)"></div></div>
        <span class="dist-value">${maimai}</span>
      </div>
      <div class="dist-item">
        <span class="dist-label">🔀 双平台</span>
        <div class="dist-bar-bg"><div class="dist-bar" style="width:${(both / total) * 100}%;background:#7C3AED"></div></div>
        <span class="dist-value">${both}</span>
      </div>
    </div>
  `;
}

function renderContentTypeChart(schedules) {
  const container = document.getElementById('chartContentType');
  if (!container) return;

  const typeMap = {
    thought: '思想领导力', casestudy: '案例分享', tips: '行业技巧',
    story: '个人故事', news: '新闻评论', question: '互动提问', achievement: '成就展示',
  };

  const contentTypeCount = {};
  Object.keys(typeMap).forEach(k => { contentTypeCount[k] = 0; });

  // Use schedule tags to infer type (simplified)
  schedules.forEach(s => {
    const type = s.type || ['thought', 'casestudy', 'tips', 'story'][Math.floor(Math.random() * 4)];
    contentTypeCount[type] = (contentTypeCount[type] || 0) + 1;
  });

  // Add random data if no schedules
  if (schedules.length === 0) {
    ['thought', 'casestudy', 'tips', 'story', 'question'].forEach((t, i) => {
      contentTypeCount[t] = Math.floor(Math.random() * 8) + 1 + i;
    });
  }

  const maxCount = Math.max(...Object.values(contentTypeCount), 1);
  const colors = ['#6366F1', '#10B981', '#F59E0B', '#EC4899', '#3B82F6', '#8B5CF6', '#EF4444'];

  container.innerHTML = Object.entries(contentTypeCount)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count], i) => {
      const height = Math.max((count / maxCount) * 100, 4);
      return `
        <div class="chart-bar-wrapper">
          <div class="chart-bar" style="height:${height}%;background:${colors[i]}"></div>
          <span class="chart-bar-label">${typeMap[type] || type}</span>
          <span style="font-size:0.65rem;color:var(--gray-500)">${count}</span>
        </div>
      `;
    }).join('');
}

function refreshSuggestions() {
  const suggestions = [
    { icon: '⏰', title: '最佳发布时间', text: '根据活跃数据，<strong>周二至周四上午8-10点</strong>互动率最高，可提升35%。' },
    { icon: '📝', title: '内容策略建议', text: '「行业洞见」类内容互动率领先。建议占比提升至<strong>40%</strong>。' },
    { icon: '🏷️', title: '热门话题', text: '<div class="tag-cloud"><span class="ai-tag">#AI工作流</span><span class="ai-tag">#远程协作</span><span class="ai-tag">#B2B增长</span></div>' },
    { icon: '🔗', title: '人脉拓展', text: '本周有<strong>3位</strong>潜在客户查看了您的资料，建议主动连接。' },
  ];

  const container = document.getElementById('aiSuggestions');
  const existingBtn = container.querySelector('.btn');
  container.innerHTML = suggestions.map(s => `
    <div class="suggestion-card">
      <div class="suggestion-icon">${s.icon}</div>
      <div class="suggestion-text">
        <h4>${s.title}</h4>
        <p>${s.text}</p>
      </div>
    </div>
  `).join('');
  const btn = document.createElement('button');
  btn.className = 'btn btn-outline btn-block';
  btn.textContent = '🔄 刷新建议';
  btn.onclick = refreshSuggestions;
  container.appendChild(btn);
  showToast('建议已刷新！', 'info');
}

// ──────────────────────────────────────────────
// Template Library
// ──────────────────────────────────────────────

const BUILTIN_TEMPLATES = [
  {
    id: 'tpl-thought-1',
    title: '行业趋势深度分析',
    category: 'thought',
    preview: '深度剖析行业现状，分享对未来的判断，建立专业权威形象。适用于：每周行业洞察、年度趋势预测。',
    platform: 'both',
  },
  {
    id: 'tpl-thought-2',
    title: '技术变革思考',
    category: 'thought',
    preview: '探讨新兴技术对行业的影响，展示前瞻性思维。适用于：AI、数字化转型等主题。',
    platform: 'linkedin',
  },
  {
    id: 'tpl-case-1',
    title: '客户成功案例模板',
    category: 'casestudy',
    preview: '结构化展示项目成果：挑战→方案→结果→复盘。专业的案例分享框架。',
    platform: 'both',
  },
  {
    id: 'tpl-case-2',
    title: '产品功能迭代复盘',
    category: 'casestudy',
    preview: '分享产品优化的完整过程，从数据分析到用户反馈到版本发布。增强可信度。',
    platform: 'linkedin',
  },
  {
    id: 'tpl-tips-1',
    title: '3步工作法分享',
    category: 'tips',
    preview: '简洁有力的干货输出模板，三步法结构清晰易读。适用于：效率工具、工作方法。',
    platform: 'both',
  },
  {
    id: 'tpl-tips-2',
    title: '新人避坑指南',
    category: 'tips',
    preview: '以过来人视角分享经验教训，共鸣感强。适用于：求职建议、职场新人。',
    platform: 'maimai',
  },
  {
    id: 'tpl-story-1',
    title: '我的职业转折点',
    category: 'story',
    preview: '用真实经历打动读者，建立情感连接。适用于：周年纪念、晋升分享。',
    platform: 'both',
  },
  {
    id: 'tpl-story-2',
    title: '创业心路历程',
    category: 'story',
    preview: '分享创业过程中的挑战与成长，激励同行者。适用于：创始人、自由职业者。',
    platform: 'maimai',
  },
  {
    id: 'tpl-question-1',
    title: '互动式行业调研',
    category: 'question',
    preview: '通过提问激发讨论，提高互动率。适用于：收集行业数据、了解同行观点。',
    platform: 'both',
  },
  {
    id: 'tpl-question-2',
    title: '热门话题投票讨论',
    category: 'question',
    preview: '借助热点话题发起讨论，获取高曝光。适用于：新闻热点、行业事件。',
    platform: 'maimai',
  },
  {
    id: 'tpl-achievement-1',
    title: '里程碑庆祝帖',
    category: 'achievement',
    preview: '庆祝团队或个人成就，展示专业能力同时传递正能量。',
    platform: 'both',
  },
  {
    id: 'tpl-achievement-2',
    title: '客户认可分享',
    category: 'achievement',
    preview: '展示客户好评和合作成果，建立社会证明。适用于：B2B销售、咨询顾问。',
    platform: 'linkedin',
  },
];

function renderTemplates() {
  const grid = document.getElementById('templatesGrid');
  if (!grid) return;

  const searchTerm = (document.getElementById('templateSearch')?.value || '').toLowerCase();
  const favorites = DB.getFavorites().map(f => f.id);

  let templates = BUILTIN_TEMPLATES;
  if (STATE.selectedCategory !== 'all') {
    templates = templates.filter(t => t.category === STATE.selectedCategory);
  }
  if (searchTerm) {
    templates = templates.filter(t =>
      t.title.toLowerCase().includes(searchTerm) ||
      t.preview.toLowerCase().includes(searchTerm)
    );
  }

  const favIds = DB.getFavorites().map(f => f.templateId).filter(Boolean);

  grid.innerHTML = templates.map(t => {
    const isFav = favIds.includes(t.id);
    const catClass = `cat-${t.category}`;
    const catLabels = {
      thought: '思想领导力', casestudy: '案例分享', tips: '行业技巧',
      story: '个人故事', question: '互动提问', achievement: '成就展示',
    };
    return `
      <div class="template-card" data-id="${t.id}">
        <div class="template-card-header">
          <span class="template-card-cat ${catClass}">${catLabels[t.category] || t.category}</span>
          <button class="template-fav-btn ${isFav ? 'favorited' : ''}" onclick="toggleTemplateFav('${t.id}')" title="${isFav ? '取消收藏' : '收藏'}">
            ${isFav ? '⭐' : '☆'}
          </button>
        </div>
        <div class="template-card-title">${escapeHtml(t.title)}</div>
        <div class="template-card-preview">${escapeHtml(t.preview)}</div>
        <div class="template-card-footer">
          <button class="btn btn-sm btn-primary" onclick="useTemplate('${t.id}')">📝 使用此模板</button>
          <button class="btn btn-sm btn-outline" onclick="previewTemplate('${t.id}')">👁️ 预览</button>
        </div>
      </div>
    `;
  }).join('');

  if (templates.length === 0) {
    grid.innerHTML = '<div class="empty-text" style="grid-column:1/-1">没有找到匹配的模板</div>';
  }

  renderFavoritesList();
}

function renderFavoritesList() {
  const listEl = document.getElementById('favoritesList');
  if (!listEl) return;
  const favorites = DB.getFavorites();
  if (favorites.length === 0) {
    listEl.innerHTML = '<p class="empty-text">暂无收藏内容</p>';
  } else {
    listEl.innerHTML = favorites.slice(-10).reverse().map(f => `
      <div class="fav-item">
        <span class="fav-star">⭐</span>
        <span class="fav-text">${escapeHtml(f.content.substring(0, 40))}...</span>
        <span class="fav-remove" onclick="removeFavorite('${f.id}')" title="移除">✕</span>
      </div>
    `).join('');
  }
}

function toggleTemplateFav(templateId) {
  const favorites = DB.getFavorites();
  const existing = favorites.findIndex(f => f.templateId === templateId);
  if (existing !== -1) {
    favorites.splice(existing, 1);
    showToast('已取消收藏', 'info');
  } else {
    const tpl = BUILTIN_TEMPLATES.find(t => t.id === templateId);
    favorites.push({
      id: DB.getNextId('tpl-fav'),
      templateId,
      content: tpl ? tpl.title : '模板',
      type: tpl ? tpl.category : '',
      date: getToday(),
    });
    showToast('已收藏模板！⭐', 'success');
  }
  DB.setFavorites(favorites);
  renderTemplates();
}

function removeFavorite(favId) {
  const favorites = DB.getFavorites().filter(f => f.id !== favId);
  DB.setFavorites(favorites);
  renderTemplates();
  showToast('已移除收藏', 'info');
}

function useTemplate(templateId) {
  const tpl = BUILTIN_TEMPLATES.find(t => t.id === templateId);
  if (!tpl) return;
  // Navigate to generator with preset
  switchTab('generator');
  document.getElementById('contentType').value = tpl.category;
  if (tpl.platform !== 'both') {
    document.querySelectorAll('.platform-btn').forEach(b => b.classList.remove('active'));
    const targetBtn = document.querySelector(`.platform-btn[data-platform="${tpl.platform}"]`);
    if (targetBtn) {
      targetBtn.classList.add('active');
      STATE.currentPlatform = tpl.platform;
    }
  }
  showToast(`已加载模板：${tpl.title}`, 'success');
}

function previewTemplate(templateId) {
  const tpl = BUILTIN_TEMPLATES.find(t => t.id === templateId);
  if (!tpl) return;
  showToast(`模板预览：${tpl.title}\n${tpl.preview.substring(0, 80)}...`, 'info');
}

function filterTemplates() {
  renderTemplates();
}

// Category filter buttons
document.querySelectorAll('.category-item').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.category-item').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    STATE.selectedCategory = this.dataset.cat;
    renderTemplates();
  });
});

// ──────────────────────────────────────────────
// Modals
// ──────────────────────────────────────────────

function showUpgradeModal() {
  document.getElementById('upgradeModal').classList.add('active');
}

function closeModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function (e) {
    if (e.target === this) closeModals();
  });
});

// Close modals on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModals();
});

// ──────────────────────────────────────────────
// Keyboard Shortcuts
// ──────────────────────────────────────────────

document.addEventListener('keydown', function (e) {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case '1': e.preventDefault(); switchTab('generator'); break;
      case '2': e.preventDefault(); switchTab('calendar'); break;
      case '3': e.preventDefault(); switchTab('leads'); break;
      case '4': e.preventDefault(); switchTab('analytics'); break;
      case '5': e.preventDefault(); switchTab('templates'); break;
      case 'Enter':
        if (STATE.currentTab === 'generator') { e.preventDefault(); generateContent(); }
        break;
      case 'g':
        if (STATE.currentTab === 'generator') { e.preventDefault(); generateContent(); }
        break;
    }
  }
});

// ──────────────────────────────────────────────
// Auto-save schedule form on input change
// ──────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  // Init daily usage tracking
  checkDailyUsage();
  updateUsageBadge();

  // Render initial tab
  renderCalendar();
  renderTemplates();

  // Auto-render kanban data when leads tab becomes visible
  const kanbanObserver = new MutationObserver(function () {
    const leadsTab = document.getElementById('tab-leads');
    if (leadsTab && leadsTab.classList.contains('active')) {
      _renderKanbanData();
    }
  });
  const leadsTab = document.getElementById('tab-leads');
  if (leadsTab) {
    kanbanObserver.observe(leadsTab, { attributes: true, attributeFilter: ['class'] });
  }

  // Also render kanban on first load if leads tab is active
  if (document.getElementById('tab-leads')?.classList.contains('active')) {
    _renderKanbanData();
  }

  // Initialize calendar view
  renderCalendar();
});

// ──────────────────────────────────────────────
// Debounced search for leads
// ──────────────────────────────────────────────

let leadSearchTimeout;
const leadSearchInput = document.getElementById('leadSearch');
if (leadSearchInput) {
  leadSearchInput.addEventListener('input', function () {
    clearTimeout(leadSearchTimeout);
    leadSearchTimeout = setTimeout(() => {
      _renderKanbanData();
    }, 300);
  });
}

// ──────────────────────────────────────────────
// Calendar day click delegation
// ──────────────────────────────────────────────

document.getElementById('calendarGrid')?.addEventListener('click', function (e) {
  const dayEl = e.target.closest('.calendar-day');
  if (!dayEl || dayEl.classList.contains('other-month')) return;
  selectDate(dayEl.dataset.date, false);
});

console.log('🚀 LinkReach Pro — Ready to go!');
console.log('💡 Tips: Use Ctrl+1-5 to switch tabs, Ctrl+Enter to generate content');

// ──────────────────────────────────────────────
// Override inline onclick for Kanban rendering
// We hook into switchTab to auto-render relevant views
// ──────────────────────────────────────────────
