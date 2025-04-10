import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const CreateBDA = () => {
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [teamName, setTeamName] = useState("");
    const [bda, setBda] = useState([]);
  const [getteamName, setGetTeamName] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    team: "",
    designation: "",
  });
 
  const [editingBdaId, setEditingBdaId] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleVisibility = () => {
    setiscourseFormVisible((prevState) => !prevState);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const newBda = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      team: formData.team.trim(),
      designation: formData.designation.trim(),
    };
    try {
      if (editingBdaId) {
        const response = await axios.put(
          `${API}/updatebda/${editingBdaId}`,
          newBda
        );
        toast.success("BDA updated successfully!");
      } else {
        const response = await axios.post(` ${API}/createbda`, newBda);
        toast.success("BDA created successfully!");
      }
      resetForm();
      fetchBda();
    } catch (error) {
      toast.error("There was an error while creating or updating the bda");
      console.error("There was an error submitting the bda:", error);
    }
  };
  
  const fetchBda = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/getbda`);
      setBda(response.data);
    } catch (error) {
      console.error("There was an error fetching bda:", error);
    } finally{
      setLoading(false);
    }
  };

  const fetchTeamname = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/getteamname`);
      setGetTeamName(response.data);
    } catch (error) {
      console.error("There was an error fetching teamname:", error);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBda();
    fetchTeamname();
  }, []);

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      password: "",
      team: "",
      designation: "",
    });
    setEditingBdaId(null);
    setiscourseFormVisible(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "fullname" || name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleDelete = (_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the BDA account?"
    );
    if (isConfirmed) {
      axios
        .delete(`${API}/deletebda/${_id}`)
        .then((response) => {
          fetchBda();
        })
        .catch((error) => {
          console.error("There was an error deleting the bda:", error);
        });
    }
  };
  const handleEdit = (bdaId) => {
    setFormData({
      fullname: bdaId.fullname,
      email: bdaId.email,
      password: bdaId.password,
      team: bdaId.team,
      designation: bdaId.designation,
    });
    setEditingBdaId(bdaId._id);
    setiscourseFormVisible(true);
  };

  const handleSendEmail = async (value) => {
    const emailData = {
      fullname: value.fullname,
      email: value.email,
    };
    try {
      const response = await axios.post(`${API}/sendmailtobda`, emailData);
      if (response.status === 200) {
        toast.success("Email sent successfully!");
        const bdaData = {
          mailSended: true,
        };
        const updateResponse = await axios.put(
          `${API}/mailsendedbda/${value._id}`,
          bdaData
        );
        if (updateResponse.status === 200) {
          toast.success("BDA record updated successfully!");
        } else {
          toast.error("Failed to update Bda record.");
        }
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("An error occurred while sending the email.");
    }
    fetchBda();
  };
 
  const handleChangeStatus = async (bdaId, status) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to ${status} this account to add team member?`
    );
    if (isConfirmed) {
      try {
        const response = await axios.put(`${API}/updatestatus/${bdaId}`, { status });
        if (response.status === 200) {
          toast.success(`Account ${status} successfully!`);
          fetchBda();
        } else {
          toast.error("Failed to update account status.");
        }
      } catch (error) {
        toast.error("An error occurred while updating the status.");
      }
    }
  }
  const handleAddTeamname = (e)=>{
    e.preventDefault();
    const teamData = {
      teamname: teamName.trim(),
    };
    console.log("teamData", teamData);
    axios.post(`${API}/addteamname`, teamData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Team added successfully!");
          setTeamName(" ");
          fetchBda();
          fetchTeamname();
        } else {
          toast.error("Failed to add team.");
        }
      })
      .catch((error) => {
        console.error("There was an error adding the team:", error);
        toast.error("please enter a team name.");
      });
  }

  // const handleloginteam = async (email,password) => {
  //   try {
  //     const response = await axios.post(`${API}/checkbdaauth`, { email, password });
  //     if (response.status === 200) {
  //     toast.success("Login successful!");
  //     const loginTime = new Date().getTime();
  //     setTimeout(() => {
  //     localStorage.setItem("bdaId", response.data.bdaId);
  //     localStorage.setItem("bdaName", response.data.bdaName);
  //     localStorage.setItem("bdaToken", response.data.token);
  //      localStorage.setItem("sessionStartTime", loginTime);
  //      window.open("/Home", "_blank"); 
  //   }, 500);
  //   }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to verify OTP!");
  //   }
  // };

  return (
    <div id="AdminAddCourse" >
      <Toaster position="top-center" reverseOrder={false} />
      {iscourseFormVisible && (
        <div className="form">
          <form onSubmit={handleSumbit}>
            <span onClick={resetForm}>✖</span>
            <h2>{editingBdaId ? "Edit BDA Account" : "Create BDA Account"}</h2>
            <input
              value={formData.fullname}
              onChange={handleChange}
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Enter First Name"
              required
            />
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="Enter email id"
              required
            />
            <select name="designation" id="designation" value={formData.designation} onChange={handleChange} required>
              <option disabled value="">Select Designation</option>
              <option value="MANAGER">MANAGER</option>
              <option value="LEADER">LEADER</option>
              <option value="BDA">BDA</option>
            </select>
            <select name="team" id="team" value={formData.team} onChange={handleChange} required>
              <option disabled value="">Select Team</option>
              {/* <option value="TITAN">TITAN</option>
              <option value="GLADIATOR">GLADIATOR</option>
              <option value="BEAST">BEAST</option>
              <option value="WARRIOR">WARRIOR</option>
              <option value="NO TEAM">NO TEAM</option> */}
              {getteamName.map((team, index) => { return(  <option key={index} value={team.teamname}>{team.teamname}</option>)})}
            </select>
            <input
              type="text"
              value={formData.password}
              onChange={handleChange}
              required
              name="password"
              id="password"
              placeholder="Create password"
            />
            <input
              className="cursor-pointer"
              type="submit"
              value={editingBdaId ? "Edit Account" : "Create Account"}
            />
          </form>
        </div>
      )}
      <div className="coursetable">
        <div>
          <h2>Team Lists</h2>
          <span onClick={toggleVisibility}>+ Add New Member</span>
        </div>
        <div>
            <form onSubmit={handleAddTeamname} className="flex gap-2 items-center">
            <input type="text" name="teamname" value={teamName} onChange={(e) => setTeamName(e.target.value)} id="teamname" placeholder="Add New Team.." className="px-2 py-1 border rounded-md" />
            <input type="submit" value="Add Team" className="bg-blue-500 px-2 py-1 border rounded-md" />
            </form>
            <div className="flex gap-2 items-center">
            <h2>Total Teams</h2>
            <select className="px-2 py-1 border rounded-md">
              {getteamName.map((team, index) => {return(<option key={index} value={team.teamname}>{team.teamname}</option>)})}
            </select>
            </div>
        </div>
        {loading ? (
          <div id="loader">
            <div class="three-body">
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
            </div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Team</th>
                <th>Password</th>
                {/* <th>Login</th> */}
                <th>Action</th>
                <th>Add Team Active</th>
                <th>Send Login Credentials</th>
              </tr>
            </thead>
            <tbody>
              {bda.map((bda, index) => (
                <tr key={index} className={`${bda.designation}`}>
                  <td>{index + 1}</td>
                  <td>{bda.fullname}</td>
                  <td >{bda.email}</td>
                  <td>{bda.designation}</td>
                  <td>{bda.team}</td>
                  <td>{bda.password}</td>
                  {/* <td className="cursor-pointer" onClick={() => handleloginteam(bda.email, bda.password)}>Login</td> */}
                  <td>
                    <button onClick={() => handleEdit(bda)}><i class="fa fa-edit"></i></button>
                    <button onClick={() => handleDelete(bda._id)}><i class="fa fa-trash-o text-red-600"></i></button>
                  </td>
                  <td>
                    <div className="cursor-pointer">
                      {bda.status === "Active" ? (
                        <i onClick={()=> handleChangeStatus(bda._id , "Inactive")} className="fa fa-check text-green-900"></i>
                      ) : (
                        <i onClick={()=> handleChangeStatus(bda._id , "Active")} className="fa fa-times text-red-600"></i>
                      )}
                    </div>
                  </td>
                  <td>
                    <div
                      className=" cursor-pointer"
                      onClick={() => handleSendEmail(bda)}
                      disabled={bda.mailSended}
                    >
                      {bda.mailSended ? (
                        <i class="fa fa-send-o text-green-600"></i>
                      ) : (
                        <i class="fa fa-send-o text-red-600"></i>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CreateBDA;
