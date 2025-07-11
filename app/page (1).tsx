
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// 定义题目数据结构
interface QuizItem {
  id: number;
  type: 'single' | 'multi' | 'tf';
  question: string;
  options?: string[];
  answer: string[];
}

export default function Page() {
  // 这两个数组里都是 QuizItem
  const [quizData, setQuizData] = useState<QuizItem[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<QuizItem[]>([]);
  const [groupNumber, setGroupNumber] = useState<number>(1);

  useEffect(() => {
  fetch('/data/quiz.json')
    .then(res => res.json())              // 先拿 any
    .then((data: QuizItem[]) => {         // 再断言 QuizItem[]
      setQuizData(data);
      shuffleQuestions(data);
    })
    .catch(err => console.error(err));    // 可选：捕获错误
}, []);

 // 显式声明参数类型
  function shuffleQuestions(data: QuizItem[]) {
    const copy = [...data];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setCurrentQuestions(copy.slice(0, 3));
  }

  // 搜索处理
  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log('搜索:', searchTerm);
    }
  };

  // 不再需要 questionSets
// 切题函数
  const switchQuestionSet = (): void => {
    shuffleQuestions(quizData);
    setGroupNumber(n => n + 1);
  };

  return (
    <div>
      <h3>第 {groupNumber} 组题目</h3>
      <button onClick={switchQuestionSet}>换一组题目</button>

      {currentQuestions.map((q: QuizItem, qi: number) => (
        <div key={q.id}>
          <p>{qi + 1}. {q.question}</p>
          {/* 如果有选项，options 一定是 string[] */}
          {q.options?.map((opt: string, oi: number) => (
            <label key={oi}>
              <input type={q.type === 'single' ? 'radio' : 'checkbox'}
                     name={`q-${q.id}`}
                     value={opt}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}


  // 手册和视频数据
  const manualSections = [
    {
      id: 1,
      title: '如视VR基础操作',
      type: 'manual',
      image: 'https://readdy.ai/api/search-image?query=futuristic%20VR%20workspace%20with%20holographic%20displays%20and%20advanced%20technology%20setup%20dark%20blue%20purple%20gradient%20lighting%20modern%20sci-fi%20environment&width=300&height=200&seq=vr003&orientation=landscape',
      description: '掌握VR设备的基本操作和使用技巧'
    },
    {
      id: 2,
      title: '数据采集系统介绍',
      type: 'manual',
      image: 'https://readdy.ai/api/search-image?query=high-tech%20data%20visualization%20dashboard%20with%20glowing%20charts%20and%20analytics%20interface%20dark%20background%20blue%20cyan%20accents%20futuristic%20design&width=300&height=200&seq=data003&orientation=landscape',
      description: '了解各种数据采集系统的工作原理'
    },
    {
      id: 3,
      title: '空间重建技术',
      type: 'manual',
      image: 'https://readdy.ai/api/search-image?query=3D%20spatial%20reconstruction%20visualization%20with%20geometric%20wireframes%20glowing%20blue%20purple%20gradients%20modern%20tech%20interface&width=300&height=200&seq=spatial003&orientation=landscape',
      description: '学习三维空间重建的核心技术'
    },
    {
      id: 4,
      title: '设备维护指南',
      type: 'manual',
      image: 'https://readdy.ai/api/search-image?query=clean%20organized%20tech%20maintenance%20workspace%20with%20advanced%20tools%20and%20equipment%20blue%20accent%20lighting%20professional%20modern%20setup&width=300&height=200&seq=maintain003&orientation=landscape',
      description: '设备日常维护和故障排除方法'
    }
  ];

  const videoSections = [
    {
      id: 5,
      title: 'VR场景搭建实战',
      type: 'video',
      duration: '15:30',
      image: 'https://readdy.ai/api/search-image?query=modern%20VR%20development%20studio%20with%20immersive%20technology%20setup%20blue%20purple%20ambient%20lighting%20futuristic%20workspace%20environment&width=300&height=200&seq=scene003&orientation=landscape',
      description: '从零开始创建VR虚拟场景'
    },
    {
      id: 6,
      title: '算法优化技巧',
      type: 'video',
      duration: '22:45',
      image: 'https://readdy.ai/api/search-image?query=advanced%20coding%20environment%20with%20multiple%20holographic%20displays%20algorithm%20visualization%20blue%20cyan%20glowing%20effects%20modern%20tech%20workspace&width=300&height=200&seq=algo003&orientation=landscape',
      description: '提升算法性能的实用技巧'
    },
    {
      id: 7,
      title: '数据分析实例',
      type: 'video',
      duration: '18:20',
      image: 'https://readdy.ai/api/search-image?query=futuristic%20data%20analysis%20interface%20with%20floating%20charts%20and%20graphs%20blue%20purple%20gradient%20lighting%20advanced%20analytics%20workspace&width=300&height=200&seq=analysis003&orientation=landscape',
      description: '真实案例的数据分析过程'
    },
    {
      id: 8,
      title: '团队协作流程',
      type: 'video',
      duration: '12:15',
      image: 'https://readdy.ai/api/search-image?query=modern%20collaborative%20workspace%20with%20interactive%20displays%20team%20meeting%20environment%20blue%20accent%20lighting%20professional%20tech%20setup&width=300&height=200&seq=team003&orientation=landscape',
      description: '高效的团队协作方法和工具'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* 顶部导航 */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="font-pacifico text-2xl text-white">Search all you want</div>
            </div>
            <div className="flex space-x-8">
              <a href="#data-overview" className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-300">
                数据概览
              </a>
              <a href="#manual-section" className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-300">
                图文手册
              </a>
              <a href="#video-section" className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-300">
                视频教程
              </a>
              <a href="#question-section" className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-300">
                如视100问
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 首屏 - 占据四分之三高度 */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=futuristic%20tech%20workspace%20with%20floating%20holographic%20displays%20blue%20purple%20gradient%20lighting%20advanced%20computing%20environment%20modern%20sci-fi%20office&width=1920&height=1080&seq=hero-fusion001&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80"></div>
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
            `
          }}></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 text-white bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              视界无界，进化无限
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              基于能力产品中心飞书文档的AI驱动学习平台，掌握宇宙之精华
            </p>
          </div>

          {/* 长搜索框 */}
          <div className="w-full max-w-4xl relative">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="不懂？就来搜搜..."
                className="w-full px-8 py-6 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-2xl"
              />
              <button
                onClick={handleSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl"
              >
                智能搜索
              </button>
            </div>
          </div>

          {/* 快速入口 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {[{
              name: '运营',
              icon: 'ri-line-chart-line',
              color: 'from-green-500 to-teal-600',
              description: '洞察需求机会'
            },
            {
              name: '产品',
              icon: 'ri-product-hunt-line',
              color: 'from-blue-500 to-indigo-600',
              description: '定义需求价值'
            },
            {
              name: '设计',
              icon: 'ri-palette-line',
              color: 'from-purple-500 to-pink-600',
              description: '呈现需求体验'
            }
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105 hover:-translate-y-2"
              >
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <i className={`${item.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 数据统计模块 */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 py-16" id="data-overview">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-xl">
              <i className="ri-bar-chart-line text-white text-2xl"></i>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">
              如视数据概览
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto mb-4"></div>
            <p className="text-white/60 text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full inline-block border border-white/20">
              数据统计截止昨日
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[{
              label: '如视VR APP UV',
              value: '1,245,678',
              unit: '',
              icon: 'ri-eye-line',
              color: 'from-blue-500 to-indigo-600'
            },
            {
              label: '累计VR处理量',
              value: '8,956',
              unit: '条',
              icon: 'ri-database-2-line',
              color: 'from-green-500 to-teal-600'
            },
            {
              label: '伽罗华采集量',
              value: '156,789',
              unit: '条',
              icon: 'ri-radar-line',
              color: 'from-purple-500 to-pink-600'
            },
            {
              label: '庞加莱采集量',
              value: '89,234',
              unit: '条',
              icon: 'ri-scan-line',
              color: 'from-orange-500 to-red-600'
            },
            {
              label: '轻量级设备采集量',
              value: '45,123',
              unit: '条',
              icon: 'ri-smartphone-line',
              color: 'from-indigo-500 to-purple-600'
            }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <i className={`${stat.icon} text-white text-xl`}></i>
                </div>
                <h3 className="text-white/70 text-xs font-medium mb-3 tracking-wide uppercase">
                  {stat.label}
                </h3>
                <p className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                  {stat.unit && (
                    <span className="text-sm text-white/60 ml-1 font-normal">
                      {stat.unit}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 新手图文手册区域 */}
      <div className="relative py-20 bg-gradient-to-br from-slate-900 to-blue-900" id="manual-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-xl">
              <i className="ri-book-open-line text-white text-2xl"></i>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">
              图文学习手册
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto mb-4"></div>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              AI智能生成的专业学习文档，循序渐进掌握核心知识点
            </p>
          </div>

          <div className="overflow-x-auto pb-6">
            <div className="flex space-x-8 pb-4" style={{ width: 'max-content' }}>
              {manualSections.map((manual, index) => (
                <div
                  key={manual.id}
                  className="w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105 hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={manual.image}
                      alt={manual.title}
                      className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <i className="ri-eye-line text-white text-sm"></i>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-2"></div>
                      <span className="text-white/60 text-xs font-medium uppercase tracking-wide">
                        手册 #{index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {manual.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                      {manual.description}
                    </p>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl">
                      开始学习
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 视频教程区域 */}
      <div className="relative py-20 bg-gradient-to-br from-indigo-900 to-purple-900" id="video-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-6 shadow-xl">
              <i className="ri-play-circle-line text-white text-2xl"></i>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">
              视频教程
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mb-4"></div>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              AI智能生成的高质量教学视频，实战演示学习要点
            </p>
          </div>

          <div className="overflow-x-auto pb-6">
            <div className="flex space-x-8 pb-4" style={{ width: 'max-content' }}>
              {videoSections.map((video, index) => (
                <div
                  key={video.id}
                  className="w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105 hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                        <i className="ri-play-line text-white text-2xl ml-1"></i>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                      {video.duration}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      视频 #{index + 1}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {video.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                      {video.description}
                    </p>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl">
                      观看视频
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 题库模块 */}
      <div className="relative py-20 bg-gradient-to-br from-slate-900 to-indigo-900" id="question-section">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
              <i className="ri-questionnaire-line text-white text-2xl"></i>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">
              如视100问
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mx-auto mb-4"></div>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              AI智能生成的随机题库，全面测试你的技术掌握程度
            </p>
          </div>
 <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
     <div className="flex justify-between items-center mb-8">
       <h3 className="text-2xl font-bold text-white">第 {groupNumber} 组题目</h3>
       <button
         onClick={switchQuestionSet}
         className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-xl text-white hover:scale-105"
       >
         换一组题目
       </button>
    </div>
    <div className="space-y-8">
       {currentQuestions.map((question, index) => (
         <div key={question.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
           {/* … 题目渲染和选项渲染逻辑 … */}
         </div>
       ))}
     </div>
     <div className="mt-10 text-center">
       <button className="bg-gradient-to-r from-indigo-500 to-purple-600 px-10 py-4 rounded-xl text-white hover:scale-105">
         提交答案
      </button>
    </div>
   </div>
          
        </div>
      </div>

      {/* 彩蛋模块 */}
      <div className="relative py-20 bg-gradient-to-br from-purple-900 to-pink-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl hover:rotate-12 transition-transform duration-300">
              <i className="ri-music-line text-white text-4xl"></i>
            </div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-3">
                🎵 特别彩蛋
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4"></div>
              <p className="text-white/70 text-lg">
                为如视量身定制的AI主题曲
              </p>
            </div>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg">
              <i className="ri-play-line mr-2"></i>播放主题曲
            </button>
          </div>
        </div>
      </div>

      {/* 网站尾部 */}
      <footer className="bg-slate-900 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="font-pacifico text-xl text-white mb-4">
                如视学习平台
              </div>
              <p className="text-white/60 text-sm">
                基于AI的智能学习平台，助力技术能力提升
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">学习资源</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>
                  <a href="#manual-section" className="hover:text-white transition-colors cursor-pointer">
                    图文手册
                  </a>
                </li>
                <li>
                  <a href="#video-section" className="hover:text-white transition-colors cursor-pointer">
                    视频教程
                  </a>
                </li>
                <li>
                  <a href="#question-section" className="hover:text-white transition-colors cursor-pointer">
                    题库练习
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">联系我们</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex items-center space-x-2">
                  <i className="ri-map-pin-line"></i>
                  <span>同住地球村</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              2024 如视学习平台. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* 右下角客服 */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/support">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300 hover:scale-110">
            <i className="ri-customer-service-line text-white text-2xl"></i>
          </div>
        </Link>
      </div>
    </div>
  );
}
