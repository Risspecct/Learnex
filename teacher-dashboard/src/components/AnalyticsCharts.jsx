import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { getSectionAverages } from '../data';

// More vibrant, less predictable colors
const SUBJECT_COLORS = {
  English: '#FF6B6B',
  Science: '#4ECDC4',
  Social: '#45B7D1',
  Odia: '#F9A602',
  Hindi: '#9F7AEA',
  Mathematics: '#A3D39B'
};

const AnalyticsCharts = ({ section }) => {
  const [weeklyData, setWeeklyData] = useState([]);
  const subjectAverages = getSectionAverages(section);

  // Generate fake but realistic weekly engagement data
  useEffect(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const randomData = days.map(day => ({
      day,
      minutes: Math.floor(Math.random() * 60) + 30, // Random between 30-90 mins
      focus: Math.floor(Math.random() * 20) + 80 // Random focus score
    }));
    setWeeklyData(randomData);
  }, [section]);

  // Calculate performance bands for the pie chart
  const performanceData = [
    { name: 'Rockstars (80-100%)', value: section.students.filter(s => Object.values(s.scores).every(score => score >= 80)).length },
    { name: 'On Track (60-79%)', value: section.students.filter(s => Object.values(s.scores).some(score => score >= 60 && score < 80)).length },
    { name: 'Needs Help (<60%)', value: section.students.filter(s => Object.values(s.scores).some(score => score < 60)).length }
  ];

  const downloadReport = () => {
    let csvContent = "Student Name,English,Science,Social,Odia,Hindi,Mathematics\n";
    
    section.students.forEach(student => {
      const row = [
        `"${student.name}"`, // Quotes handle names with commas
        student.scores.english,
        student.scores.science,
        student.scores.social,
        student.scores.odia,
        student.scores.hindi,
        student.scores.mathematics
      ].join(',');
      
      csvContent += row + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Class6_Section${section.name}_PTM_Report.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="analytics-charts">
      {/* Chart Row 1 */}
      <div className="chart-row">
        <div className="chart-card">
          <h4>📚 Subject-wise Averages</h4>
          <p>How the entire section is performing in each subject</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectAverages} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="subject" angle={-15} textAnchor="end" fontSize={12} />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Average Score']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <Bar 
                dataKey="average" 
                radius={[4, 4, 0, 0]}
              >
                {subjectAverages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={SUBJECT_COLORS[entry.subject] || '#8884d8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h4>📊 Class Performance Overview</h4>
          <p>Distribution of students by performance level</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={60}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {performanceData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? '#4CAF50' : index === 1 ? '#FF9800' : '#F44336'} 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} students`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Row 2 */}
      <div className="chart-row">
        <div className="chart-card">
          <h4>⏰ Weekly Engagement Tracking</h4>
          <p>Average daily learning minutes and focus levels</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px' }}
                formatter={(value, name) => {
                  if (name === 'minutes') return [value, 'Learning Minutes'];
                  if (name === 'focus') return [value, 'Focus Score (%)'];
                  return value;
                }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="minutes" 
                stroke="#8884d8" 
                strokeWidth={3}
                dot={{ r: 5, fill: '#8884d8' }}
                activeDot={{ r: 7, fill: '#8884d8' }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="focus" 
                stroke="#82ca9d" 
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={{ r: 4, fill: '#82ca9d' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h4>🚀 Quick Insights</h4>
          <div className="insights-box">
            <div className="insight-item">
              <span className="insight-emoji">⭐</span>
              <div>
                <strong>Top Subject: </strong>
                {subjectAverages.reduce((max, subject) => max.average > subject.average ? max : subject).subject}
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-emoji">📉</span>
              <div>
                <strong>Needs Attention: </strong>
                {subjectAverages.reduce((min, subject) => min.average < subject.average ? min : subject).subject}
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-emoji">👥</span>
              <div>
                <strong>Total Students: </strong>
                {section.students.length}
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-emoji">🎯</span>
              <div>
                <strong>Class Average: </strong>
                {Math.round(subjectAverages.reduce((sum, sub) => sum + sub.average, 0) / subjectAverages.length)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="download-section">
        <button onClick={downloadReport} className="download-btn">
          📥 Download Full PTM Report (CSV)
        </button>
        <p className="download-note">Includes all student scores for parent meetings</p>
      </div>
    </div>
  );
};

export default AnalyticsCharts;