import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { LayoutDashboard, Users, Map, Activity, BarChart2, DollarSign, Target, Globe } from 'lucide-react';

const mockDataOverview = [
  { name: 'Empowerment (E)', Level1: 73, Level2: 20, Level3: 7 },
  { name: 'Learning (L)', Level1: 45, Level2: 40, Level3: 15 },
  { name: 'Adaptive (A)', Level1: 35, Level2: 50, Level3: 15 },
  { name: 'Results (R)', Level1: 25, Level2: 60, Level3: 15 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [lang, setLang] = useState('vi');

  const t = {
    vi: {
      tabs: ["1. Tổng quan", "2. Chi tiết Năng lực", "3. REAL Toàn CT", "4. So sánh Khối", "5. Phân bố", "6. Chi phí", "7. Lộ trình"],
      overview: "Tổng quan (Executive Summary)",
      findings: "3 Phát hiện Cốt lõi",
      f1: "Trụ E có 73% quản lý ở Cấp 1 (Vùng đỏ nghiêm trọng nhất)",
      f2: "Khoảng trống tập trung ở hành vi Thực thi (Process)",
      f3: "Khoảng trống năng lực gây lãng phí 214 giờ / tháng",
      langToggle: "Switch to English"
    },
    en: {
      tabs: ["1. Overview", "2. Drill-down", "3. Global REAL", "4. Dept Comp", "5. Distribution", "6. Costs", "7. L&D Roadmap"],
      overview: "Executive Summary",
      findings: "3 Key Findings",
      f1: "Empowerment pillar: 73% managers at Level 1 (Critical Red Zone)",
      f2: "Gaps concentrated in Process execution behaviors",
      f3: "Competency gaps waste 214 hrs/month",
      langToggle: "Chuyển sang Tiếng Việt"
    }
  };

  const renderTab1 = () => (
    <div className="tab-content">
      <div className="card">
        <h2 style={{ marginBottom: '1rem', color: 'var(--vmp-navy)' }}>{t[lang].overview}</h2>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer>
            <BarChart data={mockDataOverview} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={120} tick={{fill: 'var(--text-main)', fontSize: 12}} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              {/* Semantic Colors: Level 1 = Dark Red (Urgent), Level 2 = Gray (Standard), Level 3 = Navy (Excellent) */}
              <Bar dataKey="Level1" stackId="a" fill="var(--semantic-urgent)" name="Level 1 (Cần cải thiện khẩn)" />
              <Bar dataKey="Level2" stackId="a" fill="var(--semantic-standard)" name="Level 2 (Đạt chuẩn)" />
              <Bar dataKey="Level3" stackId="a" fill="var(--semantic-excellent)" name="Level 3 (Xuất sắc)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-3">
        <div className="card" style={{ borderTop: '4px solid var(--semantic-urgent)'}}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--semantic-urgent)'}}>
            <Activity size={20} /> #1
          </h3>
          <p style={{ marginTop: '0.5rem', fontWeight: 500 }}>{t[lang].f1}</p>
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--vmp-orange)'}}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--vmp-orange)'}}>
            <Target size={20} /> #2
          </h3>
          <p style={{ marginTop: '0.5rem', fontWeight: 500 }}>{t[lang].f2}</p>
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--vmp-navy)'}}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--vmp-navy)'}}>
            <DollarSign size={20} /> #3
          </h3>
          <p style={{ marginTop: '0.5rem', fontWeight: 500 }}>{t[lang].f3}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>VMP Assessment Hub</h1>
        <button 
          onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
          className="tab-btn" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Globe size={16} /> {t[lang].langToggle}
        </button>
      </div>

      <div className="tabs">
        {t[lang].tabs.map((tab, idx) => (
          <button 
            key={idx} 
            className={`tab-btn ${activeTab === idx + 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(idx + 1)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="main-content">
        {activeTab === 1 && renderTab1()}
        {activeTab > 1 && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <LayoutDashboard size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
            <p>Tab {activeTab} Content Placeholder</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Các biểu đồ (Radar, Heatmap, Distribution, Pareto) sẽ được implement ở pha tiếp theo.</p>
          </div>
        )}
      </div>
    </div>
  );
}
