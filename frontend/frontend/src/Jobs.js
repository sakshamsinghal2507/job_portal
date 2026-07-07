// Bring useEffect and useState.
//
// useState -> Stores data.
//
// useEffect -> Runs code automatically.
//
// Example:
//
// useState
// = A notebook.
//
// Whatever React wants to remember,
// it stores inside this notebook.
//
// useEffect
// = Like an automatic machine.
//
// Whenever page opens,
// it starts working automatically.
import { useEffect, useState } from "react";



// Bring useNavigate.
//
// It helps us move
// from one page to another.
//
// Example:
//
// Login
//   │
//   ▼
// Jobs Page
//
// navigate("/jobs")
//
// opens Jobs page.
import { useNavigate } from "react-router-dom";



// Bring CSS.
//
// CSS gives design
// to Jobs page.
import "./Jobs.css";



// Main Jobs function.
//
// Whenever Jobs page opens,
// this function starts running.
function Jobs() {



  // useNavigate helps
  // change pages.
  const navigate = useNavigate();



  // ----------------------------
  // JOBS STATE
  // ----------------------------

  // Store all jobs.
  //
  // Example:
  //
  // Before API call
  //
  // jobs = []
  //
  // Empty basket.
  //
  // After backend replies
  //
  // jobs = [
  // Google,
  // Amazon,
  // Microsoft
  // ]
  const [jobs, setJobs] = useState([]);




  // ----------------------------
  // LOADING STATE
  // ----------------------------

  // loading tells us
  // whether backend
  // is still sending data.
  //
  // Example:
  //
  // Restaurant
  //
  // You order food.
  //
  // Food is cooking.
  //
  // loading = true
  //
  // Food arrives.
  //
  // loading = false
  const [loading, setLoading] = useState(true);




  // ----------------------------
  // SEARCH STATE
  // ----------------------------

  // Store search text.
  //
  // Example:
  //
  // User types
  //
  // Goo
  //
  // search = "Goo"
  //
  // Later
  //
  // Google
  //
  // search = "Google"
  const [search, setSearch] = useState("");




  // ----------------------------
  // LOCATION FILTER
  // ----------------------------

  // Store selected location.
  //
  // Example
  //
  // User selects
  //
  // Delhi
  //
  // locationFilter="Delhi"
  //
  // Initially
  //
  // All Locations
  const [locationFilter, setLocationFilter] = useState("All");




  // ----------------------------
  // SORT
  // ----------------------------

  // Store sorting option.
  //
  // Example:
  //
  // Salary Low to High
  //
  // OR
  //
  // Company A-Z
  //
  // Initially
  //
  // No sorting.
  const [sortBy, setSortBy] = useState("default");




  // ----------------------------
  // EDIT JOB
  // ----------------------------

  // Store job
  // which user wants to edit.
  //
  // Example
  //
  // User clicks Edit
  //
  // Google Job
  //
  // editJob
  //
  // becomes
  //
  // Google Job object.
  //
  // Initially
  //
  // No job selected.
  const [editJob, setEditJob] = useState(null);




  // ========================
  // GET JOBS
  // ========================

  // This code runs automatically
  // when Jobs page opens.
  useEffect(() => {



    // Get token
    // from browser.
    //
    // Example:
    //
    // Browser Locker
    //
    // TOKEN
    // abc123
    const token = localStorage.getItem("token");




    // If token
    // is not found,
    // user is not logged in.
    //
    // Open Login page.
    if (!token) {

      navigate("/");

      return;

    }




    // Send request
    // to backend.
    //
    // Real Life Example
    //
    // Student asks teacher:
    //
    // "Show attendance."
    //
    // Teacher checks register.
    //
    // Teacher gives attendance.
    //
    // Same here:
    //
    // React
    //    │
    // Ask Jobs
    //    │
    // Backend
    fetch("http://job-portal-weft.onrender.com/jobs", {

      headers: {

        // Send token.
        //
        // Backend checks
        // whether user
        // is logged in.
        Authorization: token,

      },

    })



    // Backend replied.
    //
    // Convert response
    // into JSON.
      .then((res) => res.json())



    // Save jobs.
    //
    // Example:
    //
    // Before
    //
    // jobs=[]
    //
    // After
    //
    // jobs=[
    // Google,
    // Amazon,
    // Microsoft
    // ]
      .then((data) => {

        // Save jobs.
        setJobs(data);

        // Stop Loading.
        //
        // loading=true
        //
        // becomes
        //
        // loading=false
        setLoading(false);

      })



    // If error comes.
      .catch((err) => {

        console.log(err);

        // Stop loading
        // even if error occurs.
        setLoading(false);

      });



  }, [navigate]);

  // ========================
// DELETE JOB
// ========================

// This function runs
// when user clicks
// Delete button.
const deleteJob = (id) => {

  // Get login token
  // from browser.
  //
  // Example:
  //
  // Browser Locker
  //
  // TOKEN = abc123
  const token = localStorage.getItem("token");



  // Send Delete request
  // to backend.
  //
  // Real Life Example:
  //
  // Teacher has attendance register.
  //
  // You say:
  //
  // "Remove Roll No. 5"
  //
  // Teacher removes it.
  //
  // Same here:
  //
  // React
  //     │
  // Delete Job
  //     │
  // Backend
  fetch(`http://job-portal-weft.onrender.com/delete-job/${id}`, {

    // DELETE means
    // remove data.
    method: "DELETE",

    headers: {

      // Send token
      // for security.
      Authorization: token,

    },

  })



  // Backend sends reply.
  .then((res) => res.text())



  // Show reply.
  .then((data) => {

    alert(data);



    // Remove deleted job
    // from screen.
    //
    // Example:
    //
    // Before
    //
    // Google
    // Amazon
    // Microsoft
    //
    // Delete Amazon
    //
    // After
    //
    // Google
    // Microsoft
    setJobs(

      jobs.filter((job) => job.id !== id)

    );

  })



  // If error comes.
  .catch((err) => console.log(err));

};



// ========================
// SAVE JOB
// ========================

// This function runs
// when user clicks
// ❤️ Save Job
const saveJob = (job) => {

  // Read saved jobs
  // from browser.
  //
  // Example
  //
  // savedJobs
  //
  // Google
  // Amazon
  //
  // If nothing is saved,
  // use empty array.
  let savedJobs =

    JSON.parse(localStorage.getItem("savedJobs"))

    || [];



  // Check whether
  // job is already saved.
  //
  // Example
  //
  // User again saves
  // Google Job.
  //
  // find() searches
  // for matching job.
  let exists =

    savedJobs.find((j) => j.id === job.id);



  // If already saved.
  if (exists) {

    alert("Already saved ❤️");

    return;

  }



  // Add new job.
  //
  // Example
  //
  // Before
  //
  // Google
  //
  // After
  //
  // Google
  // Amazon
  savedJobs.push(job);



  // Save updated list
  // into browser.
  localStorage.setItem(

    "savedJobs",

    JSON.stringify(savedJobs)

  );



  alert("Job saved ❤️");

};



// ========================
// START EDIT
// ========================

// This function runs
// when Edit button
// is clicked.
const startEdit = (job) => {

  // Store selected job.
  //
  // Example
  //
  // User clicks
  // Edit Google Job.
  //
  // editJob
  //
  // becomes
  //
  // Google Job.
  setEditJob(job);

};



// ========================
// UPDATE JOB
// ========================

// This function runs
// when Update button
// is clicked.
const updateJob = () => {



  // Get token.
  const token =

    localStorage.getItem("token");



  // Send updated job
  // to backend.
  //
  // React
  //    │
  // Updated Job
  //    │
  // Backend
  fetch(

    `http://job-portal-weft.onrender.com/update-job/${editJob.id}`,

    {

      // PUT means
      // Update data.
      method: "PUT",

      headers: {

        "Content-Type": "application/json",

        Authorization: token,

      },



      // Send updated job.
      body: JSON.stringify(editJob),

    }

  )



  // Read backend reply.
  .then((res) => res.text())



  // Backend replied.
  .then((data) => {

    alert(data);



    // Update screen
    // immediately.
    //
    // Example
    //
    // Before
    //
    // Google
    //
    // After Edit
    //
    // Google India
    setJobs(

      jobs.map((job) =>

        job.id === editJob.id

          ? editJob

          : job

      )

    );



    // Close Edit Form.
    setEditJob(null);

  })



  // If error comes.
  .catch((err) => console.log(err));

};

  // ========================
// UI
// ========================

// Check whether jobs
// are still loading.
//
// Example:
//
// User opens page.
//
// Backend is still
// sending data.
//
// loading = true
if (loading) {

  // Show this screen.
  return (

    // Center the text.
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >

      <h2>

        Loading Jobs...

      </h2>

    </div>

  );

}



// After loading finishes,
// React shows main page.
return (

  // Main container.
  <div className="jobs-page">




    {/* Main Heading */}

    <h1 className="jobs-title">

      💼 Available Jobs

    </h1>




    {/* =====================
         SEARCH BOX
       ===================== */}

    <input

      // User can type text.
      type="text"

      // Light text shown
      // before typing.
      placeholder="🔍 Search jobs..."

      // Current search value.
      value={search}

      // Update search
      // while user types.
      //
      // Example:
      //
      // User types
      //
      // Goo
      //
      // search becomes
      //
      // "Goo"
      onChange={(e) =>

        setSearch(e.target.value)

      }

      className="search-box"

    />




    {/* =====================
        LOCATION FILTER
       ===================== */}

    <select

      className="filter-box"

      value={locationFilter}

      onChange={(e) =>

        setLocationFilter(e.target.value)

      }

    >

      {/* Default option */}

      <option value="All">

        All Locations

      </option>




      {/* Create options
          automatically.
      */}

      {

        [...new Set(

          jobs.map(

            (job) => job.location

          )

        )]

        .map((location) => (

          <option

            key={location}

            value={location}

          >

            {location}

          </option>

        ))

      }

    </select>




    {/* =====================
          SORT DROPDOWN
       ===================== */}

    <select

      className="filter-box"

      value={sortBy}

      onChange={(e) =>

        setSortBy(e.target.value)

      }

    >

      <option value="default">

        Sort By

      </option>

      <option value="salaryLow">

        Salary: Low to High

      </option>

      <option value="salaryHigh">

        Salary: High to Low

      </option>

      <option value="company">

        Company A-Z

      </option>

    </select>




    {/* =====================
          EDIT FORM
       ===================== */}

    {

      // Show Edit Form
      // only if editJob
      // contains a job.
      editJob && (

        <div className="edit-form">

          <h2>

            Edit Job

          </h2>




          {/* Title */}

          <input

            value={editJob.title}

            onChange={(e) =>

              setEditJob({

                ...editJob,

                title: e.target.value

              })

            }

            placeholder="Title"

          />




          {/* Company */}

          <input

            value={editJob.company}

            onChange={(e) =>

              setEditJob({

                ...editJob,

                company: e.target.value

              })

            }

            placeholder="Company"

          />




          {/* Salary */}

          <input

            value={editJob.salary}

            onChange={(e) =>

              setEditJob({

                ...editJob,

                salary: e.target.value

              })

            }

            placeholder="Salary"

          />




          {/* Location */}

          <input

            value={editJob.location}

            onChange={(e) =>

              setEditJob({

                ...editJob,

                location: e.target.value

              })

            }

            placeholder="Location"

          />




          {/* Update Button */}

          <button

            className="update-btn"

            onClick={updateJob}

          >

            Update Job

          </button>




          {/* Cancel Button */}

          <button

            onClick={() =>

              setEditJob(null)

            }

          >

            Cancel

          </button>

        </div>

      )

    }

      {/* =====================
      JOB LIST
===================== */}

<div className="jobs-container">

  {

    // Take all jobs.
    jobs

      // --------------------------
      // SEARCH + LOCATION FILTER
      // --------------------------

      // filter() checks every job.
      //
      // Example:
      //
      // Jobs:
      // Google
      // Amazon
      // Microsoft
      //
      // Search:
      // Goo
      //
      // Result:
      // Google
      //
      // Only matching jobs remain.
      .filter((job) => {

        // Check whether search
        // text matches Title,
        // Company or Location.
        const matchesSearch =

          job.title
            .toLowerCase()
            .includes(search.toLowerCase())

          ||

          job.company
            .toLowerCase()
            .includes(search.toLowerCase())

          ||

          job.location
            .toLowerCase()
            .includes(search.toLowerCase());



        // Check location filter.
        //
        // Example:
        //
        // Dropdown:
        // Delhi
        //
        // Show only Delhi jobs.
        const matchesLocation =

          locationFilter === "All"

          ||

          job.location === locationFilter;



        // Job will be shown
        // only if both are true.
        return (

          matchesSearch &&

          matchesLocation

        );

      })



      // --------------------------
      // SORT
      // --------------------------

      // sort() arranges jobs.
      .sort((a, b) => {

        // Salary Low → High
        if (sortBy === "salaryLow") {

          return (

            parseInt(a.salary)

            -

            parseInt(b.salary)

          );

        }



        // Salary High → Low
        if (sortBy === "salaryHigh") {

          return (

            parseInt(b.salary)

            -

            parseInt(a.salary)

          );

        }



        // Company A-Z
        if (sortBy === "company") {

          return (

            a.company.localeCompare(

              b.company

            )

          );

        }



        // No sorting.
        return 0;

      })



      // --------------------------
      // SHOW JOBS
      // --------------------------

      // map() creates one
      // Job Card for every job.
      //
      // Example:
      //
      // Google
      // Amazon
      //
      // becomes
      //
      // Card
      // Card
      .map((job) => (

        <div

          className="job-card"

          key={job.id}

        >



          {/* Job Title */}

          <div className="job-title">

            {job.title}

          </div>



          {/* Company */}

          <div className="job-info">

            🏢 {job.company}

          </div>



          {/* Salary */}

          <div className="job-info">

            💰 {job.salary}

          </div>



          {/* Location */}

          <div className="job-info">

            📍 {job.location}

          </div>



          {/* Apply Button */}

          <button

            className="apply-btn"

            onClick={() =>

              alert(

                `Applied for ${job.title} at ${job.company}!`

              )

            }

          >

            Apply Now

          </button>



          {/* Save Button */}

          <button

            className="save-btn"

            onClick={() => saveJob(job)}

          >

            ❤️ Save Job

          </button>



          {/* Edit Button */}

          <button

            className="edit-btn"

            onClick={() =>

              startEdit(job)

            }

          >

            ✏ Edit

          </button>



          {/* Delete Button */}

          <button

            className="delete-btn"

            onClick={() =>

              deleteJob(job.id)

            }

          >

            🗑 Delete

          </button>



        </div>

      ))

  }

</div>

</div>

);

}



// Export this component.
//
// This allows App.js
// to use Jobs page.
export default Jobs;