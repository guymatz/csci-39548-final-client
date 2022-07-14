/*==================================================
EnrollNewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EnrollNewStudentView from '../views/EnrollNewStudentView';
import { addStudentThunk } from '../../store/thunks';

class EnrollNewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    console.log("props in Enroll CC: " + JSON.stringify(this.props))
    //console.log("Campus ID Enroll CC: " + JSON.stringify(this.props.match.params.id))
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: null,
      campusId: this.props.match.params.id,
      gpa: null,
      redirect: false,
      redirectId: null
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let student = {
        //id: this.props.student.id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        campusId: this.state.campusId,
        gpa: this.state.gpa,
        imageUrl: this.state.imageUrl
    };

    //console.log("Old Student: " + JSON.stringify(student));

    // edit student in back-end database
    console.log("Student: " + JSON.stringify(student));
    let newStudent = await this.props.addStudent(student);
    console.log("New Student: " + JSON.stringify(newStudent));
    // Update state, and trigger redirect to show the new student

    this.setState({
      /*
      firstname: this.props.student.firstname,
      lastname: this.props.student.lastname,
      imageUrl: this.props.student.imageUrl,
      email: this.props.student.email,
      campusId: this.props.student.campusId,
      gpa: this.props.student.gpa,
      */
      redirect: true,
      redirectId: newStudent.id
    });

    console.log("New Student State: " + JSON.stringify(this.state));
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EnrollNewStudentView
          campusId={this.props.match.params.id}
          handleChange = {this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}



// The following input argument is passed to the "connect" function used by "EnrollNewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

const mapState = (state) => {
    return {
      student: state.student,
    };
};

// Export store-connected container by default
// EnrollNewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EnrollNewStudentContainer);
