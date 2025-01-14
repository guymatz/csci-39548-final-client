import * as at from './actionTypes';

// ACTION CREATORS;
/** needs to be an action creator
 * for each action type
 */

// All Campuses
export const fetchAllCampuses = (campuses) => {
  return {
    type: at.FETCH_ALL_CAMPUSES,
    payload: campuses,
  };
};

//Single Campus
export const fetchCampus = (campus) => {
  return {
    type: at.FETCH_CAMPUS,
    payload: campus,
  };
};

export const addCampus = (campus) => {
  return {
    type: at.ADD_CAMPUS,
    payload: campus,
  };
};

export const deleteCampus = (campusId) => {
  return {
    type: at.DELETE_CAMPUS,
    payload: campusId,
  };
};

export const editCampus = (campus, id) => {
  return {
    type: at.EDIT_CAMPUS,
    payload: campus,
  };
};

//All Students
export const fetchAllStudents = (students) => {
  return {
    type: at.FETCH_ALL_STUDENTS,
    payload: students,
  };
};

export const addStudent = (student) => {
  return {
    type: at.ADD_STUDENT,
    payload: student,
  };
};

export const deleteStudent = (studentId) => {
  return {
    type: at.DELETE_STUDENT,
    payload: studentId,
  };
};


export const editStudent = (student, id) => {
  return {
    type: at.EDIT_STUDENT,
    payload: student,
  };
};

//Single Student
export const fetchStudent = (student) => {
  return {
    type: at.FETCH_STUDENT,
    payload: student,
  };
};

export const addStudentToCampus = (student, campusId) => {
  return {
    type: at.ADD_STUDENT_TO_CAMPUS,
    payload: student, campusId
  };
};

export const deleteStudentFromCampus = (studentId, campusId) => {
  return {
    type: at.DELETE_STUDENT_FROM_CAMPUS,
    payload: studentId, campusId
  };
};


