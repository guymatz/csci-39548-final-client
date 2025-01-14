/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, deleteStudentFromCampus} = props;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <button onClick={() => deleteCampus(campus.id)}>Delete</button>
      <Link to={`/editCampus/${campus.id}`}>
          <button>Edit</button>
      </Link>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <img src={campus.imageUrl} alt=""/>
      <h3>Enrolled Students</h3>
      { campus.students.length === 0 ?
        <p>No Students</p>
        : <p></p>
      }
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}
                <button onClick={() => deleteStudentFromCampus(student)}>Unenroll</button>
              </h2>
            </Link>
          </div>
        );
      })}
      <p>
      <Link to={`/enrollnewstudent/${campus.id}`}>
        <button>Enroll New Student</button>
      </Link>
      </p>
    </div>
  );
};

export default CampusView;
