const SectionSelector = ({ classData, selectedSection, onSelectSection }) => {
  return (
    <div className="section-selector">
      <h3>{classData.className}</h3>
      {classData.sections.map(section => (
        <button
          key={section.name}
          className={`section-btn ${selectedSection?.name === section.name ? 'active' : ''}`}
          onClick={() => onSelectSection(section)}
        >
          Section {section.name}
        </button>
      ))}
    </div>
  );
};

export default SectionSelector;