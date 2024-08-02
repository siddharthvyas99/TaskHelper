import React from "react";

import { toPairs } from "ramda";
import DatePicker from "react-datepicker";
import Select from "react-select";

import { Button, Input } from "components/commons";

import { STATUS_OPTIONS } from "./constants";

const Form = ({
  type = "create",
  title,
  description,
  dueDate,
  status = "to_do",
  setTitle,
  setDescription,
  setStatus,
  setDueDate,
  assignedUser,
  users,
  setUserId,
  loading,
  handleSubmit,
}) => {
  const userOptions = users.map(user => ({
    value: user.id,
    label: user.name,
  }));

  const statusOptions = toPairs(STATUS_OPTIONS).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  const defaultOption = { value: assignedUser?.id, label: assignedUser?.name };
  const defaultStatusOption = { value: status, label: STATUS_OPTIONS[status] };

  return (
    <form className="mb-4 w-full space-y-2" onSubmit={handleSubmit}>
      <div className="mx-auto mb-4 w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-800 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-2xl">
        <div className="flex flex-col gap-4 p-6">
          <Input
            label="Title"
            placeholder="Todo Title (Max 125 Characters Allowed)"
            value={title}
            onChange={e => setTitle(e.target.value.slice(0, 125))}
          />
          <Input
            label="Description"
            placeholder="Todo Description"
            type="textaread"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-none text-gray-800">
              Assigned To
            </p>
            <div className="mt-1 w-full">
              <Select
                isSearchable
                defaultValue={defaultOption}
                menuPosition="fixed"
                options={userOptions}
                onChange={e => setUserId(e.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-none text-gray-800">
              Status
            </p>
            <div className="mt-1 w-full">
              <Select
                isSearchable
                defaultValue={defaultStatusOption}
                menuPosition="fixed"
                options={statusOptions}
                onChange={e => setStatus(e.value)}
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium leading-none text-gray-800">
              Due date
            </p>
            <div className="mt-1">
              <DatePicker
                className="border border-gray-300 rounded-md shadow-sm p-2 font-medium"
                dateFormat="dd/MM/yyyy"
                selected={dueDate}
                onChange={value => setDueDate(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        buttonText={type === "create" ? "Create Task" : "Update Task"}
        loading={loading}
        type="submit"
      />
    </form>
  );
};

export default Form;
