import React from "react";

const UserAvatar = ({ avatarUrl = "https://picsum.photos/200", name }) => (
  <div className="flex items-center space-x-4 p-4 bg-white shadow rounded-md">
    <img
      alt="User Avatar"
      className="w-10 h-10 rounded-full object-cover border border-gray-300"
      src={avatarUrl || "https://picsum.photos/200"}
    />
    <span className="text-lg font-medium text-gray-800">{name}</span>
  </div>
);

export default UserAvatar;
