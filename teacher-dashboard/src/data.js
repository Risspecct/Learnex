// Teacher Profile Mock Data
export const teacherProfile = {
  name: "Ms. Priyanka Mohanty",
  school: "Zilla School, Mayurbhanj",
  class: "Class 6",
};

// Mock Data for Classes, Sections, and Students
export const classData = {
  className: "Class 6",
  sections: [
    {
      name: "6A",
      students: [
        { id: 1, name: "Ankita Das", scores: { english: 88, science: 72, social: 85, odia: 90, hindi: 78, mathematics: 65 } },
        { id: 2, name: "Rajesh Panda", scores: { english: 72, science: 68, social: 75, odia: 85, hindi: 80, mathematics: 90 } },
        { id: 3, name: "Smita Patnaik", scores: { english: 45, science: 62, social: 78, odia: 92, hindi: 85, mathematics: 58 } },
        { id: 4, name: "Amit Kumar", scores: { english: 92, science: 85, social: 88, odia: 78, hindi: 82, mathematics: 95 } },
        { id: 5, name: "Priya Singh", scores: { english: 68, science: 75, social: 72, odia: 85, hindi: 79, mathematics: 82 } },
        { id: 6, name: "Rahul Meher", scores: { english: 55, science: 48, social: 62, odia: 70, hindi: 65, mathematics: 58 } },
      ],
    },
    {
      name: "6B",
      students: [
        { id: 1, name: "Aarav Singh", scores: { english: 92, science: 85, social: 88, odia: 75, hindi: 82, mathematics: 95 } },
        { id: 2, name: "Ishaani Mohanty", scores: { english: 78, science: 82, social: 90, odia: 88, hindi: 91, mathematics: 84 } },
        { id: 3, name: "Debasish Jena", scores: { english: 62, science: 55, social: 48, odia: 70, hindi: 65, mathematics: 72 } },
        { id: 4, name: "Sunita Das", scores: { english: 85, science: 88, social: 82, odia: 90, hindi: 87, mathematics: 91 } },
        { id: 5, name: "Vikram Patra", scores: { english: 58, science: 62, social: 55, odia: 65, hindi: 60, mathematics: 68 } },
        { id: 6, name: "Lipika Roy", scores: { english: 72, science: 68, social: 75, odia: 80, hindi: 78, mathematics: 74 } },
      ],
    },
    {
      name: "6C",
      students: [
        { id: 1, name: "Srikant Das", scores: { english: 85, science: 90, social: 82, odia: 95, hindi: 88, mathematics: 92 } },
        { id: 2, name: "Puja Sahu", scores: { english: 70, science: 68, social: 72, odia: 80, hindi: 75, mathematics: 78 } },
        { id: 3, name: "Rohit Meher", scores: { english: 58, science: 62, social: 55, odia: 65, hindi: 60, mathematics: 50 } },
        { id: 4, name: "Ananya Patnaik", scores: { english: 88, science: 92, social: 85, odia: 90, hindi: 86, mathematics: 94 } },
        { id: 5, name: "Biswajit Mohanty", scores: { english: 65, science: 58, social: 62, odia: 70, hindi: 68, mathematics: 72 } },
        { id: 6, name: "Sanjana Panda", scores: { english: 78, science: 82, social: 75, odia: 85, hindi: 80, mathematics: 84 } },
      ],
    },
  ],
};

// Helper function to calculate averages for charts
export const getSectionAverages = (section) => {
  const subjects = ['english', 'science', 'social', 'odia', 'hindi', 'mathematics'];
  let averages = [];

  subjects.forEach(subject => {
    const total = section.students.reduce((sum, student) => sum + student.scores[subject], 0);
    const average = total / section.students.length;
    averages.push({ subject: subject.charAt(0).toUpperCase() + subject.slice(1), average: Math.round(average) });
  });

  return averages;
};