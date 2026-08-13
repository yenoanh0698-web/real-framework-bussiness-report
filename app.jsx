const { useState } = React;
const {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell,
  ComposedChart, Line,
  ScatterChart, Scatter, ReferenceLine
} = window.Recharts;

const COLORS = {
  urgent: '#991B1B',
  significant: '#F97316',
  below: '#EAB308',
  standard: '#9CA3AF',
  excellent: '#1E3A8A'
};

const mockOverview = [
  { name: 'R - Role', level1: 15, level2: 35, level3: 50 },
  { name: 'E - Empowerment', level1: 50, level2: 30, level3: 20 },
  { name: 'A - Alignment', level1: 20, level2: 45, level3: 35 },
  { name: 'L - Learning', level1: 25, level2: 40, level3: 35 }
];

const mockExecutiveChart = [
  { name: 'R - Results', level1: 10, level2: 44, level3: 46 },
  { name: 'E - Empowerment', level1: 73, level2: 27, level3: 0 },
  { name: 'A - Alignment', level1: 33, level2: 43, level3: 24 },
  { name: 'L - Learning', level1: 56, level2: 38, level3: 6 }
];

const mockMacroRadar = [
  { subject: 'R - Result', A: 2.1, fullMark: 3 },
  { subject: 'E - Empowerment', A: 1.6, fullMark: 3 },
  { subject: 'A - Alignment', A: 1.9, fullMark: 3 },
  { subject: 'L - Learning', A: 1.8, fullMark: 3 }
];

const mockDeptComparison = [
  { dept: 'Vận hành', score: 1.78 },
  { dept: 'Kinh doanh', score: 1.91 },
  { dept: 'Hỗ trợ', score: 1.91 },
  { dept: 'Toàn CT', score: 1.87 }
];

const mockDistribution = [
  { range: '1.00-1.39', count: 9 },
  { range: '1.40-1.99', count: 13 },
  { range: '2.00-2.14', count: 6 },
  { range: '2.15-2.29', count: 2 },
  { range: '>= 2.30', count: 0 }
];

const mockTop8Gaps = [
  { name: 'Ủy quyền', score: 1.53, pillar: 'E' },
  { name: 'Huấn luyện & Phát triển', score: 1.57, pillar: 'E' },
  { name: 'Kế thừa', score: 1.60, pillar: 'E' },
  { name: 'Gắn kết', score: 1.69, pillar: 'E' },
  { name: 'Đúc kết tri thức', score: 1.78, pillar: 'L' },
  { name: 'Ứng dụng công nghệ', score: 1.81, pillar: 'L' },
  { name: 'Vận hành tinh gọn', score: 1.83, pillar: 'L' },
  { name: 'Điều hướng tổ chức', score: 1.87, pillar: 'A' }
];

const deptDataMap = {
  'Vận hành': {
    headline: '9/10 QUẢN LÝ CHƯA ĐẠT CHUẨN E',
    scores: [
      { name: 'Ủy quyền và Trao quyền quyết định', score: 1.35 },
      { name: 'Huấn luyện linh hoạt và Phát triển trên công việc', score: 1.43 },
      { name: 'Bản đồ nhân tài và Sẵn sàng kế thừa', score: 1.52 },
      { name: 'An toàn tâm lý và Gắn kết đội ngũ', score: 1.62 },
      { name: 'Trung bình E', score: 1.48 }
    ],
    behaviors: [
      { name: 'Hỗ trợ mà không làm thay', ratio: '8/10' },
      { name: 'Coaching linh hoạt trong quá trình thực hiện', ratio: '7/10' },
      { name: 'Đánh giá mức độ sẵn sàng nhận quyền quyết định', ratio: '7/10' },
      { name: 'Kiểm chứng tiến bộ và nâng cấp thử thách', ratio: '7/10' }
    ],
    insights: 'Quản lý Vận hành có xu hướng trực tiếp xử lý để bảo đảm tốc độ và hạn chế rủi ro. Cách phản ứng này giúp giải quyết tình huống trước mắt nhưng làm giảm cơ hội phát triển khả năng tự quyết của nhân viên.',
    priorities: [
      'Thiết lập rõ quyền quyết định và ngưỡng báo cáo.',
      'Hỗ trợ tại checkpoint thay vì kiểm tra liên tục.',
      'Giữ nhân viên ở vị trí trực tiếp xử lý vấn đề.'
    ]
  },
  'Kinh doanh': {
    headline: '7/10 QUẢN LÝ CHƯA ĐẠT CHUẨN E',
    scores: [
      { name: 'Ủy quyền và Trao quyền quyết định', score: 1.52 },
      { name: 'Huấn luyện linh hoạt và Phát triển trên công việc', score: 1.60 },
      { name: 'Bản đồ nhân tài và Sẵn sàng kế thừa', score: 1.62 },
      { name: 'An toàn tâm lý và Gắn kết đội ngũ', score: 1.70 },
      { name: 'Trung bình E', score: 1.61 }
    ],
    behaviors: [
      { name: 'Hỗ trợ mà không làm thay', ratio: '6/10' },
      { name: 'Coaching linh hoạt trong quá trình thực hiện', ratio: '6/10' },
      { name: 'Kiểm chứng mức độ sẵn sàng kế nhiệm', ratio: '6/10' },
      { name: 'Đánh giá mức độ sẵn sàng nhận quyền quyết định', ratio: '5/10' }
    ],
    insights: 'Đội ngũ có khả năng thúc đẩy kết quả nhưng coaching thường tập trung vào việc cung cấp phương án bán hàng, thay vì giúp nhân viên tự phân tích và chọn giải pháp.',
    priorities: [
      'Chuyển từ đưa đáp án sang đặt câu hỏi.',
      'Sử dụng kết quả nhiều kỳ để nhận diện nhân tài.',
      'Kiểm chứng ứng viên kế nhiệm qua nhiệm vụ thử thách.'
    ]
  },
  'Hỗ trợ': {
    headline: '6/10 QUẢN LÝ CHƯA ĐẠT CHUẨN E',
    scores: [
      { name: 'Ủy quyền và Trao quyền quyết định', score: 1.70 },
      { name: 'Huấn luyện linh hoạt và Phát triển trên công việc', score: 1.67 },
      { name: 'Bản đồ nhân tài và Sẵn sàng kế thừa', score: 1.66 },
      { name: 'An toàn tâm lý và Gắn kết đội ngũ', score: 1.77 },
      { name: 'Trung bình E', score: 1.70 }
    ],
    behaviors: [
      { name: 'Đánh giá mức độ sẵn sàng nhận quyền quyết định', ratio: '5/10' },
      { name: 'Hỗ trợ mà không làm thay', ratio: '4/10' },
      { name: 'Coaching linh hoạt trong quá trình thực hiện', ratio: '4/10' },
      { name: 'Kiểm chứng tiến bộ và nâng cấp thử thách', ratio: '4/10' }
    ],
    insights: 'Khối Hỗ trợ có nền tảng giao tiếp tương đối tốt nhưng quyền quyết định vẫn tập trung vào cấp quản lý, đặc biệt với những nhiệm vụ liên quan đến chính sách và quy trình nội bộ.',
    priorities: [
      'Phân định rõ quyết định được tự thực hiện.',
      'Mở rộng quyền hạn theo bằng chứng.',
      'Phản hồi rõ cách xử lý sau khi nhân viên nêu ý kiến.'
    ]
  }
};



const mockPareto = [
  { name: 'Quản lý làm thay', cost: 42, cumulative: 42 },
  { name: 'Giải quyết vấn đề chậm', cost: 28, cumulative: 70 },
  { name: 'Không duy trì kết quả', cost: 20, cumulative: 90 },
  { name: 'Nhân tài nghỉ việc', cost: 10, cumulative: 100 }
];

const mockBarHours = [
  { name: 'Quản lý làm thay', hours: 90 },
  { name: 'Giải quyết vấn đề chậm', hours: 60 },
  { name: 'Không duy trì kết quả', hours: 43 },
  { name: 'Nhân tài nghỉ việc', hours: 21 }
];

const mockScatter = [
  { id: 'M01', x: 2.2, y: 110, group: 'excellent' },
  { id: 'M02', x: 1.8, y: 112, group: 'urgent' }, 
  { id: 'M03', x: 2.1, y: 105, group: 'excellent' },
  { id: 'M04', x: 1.6, y: 109, group: 'urgent' }, 
  { id: 'M05', x: 1.7, y: 107, group: 'urgent' }, 
  { id: 'M06', x: 2.3, y: 115, group: 'excellent' },
  { id: 'M07', x: 2.5, y: 120, group: 'excellent' },
  { id: 'M08', x: 2.0, y: 100, group: 'excellent' },
  { id: 'M09', x: 1.5, y: 105, group: 'urgent' }, 
  { id: 'M10', x: 2.1, y: 95, group: 'standard' },
  { id: 'M11', x: 1.9, y: 104, group: 'urgent' }, 
  { id: 'M12', x: 2.2, y: 98, group: 'standard' },
  { id: 'M13', x: 2.4, y: 99, group: 'standard' },
  { id: 'M14', x: 1.8, y: 90, group: 'significant' },
  { id: 'M15', x: 1.6, y: 103, group: 'urgent' }, 
  { id: 'M16', x: 1.7, y: 88, group: 'significant' },
  { id: 'M17', x: 1.5, y: 85, group: 'significant' },
  { id: 'M18', x: 1.9, y: 92, group: 'significant' },
  { id: 'M19', x: 1.8, y: 80, group: 'significant' },
  { id: 'M20', x: 1.7, y: 101, group: 'urgent' }, 
  { id: 'M21', x: 1.6, y: 75, group: 'significant' },
  { id: 'M22', x: 1.5, y: 70, group: 'significant' },
  { id: 'M23', x: 1.8, y: 78, group: 'significant' },
  { id: 'M24', x: 1.8, y: 100, group: 'urgent' }, 
  { id: 'M25', x: 1.9, y: 85, group: 'significant' },
  { id: 'M26', x: 1.7, y: 82, group: 'significant' },
  { id: 'M27', x: 1.6, y: 79, group: 'significant' },
  { id: 'M28', x: 1.5, y: 65, group: 'significant' },
  { id: 'M29', x: 1.5, y: 100, group: 'urgent' }, 
  { id: 'M30', x: 1.9, y: 77, group: 'significant' }
];

const mockHeroFull = [
  { id: 'M02', kpi: 112, scoreE: 1.83, risk: 'Chưa điều chỉnh quyền hạn theo mức sẵn sàng' },
  { id: 'M04', kpi: 109, scoreE: 1.62, risk: 'Can thiệp khi nhân viên xử lý khác cách' },
  { id: 'M05', kpi: 107, scoreE: 1.71, risk: 'Coaching bằng cách đưa sẵn phương án' },
  { id: 'M09', kpi: 105, scoreE: 1.54, risk: 'Lấy lại nhiệm vụ đã giao khi thấy chậm' },
  { id: 'M11', kpi: 104, scoreE: 1.92, risk: 'Chưa thiết lập quy trình phản hồi định kỳ' },
  { id: 'M15', kpi: 103, scoreE: 1.67, risk: 'Không kiểm chứng tiến bộ sau coaching' },
  { id: 'M20', kpi: 101, scoreE: 1.75, risk: 'Đưa đáp án thay vì đặt câu hỏi mở' },
  { id: 'M24', kpi: 100, scoreE: 1.88, risk: 'Chưa trao quyền ra quyết định cho nhân viên' },
  { id: 'M29', kpi: 100, scoreE: 1.58, risk: 'Hỗ trợ trực tiếp thay vì huấn luyện cách làm' }
];

const mockDeptModule = [
  { dept: 'Vận hành', m1: 9, m2: 8, m3: 7, m4: 6 },
  { dept: 'Kinh doanh', m1: 8, m2: 8, m3: 7, m4: 7 },
  { dept: 'Hỗ trợ', m1: 7, m2: 7, m3: 7, m4: 5 },
];

const mockBeforeAfter = [
  { name: 'QL đạt chuẩn E', before: 8, after: 22 },
  { name: 'Giờ lãng phí/tháng', before: 214, after: 160 },
  { name: 'Chi phí (Tr/năm)', before: 899, after: 674 },
];
const CustomParetoXAxisTick = (props) => {
  const { x, y, payload } = props;
  let line1 = payload.value;
  let line2 = "";
  if (payload.value === 'Quản lý làm thay') { line1 = 'Quản lý'; line2 = 'làm thay'; }
  else if (payload.value === 'Giải quyết vấn đề chậm') { line1 = 'Giải quyết'; line2 = 'vấn đề chậm'; }
  else if (payload.value === 'Không duy trì kết quả') { line1 = 'Không duy trì'; line2 = 'kết quả'; }
  else if (payload.value === 'Nhân tài nghỉ việc') { line1 = 'Nhân tài'; line2 = 'nghỉ việc'; }
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={15} textAnchor="middle" fill="#4B5563" fontSize={11} fontWeight="500">
        <tspan x={0} dy="0">{line1}</tspan>
        {line2 && <tspan x={0} dy="14">{line2}</tspan>}
      </text>
    </g>
  );
};

const CustomYAxisTick = (props) => {
  const { x, y, payload } = props;
  const text = payload.value;
  const split = text.split(" - ");
  if (split.length === 2) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={-135} y={0} dy={4} textAnchor="start" fill="#4B5563" fontSize="14">
          <tspan fontWeight="bold" fill="var(--vmp-navy)" fontSize="15">{split[0]}</tspan>
          <tspan> - {split[1]}</tspan>
        </text>
      </g>
    );
  }
  return <text x={-135} y={y} dy={4} textAnchor="start" fill="#666" fontSize="14">{text}</text>;
};

const CustomExecutiveTooltip = (props) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={{ margin: '6px 0 0 0', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <div style={{ width: 12, height: 12, backgroundColor: entry.color, borderRadius: '2px' }}></div>
            <span>{`${entry.name}: `}<strong>{`${entry.value}%`}</strong></span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPillarYAxisTick = (props) => {
  const { x, y, payload } = props;
  const gapItem = mockTop8Gaps.find(item => item.name === payload.value);
  const pillar = gapItem ? gapItem.pillar : '';
  
  const pillarColors = {
    'R': '#3B82F6',
    'E': '#8B5CF6',
    'A': '#10B981',
    'L': '#F59E0B'
  };
  
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-195} y={-12} width={24} height={24} fill={pillarColors[pillar] || '#ccc'} rx={4} />
      <text x={-183} y={5} textAnchor="middle" fill="#fff" fontSize={13} fontWeight="bold">{pillar}</text>
      <text x={-15} y={4} textAnchor="end" fill="#4B5563" fontSize={13} fontWeight="500">{payload.value}</text>
    </g>
  );
};

const CustomRadarTick = (props) => {
  const { payload, x, y, cx, cy, ...rest } = props;
  const isProblem = payload.value.includes('E -');
  
  return (
    <text
      {...rest}
      x={x}
      y={y}
      fill={isProblem ? '#5B21B6' : '#4B5563'}
      fontWeight={isProblem ? 'bold' : 'bold'}
      fontSize={isProblem ? 15 : 13}
    >
      {payload.value}
    </text>
  );
};

const App = () => {
  const [isStarted, setIsStarted] = React.useState(false);
  const [isPrinting, setIsPrinting] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);


  const tabs = [
    "Tổng quan", "P1. GAP Analysis", "P2. Chi phí", "P3. Talent Matrix", "P4. L&D & ROI"
  ];

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };

  const getHeatmapColor = (score) => {
    if (score >= 2.0) return { bg: '#22C55E', text: '#FFFFFF' }; // Xanh (Đạt chuẩn)
    if (score >= 1.8) return { bg: '#C0E020', text: '#111827' }; // Vàng (Chưa đạt chuẩn)
    if (score >= 1.6) return { bg: '#F97316', text: '#FFFFFF' }; // Đỏ nhạt / Cam (Khoảng trống đáng kể)
    return { bg: '#DC2626', text: '#FFFFFF' }; // Đỏ đậm (Ưu tiên can thiệp)
  };

  if (!isStarted) {
    return (
      <div className="flex-col flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
        <h1 style={{ color: '#1E3A8A', marginBottom: '1rem' }}>REAL Manager Framework™</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Hệ thống Báo cáo Năng lực Quản lý Toàn diện</p>
        <div className="gap-4 flex-center">
          <button className="tab-btn">Tải Template Excel</button>
          <button className="tab-btn">Upload Dữ liệu</button>
          <button className="tab-btn active" onClick={() => setIsStarted(true)}>Xem Demo</button>
        </div>
      </div>
    );
  }

  const Tab1 = () => (
    <div className="flex-col gap-4">
      {/* Section 1 */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', 
        color: 'white', 
        borderLeft: 'none',
        borderTop: '4px solid #f97316', 
        padding: '2.5rem 2rem',
        boxShadow: '0 10px 25px -5px rgba(30, 58, 138, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ color: 'white', fontSize: '2.4rem', marginBottom: '0.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>BÁO CÁO NĂNG LỰC QUẢN LÝ TOÀN TỔ CHỨC</h1>
          <p style={{ color: '#93C5FD', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: '600' }}>REAL Manager Framework™ Assessment</p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <i className="fas fa-building" style={{ color: '#93C5FD' }}></i>
            <span style={{ fontSize: '0.95rem' }}>Công ty ABC</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <i className="fas fa-users" style={{ color: '#93C5FD' }}></i>
            <span style={{ fontSize: '0.95rem' }}>30 Nhà quản lý</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <i className="fas fa-layer-group" style={{ color: '#93C5FD' }}></i>
            <span style={{ fontSize: '0.95rem' }}>10 Vận hành • 10 Kinh doanh • 10 Hỗ trợ</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <i className="fas fa-bullseye" style={{ color: '#F97316' }}></i>
            <span style={{ fontSize: '0.95rem' }}>Khung: <strong>REAL 16 Năng lực</strong></span>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 2.4fr' }}>
        <div className="card flex-col flex-center" style={{ justifyContent: 'center', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <i className="fas fa-heartbeat" style={{ color: '#4F46E5', fontSize: '1.25rem' }}></i>
            <span style={{ color: '#4F46E5', fontWeight: 'bold', fontSize: '1rem', letterSpacing: '0.05em' }}>VMP HEALTH SCORE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '5rem', fontWeight: '800', color: '#1E1B4B', lineHeight: '1' }}>1.9</span>
            <span style={{ fontSize: '2rem', color: '#64748B', fontWeight: '600' }}>/ 3.0</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#EF4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', marginTop: '1rem', fontWeight: 'bold', fontSize: '0.95rem', boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '50%' }}></span>
            Ưu tiên can thiệp (E-score)
          </div>
        </div>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '1.5rem' }}>
          <div style={{ flex: 1, borderRight: '1px solid #E5E7EB', paddingRight: '1rem' }}>
            <h3 className="card-title" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Khung năng lực REAL</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="40%" cy="50%" outerRadius="55%" data={mockMacroRadar}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" tick={<CustomRadarTick />} />
                  <PolarRadiusAxis domain={[0, 3]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ flex: 1, paddingLeft: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 'bold', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>ĐIỂM NÓNG HIỆN TẠI</div>
            <h4 style={{ color: '#5B21B6', fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: 1.2 }}>Điểm nghẽn: Empowerment</h4>
            <p style={{ fontSize: '0.95rem', color: '#4B5563', lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>
              Đội ngũ quản lý đang thiên hướng tập trung vào việc tạo <strong>kết quả (Results)</strong> và duy trì <strong>sự liên kết (Alignment)</strong>. Tuy nhiên, kỹ năng <strong>ủy quyền và trao quyền (Empowerment)</strong> đang là điểm yếu nhất, dẫn đến nguy cơ quá tải cho quản lý và hạn chế sự phát triển tự chủ của nhân viên.
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
        <h3 className="card-title" style={{ marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem' }}>Phân bổ tỷ lệ đáp ứng năng lực theo 3 Cấp độ (Level 1, 2, 3)</h3>
        <div style={{ height: 250, paddingRight: '20px' }}>
          <ResponsiveContainer>
            <BarChart layout="vertical" data={mockExecutiveChart} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(val) => val + '%'} />
              <YAxis type="category" dataKey="name" width={150} tickLine={false} axisLine={false} tick={<CustomYAxisTick />} />
              <Tooltip content={<CustomExecutiveTooltip />} />
              <Legend verticalAlign="bottom" iconType="square" formatter={(value) => <span style={{ color: '#000' }}>{value}</span>} />
              <Bar dataKey="level1" stackId="a" fill={COLORS.urgent} name="Level 1" />
              <Bar dataKey="level2" stackId="a" fill="#FCA5A5" name="Level 2" />
              <Bar dataKey="level3" stackId="a" fill="#FEE2E2" name="Level 3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section 3 - Ba phát hiện cốt lõi */}
      <h2 style={{ marginBottom: '1rem', color: 'var(--vmp-navy)' }}>BA PHÁT HIỆN CỐT LÕI</h2>
      
      <div className="grid-3 gap-4">
        {/* Phát hiện 1 */}
        <div className="card">
          <h3 style={{ color: 'var(--vmp-navy)', fontSize: '1.1rem', marginBottom: '1rem', lineHeight: 1.4 }}>
            <span style={{ color: '#111827' }}>Phát hiện 1:</span><br/>Empowerment là vùng đỏ lớn nhất
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E5E7EB', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem 0', whiteSpace: 'nowrap' }}>Trụ năng lực</th>
                <th style={{ padding: '0.5rem 0', textAlign: 'center' }}>Điểm TB</th>
                <th style={{ padding: '0.5rem 0', textAlign: 'center' }}>QL CHƯA đạt chuẩn</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '0.5rem 0', whiteSpace: 'nowrap' }}>R – Results</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>2.14</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>8/30</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB', color: COLORS.urgent, fontWeight: 'bold' }}>
                <td style={{ padding: '0.5rem 0', whiteSpace: 'nowrap' }}>E – Empowerment</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>1.60</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>22/30</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '0.5rem 0', whiteSpace: 'nowrap' }}>A – Alignment</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>1.92</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>12/30</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem 0', whiteSpace: 'nowrap' }}>L – Learning</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>1.83</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>15/30</td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginTop: '1rem', textAlign: 'justify' }}>
            <strong style={{ color: '#111827' }}>22/30</strong> quản lý chưa đạt chuẩn E, tương đương <strong style={{ color: COLORS.urgent }}>73%</strong> đội ngũ.
          </p>
        </div>

        {/* Phát hiện 2 */}
        <div className="card">
          <h3 style={{ color: 'var(--vmp-navy)', fontSize: '1.1rem', marginBottom: '1rem', lineHeight: 1.4 }}>
            <span style={{ color: '#111827' }}>Phát hiện 2:</span><br/>Khoảng trống E tập trung ở hành vi thực thi
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Trong 480 lượt đánh giá hành vi thuộc trụ E:</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E5E7EB', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem 0' }}>Cấp độ</th>
                <th style={{ padding: '0.5rem 0', textAlign: 'center' }}>Số lượt</th>
                <th style={{ padding: '0.5rem 0', textAlign: 'center' }}>Tỷ lệ</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E5E7EB', color: COLORS.urgent, fontWeight: 'bold' }}>
                <td style={{ padding: '0.5rem 0' }}>Mức 1 – Foundation</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>236</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>49.2%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '0.5rem 0' }}>Mức 2 – Proficient</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>202</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>42.1%</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem 0' }}>Mức 3 – Mastery</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>42</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>8.7%</td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Ba hành vi có nhiều quản lý ở mức 1 nhất:</p>
          <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
            <li><strong>Hỗ trợ mà không làm thay:</strong> 18/30.</li>
            <li><strong>Coaching linh hoạt trong quá trình thực hiện:</strong> 17/30.</li>
            <li><strong>Đánh giá mức độ sẵn sàng nhận quyền quyết định:</strong> 17/30.</li>
          </ol>
        </div>

        {/* Phát hiện 3 */}
        <div className="card">
          <h3 style={{ color: 'var(--vmp-navy)', fontSize: '1.1rem', marginBottom: '1rem', lineHeight: 1.4 }}>
            <span style={{ color: '#111827' }}>Phát hiện 3:</span><br/>Có 9 quản lý đạt KPI nhưng E chưa đạt chuẩn
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>
            Đây là nhóm có nguy cơ tạo kết quả bằng nỗ lực cá nhân và sự can thiệp trực tiếp, thay vì phát triển khả năng tự vận hành của đội ngũ.
          </p>
        </div>
      </div>

      {/* Section 4 - Giải pháp trọng tâm */}
      <div className="card" style={{ backgroundColor: 'var(--vmp-navy)', color: 'white' }}>
        <h3 className="card-title" style={{ color: 'var(--vmp-orange)' }}>
          <i className="fas fa-lightbulb" style={{ marginRight: '0.5rem' }}></i> Giải pháp trọng tâm
        </h3>
        <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>Trong 90 ngày đầu, doanh nghiệp nên ưu tiên:</p>
        <ul style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li>Ủy quyền và Trao quyền quyết định.</li>
          <li>Huấn luyện linh hoạt và Phát triển trên công việc.</li>
          <li>Quan sát hành vi trên công việc.</li>
          <li>Đánh giá lại bằng bằng chứng sau 30–60–90 ngày.</li>
        </ul>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--vmp-orange)' }}>
          <strong style={{ fontSize: '1.05rem' }}>Không tổ chức một khóa học chung cho toàn bộ 30 quản lý. Hoạt động phát triển cần được phân bổ theo điểm thiếu hụt và hành vi mức 1 của từng nhóm.</strong>
        </div>
      </div>
    </div>
  );

  const Tab2 = () => {
    const [selectedCell, setSelectedCell] = React.useState('Chung');
    const [selectedDept, setSelectedDept] = React.useState('Hỗ trợ');
    const getDistributionData = () => {
      if (selectedCell === 'Chung') return mockDistribution;
      const hash = selectedCell.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      return mockDistribution.map((d, i) => ({
        ...d,
        count: Math.max(0, d.count + ((hash + i) % 7) - 3)
      }));
    };
    return (
    <div className="flex-col gap-4">

      {/* VMP Health Score Section */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', border: '1px solid #E2E8F0', padding: '2rem' }}>
        <div className="flex-between" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: '#6366F1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fas fa-heartbeat"></i> VMP Health Score
            </h3>
            <div style={{ fontSize: '4.5rem', fontWeight: '800', color: '#312E81', lineHeight: '1' }}>
              1.9 <span style={{ fontSize: '1.5rem', color: '#6B7280', fontWeight: '600' }}>/ 3.0</span>
            </div>
            <div style={{ marginTop: '1rem', display: 'inline-block', backgroundColor: '#EF4444', color: 'white', padding: '0.4rem 1rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.9rem', boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)' }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FCA5A5', marginRight: '6px' }}></span>
              Ưu tiên can thiệp (E-score)
            </div>
          </div>
          
          <div className="grid-2 gap-4" style={{ flex: 1, minWidth: '300px' }}>
             {[
               { name: 'R - Result', score: 2.1, color: '#22C55E', max: 3.0 },
               { name: 'E - Empower', score: 1.6, color: '#F97316', max: 3.0 },
               { name: 'A - Align', score: 1.9, color: '#C0E020', max: 3.0 },
               { name: 'L - Lead', score: 1.8, color: '#C0E020', max: 3.0 }
             ].map((item, idx) => (
                <div key={idx} style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #F1F5F9' }}>
                   <div style={{ width: 60, height: 60, position: 'relative', flexShrink: 0 }}>
                     <svg width="60" height="60" viewBox="0 0 60 60">
                       <circle cx="30" cy="30" r="26" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                       <circle cx="30" cy="30" r="26" fill="none" stroke={item.color} strokeWidth="6" strokeDasharray={`${(item.score/item.max)*163} 163`} strokeLinecap="round" transform="rotate(-90 30 30)" />
                     </svg>
                     <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem', color: '#1E293B' }}>
                       {item.score}
                     </div>
                   </div>
                   <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#475569' }}>{item.name}</div>
                </div>
             ))}
          </div>
        </div>
      </div>
      {/* Section 3 */}
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '2rem', alignItems: 'start' }}>
          {/* Critical Findings */}
          <div style={{ borderRight: '1px solid #E5E7EB', paddingRight: '2rem', height: '100%' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', color: '#111827' }}>Phát hiện cốt lõi (Critical findings)</h3>
            
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#DC2626', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <i className="fas fa-exclamation-circle"></i> Ưu tiên can thiệp (1)
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <i className="fas fa-times" style={{ color: '#DC2626', marginTop: '4px', fontSize: '1.1rem' }}></i>
                <span style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.5' }}>Kỹ năng Ủy quyền (E) của khối Vận hành đang ở mức <strong>rất yếu (1.5)</strong></span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F97316', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <i className="fas fa-exclamation-triangle"></i> Khoảng trống đáng kể (3)
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <i className="fas fa-exclamation-triangle" style={{ color: '#F97316', marginTop: '4px' }}></i>
                <span style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: '1.5' }}>Điểm số E toàn công ty <strong>tụt hậu (1.6)</strong> so với các kỹ năng khác</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <i className="fas fa-exclamation-triangle" style={{ color: '#F97316', marginTop: '4px' }}></i>
                <span style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: '1.5' }}>Khối Kinh doanh có dấu hiệu "Hero Manager" (R=2.2 nhưng <strong>E=1.6</strong>)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <i className="fas fa-exclamation-triangle" style={{ color: '#F97316', marginTop: '4px' }}></i>
                <span style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: '1.5' }}>Khối Hỗ trợ có điểm E cao nhất (1.7) nhưng <strong>vẫn chưa đạt chuẩn (2.0)</strong></span>
              </div>
            </div>
          </div>

          {/* Heatmap Section */}
          <div>
            <h3 className="card-title">So Sánh Sức Khỏe R-E-A-L Giữa Các Khối</h3>
            <div className="gap-4">
              <div style={{ display: 'grid', gridTemplateColumns: '115px repeat(4, 1fr)', gap: '4px', alignItems: 'center' }}>
            {/* Headers */}
            <div></div>
            <div style={{ textAlign: 'center', fontWeight: 'bold', paddingBottom: '0.5rem', color: '#1F2937' }}>R</div>
            <div style={{ textAlign: 'center', fontWeight: 'bold', paddingBottom: '0.5rem', color: '#1F2937' }}>E</div>
            <div style={{ textAlign: 'center', fontWeight: 'bold', paddingBottom: '0.5rem', color: '#1F2937' }}>A</div>
            <div style={{ textAlign: 'center', fontWeight: 'bold', paddingBottom: '0.5rem', color: '#1F2937' }}>L</div>
            
            {/* Vận hành */}
            <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1F2937' }}>Vận hành</div>
            {[2.1, 1.5, 1.9, 1.8].map((score, i) => {
              const { bg, text } = getHeatmapColor(score);
              const label = ['R', 'E', 'A', 'L'][i];
              const isSelected = selectedCell === `Vận hành - ${label}`;
              return <div key={i} onClick={() => setSelectedCell(`Vận hành - ${label}`)} className="flex-center heatmap-cell" style={{ backgroundColor: bg, color: text, borderRadius: '4px', height: '48px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', outline: isSelected ? '2px solid #1E3A8A' : 'none', outlineOffset: '-2px' }}>{score}</div>
            })}
            
            {/* Kinh doanh */}
            <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1F2937' }}>Kinh doanh</div>
            {[2.2, 1.6, 2.0, 1.9].map((score, i) => {
              const { bg, text } = getHeatmapColor(score);
              const label = ['R', 'E', 'A', 'L'][i];
              const isSelected = selectedCell === `Kinh doanh - ${label}`;
              return <div key={i} onClick={() => setSelectedCell(`Kinh doanh - ${label}`)} className="flex-center heatmap-cell" style={{ backgroundColor: bg, color: text, borderRadius: '4px', height: '48px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', outline: isSelected ? '2px solid #1E3A8A' : 'none', outlineOffset: '-2px' }}>{score}</div>
            })}

            {/* Hỗ trợ */}
            <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1F2937' }}>Hỗ trợ</div>
            {[2.1, 1.7, 2.0, 1.8].map((score, i) => {
              const { bg, text } = getHeatmapColor(score);
              const label = ['R', 'E', 'A', 'L'][i];
              const isSelected = selectedCell === `Hỗ trợ - ${label}`;
              return <div key={i} onClick={() => setSelectedCell(`Hỗ trợ - ${label}`)} className="flex-center heatmap-cell" style={{ backgroundColor: bg, color: text, borderRadius: '4px', height: '48px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', outline: isSelected ? '2px solid #1E3A8A' : 'none', outlineOffset: '-2px' }}>{score}</div>
            })}

            {/* Toàn Công ty */}
            <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1F2937' }}>Toàn Công ty</div>
            {[2.1, 1.6, 1.9, 1.8].map((score, i) => {
              const { bg, text } = getHeatmapColor(score);
              const label = ['R', 'E', 'A', 'L'][i];
              const isSelected = selectedCell === `Toàn CT - ${label}`;
              return <div key={i} onClick={() => setSelectedCell(`Toàn CT - ${label}`)} className="flex-center heatmap-cell" style={{ backgroundColor: bg, color: text, borderRadius: '4px', height: '48px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', outline: isSelected ? '2px solid #1E3A8A' : 'none', outlineOffset: '-2px' }}>{score}</div>
            })}
          </div>


        </div>


        
        {/* Heatmap Legend */}
        <div className="flex-center" style={{ gap: '1.5rem', flexWrap: 'wrap', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB', marginTop: '0.5rem' }}>
          <span style={{ fontWeight: 'bold', color: '#374151', fontSize: '0.9rem' }}><i className="fas fa-palette" style={{ marginRight: '0.5rem' }}></i>Quy ước màu heatmap:</span>
          <div className="flex-center" style={{ gap: '0.4rem' }}>
            <div style={{ width: 14, height: 14, backgroundColor: '#DC2626', borderRadius: '3px' }}></div>
            <span style={{ fontSize: '0.85rem', color: '#4B5563' }}>(Dưới 1.60): Ưu tiên can thiệp</span>
          </div>
          <div className="flex-center" style={{ gap: '0.4rem' }}>
            <div style={{ width: 14, height: 14, backgroundColor: '#F97316', borderRadius: '3px' }}></div>
            <span style={{ fontSize: '0.85rem', color: '#4B5563' }}>(1.60 - 1.79): Khoảng trống đáng kể</span>
          </div>
          <div className="flex-center" style={{ gap: '0.4rem' }}>
            <div style={{ width: 14, height: 14, backgroundColor: '#C0E020', borderRadius: '3px' }}></div>
            <span style={{ fontSize: '0.85rem', color: '#4B5563' }}>(1.80 - 1.99): Chưa đạt chuẩn</span>
          </div>
          <div className="flex-center" style={{ gap: '0.4rem' }}>
            <div style={{ width: 14, height: 14, backgroundColor: '#22C55E', borderRadius: '3px' }}></div>
            <span style={{ fontSize: '0.85rem', color: '#4B5563' }}>(Từ 2.00): Đạt chuẩn</span>
          </div>
        </div>
      </div>
      </div>

        {/* Section 4: Soi Chi Tiết Từng Khối */}
        <div className="card" style={{ marginTop: '0.5rem', backgroundColor: '#F8FAFC', border: 'none', boxShadow: 'none' }}>
          <h3 style={{ color: '#1E3A8A', fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
            Soi Chi Tiết Từng Khối
          </h3>
          
          {/* Tabs for Departments */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', backgroundColor: 'white', padding: '0.5rem', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'inline-flex' }}>
            <button className={`tab-btn ${selectedDept === 'Vận hành' ? 'active' : ''}`} onClick={() => setSelectedDept('Vận hành')} style={{ padding: '0.5rem 1.5rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', backgroundColor: selectedDept === 'Vận hành' ? '#F97316' : 'transparent', color: selectedDept === 'Vận hành' ? 'white' : '#64748B' }}>Khối Vận hành</button>
            <button className={`tab-btn ${selectedDept === 'Kinh doanh' ? 'active' : ''}`} onClick={() => setSelectedDept('Kinh doanh')} style={{ padding: '0.5rem 1.5rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', backgroundColor: selectedDept === 'Kinh doanh' ? '#F97316' : 'transparent', color: selectedDept === 'Kinh doanh' ? 'white' : '#64748B' }}>Khối Kinh doanh</button>
            <button className={`tab-btn ${selectedDept === 'Hỗ trợ' ? 'active' : ''}`} onClick={() => setSelectedDept('Hỗ trợ')} style={{ padding: '0.5rem 1.5rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', backgroundColor: selectedDept === 'Hỗ trợ' ? '#F97316' : 'transparent', color: selectedDept === 'Hỗ trợ' ? 'white' : '#64748B' }}>Khối Hỗ trợ</button>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #F1F5F9' }}>
            {(() => {
              const deptData = deptDataMap[selectedDept];
              return (
                <>
                  {/* Header Headline */}
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h4 style={{ color: '#1E3A8A', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <i className="fas fa-headset"></i> KHỐI {selectedDept.toUpperCase()}
                    </h4>
                    <h3 style={{ color: '#DC2626', fontSize: '1.5rem', fontWeight: 'bold' }}>{deptData.headline}</h3>
                  </div>
                  
                  <div className="grid-2 gap-4" style={{ marginBottom: '1.5rem' }}>
                    {/* Left Column: Radar */}
                    <div style={{ height: 280, padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius="75%" data={[
                          { subject: 'R', A: selectedDept === 'Vận hành' ? 2.1 : selectedDept === 'Kinh doanh' ? 2.2 : 2.1, fullMark: 3.0 },
                          { subject: 'E', A: deptData.scores[4].score, fullMark: 3.0 },
                          { subject: 'A', A: selectedDept === 'Vận hành' ? 1.9 : selectedDept === 'Kinh doanh' ? 2.0 : 2.0, fullMark: 3.0 },
                          { subject: 'L', A: selectedDept === 'Vận hành' ? 1.8 : selectedDept === 'Kinh doanh' ? 1.9 : 1.8, fullMark: 3.0 },
                        ]}>
                          <PolarGrid stroke="#CBD5E1" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontWeight: 'bold' }} />
                          <Radar name="Score" dataKey="A" stroke="#8B5CF6" fill="#C4B5FD" fillOpacity={0.6} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Right Column: E scores (no average) */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', height: '100%' }}>
                        <h5 style={{ fontSize: '1rem', color: '#1E293B', marginBottom: '1.5rem' }}>Chi tiết Năng lực trụ E</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                          {deptData.scores.slice(0, 4).map((item, idx) => (
                            <div key={idx}>
                              <div className="flex-between" style={{ marginBottom: '0.5rem', fontSize: '0.95rem', color: '#334155', fontWeight: '500' }}>
                                <span>{item.name}</span>
                                <span style={{ color: item.score < 1.6 ? '#DC2626' : item.score < 1.8 ? '#F59E0B' : '#10B981', fontWeight: 'bold' }}>{item.score}</span>
                              </div>
                              <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${(item.score / 3) * 100}%`, backgroundColor: item.score < 1.6 ? '#DC2626' : item.score < 1.8 ? '#F59E0B' : '#10B981' }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phát hiện (Full width at bottom) */}
                  <div style={{ padding: '1.25rem', borderLeft: '4px solid #3B82F6', backgroundColor: '#EFF6FF', borderRadius: '0 8px 8px 0' }}>
                    <h5 style={{ fontSize: '1rem', color: '#1D4ED8', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                      <i className="fas fa-search"></i> Phát hiện
                    </h5>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#1E3A8A', lineHeight: 1.6, textAlign: 'justify' }}>
                      {deptData.insights}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

      </div>
      
      {/* Top 8 Gaps */}
      <div className="card">
        <h3 className="card-title">Top 8 Năng lực Yếu nhất (Gaps)</h3>
        <div className="flex-center gap-4" style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#6B7280' }}>Trụ năng lực:</span>
          <div className="flex-center gap-2"><div style={{ width: 18, height: 18, backgroundColor: '#3B82F6', borderRadius: '4px', color: 'white', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>R</div> Results</div>
          <div className="flex-center gap-2"><div style={{ width: 18, height: 18, backgroundColor: '#8B5CF6', borderRadius: '4px', color: 'white', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>E</div> Empowerment</div>
          <div className="flex-center gap-2"><div style={{ width: 18, height: 18, backgroundColor: '#10B981', borderRadius: '4px', color: 'white', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div> Alignment</div>
          <div className="flex-center gap-2"><div style={{ width: 18, height: 18, backgroundColor: '#F59E0B', borderRadius: '4px', color: 'white', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>L</div> Learning</div>
        </div>
        <div style={{ height: 350 }}>
          <ResponsiveContainer>
            <BarChart layout="vertical" data={mockTop8Gaps} margin={{ top: 20, right: 30, left: 190, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 3]} />
              <YAxis type="category" dataKey="name" width={200} tick={<CustomPillarYAxisTick />} />
              <Tooltip />
              <ReferenceLine x={2.0} stroke="#999" strokeDasharray="5 5" label="Chuẩn" />
              <Bar dataKey="score">
                {mockTop8Gaps.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.score < 1.6 ? COLORS.urgent : COLORS.significant} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-center gap-4" style={{ marginTop: '1rem' }}>
          <div className="flex-center gap-2"><div style={{ width: 16, height: 16, backgroundColor: COLORS.urgent }}></div> &lt; 1.6 (Báo động)</div>
          <div className="flex-center gap-2"><div style={{ width: 16, height: 16, backgroundColor: COLORS.significant }}></div> 1.6 - 1.8 (Cần cải thiện)</div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', color: '#111827' }}>Đề xuất hành động (Recommendations)</h3>
          
          <div className="flex-col gap-4">
            {[
              'Tổ chức khóa đào tạo chuyên sâu về Nghệ thuật Ủy quyền cho 100% quản lý cấp trung.',
              'Theo dõi sát sao KPI và áp lực công việc tại khối Vận hành để tránh kiệt sức.',
              'Chuyển dịch trọng tâm đánh giá của khối Kinh doanh từ "Thành tích cá nhân" sang "Thành tích đội ngũ".',
              'Thiết lập hệ thống OKR minh bạch để liên kết mục tiêu cá nhân và phòng ban.',
              'Đưa tiêu chí Ủy quyền (E) vào kỳ đánh giá năng lực quản lý quý tiếp theo.'
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <i className="fas fa-magic" style={{ color: '#6366F1', marginTop: '4px', fontSize: '1rem' }}></i>
                <span style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.5' }}>{text}</span>
              </div>
            ))}
          </div>
      </div>

    </div>
  );
  };


  const Tab4 = () => (
    <div className="flex-col gap-4">

      {/* SECTION 1 — MỞ MÀN: Con số gây sốc */}
      <div className="grid-3 gap-4">
        <div className="card flex-col flex-center" style={{ borderTop: `4px solid ${COLORS.urgent}` }}>
          <h4 style={{ color: 'var(--text-muted)' }}>Tổng thời gian lãng phí</h4>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.urgent, margin: '0.5rem 0' }}>214 giờ / tháng</div>
          <p style={{ fontSize: '0.85rem' }}>= 30 quản lý × 7.1 giờ/quản lý</p>
        </div>
        <div className="card flex-col flex-center" style={{ borderTop: `4px solid ${COLORS.significant}` }}>
          <h4 style={{ color: 'var(--text-muted)' }}>Chi phí cơ hội mỗi tháng</h4>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.significant, margin: '0.5rem 0' }}>75M</div>
          <p style={{ fontSize: '0.85rem' }}>= 214 giờ × 350.000 đồng/giờ</p>
        </div>
        <div className="card flex-col flex-center" style={{ borderTop: `4px solid ${COLORS.excellent}` }}>
          <h4 style={{ color: 'var(--text-muted)' }}>Tổn thất ước tính mỗi năm</h4>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.excellent, margin: '0.5rem 0' }}>899M</div>
          <p style={{ fontSize: '0.85rem' }}>= 75M × 12 tháng</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6B7280', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
        Ước tính tổn thất mỗi năm từ hành vi quản lý chưa đạt chuẩn Empowerment — dựa trên dữ liệu khảo sát 30 quản lý cấp trung
      </div>

      {/* SECTION 2 — PHÂN TÍCH: 80% lãng phí đến từ đâu? */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
        <div className="card">
          <h3 className="card-title">Phân tích Pareto 80/20 Lãng phí</h3>
          <div style={{ height: 350 }}>
            <ResponsiveContainer>
              <ComposedChart data={mockPareto} margin={{ top: 35, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" interval={0} tick={<CustomParetoXAxisTick />} height={60} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar yAxisId="left" dataKey="cost" barSize={40} fill="var(--vmp-navy)" name="% Chi phí">
                  <LabelList dataKey="cost" position="top" fill="#1F2937" fontSize={13} fontWeight="bold" />
                </Bar>
                <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="var(--vmp-orange)" strokeWidth={2} name="% Tích lũy">
                  <LabelList dataKey="cumulative" position="bottom" offset={8} fill="var(--vmp-orange)" fontSize={12} fontWeight="bold" formatter={(val) => val + '%'} />
                </Line>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ padding: '1rem', backgroundColor: '#FEF3C7', borderRadius: '8px', marginBottom: '1.2rem' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#92400E', marginBottom: '0.5rem' }}>📌 Phát hiện quan trọng</div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
              <strong>Hơn 70% lãng phí</strong> bắt nguồn từ việc quản lý can thiệp quá sâu và giải quyết vấn đề thay nhân viên. 
            </p>
          </div>
          <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
              <div style={{ width: 44, height: 28, backgroundColor: 'var(--vmp-navy)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0 }}>42%</div>
              <span><strong>Quản lý làm thay</strong> — tỷ trọng lãng phí lớn nhất</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
              <div style={{ width: 44, height: 28, backgroundColor: 'var(--vmp-navy)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0 }}>28%</div>
              <span><strong>Giải quyết vấn đề chậm</strong> — tích lũy lên 70%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
              <div style={{ width: 44, height: 28, backgroundColor: 'var(--vmp-navy)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0 }}>20%</div>
              <span><strong>Không duy trì kết quả</strong> — tích lũy lên 90%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 44, height: 28, backgroundColor: '#9CA3AF', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0 }}>10%</div>
              <span><strong>Nhân tài nghỉ việc</strong> — 10% còn lại</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3 — PHÂN BỔ 214 GIỜ LÃNG PHÍ */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Phân bổ 214 giờ lãng phí mỗi tháng</h3>
        <div style={{ height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={mockBarHours} layout="vertical" margin={{ top: 5, right: 60, left: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={155} tick={{ fontSize: 13, fill: '#4B5563', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
              <Bar dataKey="hours" name="Thời gian lãng phí" barSize={36} fill="var(--vmp-navy)" radius={[0, 6, 6, 0]}>
                <LabelList dataKey="hours" position="right" fill="#1F2937" fontSize={14} fontWeight="bold" formatter={(val) => val + ' giờ'} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 4 — HỆ LỤY: Nỗi đau lớn nhất */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Hệ lụy trực tiếp từ 3 hành vi sai lệch</h3>
        <div className="grid-3 gap-4">
          <div style={{ padding: '1.25rem', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</div>
            <h4 style={{ color: '#991B1B', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Quản lý làm thay</h4>
            <p style={{ fontSize: '0.9rem', color: '#7F1D1D', margin: 0, lineHeight: '1.6', textAlign: 'justify' }}>Quản lý ôm đồm và quá tải, nhân viên ỷ lại và phụ thuộc vào quyết định của cấp trên.</p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: '#FFF7ED', borderRadius: '8px', border: '1px solid #FFEDD5', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏳</div>
            <h4 style={{ color: '#9A3412', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Giải quyết vấn đề chậm</h4>
            <p style={{ fontSize: '0.9rem', color: '#7C2D12', margin: 0, lineHeight: '1.6', textAlign: 'justify' }}>Năng lực tự giải quyết vấn đề của đội ngũ bị chững lại, công việc chung bị đình trệ.</p>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: '#F0FDF4', borderRadius: '8px', border: '1px solid #DCFCE7', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📉</div>
            <h4 style={{ color: '#166534', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Không duy trì kết quả</h4>
            <p style={{ fontSize: '0.9rem', color: '#14532D', margin: 0, lineHeight: '1.6', textAlign: 'justify' }}>Các hoạt động huấn luyện chỉ dừng ở lý thuyết, không chuyển hóa thành hành vi thực tế lâu dài.</p>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '8px', fontSize: '0.95rem', color: '#1E3A8A' }}>
          <strong>📌 Kết luận:</strong> Khắc phục 3 khoảng trống Empowerment này chính là "đòn bẩy" nhanh nhất để tối ưu quỹ thời gian, tăng tốc độ ra quyết định và xây dựng đội ngũ kế thừa vững mạnh.
        </div>
      </div>
    </div>
  );

  const Tab5 = () => (
    <div className="flex-col gap-4">
      {/* Section 1 */}
      <div className="card">
        <h3 className="card-title">Phân tích: Nhóm "Hero" vs Nhóm "Hệ thống"</h3>
        <div style={{ height: 400, position: 'relative' }}>
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="Điểm E" domain={[1.0, 3.0]} />
              <YAxis type="number" dataKey="y" name="KPI (%)" domain={[60, 130]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <ReferenceLine x={2.0} stroke="#999" strokeDasharray="5 5" label="E = 2.0" />
              <ReferenceLine y={100} stroke="#999" strokeDasharray="5 5" label="KPI = 100%" />
              <Scatter name="Quản lý" data={mockScatter}>
                {mockScatter.map((entry, index) => {
                  let color = '#ccc';
                  if (entry.group === 'excellent') color = COLORS.excellent;
                  if (entry.group === 'urgent') color = COLORS.urgent;
                  if (entry.group === 'significant') color = COLORS.significant;
                  if (entry.group === 'standard') color = COLORS.standard;
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', top: 20, left: 80, color: COLORS.urgent, fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.7)', padding: '4px' }}>Hero Cá nhân</div>
          <div style={{ position: 'absolute', top: 20, right: 40, color: COLORS.excellent, fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.7)', padding: '4px' }}>Hệ thống</div>
          <div style={{ position: 'absolute', bottom: 40, left: 80, color: COLORS.significant, fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.7)', padding: '4px' }}>Cần can thiệp</div>
          <div style={{ position: 'absolute', bottom: 40, right: 40, color: COLORS.standard, fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.7)', padding: '4px' }}>Nền tảng</div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="grid-2 gap-4">
        <div className="card flex-center position-relative">
          <div style={{ height: 250, width: '100%' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={[
                  { name: 'Hệ thống', value: 5, fill: COLORS.excellent },
                  { name: 'Hero', value: 9, fill: COLORS.urgent },
                  { name: 'Nền tảng', value: 3, fill: COLORS.standard },
                  { name: 'Can thiệp', value: 13, fill: COLORS.significant }
                ]} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  { [
                    { name: 'Hệ thống', value: 5, fill: COLORS.excellent },
                    { name: 'Hero', value: 9, fill: COLORS.urgent },
                    { name: 'Nền tảng', value: 3, fill: COLORS.standard },
                    { name: 'Can thiệp', value: 13, fill: COLORS.significant }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold', fontSize: '1.2rem' }}>30 QL</div>
        </div>
        <div className="grid-2 gap-4">
          <div className="card flex-col flex-center" style={{ borderLeft: `4px solid ${COLORS.excellent}` }}>
            <i className="fas fa-star" style={{ color: COLORS.excellent, fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
            <h4 style={{ margin: 0 }}>Hệ thống</h4>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>5 người</div>
          </div>
          <div className="card flex-col flex-center" style={{ borderLeft: `4px solid ${COLORS.urgent}` }}>
            <i className="fas fa-bomb" style={{ color: COLORS.urgent, fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
            <h4 style={{ margin: 0 }}>Hero</h4>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>9 người</div>
          </div>
          <div className="card flex-col flex-center" style={{ borderLeft: `4px solid ${COLORS.standard}` }}>
            <i className="fas fa-layer-group" style={{ color: COLORS.standard, fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
            <h4 style={{ margin: 0 }}>Nền tảng</h4>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3 người</div>
          </div>
          <div className="card flex-col flex-center" style={{ borderLeft: `4px solid ${COLORS.significant}` }}>
            <i className="fas fa-wrench" style={{ color: COLORS.significant, fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
            <h4 style={{ margin: 0 }}>Can thiệp</h4>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>13 người</div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="card">
        <h3 className="card-title">Danh sách "Hero" - KPI cao nhưng Quản lý yếu</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Mã QL</th>
              <th style={{ padding: '0.75rem', textAlign: 'center' }}>KPI</th>
              <th style={{ padding: '0.75rem', textAlign: 'center' }}>Điểm E</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Hành vi rủi ro</th>
            </tr>
          </thead>
          <tbody>
            {mockHeroFull.map((hero, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{hero.id}</td>
                <td style={{ padding: '0.75rem', textAlign: 'center', color: '#10B981', fontWeight: 'bold' }}>{hero.kpi}%</td>
                <td style={{ padding: '0.75rem', textAlign: 'center', color: COLORS.urgent, fontWeight: 'bold' }}>{hero.scoreE}</td>
                <td style={{ padding: '0.75rem' }}>{hero.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem', fontStyle: 'italic' }}>
          * Ghi chú: Cần ưu tiên các QL này tham gia chương trình huấn luyện ủy quyền.
        </p>
      </div>
    </div>
  );

  const Tab6 = () => (
    <div className="flex-col gap-4">
      {/* Section 1 */}
      <div className="card">
        <h3 className="card-title">Khuyến nghị Modules Đào tạo</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Module Khuyến nghị</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Mục tiêu đầu ra (KSA)</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Gắn với năng lực</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>1. Nghệ thuật Ủy quyền &amp; Trao quyền</td>
              <td style={{ padding: '0.75rem' }}>Phân loại công việc, chọn đúng người, kiểm soát rủi ro</td>
              <td style={{ padding: '0.75rem', color: COLORS.urgent }}>NL6 Ủy quyền (1.53)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>2. Huấn luyện (Coaching) Liên hoàn</td>
              <td style={{ padding: '0.75rem' }}>Mô hình GROW, đặt câu hỏi khai vấn, theo dõi tiến độ</td>
              <td style={{ padding: '0.75rem', color: COLORS.urgent }}>NL14 Kèm cặp (1.57)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>3. Xây dựng Bản đồ nhân tài</td>
              <td style={{ padding: '0.75rem' }}>Đánh giá 9-box, xác định High-Potentials</td>
              <td style={{ padding: '0.75rem', color: COLORS.urgent }}>NL15 Bản đồ (1.60)</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>4. Kiến tạo An toàn tâm lý</td>
              <td style={{ padding: '0.75rem' }}>Văn hóa phản hồi, khuyến khích sáng tạo</td>
              <td style={{ padding: '0.75rem', color: COLORS.significant }}>NL9 An toàn TL (1.69)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 2 */}
      <div className="grid-2 gap-4">
        <div className="card">
          <h3 className="card-title">Phân bổ Module theo Phòng ban</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Phòng ban</th>
                <th style={{ padding: '0.5rem' }}>M1</th>
                <th style={{ padding: '0.5rem' }}>M2</th>
                <th style={{ padding: '0.5rem' }}>M3</th>
                <th style={{ padding: '0.5rem' }}>M4</th>
              </tr>
            </thead>
            <tbody>
              {mockDeptModule.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '0.5rem', textAlign: 'left', fontWeight: 'bold' }}>{row.dept}</td>
                  <td style={{ padding: '0.5rem' }}>{row.m1}</td>
                  <td style={{ padding: '0.5rem' }}>{row.m2}</td>
                  <td style={{ padding: '0.5rem' }}>{row.m3}</td>
                  <td style={{ padding: '0.5rem' }}>{row.m4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3 className="card-title">Phân bổ Nhóm theo Năng lực</h3>
          <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Nhóm A (Khẩn cấp):</strong> 13 QL điểm E &lt; 1.6 &amp; 9 Hero. Ưu tiên học ngay M1 &amp; M2.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Nhóm B (Cần thiết):</strong> 5 QL điểm 1.6 - 2.0. Tham gia M3 &amp; M4 để chuẩn hóa.</li>
            <li><strong>Nhóm C (Kế thừa):</strong> 3 QL &gt; 2.0. Trở thành Mentor hoặc Co-Trainer nội bộ.</li>
          </ul>
        </div>
      </div>

      {/* Section 3 */}
      <div className="grid-2 gap-4">
        <div className="card">
          <h3 className="card-title">Lộ trình triển khai (90 ngày)</h3>
          <div className="flex-col gap-2">
            <div className="flex-center gap-4" style={{ justifyContent: 'flex-start' }}>
              <div style={{ backgroundColor: 'var(--vmp-navy)', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', minWidth: '80px', textAlign: 'center' }}>Tháng 1</div>
              <div>Đào tạo Module 1 &amp; 2. Giao bài tập ứng dụng.</div>
            </div>
            <div className="flex-center gap-4" style={{ justifyContent: 'flex-start' }}>
              <div style={{ backgroundColor: 'var(--vmp-orange)', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', minWidth: '80px', textAlign: 'center' }}>Tháng 2</div>
              <div>Coaching thực địa 1-1. Đào tạo Module 3.</div>
            </div>
            <div className="flex-center gap-4" style={{ justifyContent: 'flex-start' }}>
              <div style={{ backgroundColor: '#10B981', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', minWidth: '80px', textAlign: 'center' }}>Tháng 3</div>
              <div>Đánh giá lại (Re-test). Đào tạo Module 4.</div>
            </div>
          </div>
        </div>
        <div className="card">
          <h3 className="card-title">Kỳ vọng ROI (Hiện tại vs Mục tiêu)</h3>
          <div style={{ height: 200 }}>
            <ResponsiveContainer>
              <BarChart data={mockBeforeAfter} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="before" name="Hiện tại" fill="var(--vmp-navy)" />
                <Bar dataKey="after" name="Mục tiêu" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="grid-3 gap-4">
        <div className="card flex-col flex-center" style={{ backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD' }}>
          <h4 style={{ color: '#0369A1' }}>Tăng tỷ lệ đạt chuẩn E</h4>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0284C7' }}>+46%</div>
          <p style={{ fontSize: '0.85rem' }}>Từ 8 lên 22 Quản lý</p>
        </div>
        <div className="card flex-col flex-center" style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0' }}>
          <h4 style={{ color: '#047857' }}>Giảm giờ lãng phí</h4>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>-25%</div>
          <p style={{ fontSize: '0.85rem' }}>Tiết kiệm 54h/tháng</p>
        </div>
        <div className="card flex-col flex-center" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
          <h4 style={{ color: '#B91C1C' }}>Thu hồi Chi phí</h4>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#DC2626' }}>225 Triệu</div>
          <p style={{ fontSize: '0.85rem' }}>Giá trị thu lại trong 1 năm</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem', paddingBottom: '2rem' }}>
        Báo cáo được trích xuất từ Hệ thống Đánh giá Năng lực REAL - VMP Academy
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: 'var(--vmp-bg)', minHeight: '100vh' }}>
      {!isPrinting && (
        <div style={{ backgroundColor: 'white', padding: '1rem 2rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--vmp-navy)' }}>REAL Framework</div>
          <div className="gap-2 flex-center">
            <button className="tab-btn" onClick={() => setIsStarted(false)}>Thoát</button>
            <button className="tab-btn active" onClick={handlePrint}><i className="fas fa-file-pdf" style={{ marginRight: '0.5rem' }}></i>Xuất PDF</button>
          </div>
        </div>
      )}

      {!isPrinting && (
        <div className="tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-btn ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {isPrinting ? (
          <div className="flex-col gap-4">
            <div className="page-break"><Tab1 /></div>
            <div className="page-break"><Tab2 /></div>
            <div className="page-break"><Tab4 /></div>
            <div className="page-break"><Tab5 /></div>
            <div className="page-break"><Tab6 /></div>
          </div>
        ) : (
          <div>
            {activeTab === 0 && <Tab1 />}
            {activeTab === 1 && <Tab2 />}
            {activeTab === 2 && <Tab4 />}
            {activeTab === 3 && <Tab5 />}
            {activeTab === 4 && <Tab6 />}
          </div>
        )}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

