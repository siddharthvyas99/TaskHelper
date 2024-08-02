import React, { useState, useEffect } from "react";

import axios from "axios";

import { Toastr } from "components/commons";

const AvatarUpload = ({ user, userId, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) return () => {};

    // Create a preview URL for the selected file
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Clean up the URL object when the component unmounts or file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("user[avatar]", file);

    try {
      await axios.patch(`/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onSuccess();
    } catch (err) {
      Toastr.error("Failed to upload image", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gray-100">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Upload Your Avatar
        </h1>
      </div>
      {(preview || user?.avatar_url) && (
        <div className="mb-4">
          <img
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            src={preview || user?.avatar_url}
          />
        </div>
      )}
      <form
        className="flex flex-col items-center w-full max-w-sm bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <input
          className="mb-4 p-2 border border-gray-300 rounded-md"
          type="file"
          onChange={handleFileChange}
        />
        <button
          className={`py-2 px-4 rounded-md text-white font-semibold ${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"} transition duration-150 ease-in-out`}
          disabled={loading}
          type="submit"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default AvatarUpload;
