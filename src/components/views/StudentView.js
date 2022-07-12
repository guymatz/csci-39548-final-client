/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  // Render a single Student view 
  if (student.campusId) {
    return (
      <div>
        <h1>{student.firstname + " " + student.lastname}</h1>
        <h3>{student.email}</h3>
        <h3>{student.gpa}</h3>
        <img src={student.imageUrl} alt=""/>
        <Link to={`/campus/${student.campus.id}`}>
          <h3>{student.campus.name}</h3>
        </Link>
        <button onClick={() => deleteStudent(student.id)}>Delete</button>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>{student.firstname + " " + student.lastname}</h1>
        <h3>Student is NOT Enrolled</h3>
      </div>
    )
  }

};

export default StudentView;
