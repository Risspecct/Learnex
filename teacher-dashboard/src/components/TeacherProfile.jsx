const TeacherProfile = ({ profile }) => {
  return (
    <div className="teacher-profile">
      <div className="profile-avatar">
        {profile.name.charAt(0)}
      </div>
      <div className="profile-info">
        <strong>{profile.name}</strong>
        <p>{profile.school}</p>
        <p>{profile.class}</p>
      </div>
    </div>
  );
};

export default TeacherProfile;