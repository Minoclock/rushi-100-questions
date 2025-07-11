'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '您好！我是如视智能客服小助手，有什么可以帮助您的吗？',
      time: '刚刚'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: message,
        time: '刚刚'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // 模拟AI回复
      setTimeout(() => {
        const botReply = {
          id: messages.length + 2,
          type: 'bot',
          content: '感谢您的提问！我正在为您查找相关信息，请稍等片刻...',
          time: '刚刚'
        };
        setMessages(prev => [...prev, botReply]);
      }, 1000);
    }
  };

  const commonQuestions = [
    {
      question: '如何开始使用VR设备？',
      answer: '首先确保设备电量充足，然后按照设备说明书进行初始化设置。'
    },
    {
      question: '数据采集失败怎么办？',
      answer: '请检查网络连接和设备状态，如问题持续请联系技术支持。'
    },
    {
      question: '如何提高采集精度？',
      answer: '确保环境光线充足，避免强光直射，保持设备稳定。'
    },
    {
      question: '账号登录问题',
      answer: '如遇登录问题，请检查用户名密码，或尝试重置密码。'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* 顶部导航 */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="font-pacifico text-2xl text-white hover:text-blue-300 transition-colors">
                Search all you want
              </Link>
            </div>
            <div className="flex space-x-8">
              <Link href="/" className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-xl">
            <i className="ri-customer-service-line text-white text-2xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            智能客服中心
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto mb-4"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            AI驱动的智能客服系统，7×24小时为您提供专业技术支持
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧聊天区域 */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
              {/* 聊天头部 */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="ri-robot-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">如视智能助手</h3>
                    <p className="text-white/80 text-sm">在线 · 即时回复</p>
                  </div>
                </div>
              </div>

              {/* 聊天内容 */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                          : 'bg-white/20 text-white border border-white/20'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.type === 'user' ? 'text-white/80' : 'text-white/60'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 输入框 */}
              <div className="border-t border-white/10 p-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="输入您的问题..."
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl"
                  >
                    <i className="ri-send-plane-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧功能区域 */}
          <div className="space-y-6">
            {/* 常见问题 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <i className="ri-question-line mr-2 text-blue-400"></i>
                常见问题
              </h3>
              <div className="space-y-3">
                {commonQuestions.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <p className="text-white/90 text-sm font-medium mb-1">
                      {item.question}
                    </p>
                    <p className="text-white/60 text-xs">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 联系方式 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <i className="ri-phone-line mr-2 text-green-400"></i>
                联系我们
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-time-line text-blue-400 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">服务时间</p>
                    <p className="text-white/60 text-xs">7×24小时在线</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-mail-line text-green-400 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">邮箱支持</p>
                    <p className="text-white/60 text-xs">support@realsee.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-map-pin-line text-purple-400 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">地址</p>
                    <p className="text-white/60 text-xs">同住地球村</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 快速操作 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <i className="ri-dashboard-line mr-2 text-yellow-400"></i>
                快速操作
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap shadow-lg">
                  <i className="ri-download-line mr-2"></i>下载用户手册
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap shadow-lg">
                  <i className="ri-feedback-line mr-2"></i>提交反馈
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap shadow-lg">
                  <i className="ri-calendar-line mr-2"></i>预约技术支持
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}