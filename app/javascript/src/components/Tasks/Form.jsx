import React from "react";

import Select from "react-select";

import { Button, Input } from "components/commons";

const Form = ({
  type = "create",
  title,
  description,
  setTitle,
  setDescription,
  assignedUser,
  users,
  setUserId,
  loading,
  handleSubmit,
}) => {
  // const history = useHistory();
  const userOptions = users.map(user => ({
    value: user.id,
    label: user.name,
  }));
  const defaultOption = { value: assignedUser?.id, label: assignedUser?.name };

  // const initialValues = useRef({
  //   title,
  //   userId: assignedUser?.id,
  // });

  // const isNotDirty = equals(initialValues.current, {
  //   title,
  //   userId: assignedUser?.id,
  // });

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
