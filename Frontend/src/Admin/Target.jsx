import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const Target = () => {
  const [bda, setBda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targets, setTargets] = useState({});
  const [getteamName, setGetTeamName] = useState([]);
  const [teamTarget , setTeamTarget] = useState({})
  const today = new Date();
  const currentMonth = today.toISOString().slice(0, 7);

  const fetchBda = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/getbda`);
      setBda(response.data);
    } catch (error) {
      console.error("There was an error fetching bda:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBda();
  }, []);

  const handleInputChange = (e, id) => {
    setTargets((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };
  const handleAsignTarget = async (e, id) => {
    e.preventDefault();
    const targetValue = targets[id];
    if (!targetValue) {
      toast.error("Please enter a target value.");
      return;
    }
    // console.log("targetValue", targetValue, id);

    try {
      const response = await axios.post(`${API}/assigntarget/${id}`, {
        target: {
          currentMonth,
          targetValue: targetValue,
        },
      });
      // console.log("response", response);
      if (response.status === 200) {
        toast.success("Target assigned successfully.");
        setTargets((prev) => ({
          ...prev,
          [id]: "",
        }));
        fetchBda();
      } else {
        toast.error("Failed to assign target.");
      }
    } catch (error) {
      console.error("Error assigning target:", error);
      toast.error("Server error while assigning target.");
    }
  };

  const handleDeleteTarget = (target, id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this target? This action cannot be undone."+
      "Please ok to proceed."
      );
    if (confirmation) {
        if (target.currentMonth === currentMonth) {
            axios
              .put(`${API}/deletetarget/${id}`, {
                target: target,
              })
              .then((response) => {
                if (response.status === 200) {
                  toast.success("Target deleted successfully.");
                  fetchBda();
                } else {
                  toast.error("Failed to delete target.");
                }
              })
              .catch((error) => {
                console.error("Error deleting target:", error);
                toast.error("Server error while deleting target.");
              });
          }else{
            toast.error("You can't delete a target from a previous month.");
            console.warn("Restricted deletion attempt:", target);
          }
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
    fetchTeamname();
  }, []);

  const handleInputChangeTeam = (e, teamId) => {
    const { value } = e.target;
    setTeamTarget((prev) => ({
      ...prev,
      [teamId]: value,
    }));
  };
  const handleAsignTargetToTeam = async (e, teamId) =>{
       e.preventDefault();
       const targetValue = teamTarget[teamId];
       console.log(targetValue , teamId);
       if (!targetValue) return;
    try {
      const payload = {
        teamId,
        targetValue,
        currentMonth,
      };
      const response = await axios.post(`${API}/targetassigntoteam`, payload);
      console.log("Target Assigned");
      fetchTeamname();
      setTeamTarget((prev) => ({ ...prev, [teamId]: "" }));
    } catch (error) {
      console.error("Error assigning target:", error);
    }
  }
  const handleDeleteTargetTeam = async (target, teamId) => {
    const confirm = window.confirm("Are you sure you want to delete this target?");
    if (!confirm) return;
    try {
      await axios.delete(`${API}/delete-target`, {
        data: {
          teamId,
          targetId: target._id,
        },
      });
      fetchTeamname();
    } catch (error) {
      console.error("Error deleting target:", error);
    }
  };

  return (
    <div id="AdminAddCourse">
      <Toaster position="top-center" reverseOrder={false} />
       <div>
        <h2>Target Assign to Team</h2>
        <div className="coursetable">
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
                <th>Team Name</th>
                <th>Target</th>
                <th>Current Month</th>
                <th>Target Assign</th>
              </tr>
            </thead>
            <tbody>
              {getteamName.map((team, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{team.teamname}</td>
                  <td>
                    <select
                      className="border rounded-md px-2 py-1">
                      {team.target.map((target, index) => (
                        <option key={index}>
                          {new Date(`${target.currentMonth}-01`).toLocaleString(
                            "en-US",
                            { month: "long", year: "numeric" }
                          )}{" "}
                          : {target.targetValue}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {team.target.length > 0 &&
                    team.target[team.target.length - 1].currentMonth ===
                      currentMonth ? (
                      <p>
                        {team.target[team.target.length - 1].currentMonth} : ₹
                        {team.target[team.target.length - 1].targetValue}
                        <i
                          className="fa fa-trash cursor-pointer text-red-600 ml-2"
                          title="Delete Target"
                          onClick={() =>
                            handleDeleteTargetTeam(
                              team.target[team.target.length - 1],
                              team._id
                            )
                          }
                        ></i>
                      </p>
                    ) : (
                      <p>No target assigned</p>
                    )}
                  </td>
                  <td>
                    {team.target.length > 0 &&
                    team.target[team.target.length - 1].currentMonth ===
                      currentMonth ? (
                      <p>already assign</p>
                    ) : (
                      <form
                       onSubmit={(e) => handleAsignTargetToTeam(e, team._id)}
                       >
                        <input
                          type="text"
                          value={teamTarget[team._id] || ""}
                          onChange={(e) => handleInputChangeTeam(e, team._id)}
                          name="teamTarget"
                          className="border rounded-md px-2 py-1"
                        />
                        <button type="submit" className="ml-2">
                          Submit
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
       </div>
      <h2>Target Assign To BDA</h2>
      <div className="coursetable">
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
                <th>Target</th>
                <th>Current Month</th>
                <th>Target Assign</th>
              </tr>
            </thead>
            <tbody>
              {bda.map((bda, index) => (
                <tr key={index} className={`${bda.designation}`}>
                  <td>{index + 1}</td>
                  <td>{bda.fullname}</td>
                  <td>{bda.email}</td>
                  <td>{bda.designation}</td>
                  <td>{bda.team}</td>
                  <td>
                    <select
                      className="border rounded-md px-2 py-1">
                      {bda.target.map((target, index) => (
                        <option key={index}>
                          {new Date(`${target.currentMonth}-01`).toLocaleString(
                            "en-US",
                            { month: "long", year: "numeric" }
                          )}{" "}
                          : {target.targetValue}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {bda.target.length > 0 &&
                    bda.target[bda.target.length - 1].currentMonth ===
                      currentMonth ? (
                      <p>
                        {bda.target[bda.target.length - 1].currentMonth} : ₹
                        {bda.target[bda.target.length - 1].targetValue}
                        <i
                          className="fa fa-trash cursor-pointer text-red-600 ml-2"
                          title="Delete Target"
                          onClick={() =>
                            handleDeleteTarget(
                              bda.target[bda.target.length - 1],
                              bda._id
                            )
                          }
                        ></i>
                      </p>
                    ) : (
                      <p>No target assigned</p>
                    )}
                  </td>

                  <td>
                    {bda.target.length > 0 &&
                    bda.target[bda.target.length - 1].currentMonth ===
                      currentMonth ? (
                      <p>already assign</p>
                    ) : (
                      <form onSubmit={(e) => handleAsignTarget(e, bda._id)}>
                        <input
                          type="text"
                          value={targets[bda._id] || ""}
                          onChange={(e) => handleInputChange(e, bda._id)}
                          name="target"
                          className="border rounded-md px-2 py-1"
                        />
                        <button type="submit" className="ml-2">
                          Submit
                        </button>
                      </form>
                    )}
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

export default Target;
