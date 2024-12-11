import React, { useState } from "react";

const ApplyNowButton = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        domain: "",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with data: ", formData);
        setShowModal(false);
      };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-black transition"
      >
        Apply Now
      </button>
      {showModal && (
              <div className="fixed -top-[100vh] inset-0 bg-[#000] bg-opacity-50 flex justify-center items-center z-10">
                <div className="bg-white text-black p-6 rounded-lg w-96 sm:w-1/3 lg:w-1/4">
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    Apply Now
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
                        onClick={() => setShowModal(false)} // Close modal without submitting
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-400"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
    </div>
  );
};

export default ApplyNowButton;
