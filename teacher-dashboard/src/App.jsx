import { useState } from 'react';
import { teacherProfile, classData, getSectionAverages } from './data';
import TeacherProfile from './components/TeacherProfile';
import SectionSelector from './components/SectionSelector';
import StudentTable from './components/StudentTable';
import AnalyticsCharts from './components/AnalyticsCharts';
import './App.css';

function App() {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>Smart Class Analytics Dashboard</h1>
        <TeacherProfile profile={teacherProfile} />
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Sidebar - Section Selector */}
        <aside className="sidebar">
          <SectionSelector 
            classData={classData} 
            selectedSection={selectedSection} 
            onSelectSection={setSelectedSection} 
          />
        </aside>

        {/* Right Main Area - Details */}
        <main className="content-area">
          {selectedSection ? (
            <>
              <h2>Section {selectedSection.name} - Detailed Analysis</h2>
              
              {/* Student Performance Table */}
              <div className="content-section">
                <h3>Individual Student Performance</h3>
                <StudentTable students={selectedSection.students} />
              </div>

              {/* Analytics Charts */}
              <div className="content-section">
                <h3>Subject-wise Analysis</h3>
                <AnalyticsCharts section={selectedSection} />
              </div>
            </>
          ) : (
            <div className="welcome-message">
              <h2>Welcome, {teacherProfile.name}!</h2>
              <p>Select a section from the sidebar to view detailed analytics.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;