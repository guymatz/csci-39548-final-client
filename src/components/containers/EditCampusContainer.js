/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk} from '../../store/thunks';

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    //console.log("props in ECC: " + JSON.stringify(props))
    this.state = {
      name: this.props.campus.name,
      imageUrl: this.props.campus.imageUrl,
      address: this.props.campus.address,
      description: this.props.campus.description,
      redirect: false,
      redirectId: this.props.campus.id
    };
  }

  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
    //console.log("props in ECC-CDM: " + JSON.stringify(this.props))
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

    let campus = {
        id: this.props.campus.id,
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageUrl: this.state.imageUrl
    };

    console.log("Old Campus: " + JSON.stringify(campus));

    // edit campus in back-end database
    let newCampus = await this.props.editCampus(campus,this.props.campus.id);
    console.log("New Campus: " + JSON.stringify(newCampus));
    // Update state, and trigger redirect to show the new campus
    this.setState({
      name: this.props.campus.name,
      imageUrl: this.props.campus.imageUrl,
      address: this.props.campus.address,
      description: this.props.campus.description,
      redirect: true,
      redirectId: this.props.campus.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new campus input form
  render() {
    // Redirect to new campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView
          campus={this.props.campus}
          handleChange = {this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}



// The following input argument is passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus,id) => dispatch(editCampusThunk(campus,id)),
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    })
}

const mapState = (state) => {
    return {
      campus: state.campus,
    };
};

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);
