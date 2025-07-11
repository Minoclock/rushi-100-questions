'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import './globals.css';  // 如果你的全局样式在其他路径，请自行调整

// ---------- 数据结构定义 ----------
interface QuizItem {
  id: number;
  question: string;
  options?: string[];
  answer: string[];
}
interface ManualSection {
  id: number;
  title: string;
  type: string;
  image: string;
  description: string;
}
interface VideoSection {
  id: number;
  title: string;
  type: string;
  duration: string;
  image: string;
  description: string;
}

export default function Page() {
  // 1. 状态：搜索框
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 2. 题库状态
  const [quizData, setQuizData] = useState<QuizItem[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<QuizItem[]>([]);
  const [groupNumber, setGroupNumber] = useState<number>(1);

  // 3. 初次加载题库
  useEffect(() => {
    fetch('/data/quiz.json')
      .then(res => res.json() as Promise<QuizItem[]>)
      .then(data => {
        setQuizData(data);
        shuffleQuestions(data);
      });
  }, []);

  // 4. 随机洗牌并取前三题
  function shuffleQuestions(data: QuizItem[]) {
    const copy = [...data];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setCurrentQuestions(copy.slice(0, 3));
  }

  // 5. 切换题组
  const switchQuestionSet = (): void => {
    shuffleQuestions(quizData);
    setGroupNumber(n => n + 1);
  };

  // 6. 搜索处理（示例，仅打印）
  const handleSearch = (): void => {
    if (searchTerm.trim()) console.log('搜索：', searchTerm);
  };

  // 7. 图文手册数据（示例）
  const manualSections: ManualSection[] = [
    { id: 1, title: '如视VR基础操作', type: 'manual', image: 'https://readdy.ai/api/search-image?query=futuristic%20VR%20workspace%20with%20holographic%20displays&width=300&height=200', description: '掌握VR设备的基本操作和使用技巧' },
    { id: 2, title: '数据采集系统介绍', type: 'manual', image: 'https://readdy.ai/api/search-image?query=data%20visualization%20dashboard&width=300&height=200', description: '了解各种数据采集系统的工作原理' },
    { id: 3, title: '空间重建技术', type: 'manual', image: 'https://readdy.ai/api/search-image?query=3D%20spatial%20reconstruction%20visualization&width=300&height=200', description: '学习三维空间重建的核心技术' },
    { id: 4, title: '设备维护指南', type: 'manual', image: 'https://readdy.ai/api/search-image?query=tech%20maintenance%20workspace&width=300&height=200', description: '设备日常维护和故障排除方法' },
  ];

  // 8. 视频教程数据（示例）
  const videoSections: VideoSection[] = [
    { id: 5, title: 'VR场景搭建实战', type: 'video', duration: '15:30', image: 'https://readdy.ai/api/search-image?query=VR%20development%20studio&width=300&height=200', description: '从零开始创建VR虚拟场景' },
    { id: 6, title: '算法优化技巧', type: 'video', duration: '22:45', image: 'https://readdy.ai/api/search-image?query=algorithm%20visualization%20workspace&width=300&height=200', description: '提升算法性能的实用技巧' },
    { id: 7, title: '数据分析实例', type: 'video', duration: '18:20', image: 'https://readdy.ai/api/search-image?query=data%20analysis%20interface&width=300&height=200', description: '真实案例的数据分析过程' },
    { id: 8, title: '团队协作流程', type: 'video', duration: '12:15', image: 'https://readdy.ai/api/search-image?query=team%20collaboration%20workspace&width=300&height=200', description: '高效的团队协作方法和工具' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* --- 顶部导航 & 搜索 / 手册 / 视频 / 数据统计 区块 （请保留你原有的 Readdy 代码） --- */}

      {/* --- 题库模块：如视100问 --- */}
      <div id="question-section" className="relative py-20 bg-gradient-to-br from-slate-900 to-indigo-900">
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

          {/* -- 动态题库区块 -- */}
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
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <h4 className="text-white font-semibold text-lg">{question.question}</h4>
                  </div>
                  {question.options && question.options.length > 0 ? (
                    <div className="ml-12 space-y-3">
                      {question.options.map((opt, oi) => (
                        <label key={oi} className="flex items-center space-x-3 cursor-pointer hover:bg-white/10 p-3 rounded-xl">
                          <input
                            type={question.options!.length === 1 ? 'radio' : 'checkbox'}
                            name={`q-${question.id}`}
                            value={opt}
                            className="text-indigo-500 focus:ring-indigo-500"
                          />
                          <span className="text-white/80">{opt}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="flex space-x-6 ml-12">
                      <label className="flex items-center space-x-3 cursor-pointer hover:bg-white/10 p-3 rounded-xl">
                        <input type="radio" name={`q-${question.id}`} className="text-indigo-500 focus:ring-indigo-500" />
                        <span className="text-white/80">正确</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer hover:bg-white/10 p-3 rounded-xl">
                        <input type="radio" name={`q-${question.id}`} className="text-indigo-500 focus:ring-indigo-500" />
                        <span className="text-white/80">错误</span>
                      </label>
                    </div>
                  )}
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

      {/* --- 其余彩蛋 / Footer / 客服 区块，保持不动 --- */}
    </div>
  );
}
